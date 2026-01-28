// Load environment variables at the very beginning
require('dotenv').config();

const app = require('./app');
const initializeDatabase = require('./config/init_db');

const PORT = process.env.PORT || 8080;

// Initialize Database and then start server
async function startServer() {
    try {
        console.log('Iniciando sistema EgreX...');
        await initializeDatabase();

        const server = app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.log('UNHANDLED REJECTION! 💥 Shutting down...');
            console.log(err.name, err.message);
            if (server) {
                server.close(() => process.exit(1));
            } else {
                process.exit(1);
            }
        });

        // Optional: module.exports = server; if we were in a closure, 
        // but let's keep it simple for Docker.
    } catch (error) {
        console.error('❌ Fallo crítico al iniciar el servidor:', error);
        process.exit(1);
    }
}

startServer();

// Properly export the app
module.exports = app;

