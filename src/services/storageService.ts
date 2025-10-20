/**
 * Service de stockage local utilisant AsyncStorage
 * Gère la persistance des arrêts de bus hors ligne
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BusStop, StorageService } from '../types';

const STORAGE_KEY = '@stopfinder:stops';

export class LocalStorageService implements StorageService {
  /**
   * Récupère tous les arrêts sauvegardés
   * @returns Promise<BusStop[]> - Liste des arrêts
   */
  async getStops(): Promise<BusStop[]> {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const stops = JSON.parse(storedData);
        // Convertir les dates string en objets Date
        return stops.map((stop: any) => ({
          ...stop,
          createdAt: new Date(stop.createdAt)
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des arrêts:', error);
      return [];
    }
  }

  /**
   * Sauvegarde un nouvel arrêt
   * @param stop - L'arrêt à sauvegarder
   */
  async saveStop(stop: BusStop): Promise<void> {
    try {
      const existingStops = await this.getStops();
      const updatedStops = [...existingStops, stop];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStops));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'arrêt:', error);
      throw error;
    }
  }

  /**
   * Supprime un arrêt par son ID
   * @param id - L'ID de l'arrêt à supprimer
   */
  async deleteStop(id: string): Promise<void> {
    try {
      const existingStops = await this.getStops();
      const filteredStops = existingStops.filter(stop => stop.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredStops));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'arrêt:', error);
      throw error;
    }
  }

  /**
   * Supprime tous les arrêts (fonction utilitaire)
   */
  async clearAllStops(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erreur lors de la suppression de tous les arrêts:', error);
      throw error;
    }
  }
}

// Instance singleton du service de stockage
export const storageService = new LocalStorageService();
