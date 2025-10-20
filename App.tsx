/**
 * Point d'entrée principal de l'application StopFinder
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation/AppNavigator';

// Polices chargées avec useFonts (utilisées dans les composants/Styles)

// Thème moderne et élégant pour React Native Paper (basé sur MD3)
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Palette principale - Bleu moderne avec dégradés
    primary: '#6366F1', // Indigo moderne
    primaryContainer: '#E0E7FF',
    secondary: '#10B981', // Emerald vibrant
    secondaryContainer: '#D1FAE5',
    tertiary: '#F59E0B', // Amber doré
    tertiaryContainer: '#FEF3C7',
    
    // Surfaces avec glassmorphism
    surface: '#FFFFFF',
    surfaceVariant: '#F8FAFC',
    background: '#F1F5F9', // Slate très clair
    
    // États et feedback
    error: '#EF4444', // Red moderne
    errorContainer: '#FEE2E2',
    success: '#10B981',
    warning: '#F59E0B',
    
    // Texte avec hiérarchie claire
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#3730A3',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#047857',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#92400E',
    onSurface: '#1E293B', // Slate foncé
    onSurfaceVariant: '#64748B', // Slate moyen
    onBackground: '#1E293B',
    onError: '#FFFFFF',
    onErrorContainer: '#991B1B',
    
    // Bordures et séparateurs
    outline: '#E2E8F0',
    outlineVariant: '#F1F5F9',
    
    // Ombres et overlays
    shadow: '#000000',
    scrim: 'rgba(0, 0, 0, 0.5)',
    
    // Inversé
    inverseSurface: '#1E293B',
    inverseOnSurface: '#F8FAFC',
    inversePrimary: '#A5B4FC',
    
    // Élévation avec glassmorphism
    elevation: {
      level0: 'transparent',
      level1: 'rgba(255, 255, 255, 0.8)',
      level2: 'rgba(255, 255, 255, 0.9)',
      level3: 'rgba(255, 255, 255, 0.95)',
      level4: 'rgba(255, 255, 255, 0.98)',
      level5: '#FFFFFF',
    },
  },
  fonts: MD3LightTheme.fonts,
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <AppNavigator />
        <StatusBar style="light" backgroundColor="#2196F3" />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
