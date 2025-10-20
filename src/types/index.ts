/**
 * Types pour l'application StopFinder
 * Définit la structure des données pour les arrêts de bus
 */

export interface BusStop {
  id: string;
  name: string;
  googleMapsUrl: string;
  createdAt: Date;
}

export interface AddStopFormData {
  name: string;
  googleMapsUrl: string;
}

export interface StorageService {
  getStops(): Promise<BusStop[]>;
  saveStop(stop: BusStop): Promise<void>;
  deleteStop(id: string): Promise<void>;
  clearAllStops(): Promise<void>;
}
