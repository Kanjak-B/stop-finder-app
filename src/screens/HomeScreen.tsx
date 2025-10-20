/**
 * Écran principal de l'application StopFinder - Design moderne avec animations
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  RefreshControl,
  Animated,
  Dimensions,
  Linking,
} from 'react-native';
import {
  Appbar,
  Searchbar,
  FAB,
  Text,
  Snackbar,
  Surface,
  Chip,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { BusStop, AddStopFormData } from '../types';
import { storageService } from '../services/storageService';
import { generateId } from '../utils';
import { StopCard } from '../components/StopCard';
import { AddStopModal } from '../components/AddStopModal';
import { EmptyState } from '../components/EmptyState';

// const { width } = Dimensions.get('window');

// Ligne animée pour la FlatList (stagger + fade)
const StopRow: React.FC<{ item: BusStop; index: number; onDelete: (id: string) => void }> = ({ item, index, onDelete }) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 350, delay: index * 60, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 350, delay: index * 60, useNativeDriver: true }),
    ]).start();
  }, [index]);

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity }}>
      <StopCard stop={item} onDelete={onDelete} />
    </Animated.View>
  );
};

export const HomeScreen: React.FC = () => {
  const [stops, setStops] = useState<BusStop[]>([]);
  const [filteredStops, setFilteredStops] = useState<BusStop[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [infoVisible, setInfoVisible] = useState(false);

  // Animated scroll value and Animated FlatList wrapper
  const scrollY = useRef(new Animated.Value(0)).current;
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as unknown as React.ComponentType<React.ComponentProps<typeof FlatList<BusStop>>>;

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
  const renderStopItem = ({ item, index }: { item: BusStop; index: number }) => (
    <StopRow item={item} index={index} onDelete={handleDeleteStop} />
  );

  /**
   * Rend l'état vide
   */
  const renderEmptyState = () => (
    <EmptyState onAddStop={() => setIsModalVisible(true)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Bandeau dégradé moderne en arrière-plan */}
      <LinearGradient
        colors={["#6366F1", "#A78BFA", "#22D3EE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      />

      <Appbar.Header style={styles.header}>
        <Appbar.Content title="StopFinder" titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon={(props) => (
            <MaterialIcons name="info-outline" size={24} color="#FFFFFF" />
          )}
          onPress={() => setInfoVisible(true)}
          accessibilityLabel="Informations concepteur"
        />
      </Appbar.Header>

      <View style={styles.content}>
        {stops.length > 0 && (
          <Surface elevation={2} style={styles.searchSurface}>
            <Searchbar
              placeholder="Rechercher un arrêt..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
              inputStyle={styles.searchInput}
              iconColor="#6366F1"
            />
            <View style={styles.searchMetaRow}>
              <Chip style={[styles.metaChip, { borderColor: '#6366F1', borderWidth: 1 }]} icon={() => (
                <MaterialIcons name="directions-bus" size={16} color="#6366F1" />
              )}>
                {stops.length} total
              </Chip>
              {searchQuery ? (
                <Chip style={[styles.metaChip, { borderColor: '#0EA5E9', borderWidth: 1 }]} icon={() => (
                  <MaterialIcons name="search" size={16} color="#0EA5E9" />
                )}>
                  {filteredStops.length} résultat{filteredStops.length > 1 ? 's' : ''}
                </Chip>
              ) : null}
            </View>
          </Surface>
        )}

        <AnimatedFlatList
          data={filteredStops}
          renderItem={renderStopItem as any}
          keyExtractor={(item: BusStop) => item.id}
          ListEmptyComponent={renderEmptyState}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
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
        color="#FFFFFF"
      />

      {/* Dialog d'informations concepteur */}
      <Portal>
        <Dialog visible={infoVisible} onDismiss={() => setInfoVisible(false)} style={styles.infoDialog}>
          <Dialog.Title style={styles.infoTitle}>À propos du concepteur</Dialog.Title>
          <Dialog.Content>
            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={20} color="#6366F1" />
              <Text style={styles.infoText}>Kanjak</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={20} color="#6366F1" />
              <Text style={styles.infoLink} onPress={() => Linking.openURL('mailto:kanjak.breniacs@gmail.com')}>
                kanjak.breniacs@gmail.com
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="language" size={20} color="#6366F1" />
              <Text style={styles.infoLink} onPress={() => Linking.openURL('https://kanjak-b.github.io/kanjakitude/') }>
                kanjak-b.github.io/kanjakitude/
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setInfoVisible(false)} textColor="#6366F1">Fermer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
    backgroundColor: '#F1F5F9',
  },
  gradientHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  searchSurface: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  searchbar: {
    backgroundColor: 'transparent',
  },
  searchInput: {
    fontSize: 16,
  },
  searchMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  metaChip: {
    backgroundColor: '#EEF2FF',
    marginRight: 8,
  },
  listContainer: {
    paddingBottom: 100, // Espace pour le FAB
  },
  counter: {
    textAlign: 'center',
    padding: 16,
    fontSize: 14,
    color: '#64748B',
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
    backgroundColor: '#6366F1',
  },
  snackbar: {
    backgroundColor: '#1E293B',
  },
  infoDialog: {
    borderRadius: 16,
  },
  infoTitle: {
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 8,
    color: '#1E293B',
    fontSize: 16,
  },
  infoLink: {
    marginLeft: 8,
    color: '#2563EB',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
