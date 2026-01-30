# 🚀 EgreX Backend - Núcleo de Gestión de Egresados 🎓

El **Backend de EgreX** es una API REST robusta y autónoma construida con **Node.js** y **Express**, diseñada para centralizar la lógica de negocio, la seguridad y la persistencia de datos del ecosistema EgreX. Su arquitectura modular permite un escalado eficiente y un mantenimiento simplificado.

---

## 🛠️ Stack Tecnológico

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

---

## ✨ Funcionalidades Estrella

- **🔌 Autonomía Total:** El sistema detecta y crea automáticamente las tablas necesarias al iniciar (Auto-Migrations).
- **🔐 Seguridad de Grado Industrial:** Autenticación basada en JWT, protección de rutas por roles y headers de seguridad con Helmet.
- **📊 Gestión de Datos Maestra:** Control total sobre egresados, perfiles laborales y registro en eventos.
- **📁 Procesamiento de Archivos:** Carga masiva de egresados desde archivos Excel y generación dinámica de PDF.
- **🌉 CORS Configurado:** Preparado para comunicación segura con el frontend en entornos de desarrollo y producción.

---

## 🏗️ Estructura del Proyecto

```text
src/
├── config/         # Configuración de DB, Auth y variables de entorno.
├── controllers/    # Lógica de respuesta para cada ruta.
├── models/         # Definición de esquemas y modelos de datos.
├── routes/         # Definición de los endpoints de la API.
├── services/       # Lógica de negocio reutilizable.
├── utils/          # Utilidades (PDF, Excel, Validaciones).
└── server.js       # Punto de entrada de la aplicación.
```

---

## 🚦 Guía de Inicio Rápido

### Requisitos Previos
- Node.js (v18+)
- PostgreSQL (Local o Docker)

### Instalación Local
1. **Clonar y entrar:**
   ```bash
   cd egrex-backend
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Variables de Entorno:**
   Crea un archivo `.env` siguiendo los parámetros del `docker-compose.yml`:
   ```env
   PORT=8080
   DB_USER=egrex_user
   DB_PASSWORD=egrex_pass
   DB_NAME=egrex_db
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=tu_secreto_super_seguro
   ```
4. **Modo Desarrollo:**
   ```bash
   npm run dev
   ```

---

## 🐳 Despliegue con Docker

Si prefieres usar Docker para levantar todo el ecosistema, dirígete a la carpeta `deploy/` y ejecuta:

```bash
docker compose up --build -d
```

> [!NOTE]
> El backend estará disponible en `http://localhost:8080/api`.

---

## 🤝 Contribuciones

Este proyecto fue desarrollado para la **Institución de Educación Superior FESC (2026)**. Si deseas contribuir, por favor abre un Pull Request o reporta un Issue.

---
⚡ *EgreX Backend - Potencia y fiabilidad en la gestión de egresados.*
