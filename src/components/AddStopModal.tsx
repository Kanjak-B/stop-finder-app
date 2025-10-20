/**
 * Composant AddStopModal - Modal pour ajouter un nouvel arrêt
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  Card,
  Title,
  HelperText,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AddStopFormData } from '../types';
import { isValidGoogleMapsUrl } from '../utils';

interface AddStopModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: AddStopFormData) => void;
}

export const AddStopModal: React.FC<AddStopModalProps> = ({
  visible,
  onDismiss,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<AddStopFormData>({
    name: '',
    googleMapsUrl: '',
  });
  const [errors, setErrors] = useState<Partial<AddStopFormData>>({});

  const handleSubmit = () => {
    const newErrors: Partial<AddStopFormData> = {};

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de l\'arrêt est requis';
    }

    // Validation de l'URL Google Maps
    if (!formData.googleMapsUrl.trim()) {
      newErrors.googleMapsUrl = 'Le lien Google Maps est requis';
    } else if (!isValidGoogleMapsUrl(formData.googleMapsUrl)) {
      newErrors.googleMapsUrl = 'Veuillez entrer une URL Google Maps valide';
    }

    setErrors(newErrors);

    // Si pas d'erreurs, soumettre le formulaire
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({ name: '', googleMapsUrl: '' });
    setErrors({});
  };

  const handleDismiss = () => {
    handleReset();
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Card style={styles.card}>
          <LinearGradient
            colors={["#6366F1", "#A78BFA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardHeader}
          >
            <Title style={styles.headerTitle}>Ajouter un arrêt</Title>
          </LinearGradient>
          <Card.Content>
            
            
            <View style={styles.inputContainer}>
              <TextInput
                label="Nom de l'arrêt"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                error={!!errors.name}
                style={styles.input}
                mode="outlined"
                outlineColor="#E0E0E0"
                activeOutlineColor="#2196F3"
              />
              <HelperText type="error" visible={!!errors.name}>
                {errors.name}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Lien Google Maps"
                value={formData.googleMapsUrl}
                onChangeText={(text) => setFormData({ ...formData, googleMapsUrl: text })}
                error={!!errors.googleMapsUrl}
                style={styles.input}
                mode="outlined"
                outlineColor="#E0E0E0"
                activeOutlineColor="#2196F3"
                multiline
                numberOfLines={2}
                placeholder="https://maps.google.com/..."
              />
              <HelperText type="error" visible={!!errors.googleMapsUrl}>
                {errors.googleMapsUrl}
              </HelperText>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={handleDismiss}
                style={styles.button}
                textColor="#757575"
              >
                Annuler
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                buttonColor="#6366F1"
              >
                Enregistrer
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
