# 🚀 EgreX - Deployment Hub 🚀

Este repositorio contiene la configuración centralizada para el despliegue del ecosistema **EgreX** utilizando Docker. Está diseñado para ser un proceso de "un solo clic" (clonar y ejecutar).


## 📂 Contenido del Paquete

| Archivo | Descripción |
| :--- | :--- |
| `docker-compose.yml` | Orquestación de servicios (Frontend, Backend, DB). |
| `cloudbuild.yaml` | (Opcional) Configuración para Google Cloud Build. |
| `.env` | Configuración de variables de entorno (ya configurado). |

---

## 🚀 Guía de Inicio Rápido

Sigue estos pasos para tener el sistema funcionando en menos de 1 minuto:

### 1. Desplegar
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
