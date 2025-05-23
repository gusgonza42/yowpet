# 📁 Gestión de Assets en YowPet

## 📂 Estructura Recomendada

```plaintext
assets/
├── images/
│   ├── brand/           # Logos e imágenes de marca
│   ├── icons/           # Iconos de la aplicación
│   └── backgrounds/     # Fondos y patrones
├── fonts/              # Tipografías personalizadas
├── animations/         # Archivos Lottie
└── README.md          # Esta documentación
```

## 🖼️ Uso de Imágenes

### Importación

```javascript
// Importación estática
import logo from '@assets/images/brand/logo.png';

// Importación dinámica
const icon = require('@assets/images/icons/pet.png');
```

### Nombrado de Archivos

- Usar minúsculas
- Separar palabras con guiones
- Incluir dimensiones si es necesario

```plaintext
✅ Correcto:
- logo-primary.png
- icon-pet-24.png
- bg-pattern-light.png

❌ Incorrecto:
- Logo.png
- iconPet.png
- BACKGROUND.png
```

## 🎨 Optimización de Imágenes

1. **Formato**
   - `.png` para iconos y logos
   - `.jpg` para fotos
   - `.svg` para gráficos vectoriales
   - `.webp` para mejor rendimiento

2. **Tamaños Recomendados**
   - Iconos: 24px, 36px, 48px
   - Logos: 120px, 240px
   - Backgrounds: 1080px máximo

3. **Densidad de Píxeles**

   ```plaintext
   imagen.png     // 1x
   imagen@2x.png  // 2x
   imagen@3x.png  // 3x
   ```

## 🔤 Fuentes

1. **Ubicación**

   ```plaintext
   fonts/
   ├── Roboto-Regular.ttf
   ├── Roboto-Bold.ttf
   └── Roboto-Italic.ttf
   ```

2. **Registro**

   ```javascript
   // En app/_layout.jsx
   const [fontsLoaded] = useFonts({
     'Roboto-Regular': require('@assets/fonts/Roboto-Regular.ttf'),
   });
   ```

## 🎬 Animaciones

1. **Formato**
   - Usar archivos Lottie (.json)
   - Optimizar para móvil
   - Mantener tamaño reducido

2. **Organización**

   ```plaintext
   animations/
   ├── loading.json
   ├── success.json
   └── error.json
   ```

## ⚡ Buenas Prácticas

1. **Organización**
   - Mantener estructura clara
   - Agrupar por tipo y uso
   - Documentar assets importantes

2. **Optimización**
   - Comprimir imágenes
   - Usar formatos adecuados
   - Considerar el rendimiento

3. **Versionado**
   - Incluir en control de versiones
   - Ignorar archivos de trabajo
   - Mantener backup

4. **Nombres**
   - Descriptivos y concisos
   - Usar guiones para separar
   - Incluir variantes al final

## 🚫 A Evitar

- Archivos sin usar
- Nombres genéricos
- Imágenes sin optimizar
- Duplicados
- Rutas absolutas

## 📝 Ejemplo de Uso

```javascript
// Componente con assets
import { Image } from 'react-native';
import logo from '@assets/images/brand/logo.png';
import LottieView from 'lottie-react-native';

export function BrandHeader() {
  return (
    <>
      <Image 
        source={logo}
        style={{ width: 120, height: 120 }}
      />
      <LottieView
        source={require('@assets/animations/loading.json')}
        autoPlay
      />
    </>
  );
}
```

---
Última actualización: Abril 2025
