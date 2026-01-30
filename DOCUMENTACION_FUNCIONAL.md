# Documentación Funcional - EgreX

Esta guía explica el funcionamiento de la plataforma **EgreX**, diseñada para la gestión de egresados de la FESC.

## 1. Roles de Usuario
El sistema cuenta con dos roles principales, cada uno con funciones específicas:

### 1.1 Administrador (Admin)
- **Gestión de Egresados**: Puede crear nuevos usuarios egresados, subir listados masivos mediante Excel y eliminar registros.
- **Gestión de Eventos**: Tiene control total para crear, editar y eliminar eventos institucionales.
- **Control de Asistencia**: Puede registrar la asistencia de los participantes a los eventos.
- **Monitoreo**: Acceso a un panel de control (Dashboard) con métricas clave:
  - Usuarios registrados recientemente.
  - Usuarios verificados (que han actualizado su perfil).
  - Actividad reciente en la plataforma.

### 1.2 Egresado (Estudiante Graduado)
- **Perfil Profesional**: Puede y *debe* actualizar su información personal y laboral (empleo actual, salario, estudios adicionales). Mantener este perfil al día es requisito para acceder a beneficios.
- **Certificados**: Descarga de certificados de actualización de datos.
- **Eventos**:
  - Visualizar listado de eventos disponibles.
  - Inscribirse en eventos (solo si su perfil está actualizado).
  - Descargar certificados de asistencia a eventos en los que participó.
- **Seguridad**: Cambio de contraseña y gestión básica de cuenta.

---

## 2. Flujos Principales (Casos de Uso)

### 2.1 Primer Ingreso y Actualización de Perfil
1. El egresado recibe sus credenciales institucionales (o su número de identificación).
2. Al ingresar por primera vez, el sistema puede solicitar cambio de contraseña obligatorio por seguridad.
3. **Restricción**: Si el egresado intenta inscribirse a un evento pero su perfil está incompleto o desactualizado (más de 4 meses), el sistema le bloqueará la acción y lo redirigirá a la sección "Mi Perfil".
4. Una vez completado el formulario de actualización, se levanta la restricción.

### 2.2 Gestión de Eventos (Ciclo de Vida)
1. **Creación**: El Admin crea un evento con fecha, hora, lugar, imagen y formulario de registro personalizado.
   - *Nota*: No se pueden crear eventos en el pasado.
2. **Difusión**: El evento aparece automáticamente en el muro de eventos de todos los egresados.
3. **Inscripción**: Los egresados interesados se inscriben. Si el evento requiere preguntas extra (ej: "¿Talla de camisa?"), las responden en ese momento.
4. **Ejecución**:
   - Durante el evento, el Admin puede marcar la asistencia de los participantes.
   - **Edición Bloqueada**: Por integridad de datos, un evento que ya inició o finalizó *no puede ser editado*.
5. **Cierre**: Al finalizar, los egresados que asistieron (validados por el Admin) pueden descargar su certificado de asistencia desde la plataforma.

### 2.3 Seguridad y Auditoría
- **Login**: Autenticación segura con encriptación.
- **Sesión**: Cierre de sesión automático por inactividad para proteger los datos en equipos compartidos.
- **Cambio de Clave**: Disponible en cualquier momento desde el menú de usuario.

---

## 3. Navegación
La plataforma cuenta con un diseño minimalista "Tier S" (Premium) adaptable a modo Claro y Oscuro:
- **Barra Superior**: Acceso rápido a Eventos, Perfil y configuración de cuenta.
- **Tema Dinámico**: Botón de sol/luna para ajustar la interfaz a la preferencia visual del usuario.
- **Créditos**: Acceso especial (`Ctrl + Alt + C` o click en el logo) para ver al el equipo de desarrollo.
