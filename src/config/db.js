const { Pool } = require('pg');
const config = require('./env');

let poolConfig;

if (process.env.DATABASE_URL) {
    // Configuración para Producción / Railway
    console.log('🔗 Conectando vía DATABASE_URL (Modo Cloud)');
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
} else {
    // Configuración para Desarrollo / Docker Local
    console.log('🏠 Conectando vía Credenciales Individuales (Modo Local)');
    poolConfig = {
        user: config.db.user,
        host: config.db.host,
        database: config.db.database,
        password: config.db.password,
        port: config.db.port,
        ssl: false // Docker local no usa SSL por defecto
    };
}

const pool = new Pool(poolConfig);

pool.on('connect', () => {
    console.log('✅ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error Crítico PostgreSQL:', err);
    process.exit(1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
};
