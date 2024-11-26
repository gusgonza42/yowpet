# YOWPET

---

## 📖 Descripción del Proyecto

YOWPET es una aplicación diseñada para facilitar el cuidado de las mascotas, combinando tecnología y funcionalidad en un entorno intuitivo. Sus principales características incluyen:

- **Perfiles de mascotas:** Gestión detallada de información de cada mascota.
- **Mapa interactivo:** Ubicación de veterinarios, parques y tiendas de mascotas cercanas.
- **Educación:** Recursos para entrenar y educar a tus mascotas.
- **Cuidador de mascotas:** Conexión con cuidadores cercanos, reservas de servicios y sistema de valoraciones.
- **Sitio web complementario:** Herramientas avanzadas para administración y control.

---

## ⚙️ Tecnologías Usadas

**Backend**:
- **Java**
- **Spring Boot**
- **MySQL**
- **MongoDB**
- **Docker**
- **Swagger**

**Frontend**:
- **React Native**

Para más detalles sobre las dependencias del backend, revisa el archivo `pom.xml`.

---

## 👥 Equipo

Estos son los integrantes del equipo que están construyendo YOWPET:
- [Denys](https://github.com/zondikkk)
- [Gustavo](https://github.com/gusgonza42)
- [Manuel](https://github.com/manogirgis)

---

## 🛠️ Metodología de Trabajo

Para mantener una organización eficiente, utilizamos **Git Flow** como metodología de control de versiones y las siguientes herramientas para la colaboración y gestión del proyecto:

### Git Flow

1. **main**: Contiene la versión estable y lista para producción.
2. **develop**: Ramas de desarrollo activo donde se integran las funcionalidades para pruebas.
3. **Feature branches**: Ramas para el desarrollo de nuevas funcionalidades.
4. **Release branches**: Preparación de versiones estables antes del lanzamiento.
5. **Hotfix branches**: Corrección rápida de errores críticos en producción.

Consulta nuestra [Guía de Creación de Ramas y Draft PR en GitHub](utils/guides/Como_trabajar_con_GitHub_y_Git_V1.pdf) para aprender cómo implementar esta metodología.

### Organización de Tareas

1. **Trello**: Para la planificación inicial y la organización general del proyecto.
2. **GitHub Projects**: Vincula las tareas de Trello con los Pull Requests para un flujo de trabajo más integrado.
3. **Notion**: Para documentar todos los aspectos del proyecto, incluyendo ideas, especificaciones técnicas, y recursos de diseño, proporcionando un espacio centralizado para la colaboración del equipo.

Más detalles en nuestra [Guía para el Uso de Trello](utils/guides/Como_usar_Trello_V1.pdf).

---

## 🔧 Herramientas de Colaboración

- **Trello**: Gestión y planificación de tareas.
- **GitHub Projects**: Seguimiento del desarrollo técnico y gestión de Pull Requests.
- **Documentación**: Centralizada en Notion.

---

## 🚀 Guía para Descargar y Trabajar en el Proyecto

Esta sección explica cómo clonar el repositorio, configurar el entorno local y ejecutar el proyecto tanto para el
backend como el frontend. Asegúrate de seguir estos pasos para que el proyecto se ejecute correctamente en tu entorno.

### Clonar el Repositorio

1. **Clonar desde IntelliJ**:
   - Abre IntelliJ y selecciona **File > New > Project from Version Control (VCS)**.
   - Pega la URL del repositorio y selecciona la carpeta de destino en HTTP o SSH:
     ```bash
     git clone https://github.com/gusgonza42/yowpet.git
     ```
     ```bash
     git@github.com:gusgonza42/yowpet.git
     ```
   - IntelliJ descargará el repositorio y abrirá el proyecto automáticamente.

### Configuración del Backend (Spring Boot y Docker)

1. **Iniciar Docker**:
   - Asegúrate de tener Docker instalado y en ejecución en tu máquina, ya que Docker se utilizará para configurar y
     ejecutar los servicios necesarios para la base de datos.

2. **Ejecutar el Archivo Docker**:
   - En la raíz del repositorio, encontrarás el archivo `docker-compose.yml`.
   - Para construir y ejecutar los contenedores necesarios, abre una terminal en la raíz del proyecto y ejecuta:
     ```bash
     docker-compose up --build
     ```
     Alternativamente, si tienes el plugin de Docker instalado en IntelliJ, puedes hacer clic en **Run** desde el
     archivo `docker-compose.yml`.

3. **Ejecutar el Backend en IntelliJ**:
   - Ejecuta el archivo `CoreApplication` con la opción **Run** de IntelliJ para iniciar la aplicación. El archivo se
     encuentra en:
     ```plaintext
     `backend-yowpet/src/main/java/com/yowpet/backend/BackendYowpetApplication.java`
     ```

4. **Verificar la Ejecución**:
   - Una vez iniciado Spring Boot, verifica que la aplicación esté funcionando correctamente accediendo a:
     ```plaintext
     http://localhost:8080
     ```
   - También puedes acceder a la documentación de la API si se configuró Swagger u OpenAPI en:
     ```plaintext
     http://localhost:8080/swagger-ui.html
     http://localhost:8080/docs/swagger-ui.html
     ```

Con estos pasos, el backend se ejecutará y utilizará Docker para la base de datos MySQL, configurada según el archivo
`application.properties`.

### Configuración del Frontend (React Native)

> [!NOTE]  
> La configuración del frontend con React Native está en proceso de desarrollo. Esta sección se actualizará pronto con instrucciones detalladas para configurar y ejecutar el frontend en el entorno local, incluyendo la posibilidad de adaptarlo para la web.

---