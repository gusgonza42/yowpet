# 📁 Estructura de Navegación en YowPet

## 📂 Organización Completa de Carpetas

```plaintext
src/app/
├── index.jsx             # Redirección inicial
├── +not-found.jsx       # Pantalla de error 404
├── (auth)/              # Grupo de autenticación
│   ├── _layout.jsx      # Layout de auth
│   ├── login.jsx        # Pantalla de login
│   └── register.jsx     # Pantalla de registro
├── (tabs)/              # Grupo de tabs principales
│   ├── _layout.jsx      # Layout de tabs
│   ├── index.jsx        # Tab Home
│   ├── services/        # Módulo de servicios
│   │   ├── index.jsx    # Lista de servicios
│   │   └── [id].jsx     # Detalle de servicio
│   ├── map.jsx         # Tab Mapa
│   ├── planner.jsx     # Tab Calendario
│   └── profile.jsx     # Tab Perfil
└── _layout.jsx         # Layout principal
```

## 🔑 Archivos Especiales

### index.jsx - Punto de Entrada

```javascript
// Ejemplo de index.jsx - Redirección inicial
import { Redirect } from "expo-router";
import { APP_ROUTES } from "@constants/Routes";

export default function Index() {
  return <Redirect href={APP_ROUTES.AUTH.LOGIN} />;
}
```

### +not-found.jsx - Manejo de Rutas No Encontradas

```javascript
// Ejemplo de +not-found.jsx
import { ScreenContainer } from "@components/global/ScreenContainer";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function NotFound() {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="headlineMedium">404</Text>
        <Text variant="titleMedium">¡Oops! Página no encontrada</Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={{ marginTop: 16 }}
        >
          Volver
        </Button>
      </View>
    </ScreenContainer>
  );
}
```

## 📱 Layouts y Grupos

### \_layout.jsx Principal

```javascript
// Layout principal que envuelve toda la app
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
```

### (auth)/\_layout.jsx

```javascript
// Layout específico para autenticación
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
```

### (tabs)/\_layout.jsx

```javascript
// Layout de tabs con navegación inferior
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
```

## 🚀 Rutas Dinámicas

### Ejemplo de [id].jsx

Las rutas dinámicas permiten crear páginas que reciben parámetros en la URL. Se implementan usando `[param]` en el nombre del archivo.

```javascript
// Ejemplo de ruta dinámica
import { useLocalSearchParams } from "expo-router";

export default function DynamicRoute() {
  const { id } = useLocalSearchParams();
  return <Text>ID: {id}</Text>;
}
```

### 🔄 Navegación

```javascript
// Navegar a una ruta dinámica
router.push(`/(tabs)/services/${serviceId}`);

// Navegar con múltiples parámetros
router.push({
  pathname: "/(tabs)/services/[id]",
  params: { id: serviceId }
});

### ⚠️ Consideraciones Importantes

1. **Validación**
   - Siempre validar parámetros recibidos
   - Manejar casos de ID inválido
   - Implementar pantalla de error

2. **Estados**
   - Manejar estados de carga
   - Mostrar feedback al usuario
   - Cachear datos cuando sea posible

3. **Navegación**
   - Proporcionar navegación de retorno
   - Mantener historial coherente
   - Usar rutas constantes


## ⚡ Buenas Prácticas

1. **Redirección Inicial**

   - Usar `APP_ROUTES` para rutas constantes
   - Implementar lógica de autenticación
   - Manejar estados de carga

2. **Manejo de Errores**

   - Pantalla 404 personalizada
   - Mensajes de error claros
   - Opciones de navegación útiles

3. **Layouts Consistentes**

   - Usar `Stack` para layouts principales
   - Usar `Tabs` para navegación inferior

4. **Rutas Dinámicas**
   - Implementar rutas con parámetros
   - Validar parámetros antes de usarlos

## 🔄 Flujo de Navegación

1. `index.jsx` → Verifica autenticación
2. Si no está autenticado → `(auth)/login`
3. Si está autenticado → `(tabs)/index`
4. Si ruta no existe → `+not-found`

---

Última actualización: Abril 2025
