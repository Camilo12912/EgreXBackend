const db = require('./src/config/db');

async function migrate() {
    try {
        console.log('Iniciando migración de base de datos...');

        await db.query(`
      ALTER TABLE egresados_profiles 
      ADD COLUMN IF NOT EXISTS estudios_adicionales JSONB;
      
      ALTER TABLE egresados_profiles 
      ADD COLUMN IF NOT EXISTS detalles_laborales JSONB;
    `);

        console.log('¡Migración completada con éxito!');
        process.exit(0);
    } catch (err) {
        console.error('Error en la migración:', err);
        process.exit(1);
    }
}

migrate();
