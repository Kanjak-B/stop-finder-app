/**
 * Écran principal de l'application StopFinder
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  Appbar,
  Searchbar,
  FAB,
  Text,
  Snackbar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BusStop, AddStopFormData } from '../types';
import { storageService } from '../services/storageService';
import { generateId } from '../utils';
import { StopCard } from '../components/StopCard';
import { AddStopModal } from '../components/AddStopModal';
import { EmptyState } from '../components/EmptyState';

export const HomeScreen: React.FC = () => {
  const [stops, setStops] = useState<BusStop[]>([]);
  const [filteredStops, setFilteredStops] = useState<BusStop[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Charger les arrêts au démarrage
  useEffect(() => {
    loadStops();
  }, []);

  // Filtrer les arrêts selon la recherche
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = stops.filter(stop =>
        stop.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStops(filtered);
    } else {
      setFilteredStops(stops);
    }
  }, [stops, searchQuery]);

  /**
   * Charge tous les arrêts depuis le stockage local
   */
  const loadStops = async () => {
    try {
      setIsLoading(true);
      const loadedStops = await storageService.getStops();
      setStops(loadedStops);
    } catch (error) {
      console.error('Erreur lors du chargement des arrêts:', error);
      showSnackbar('Erreur lors du chargement des arrêts');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Rafraîchit la liste des arrêts
   */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadStops();
    setIsRefreshing(false);
  };

  /**
   * Ajoute un nouvel arrêt
   */
  const handleAddStop = async (formData: AddStopFormData) => {
    try {
      const newStop: BusStop = {
        id: generateId(),
        name: formData.name.trim(),
        googleMapsUrl: formData.googleMapsUrl.trim(),
        createdAt: new Date(),
      };

      await storageService.saveStop(newStop);
      await loadStops(); // Recharger la liste
      setIsModalVisible(false);
      showSnackbar('Arrêt ajouté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'arrêt:', error);
      showSnackbar('Erreur lors de l\'ajout de l\'arrêt');
    }
  };

  /**
   * Supprime un arrêt avec confirmation
   */
  const handleDeleteStop = useCallback((id: string) => {
    const stop = stops.find(s => s.id === id);
    if (!stop) return;

    Alert.alert(
      'Supprimer l\'arrêt',
      `Êtes-vous sûr de vouloir supprimer "${stop.name}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await storageService.deleteStop(id);
              await loadStops(); // Recharger la liste
              showSnackbar('Arrêt supprimé avec succès !');
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              showSnackbar('Erreur lors de la suppression de l\'arrêt');
            }
          },
        },
      ]
    );
  }, [stops]);

  /**
   * Affiche un message dans la snackbar
   */
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  /**
   * Rend un élément de la liste
   */
  const renderStopItem = ({ item }: { item: BusStop }) => (
    <StopCard stop={item} onDelete={handleDeleteStop} />
  );

  /**
   * Rend l'état vide
   */
  const renderEmptyState = () => (
    <EmptyState onAddStop={() => setIsModalVisible(true)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="StopFinder" titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon="information"
          onPress={() => showSnackbar('StopFinder - Gérez vos arrêts de bus !')}
        />
      </Appbar.Header>

      <View style={styles.content}>
        {stops.length > 0 && (
          <Searchbar
            placeholder="Rechercher un arrêt..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            inputStyle={styles.searchInput}
          />
        )}

        <FlatList
          data={filteredStops}
          renderItem={renderStopItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#2196F3']}
              tintColor="#2196F3"
            />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        {stops.length > 0 && (
          <Text style={styles.counter}>
            {filteredStops.length} arrêt{filteredStops.length > 1 ? 's' : ''} 
            {searchQuery && ` trouvé${filteredStops.length > 1 ? 's' : ''}`}
          </Text>
        )}
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
        label="Ajouter"
      />

      <AddStopModal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        onSubmit={handleAddStop}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#2196F3',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  searchbar: {
    margin: 16,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 100, // Espace pour le FAB
  },
  counter: {
    textAlign: 'center',
    padding: 16,
    fontSize: 14,
    color: '#7F8C8D',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
  snackbar: {
    backgroundColor: '#2C3E50',
  },
});
