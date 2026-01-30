# 🚀 EgreX - Centro de Despliegue Docker 🐳

Este directorio contiene la configuración maestra para el despliegue orquestado de todo el ecosistema **EgreX**. Utilizando Docker y Docker Compose, puedes tener el sistema completo funcionando en cuestión de segundos.

---

## 📂 Contenido del Paquete

| Archivo | Descripción |
| :--- | :--- |
| `docker-compose.yml` | Orquestador de servicios (Frontend, Backend, DB). |
| `cloudbuild.yaml` | Configuración para despliegues automatizados en Google Cloud. |
| `.env` | Variables de entorno preconfiguradas para uso inmediato. |

---

## ⚡ Guía de Inicio Ultra Rápido

Sigue estos pasos para desplegar el sistema:

### 1. Levantar Servicios
Ejecuta el siguiente comando para construir e iniciar todos los contenedores en segundo plano:
```bash
docker compose up --build -d
```

### 2. Verificar Estado
Confirma que los tres servicios (db, backend, frontend) estén corriendo correctamente:
```bash
docker compose ps
```

---

## 🏗️ Arquitectura de Cero Configuración

El orquestador configura automáticamente tres capas interconectadas:

1.  **Frontend (React):** Accesible desde tu navegador en el puerto `80`.
2.  **Backend (API Express):** Disponible en el puerto `8080/api`.
3.  **Database (PostgreSQL 15):** Aislada en una red privada para máxima seguridad.

---

## 🛠️ Comandos de Mantenimiento

| Acción | Comando |
| :--- | :--- |
| **Ver Logs Real-time** | `docker compose logs -f` |
| **Reiniciar Servicios** | `docker compose restart` |
| **Detener y Limpiar** | `docker compose down` |
| **Borrar Datos (Cuidado)** | `docker compose down -v` |

---

> [!TIP]
> Para asegurarte de tener siempre la última versión de las imágenes, puedes ejecutar `docker compose pull` antes de iniciar el sistema.

---
⚡ *EgreX Deployment - Infraestructura simple, escalable y eficiente.*
