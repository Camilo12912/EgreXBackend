const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');
const db = require('../config/db');

class AuthService {
    async authenticate(identificacion, password) {
        // Sanitize inputs
        const safeId = identificacion ? identificacion.toString().trim() : '';
        const safePass = password ? password.toString().trim() : '';

        const user = await User.findByIdentificacion(safeId);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        // Debug: Log hash prefix to checking consistency (never log full hash/pass in prod, but needed for debug)
        const hashPrefix = user.password_hash ? user.password_hash.substring(0, 10) + '...' : 'NULL';

        const validPassword = await bcrypt.compare(safePass, user.password_hash);

        if (!validPassword) {
            throw new Error('Credenciales inválidas');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        // Background task: Track last login
        try {
            await User.updateLastLogin(user.id);
        } catch (e) {
            console.error('Track login error:', e.message);
        }

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                needs_password_change: user.needs_password_change
            }
        };
    }

    async updatePassword(userId, newPassword) {
        // Trim current password to avoid "Spacebar" issues
        const safePass = newPassword ? newPassword.toString().trim() : '';

        if (!safePass || safePass.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        const hash = await bcrypt.hash(safePass, 10);

        const query = `
            UPDATE users 
            SET password_hash = $1, needs_password_change = FALSE 
            WHERE id = $2
        `;
        const result = await db.query(query, [hash, userId]);

        if (result.rowCount === 0) {
            console.error(`[UPDATE PASSWORD FAIL] User ID ${userId} not found in DB.`);
            throw new Error('Usuario no encontrado. Por favor inicie sesión nuevamente.');
        }
    }
}

module.exports = new AuthService();
