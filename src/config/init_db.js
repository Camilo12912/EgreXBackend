const db = require('./db');
const bcrypt = require('bcrypt');

async function waitForDb(retries = 30, delay = 2000) {
    console.log('--- 🛡️ Verificando conexión a la base de datos ---');
    for (let i = 0; i < retries; i++) {
        try {
            await db.query('SELECT 1');
            console.log('✅ Conexión establecida con PostgreSQL.');
            return;
        } catch (err) {
            console.log(`⏳ [Intento ${i + 1}/${retries}] La base de datos no responde aún. Reintentando...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('❌ No se pudo establecer conexión con la base de datos. Revisa que el contenedor "db" esté corriendo.');
}

async function initializeDatabase() {
    try {
        console.log('--- 🚀 Iniciando flujo de configuración EgreX ---');
        await waitForDb();

        // 0. Clean Slate (A petición del usuario para entorno de pruebas)
        console.log('🧹 Limpiando tablas existentes para un arranque limpio...');
        await db.query(`
            DROP TABLE IF EXISTS event_registrations CASCADE;
            DROP TABLE IF EXISTS events CASCADE;
            DROP TABLE IF EXISTS profile_modifications CASCADE;
            DROP TABLE IF EXISTS egresados_profiles CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `);
        console.log('✨ Base de datos limpia (tablas eliminadas).');

        console.log('🏗️ Creando estructura de tablas...');

        // 1. Users Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE,
                identificacion VARCHAR(50) UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'egresado',
                needs_password_change BOOLEAN DEFAULT FALSE,
                last_login TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   ✅ Tabla [users] creada (email opcional).');

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
                laboralmente_activo VARCHAR(100),
                cargo_actual VARCHAR(255),
                sector_economico VARCHAR(255),
                nombre_empresa VARCHAR(255),
                rango_salarial VARCHAR(100),
                ejerce_perfil_profesional VARCHAR(20),
                reconocimientos TEXT,
                tratamiento_datos BOOLEAN DEFAULT FALSE,
                estudios_adicionales JSONB DEFAULT NULL,
                detalles_laborales JSONB DEFAULT NULL,
                fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   ✅ Tabla [egresados_profiles] creada.');

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
        console.log('   ✅ Tabla [profile_modifications] creada.');

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
                form_questions JSONB DEFAULT '[]',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('   ✅ Tabla [events] creada (con formularios dinámicos).');

        // 5. Event Registrations Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS event_registrations (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                event_id UUID REFERENCES events(id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                form_responses JSONB DEFAULT '{}',
                attended BOOLEAN DEFAULT FALSE,
                registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(event_id, user_id)
            );
        `);
        console.log('   ✅ Tabla [event_registrations] creada (con respuestas y asistencia).');

        // 6. Seed Admin User
        console.log('👤 Configurando cuenta de administrador...');
        const adminEmail = 'admin@fesc.edu.co';
        const adminPass = 'admin';
        const adminHash = await bcrypt.hash(adminPass, 10);
        const adminId = 'admin';

        await db.query(`
            INSERT INTO users (id, email, identificacion, password_hash, role)
            VALUES (gen_random_uuid(), $1, $2, $3, 'admin')
            ON CONFLICT (email) DO UPDATE SET password_hash = $3, identificacion = $2;
        `, [adminEmail, adminId, adminHash]);

        console.log(`   ✅ Admin configurado: ID "${adminId}" / Pass "${adminPass}"`);
        console.log('🏁 Proceso de inicialización terminado satisfactoriamente.');
    } catch (error) {
        console.error('❌ ERROR CRÍTICO EN INICIALIZACIÓN:', error);
        throw error;
    }
}

module.exports = initializeDatabase;

