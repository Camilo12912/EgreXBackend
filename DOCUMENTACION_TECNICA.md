# Documentación Técnica - EgreX

## 1. Arquitectura del Sistema
El proyecto sigue una arquitectura **Cliente-Servidor** moderna, separando completamente el Frontend del Backend, comunicándose a través de una API RESTful. El despliegue está contenerizado usando Docker.

### Stack Tecnológico (PERN Stack + Utils)
- **Frontend**: React.js (Hooks, Context API).
  - *Estilos*: CSS Modules + Bootstrap + Framer Motion (para animaciones).
  - *Navegación*: React Router v6.
- **Backend**: Node.js + Express.
  - *Seguridad*: Helmet, CORS, JWT (JSON Web Tokens), Bcrypt (hashing).
  - *Base de Datos*: PostgreSQL 15.
- **DevOps**: Docker & Docker Compose.

---

## 2. Estructura del Proyecto

### 2.1 Backend (`/egrex-backend`)
Siguiendo el patrón **MVC** (Model-View-Controller) modificado para APIs (Service-Controller-Route):
- `src/config/`: Conexión a BD y variables de entorno.
- `src/controllers/`: Manejo de peticiones HTTP (req/res) y validación de entrada.
- `src/services/`: **Lógica de negocio pura**. Aquí residen las reglas reales (ej: verificar fechas, encriptar claves).
- `src/models/`: Consultas SQL directas a PostgreSQL. No usamos ORM pesado, sino consultas optimizadas con `pg`.
- `src/routes/`: Definición de endpoints de la API.
- `src/middlewares/`: Protección de rutas (Auth, Roles).

### 2.2 Frontend (`/egrex-frontend`)
- `src/components/`: Piezas reutilizables de UI (Botones, Modales, Navbar).
- `src/pages/`: Vistas completas (Login, Dashboard, Eventos).
- `src/services/`: Lógica de comunicación con el Backend (Axios).
- `src/context/`: Manejo de estado global (si aplica).

---

## 3. Base de Datos
PostgreSQL se utiliza para la persistencia. Las tablas principales incluyen:
- `users`: Credenciales, roles y estado de cuenta.
- `egresados_profiles`: Información detallada (Laboral, Académica).
- `events`: Datos de eventos y configuración de formularios dinámicos (JSONB).
- `event_registrations`: Tabla pivote para inscripciones y asistencia.

*Nota*: Se utiliza `JSONB` extensivamente para permitir flexibilidad en formularios de eventos y estudios adicionales sin alterar el esquema rígido.

---

## 4. Despliegue (Deployment)

### Requisitos
- Docker & Docker Compose instalados.

### Instrucciones
1. **Configuración**: Asegurar que existen los archivos `.env` en frontend y backend (o configurar variables de entorno en el host).
2. **Ejecución**:
   ```bash
   docker compose up --build -d
   ```
   Esto levantará:
   - Base de datos (Puerto 5432 - interno)
   - Backend (Puerto 8080)
   - Frontend (Puerto 3000 o 80 servido por Nginx según configuración de prod)

### Variables de Entorno Clave
- `DATABASE_URL`: String de conexión a Postgres.
- `JWT_SECRET`: Llave para firmar tokens.
- `REACT_APP_API_URL`: URL del backend visible para el frontend.

---

## 5. Prácticas de Código
- **Validaciones**: Se implementaron validaciones en ambos lados (Cliente/Servidor). Nunca confiar solo en el frontend.
- **Seguridad**:
  - Las contraseñas se hashean con Bcrypt antes de guardar.
  - Los JWT expiran en 24h.
  - Protección contra inyección SQL mediante consultas parametrizadas.
- **Clean Code**: Se eliminaron console.logs de depuración en producción y se limpió código muerto.
