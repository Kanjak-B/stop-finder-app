/**
 * Composant EmptyState - Affichage quand aucun arrêt n'est enregistré
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  onAddStop: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddStop }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="directions-bus" size={80} color="#BDBDBD" />
      <Text style={styles.title}>Aucun arrêt enregistré</Text>
      <Text style={styles.subtitle}>
        Commencez par ajouter votre premier arrêt de bus pour le retrouver facilement !
      </Text>
      <Button
        mode="contained"
        onPress={onAddStop}
        style={styles.button}
        buttonColor="#2196F3"
        icon="plus"
      >
        Ajouter un arrêt
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    paddingHorizontal: 24,
  },
});
