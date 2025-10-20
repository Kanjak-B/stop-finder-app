/**
 * Point d'entrée principal de l'application StopFinder
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation/AppNavigator';

// Thème personnalisé pour React Native Paper
const theme = {
  colors: {
    primary: '#2196F3',
    primaryContainer: '#E3F2FD',
    secondary: '#03DAC6',
    secondaryContainer: '#A7F3D0',
    tertiary: '#FF6B6B',
    tertiaryContainer: '#FFE0E0',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#F8F9FA',
    error: '#F44336',
    errorContainer: '#FFEBEE',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#1976D2',
    onSecondary: '#000000',
    onSecondaryContainer: '#059669',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#E53E3E',
    onSurface: '#2C3E50',
    onSurfaceVariant: '#7F8C8D',
    onBackground: '#2C3E50',
    onError: '#FFFFFF',
    onErrorContainer: '#C62828',
    outline: '#E0E0E0',
    outlineVariant: '#F0F0F0',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2C3E50',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#90CAF9',
    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#FFFFFF',
      level3: '#FFFFFF',
      level4: '#FFFFFF',
      level5: '#FFFFFF',
    },
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <AppNavigator />
        <StatusBar style="light" backgroundColor="#2196F3" />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
