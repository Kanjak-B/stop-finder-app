/**
 * Composant StopCard - Affiche un arrêt de bus individuel
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, IconButton, Chip } from 'react-native-paper';
import { BusStop } from '../types';
import { openGoogleMaps, formatDate } from '../utils';

interface StopCardProps {
  stop: BusStop;
  onDelete: (id: string) => void;
}

export const StopCard: React.FC<StopCardProps> = ({ stop, onDelete }) => {
  const handleOpenMaps = () => {
    openGoogleMaps(stop.googleMapsUrl);
  };

  const handleDelete = () => {
    onDelete(stop.id);
  };

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.title}>{stop.name}</Title>
          <Chip icon="calendar" style={styles.dateChip}>
            {formatDate(stop.createdAt)}
          </Chip>
        </View>
        
        <Paragraph style={styles.url} numberOfLines={1}>
          {stop.googleMapsUrl}
        </Paragraph>
      </Card.Content>
      
      <Card.Actions style={styles.actions}>
        <IconButton
          icon="map"
          iconColor="#2196F3"
          size={24}
          onPress={handleOpenMaps}
          style={styles.actionButton}
        />
        <IconButton
          icon="delete"
          iconColor="#F44336"
          size={24}
          onPress={handleDelete}
          style={styles.actionButton}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  dateChip: {
    backgroundColor: '#E3F2FD',
  },
  url: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
  actionButton: {
    margin: 0,
  },
});
