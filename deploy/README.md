# Despliegue de Producción - EgreX

Esta carpeta contiene los archivos necesarios para lanzar el proyecto en producción utilizando Docker.

## Archivos incluidos
- `docker-compose.yml`: Configuración principal de Docker Compose con salud de servicios (healthchecks) y redes aisladas.
- `.env.example`: Plantilla para las variables de entorno necesarias.

## Instrucciones de uso

1.  **Preparar variables de entorno**:
    Copia el archivo `.env.example` a un nuevo archivo llamado `.env` y configura los valores reales (claves, contraseñas, etc.).
    ```bash
    cp .env.example .env
    ```

2.  **Lanzar el proyecto**:
    Ejecuta el siguiente comando para construir y levantar todos los servicios en segundo plano:
    ```bash
    docker compose up -d
    ```

3.  **Verificar estado**:
    ```bash
    docker compose ps
    ```

## Estructura de Redes
- `ingress`: Utilizada por el frontend y el backend para comunicarse con el mundo exterior.
- `data`: Red interna y privada para la comunicación entre el backend y la base de datos (PostgreSQL).
