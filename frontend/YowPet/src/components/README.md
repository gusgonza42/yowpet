# 📁 Estructura de Componentes en YowPet

## 📂 Organización de Carpetas

```plaintext
src/
└── components/
    ├── auth/
    │   └── LoginForm/
    │       ├── LoginForm.jsx    # Formulario principal
    │       ├── LoginHeader.jsx  # Cabecera del login
    │       ├── LoginFooter.jsx  # Pie del login
    │       └── styles.js        # Estilos del módulo
    ├── global/
    │   └── ScreenContainer/
    │       ├── ScreenContainer.jsx
    │       └── styles.js
    ├── profile/
    │   └── ProfileCard/
    │       ├── ProfileCard.jsx
    │       └── styles.js
    └── pets/
        └── PetCard/
            ├── PetCard.jsx
            └── styles.js
```

## 💡 Convenciones de Componentes

1. **Estructura de Carpetas**
   - Un componente por carpeta
   - Nombre de carpeta en PascalCase
   - Archivos relacionados juntos

2. **Nombres de Archivos**
   - Componente principal: `NombreComponente.jsx`
   - Estilos: `styles.js`
   - Sub-componentes: `NombreComponente[Parte].jsx`

3. **Estilos**
   - Usar StyleSheet.create()
   - Exportar styles como constante
   - Mantener estilos junto al componente

## 📝 Ejemplo de Uso

### Componente Principal

```javascript
// LoginForm.jsx
import { View } from "react-native";
import { styles } from "./styles";
import { LoginHeader } from "./LoginHeader";

export function LoginForm() {
  return (
    <View style={styles.container}>
      <LoginHeader />
      {/* ...resto del componente */}
    </View>
  );
}
```

### Estilos

```javascript
// styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
```

## 🔧 Características

- **Modularidad**: Cada componente es independiente
- **Reutilización**: Componentes compartidos en global
- **Mantenibilidad**: Estructura clara y consistente
- **Escalabilidad**: Fácil de añadir nuevos componentes

## 📚 Tipos de Componentes

### Globales

- Componentes reutilizables en toda la app
- Ubicados en la carpeta `global`
- Ejemplo: ScreenContainer, Buttons, Inputs

### Específicos

- Componentes para características específicas
- Organizados por funcionalidad
- Ejemplo: LoginForm, PetCard, ProfileView

## ⚡ Buenas Prácticas

1. Mantener componentes pequeños y enfocados
2. Usar Props Types o TypeScript
3. Documentar props y funcionalidad
4. Seguir principio de responsabilidad única
5. Mantener consistencia en estilos

## 🎯 Ejemplo de Estructura Completa

```javascript
// Estructura recomendada para componentes
import { View } from "react-native";
import { styles } from "./styles";
import PropTypes from "prop-types";

export function ComponentName({ prop1, prop2 }) {
  return (
    <View style={styles.container}>
      {/* Contenido del componente */}
    </View>
  );
}

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func,
};
```

---
Última actualización: Abril 2025
