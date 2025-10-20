/**
 * Utilitaires pour l'application StopFinder
 */

import { Linking } from 'react-native';

/**
 * Génère un ID unique pour les arrêts
 * @returns string - ID unique
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Valide une URL Google Maps
 * @param url - URL à valider
 * @returns boolean - True si l'URL est valide
 */
export const isValidGoogleMapsUrl = (url: string): boolean => {
  const googleMapsPattern = /^https:\/\/(www\.)?(maps\.google\.com|goo\.gl\/maps|maps\.app\.goo\.gl)/;
  return googleMapsPattern.test(url);
};

/**
 * Ouvre une URL dans l'application Maps par défaut
 * @param url - URL Google Maps à ouvrir
 */
export const openGoogleMaps = async (url: string): Promise<void> => {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.error('Impossible d\'ouvrir l\'URL:', url);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ouverture de Google Maps:', error);
  }
};

/**
 * Formate une date pour l'affichage
 * @param date - Date à formater
 * @returns string - Date formatée
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
