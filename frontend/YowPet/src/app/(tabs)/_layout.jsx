import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: YowPetTheme.brand.primary,
        tabBarInactiveTintColor: YowPetTheme.brand.white,
        tabBarStyle: Platform.select({
          ios: {
            height: 78,
            paddingBottom: 30,
            paddingTop: 10,
            backgroundColor: YowPetTheme.brand.primary,
            position: 'absolute',
            bottom: 20,
            margin: 10,
            left: 20,
            right: 20,
            borderRadius: 55,
            shadowColor: YowPetTheme.shadow.mediumShadow,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
          },
          android: {
            height: 60,
            paddingBottom: 4,
            paddingTop: 4,
            backgroundColor: '#0E303C',
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            borderRadius: 15,
            elevation: 8,
          },
        }),
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Servicios',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="medical-bag"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'PetMap',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: 'Calendario',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
