import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { YowPetTheme } from '@theme/Colors';

const TabsLayout = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 480;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: YowPetTheme.brand.white,
        tabBarInactiveTintColor: YowPetTheme.brand.accent,
        tabBarStyle: Platform.select({
          ios: {
            height: 78,
            paddingBottom: 30,
            paddingTop: 10,
            backgroundColor: YowPetTheme.brand.primary,
            position: 'absolute',
            bottom: 20,
            marginHorizontal: 20,
            borderRadius: 55,
            shadowColor: YowPetTheme.shadow.mediumShadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            borderTopWidth: 0,
          },
          android: {
            height: 78,
            paddingBottom: 30,
            paddingTop: 10,
            backgroundColor: YowPetTheme.brand.primary,
            position: 'absolute',
            bottom: 20,
            marginHorizontal: 20,
            borderRadius: 55,
            elevation: 0,
            shadowColor: YowPetTheme.shadow.mediumShadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            borderTopWidth: 0,
          },
          web: {
            height: 70,
            backgroundColor: YowPetTheme.brand.primary,
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: [{ translateX: '-50%' }],
            width: '100%',
            maxWidth: 700,
            borderRadius: 55,
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            paddingHorizontal: 20,
            display: 'flex',
            borderTopWidth: 0,
          },
        }),
        tabBarShowLabel: true,
        tabBarButton: Platform.select({
          web: ({ children, onPress, accessibilityState }) => (
            <Pressable
              onPress={onPress}
              style={({ pressed }) => [
                stylesLayout.webTabButton,
                accessibilityState?.selected && stylesLayout.webTabButtonActive,
                pressed && stylesLayout.webTabButtonPressed,
              ]}
              accessibilityRole="tab"
              accessibilityState={accessibilityState}
            >
              <View style={stylesLayout.webTabContent}>
                {React.Children.map(children, child => {
                  if (React.isValidElement(child)) {
                    return child;
                  }
                  if (typeof child === 'string') {
                    return <Text style={stylesLayout.webTabText}>{child}</Text>;
                  }
                  return null;
                })}
              </View>
            </Pressable>
          ),
          default: undefined,
        }),
        tabBarLabelStyle: Platform.select({
          web: {
            fontSize: isSmallScreen ? 0 : 15,
            fontWeight: '600',
            textTransform: 'none',
            color: YowPetTheme.brand.white,
            display: isSmallScreen ? 'none' : 'flex',
          },
          ios: {
            fontSize: 12,
            fontWeight: '600',
            paddingBottom: 0,
            color: YowPetTheme.brand.white,
          },
          android: {
            fontSize: 12,
            fontWeight: '600',
            paddingBottom: 0,
            color: YowPetTheme.brand.white,
          },
        }),
        headerShown: false,
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
          title: 'Planner',
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
};

const stylesLayout = StyleSheet.create({
  container: {
    flex: 1,
  },
  webHeader: {
    marginTop: 70,
  },
  webContent: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  webTabButton: {
    flex: 1,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    margin: 4,
  },
  webTabContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  webTabButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 4,
    transform: [{ scale: 0.95 }],
  },
  webTabButtonPressed: {
    opacity: 0.8,
  },
  webTabText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'none',
    color: YowPetTheme.brand.white,
  },
});
export default TabsLayout;
