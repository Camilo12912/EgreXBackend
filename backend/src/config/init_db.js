const db = require('./db');
const bcrypt = require('bcrypt');

async function waitForDb(retries = 20, delay = 3000) {
    console.log('--- Verificando conexión a la base de datos ---');
    for (let i = 0; i < retries; i++) {
        try {
            await db.query('SELECT 1');
            console.log('✅ Conexión exitosa a la base de datos.');
            return;
        } catch (err) {
            console.log(`⏳ DB no lista (intento ${i + 1}/${retries}). Error: ${err.message}`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('❌ Fallo total de conexión tras agotarse los intentos.');
}

async function initializeDatabase() {
    try {
        console.log('--- Iniciando Proceso de Inicialización EgreX ---');
        await waitForDb();

        console.log('🛠 Creando/Verificando tablas...');

        // 1. Users Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                identificacion VARCHAR(50) UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'egresado',
                needs_password_change BOOLEAN DEFAULT FALSE,
                last_login TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   -> Tabla [users] lista.');

        // 2. Profiles Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS egresados_profiles (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                nombre VARCHAR(255),
                telefono VARCHAR(50),
                profesion VARCHAR(255),
                empresa VARCHAR(255),
                correo_personal VARCHAR(255),
                identificacion VARCHAR(50),
                ciudad_residencia VARCHAR(100),
                direccion_domicilio VARCHAR(255),
                barrio VARCHAR(100),
                programa_academico VARCHAR(255),
                sede VARCHAR(100),
                laboralmente_activo VARCHAR(20),
                cargo_actual VARCHAR(255),
                sector_economico VARCHAR(255),
                nombre_empresa VARCHAR(255),
                rango_salarial VARCHAR(100),
                ejerce_perfil_profesional VARCHAR(20),
                reconocimientos TEXT,
                tratamiento_datos BOOLEAN DEFAULT FALSE,
                fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   -> Tabla [egresados_profiles] lista.');

        // 3. Profile History Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS profile_modifications (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                changed_by UUID REFERENCES users(id),
                field_name VARCHAR(100) NOT NULL,
                old_value TEXT,
                new_value TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                change_type VARCHAR(50) DEFAULT 'update'
            );
        `);
        console.log('   -> Tabla [profile_modifications] lista.');

        // 4. Events Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS events (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title VARCHAR(255) NOT NULL,
                description TEXT,
                date TIMESTAMP NOT NULL,
                location VARCHAR(255),
                image_url TEXT,
                image_data BYTEA,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   -> Tabla [events] lista.');

        // 5. Event Registrations Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS event_registrations (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                event_id UUID REFERENCES events(id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(event_id, user_id)
            );
        `);
        console.log('   -> Tabla [event_registrations] lista.');

        // 6. Seed Admin User
        console.log('👤 Verificando usuario administrador...');
        const adminEmail = 'admin@fesc.edu.co';
        const adminPass = 'admin';
        const adminHash = await bcrypt.hash(adminPass, 10);
        const adminId = 'admin';

        const checkAdmin = await db.query('SELECT * FROM users WHERE email = $1 OR identificacion = $2', [adminEmail, adminId]);
        if (checkAdmin.rows.length === 0) {
            console.log('   -> El admin no existe. Creando uno nuevo...');
            await db.query(`
                INSERT INTO users (id, email, identificacion, password_hash, role)
                VALUES (gen_random_uuid(), $1, $2, $3, 'admin')
            `, [adminEmail, adminId, adminHash]);
            console.log(`   -> ✅ Admin creado (ID: ${adminId} / PW: ${adminPass})`);
        } else {
            console.log('   -> ✅ Admin ya existe en la base de datos.');
        }

        console.log('🏁 Inicialización completa.');
    } catch (error) {
        console.error('❌ ERROR DURANTE LA INICIALIZACIÓN:', error);
        throw error;
    }
}

module.exports = initializeDatabase;

