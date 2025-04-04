# 🔐 **YowPet JWT Security**

Módulo de Seguridad basado en JWT para el proyecto YowPet utilizando **Spring Boot**.

## 📌 **Descripción**

Este módulo implementa un sistema de autenticación y autorización basado en **JSON Web Tokens (JWT)** utilizando **Spring Boot** para el proyecto YowPet.  
Los usuarios pueden registrarse, iniciar sesión y acceder a endpoints protegidos mediante tokens JWT, garantizando la seguridad en toda la aplicación YowPet.

---

## 📋 **Requisitos**

✅ **Java 17**  
✅ **Maven**

---

## ⚙️ **Configuración**

1️⃣ **Clona el repositorio de YowPet:**

```shell
git clone https://github.com/gusgonza42/yowpet.git
```

2️⃣ **Configura las propiedades de seguridad en** `security/jwt-security/src/main/resources/application.properties`:

```ini
# 🌐 Configuración del servidor
server.port=8081

# 🔑 Propiedades para JWT
jwt.secret="CreateYourOwnSecretKey"
jwt.expiration=3600000
jwt.refreshThreshold=600000

# 🐬 Configuración de MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/yowpet_db
spring.datasource.username=admin
spring.datasource.password=MainTester

# ⚙️ Configuración de perfiles
spring.profiles.active=dev
```

3️⃣ **Compila y ejecuta el módulo de seguridad:**

```sh
cd security/jwt-security
mvn clean install
mvn spring-boot:run
```

---

## 🚀 **Endpoints de Autenticación**

### 🔍 **Verificación del Servicio**

Verifica si el servicio de autenticación está funcionando correctamente.

🔹 **Endpoint**: `/auth/hello`  
🔹 **Método**: `GET`  
🔹 **Respuesta**: Un mensaje confirmando que el servicio está activo.

---

### 📝 **Registro de Usuario**

Registra un nuevo usuario en YowPet.

🔹 **Endpoint**: `/auth/register`  
🔹 **Método**: `POST`  
🔹 **Cuerpo de la solicitud**:

```json
{
  "username": "cloud",
  "email": "cloud@example.com",
  "password": "password123"
}
```

🔹 **Respuesta**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🔑 **Inicio de Sesión**

Inicia sesión en YowPet con credenciales existentes para obtener un token JWT.

🔹 **Endpoint**: `/auth/login`  
🔹 **Método**: `POST`  
🔹 **Cuerpo de la solicitud**:

```json
{
  "username": "cloud",
  "password": "password123"
}
```

> [!TIP]  
> 🔑 **Login flexible:** Puedes iniciar sesión tanto con tu `username` como con tu `email`.

```json
{
  "email": "cloud@example.com",
  "password": "password123"
}
```

> [!IMPORTANT]  
> 📧 **Formato de correo válido:** El correo electrónico debe contener al menos una letra, un `@`, otra letra, un `.` y al menos dos letras después del punto.  
> ✅ **Ejemplo válido:** `usuario@dominio.com`  
> ❌ **Ejemplo inválido:** `usuario@dominio,com` (usa `,` en lugar de `.`)

🔹 **Respuesta**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🔍 **Validación de Token**

Verifica si un token JWT es válido.

🔹 **Endpoint**: `/auth/validation`  
🔹 **Método**: `POST`  
🔹 **Cuerpo de la solicitud**: El token JWT como texto plano
🔹 **Respuesta**: `true` si el token es válido, `false` en caso contrario

---

### 🔐 **Acceso a Endpoints Protegidos**

Para acceder a endpoints protegidos de YowPet, envía el token JWT en el encabezado `Authorization`.

🔹 **Ejemplo de encabezado**:

```http
Authorization: Bearer <tu_token_jwt>
```

---

## 🚀 **Integración con YowPet**

Este módulo de seguridad está diseñado específicamente para integrarse con el proyecto YowPet:

1️⃣ **Ya está configurado como parte del proyecto principal** en la carpeta `/security/jwt-security`

2️⃣ **Para usarlo desde otros módulos de YowPet**:

- Configura las llamadas a los endpoints de autenticación desde el frontend o otros servicios
- Almacena el token JWT y envíalo en el encabezado de Authorization para las peticiones a endpoints protegidos

3️⃣ **Para proteger nuevos endpoints en YowPet**:

- Implementa el filtro JWT en los nuevos controladores
- Configura las reglas de autorización según los roles requeridos

---

## 📦 **Dependencias**

📌 **Spring Boot Starter Web**  
📌 **Spring Boot Starter Security**  
📌 **Java JWT de Auth0**  
📌 **JJWT**  
📌 **Spring Boot Starter Validation**  
📌 **Lombok**  
📌 **Spring Boot Starter Data JPA**  
📌 **MySQL Connector**  
📌 **Spring Boot Actuator**  
📌 **Spring Boot Starter Test**
