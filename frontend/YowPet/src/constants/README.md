# 📁 Constantes Globales de YowPet

Esta carpeta contiene las constantes globales utilizadas en toda la aplicación.

## 📂 Estructura Actual

```plaintext
constants/
├── Routes.js           # Rutas de navegación
├── ApiRouteLocal.js    # Configuración de API local
└── README.md          # Esta documentación
```

## 🔑 Constantes Disponibles

### Routes.js - Rutas de Navegación

```javascript
import { APP_ROUTES } from './Routes';

// Uso en navegación
router.push(APP_ROUTES.AUTH.LOGIN);
router.replace(APP_ROUTES.TABS.HOME);
```

**Rutas Disponibles:**

- 🔒 Auth
  - LOGIN: `/(auth)/login`
  - REGISTER: `/(auth)/register`
- 📱 Tabs
  - HOME: `/(tabs)`
  - SERVICES: `/(tabs)/services`
  - MAP: `/(tabs)/map`
  - PLANNER: `/(tabs)/planner`
  - PROFILE: `/(tabs)/profile`

### ApiRouteLocal.js - Configuración API Local

```javascript
// Ejemplo: En este archivo cada uno pone su IP local para desarrollo
export const API_URL = '192.168.1.100';  // IP actual en uso

// Otros ejemplos de IP que puedes usar:
// export const API_URL = 'localhost';
// export const API_URL = '127.0.0.1';
// export const API_URL = '10.0.2.2';     // Para Android Emulator
```

> 💡 **Nota**: Simplemente cambia la IP por la que necesites usar en tu entorno de desarrollo.

## 💡 Buenas Prácticas

1. **Nombrado**
   - Usar UPPER_SNAKE_CASE para constantes
   - Nombres descriptivos y en inglés
   - Agrupar constantes relacionadas

2. **Organización**
   - Un archivo por tipo de constante
   - Exportar como constantes nombradas
   - Documentar el propósito de cada constante

3. **Mantenimiento**
   - Mantener actualizada la documentación
   - Revisar periódicamente las rutas
   - Centralizar cambios de configuración

## 📝 Ejemplo de Uso

```javascript
import { APP_ROUTES } from '@constants/Routes';
import { API_URL } from '@constants/ApiRouteLocal';

// Navegación
router.push(APP_ROUTES.AUTH.LOGIN);

// Configuración API
const apiUrl = `http://${API_URL}:3000`;
```

## 🔄 Sugerencias de Nuevas Constantes

- `Theme.js` - Colores y estilos globales
- `Config.js` - Configuración general de la app
- `Endpoints.js` - Rutas de la API
- `ValidationRules.js` - Reglas de validación

---
Última actualización: Abril 2025
