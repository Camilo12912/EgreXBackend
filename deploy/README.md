# 🚀 EgreX - Deployment Hub 🚀

Este repositorio contiene la configuración centralizada para el despliegue del ecosistema **EgreX** utilizando Docker. Está diseñado para ser un proceso de "un solo clic" (clonar y ejecutar).

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- [Docker](https://www.docker.com/get-started) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)

---

## 📂 Contenido del Paquete

| Archivo | Descripción |
| :--- | :--- |
| `docker-compose.yml` | Orquestación de servicios (Frontend, Backend, DB). |
| `.env.example` | Plantilla de configuración de variables de entorno. |
| `cloudbuild.yaml` | (Opcional) Configuración para Google Cloud Build. |

---

## 🚀 Guía de Inicio Rápido

Sigue estos pasos para tener el sistema funcionando en menos de 2 minutos:

### 1. Preparar la Configuración
Copia la plantilla de ambiente y ajusta los valores si es necesario (contraseñas, puertos, etc.).
```bash
cp .env.example .env
```

### 2. Desplegar
Levanta todos los servicios en modo segundo plano (detached mode).
```bash
docker compose up -d
```

### 3. Verificar
Asegúrate de que todos los contenedores estén en estado `running`.
```bash
docker compose ps
```

---

## 🏗️ Arquitectura de Servicios

El sistema se divide en tres capas principales que se comunican automáticamente:

1.  **Frontend**: Interfaz de usuario (React) expuesta en el puerto `80`.
2.  **Backend**: API Express expuesta en el puerto `8080`.
3.  **Database**: PostgreSQL 15, aislada en una red privada de datos.

### 🌐 Redes (Docker Networks)
- **`ingress`**: Conecta el Frontend con el Backend.
- **`data`**: Conecta el Backend con la Base de Datos (Seguridad total).

---

## 📝 Comandos Útiles

| Acción | Comando |
| :--- | :--- |
| **Ver Logs** | `docker compose logs -f` |
| **Reiniciar Todo** | `docker compose restart` |
| **Bajar Servicios** | `docker compose down` |
| **Limpiar Volúmenes** | `docker compose down -v` |

---

> [!TIP]
> Si deseas actualizar a la última versión del código, simplemente ejecuta `docker compose pull` antes de `docker compose up -d`.

---
⚡ *EgreX Deployment System - Mantén tu infraestructura simple y eficiente.*
