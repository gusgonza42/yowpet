# 📁 Sistema de Diseño YowPet

Esta carpeta contiene la configuración del tema y sistema de colores de la aplicación.

## 📂 Estructura

```plaintext
theme/
├── Colors.jsx         # Paleta de colores
├── theme.jsx         # Configuración del tema
└── README.md        # Esta documentación
```

## 🎨 Componentes del Tema

### Colors.jsx - Sistema de Colores

Sistema de colores organizado por categorías:

- 🟢 **Brand**

  - `mainGreen`: #4CAF50 (Color principal)
  - `supportBlue`: #2196F3
  - `highlightOrange`: #FF9800

- 🎯 **Background**

  - `mainWhite`: #FFFFFF
  - `lightBlue`: #2196F3
  - `softOrange`: #FF9800
  - `cardBg`, `inputField`, etc.

- 📝 **Text**

  - `mainText`: #212121
  - `subtleText`: #757575
  - `disabledText`: #BDBDBD

- 🚦 **Status**
  - `successState`: #4CAF50
  - `errorState`: #F44336
  - `warningState`: #FFEB3B

### theme.jsx - Configuración Material Design

```javascript
import { YowPetTheme } from "@theme/Colors";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...YowPetTheme,
  },
};
```

## 💡 Uso del Tema

### En Componentes

```javascript
import { YowPetTheme } from "@theme/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: YowPetTheme.background.mainWhite,
  },
  text: {
    color: YowPetTheme.text.mainText,
  },
});
```

### Con Paper Components

```javascript
import { useTheme } from "react-native-paper";

function MyComponent() {
  const theme = useTheme();
  return (
    <Button mode="contained" color={theme.colors.brand.mainGreen}>
      Botón Principal
    </Button>
  );
}
```

## 🎨 Extensión del Sistema de Colores

### Añadir Nuevos Colores

```javascript
export const YowPetTheme = {
  brand: {
    mainGreen: "#4CAF50",
    // Agregar nuevo color de marca
    newBrandColor: "#HEX_CODE",
  },
  background: {
    mainWhite: "#FFFFFF",
    // Agregar nuevo fondo
    newBackground: "#HEX_CODE",
  },
};
```

### Pasos para Agregar Colores

1. **Identificar la Categoría**

   - brand: Colores de marca
   - background: Fondos
   - text: Tipografía
   - status: Estados
   - button: Botones
   - input: Campos de entrada
   - shadow: Sombras

2. **Nombrar el Color**

   - Usar camelCase
   - Nombres descriptivos
   - Evitar números o códigos

   ```javascript
   // ✅ Bueno
   accentPurple: "#9C27B0";

   // ❌ Malo
   color1: "#9C27B0";
   ```

3. **Documentar el Cambio**
   - Actualizar README
   - Comentar el propósito
   - Registrar la fecha

### Ejemplo de Extensión

```javascript
export const YowPetTheme = {
  brand: {
    // Colores existentes
    mainGreen: "#4CAF50",
    supportBlue: "#2196F3",

    // Nuevos colores
    accentPink: "#E91E63",
    secondaryPurple: "#9C27B0",
  },
  status: {
    // Estados existentes
    successState: "#4CAF50",

    // Nuevos estados
    pendingState: "#FFC107",
    inactiveState: "#9E9E9E",
  },
};
```

## 🔍 Validación de Colores

1. **Contraste**

   - Usar herramientas de accesibilidad
   - Verificar legibilidad
   - Probar en diferentes fondos

2. **Consistencia**

   - Mantener la paleta armoniosa
   - Seguir la identidad de marca
   - Evitar colores muy similares

3. **Utilidad**
   - Justificar cada nuevo color
   - Evitar redundancias
   - Considerar casos de uso

## 🔍 Categorías de Colores

1. **Brand** - Identidad visual

   - Colores principales de la marca
   - Elementos destacados
   - Acciones principales

2. **Background** - Fondos

   - Fondos principales y secundarios
   - Fondos de tarjetas
   - Fondos de campos de entrada

3. **Text** - Tipografía

   - Texto principal
   - Texto secundario
   - Enlaces y estados

4. **Status** - Estados

   - Éxito
   - Error
   - Advertencia
   - Información

5. **Button** - Botones

   - CTA principal
   - Acciones secundarias
   - Acciones peligrosas

6. **Shadow & Overlay** - Efectos
   - Sombras suaves/medias/fuertes
   - Superposiciones

## ⚡ Buenas Prácticas

1. **Consistencia**

   - Usar variables del tema
   - Evitar colores hardcodeados
   - Mantener la jerarquía visual

2. **Accesibilidad**

   - Asegurar contraste adecuado
   - Considerar daltonismo
   - Usar estados visuales claros

3. **Mantenimiento**
   - Documentar cambios
   - Usar nombres descriptivos
   - Mantener la paleta actualizada

---

Última actualización: Abril 2025
