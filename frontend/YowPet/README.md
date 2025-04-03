# 📱 YowPet - Documentación

## 📂 Estructura del Proyecto y Documentación

Cada carpeta principal contiene su propio README con documentación específica:

```plaintext
src/
├── app/                # Sistema de navegación
│   └── README.md       # Documentación de rutas y navegación
├── components/         # Componentes reutilizables
│   └── README.md       # Guía de componentes
├── constants/         # Constantes globales
│   └── README.md      # Configuración y rutas
├── hooks/            # Hooks personalizados
│   └── README.md     # Documentación de hooks
├── services/         # Servicios y API
│   └── README.md     # Configuración de servicios
├── theme/            # Sistema de diseño
│   └── README.md     # Guía de estilos y colores
└── assets/          # Recursos estáticos
    └── README.md     # Gestión de assets
```

## 🔍 Rutas Relativas y Alias

### Configuración de Alias

```javascript
// babel.config.js
module.exports = {
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@hooks': './src/hooks',
        '@services': './src/services',
        '@theme': './src/theme',
        '@constants': './src/constants',
        '@assets': './src/assets'
      }
    }]
  ]
};
```

### Uso de Rutas

```javascript
// ✅ Usar alias (recomendado)
import { ScreenContainer } from '@components/global/ScreenContainer';
import { useAuth } from '@hooks/useAuth';
import { YowPetTheme } from '@theme/Colors';

// ❌ Evitar rutas relativas
import { ScreenContainer } from '../../components/global/ScreenContainer';
```

## 💡 Tips y Recordatorios

1. **Documentación por Carpeta**
   - Cada README explica su propósito específico
   - Incluye ejemplos de uso
   - Mantiene convenciones del área

2. **Imports y Exports**
   - Usar alias definidos
   - Evitar rutas relativas largas
   - Exportar componentes nombrados

3. **Estructura de Archivos**
   - Seguir convenciones de nombrado
   - Agrupar por funcionalidad
   - Mantener jerarquía clara

4. **No Olvides**
   - Tests unitarios
   - PropTypes/TypeScript
   - Documentar cambios
   - Optimizar imágenes

## 🚀 Comenzando

1.**Instalar Dependencias**

```bash
npm install
```

2.**Configurar Entorno**

- Revisar IP en `constants/ApiRouteLocal.js`
- Verificar configuración de babel
- Instalar fuentes necesarias

3.**Comandos Disponibles**

```bash
# Iniciar la aplicación
npm start

# Limpiar caché y reiniciar
npm run clean

# Iniciar en Android
npm run android

# Iniciar en iOS
npm run ios

# Ejecutar tests
npm test
```

4.**Solución de Problemas**

- Si hay problemas de caché: `npm run clean`
- Error de Metro: Reiniciar Metro con `npm start --reset-cache`
- Problemas de build: Limpiar gradlew `cd android && ./gradlew clean

## 📝 Convenciones Generales

1. **Nombrado**
   - Componentes: PascalCase
   - Hooks: useNombreHook
   - Constantes: UPPER_SNAKE_CASE
   - Archivos de estilo: styles.js

2. **Imports**
   - Agrupar por tipo
   - Usar alias
   - Mantener orden consistente

3. **Documentación**
   - Actualizar READMEs
   - Comentar código complejo
   - Incluir ejemplos

---
Última actualización: Abril 2025
