const AuthService = require('../services/auth.service');

exports.login = async (req, res) => {
    try {
        const { identificacion, password } = req.body;
        console.log(`[LOGIN ATTEMPT] ID: ${identificacion}`);

        if (!identificacion || !password) {
            console.log('[LOGIN FAIL] Missing credentials');
            return res.status(400).json({ error: 'ID and password are required' });
        }

        const result = await AuthService.authenticate(identificacion, password);
        console.log('[LOGIN SUCCESS] Authenticated');
        res.json(result);
    } catch (error) {
        console.error('[LOGIN ERROR]', error.message);
        if (error.message === 'Credenciales inválidas') {
            return res.status(401).json({ error: error.message });
        }
        console.error('Login error detail:', error);
        res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newPassword } = req.body;

        await AuthService.updatePassword(userId, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        if (error.message.includes('al menos 6 caracteres')) {
            return res.status(400).json({ error: error.message });
        }
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

