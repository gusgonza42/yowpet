# 📁 Estructura de Servicios en YowPet

## 📂 Organización de Carpetas

```plaintext
src/
└── services/
    ├── api/
    │   ├── clienteAxios.js     # Cliente Axios configurado
    │   └── config.js           # Configuración de API
    ├── auth/
    │   └── authService.js      # Servicios de autenticación
    ├── pets/
    │   └── petService.js       # Servicios de mascotas
    └── user/
        └── userService.js      # Servicios de usuario
```

## 🔧 Configuración de Servicios

### Cliente Axios (`api/clienteAxios.js`)

```javascript
import axios from "axios";
import { API_URL } from "./config";

export const axiosClient = axios.create({
  baseURL: `http://${API_URL}:3000`,
  timeout: 10000,
});
```

### Servicios de Autenticación (`auth/authService.js`)

```javascript
import { axiosClient } from "../api/clienteAxios";

export const authService = {
  login: (credentials) => axiosClient.post("/auth/login", credentials),
  register: (userData) => axiosClient.post("/auth/register", userData),
};
```

## 💡 Uso de los Servicios

### En Componentes

```javascript
import { authService } from "@service/auth/authService";

const LoginScreen = () => {
  const handleLogin = async () => {
    try {
      const response = await authService.login(credentials);
      // Procesar respuesta
    } catch (error) {
     console.warn(error);
    }
  };
};
```

## 🔐 Características Principales

- **Centralización**: Todas las llamadas API en un solo lugar
- **Mantenibilidad**: Fácil de actualizar y modificar
- **Reutilización**: Servicios compartidos entre componentes
- **Seguridad**: Manejo consistente de autenticación

## 📝 Convenciones

1. Nombres en camelCase para servicios
2. Usar async/await para promesas
3. Documentar parámetros y respuestas
4. Manejar errores de forma consistente
5. Utilizar los alias definidos (@service)

## ⚠️ Manejo de Errores

```javascript
try {
  const response = await authService.login(credentials);
  // Manejar éxito
} catch (error) {
  // Manejar error
 console.warn("Error en login:", error.message);
}
```

## 🌐 API y Endpoints

### Auth

- POST `/auth/login` - Iniciar sesión
- POST `/auth/register` - Registrar usuario
- POST `/auth/logout` - Cerrar sesión

### Users

- GET `/users/profile` - Obtener perfil
- PUT `/users/profile` - Actualizar perfil

### Pets

- GET `/pets` - Listar mascotas
- POST `/pets` - Crear mascota
- PUT `/pets/:id` - Actualizar mascota

---

Última actualización: Abril 2025
