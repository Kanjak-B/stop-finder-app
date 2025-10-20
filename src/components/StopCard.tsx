/**
 * Composant StopCard - Affiche un arrêt de bus individuel
 */

import React from 'react';
import { StyleSheet, View, Pressable, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
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

  const scale = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 50, bounciness: 6 }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 6 }).start();
  };

  const renderRightActions = () => (
    <View style={styles.swipeActions}>
      <IconButton icon="delete" iconColor="#FFFFFF" size={24} onPress={handleDelete} style={styles.swipeDelete} />
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Card style={styles.card} elevation={3}>
          <Pressable onPress={handleOpenMaps} onPressIn={onPressIn} onPressOut={onPressOut} android_ripple={{ color: '#EEF2FF' }}>
            <Card.Content>
              <View style={styles.header}>
                <Title style={styles.title}>{stop.name}</Title>
              <Chip icon="calendar" style={[styles.dateChip, { borderColor: '#6366F1', borderWidth: 1 }]}>
                  {formatDate(stop.createdAt)}
                </Chip>
              </View>
              <Paragraph style={styles.url} numberOfLines={1}>
                {stop.googleMapsUrl}
              </Paragraph>
            </Card.Content>
          </Pressable>
          <Card.Actions style={styles.actions}>
            <IconButton
              icon="map"
              iconColor="#6366F1"
              size={24}
              onPress={handleOpenMaps}
              style={styles.actionButton}
            />
            <IconButton
              icon="delete"
              iconColor="#EF4444"
              size={24}
              onPress={handleDelete}
              style={styles.actionButton}
            />
          </Card.Actions>
        </Card>
      </Animated.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
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
    fontWeight: '700',
    color: '#1E293B',
  },
  dateChip: {
    backgroundColor: '#EEF2FF',
  },
  url: {
    fontSize: 14,
    color: '#64748B',
    fontStyle: 'italic',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
  actionButton: {
    margin: 0,
  },
  swipeActions: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  swipeDelete: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    marginVertical: 16,
    marginRight: 8,
  },
});
