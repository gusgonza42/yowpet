# 📂 Hooks Personalizados para YowPet

Esta carpeta contiene los hooks personalizados utilizados en la aplicación YowPet.

## 🎣 Hooks Principales

### useAuth

- Gestión del estado de autenticación
- Auth/Logout
- Verificación de tokens
- Estado del usuario actual

### useForm

- Manejo de formularios
- Validación de campos
- Gestión de errores de formulario
- Reset de formularios

### useLoading

- Control de estados de carga
- Indicadores de progreso
- Manejo de timeouts

### useError

- Gestión centralizada de errores
- Mensajes de error personalizados
- Log de errores

### useApi

- Llamadas a la API
- Manejo de estados de carga
- Gestión de errores de red
- Cache de respuestas

## 📝 Ejemplo de Uso

```javascript
// Ejemplo de uso de hooks
import { useAuth } from './useAuth';
import { useForm } from './useForm';
import { useLoading } from './useLoading';

function LoginComponent() {
  const { login } = useAuth();
  const { values, handleChange } = useForm({ email: '', password: '' });
  const { loading, startLoading, stopLoading } = useLoading();

  // Uso de los hooks
}
```

## 🔧 Estructura de Archivos

``` plantext
hooks/
├── useAuth.js       # Autenticación y usuario
├── useForm.js       # Gestión de formularios
├── useLoading.js    # Estados de carga
├── useError.js      # Manejo de errores
├── useApi.js        # Llamadas API
└── README.md        # Esta documentación
```

## 💡 Convenciones

1. Nombrar hooks usando camelCase
2. Prefijo "use" obligatorio
3. Exportar como función nombrada
4. Documentar parámetros y retorno
5. Mantener la responsabilidad única

## 🚀 Recomendaciones

- Crear hooks para lógica reutilizable
- Mantener los hooks simples y enfocados
- Documentar casos de uso
- Incluir manejo de errores
- Considerar el rendimiento

---
Última actualización: Abril 2025
