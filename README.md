# APP NAME : 🚌 StopFinder
# APP DEV : Kanjak
# EMAIL : kanjak.breniacs@gmail.com
# SITE : kanjak-b.github.io/kanjakitude
# LICENCE MIT

Une application mobile React Native élégante pour gérer vos arrêts de bus favoris. StopFinder vous permet d'enregistrer, organiser et accéder rapidement à vos arrêts de bus avec des liens Google Maps, le tout fonctionnant hors ligne.

## ✨ Fonctionnalités

- **📱 Interface moderne** : Design élégant et fluide avec React Native Paper
- **🔍 Recherche intelligente** : Trouvez rapidement vos arrêts par nom
- **🗺️ Intégration Google Maps** : Ouvrez directement vos arrêts dans Google Maps
- **💾 Stockage hors ligne** : Toutes vos données sont sauvegardées localement avec AsyncStorage
- **➕ Ajout facile** : Interface intuitive pour ajouter de nouveaux arrêts
- **🗑️ Suppression sécurisée** : Supprimez vos arrêts avec confirmation
- **🔄 Synchronisation** : Rafraîchissement pull-to-refresh
- **📱 Responsive** : Optimisé pour tous les écrans mobiles

## 🚀 Installation et lancement

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app sur votre téléphone (iOS/Android)

### Installation

1. **Cloner le projet**
   ```bash
   git clone <votre-repo>
   cd StopFinder
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Lancer l'application**
   ```bash
   npm start
   # ou
   yarn start
   ```

4. **Tester sur votre téléphone**
   - Ouvrez Expo Go sur votre téléphone
   - Scannez le QR code affiché dans le terminal
   - L'application se lance automatiquement !

## 📱 Utilisation

### Ajouter un arrêt

1. Appuyez sur le bouton **"+"** en bas à droite
2. Remplissez le **nom de l'arrêt** (ex: "Gare Centrale")
3. Collez le **lien Google Maps** de l'arrêt
4. Appuyez sur **"Enregistrer"**

### Rechercher un arrêt

- Utilisez la barre de recherche en haut pour filtrer vos arrêts par nom
- La recherche est instantanée et insensible à la casse

### Ouvrir dans Google Maps

- Appuyez sur l'icône **🗺️** à côté de l'arrêt
- Google Maps s'ouvre automatiquement avec l'emplacement

### Supprimer un arrêt

- Appuyez sur l'icône **🗑️** à côté de l'arrêt
- Confirmez la suppression dans la boîte de dialogue

## 🏗️ Architecture technique

### Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── StopCard.tsx    # Carte d'affichage d'un arrêt
│   ├── AddStopModal.tsx # Modal d'ajout d'arrêt
│   └── EmptyState.tsx  # État vide
├── screens/            # Écrans de l'application
│   └── HomeScreen.tsx  # Écran principal
├── services/           # Services métier
│   └── storageService.ts # Gestion AsyncStorage
├── navigation/         # Configuration navigation
│   └── AppNavigator.tsx
├── types/              # Types TypeScript
│   └── index.ts
└── utils/              # Utilitaires
    └── index.ts
```

### Technologies utilisées

- **React Native** : Framework mobile cross-platform
- **Expo** : Plateforme de développement React Native
- **TypeScript** : Typage statique pour plus de robustesse
- **React Native Paper** : Bibliothèque de composants Material Design
- **React Navigation** : Navigation entre écrans
- **AsyncStorage** : Stockage local persistant
- **Expo Linking** : Ouverture d'URLs externes

### Fonctionnalités techniques

- **Stockage persistant** : AsyncStorage pour la sauvegarde hors ligne
- **Validation de formulaires** : Validation côté client avec messages d'erreur
- **Gestion d'état** : useState et useEffect pour la gestion locale
- **Navigation** : Stack Navigator pour la navigation simple
- **Thème personnalisé** : Palette de couleurs cohérente
- **Responsive Design** : Adaptation automatique aux différentes tailles d'écran

## 🎨 Design

### Palette de couleurs

- **Primaire** : Bleu (#2196F3) - Boutons et éléments principaux
- **Fond** : Gris clair (#F8F9FA) - Arrière-plan principal
- **Surface** : Blanc (#FFFFFF) - Cartes et éléments de contenu
- **Texte** : Gris foncé (#2C3E50) - Texte principal
- **Texte secondaire** : Gris moyen (#7F8C8D) - Texte secondaire
- **Erreur** : Rouge (#F44336) - Messages d'erreur
- **Succès** : Vert (#4CAF50) - Messages de succès

### Composants UI

- **Cards** : Affichage des arrêts avec ombres subtiles
- **FAB** : Bouton d'action flottant pour l'ajout
- **Searchbar** : Barre de recherche avec icône
- **Modal** : Fenêtre modale pour l'ajout d'arrêts
- **Snackbar** : Notifications temporaires
- **Chips** : Badges pour les dates

## 🔧 Configuration

### Variables d'environnement

Aucune configuration supplémentaire n'est nécessaire. L'application fonctionne entièrement hors ligne.

### Personnalisation

Pour personnaliser l'application :

1. **Couleurs** : Modifiez le thème dans `App.tsx`
2. **Texte** : Adaptez les libellés dans les composants
3. **Validation** : Ajustez les règles dans `AddStopModal.tsx`
4. **Stockage** : Modifiez la clé de stockage dans `storageService.ts`

## 🐛 Dépannage

### Problèmes courants

1. **L'application ne se lance pas**
   - Vérifiez que toutes les dépendances sont installées
   - Assurez-vous d'avoir la bonne version de Node.js

2. **Les liens Google Maps ne s'ouvrent pas**
   - Vérifiez que l'URL est bien formatée
   - Assurez-vous que Google Maps est installé sur votre téléphone

3. **Les données ne se sauvegardent pas**
   - Vérifiez les permissions de stockage
   - Redémarrez l'application

### Logs et débogage

- Utilisez `console.log` dans le code pour déboguer
- Ouvrez les DevTools Expo pour voir les logs
- Utilisez React Native Debugger pour un débogage avancé

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :

- Ouvrez une issue sur GitHub
- Consultez la documentation Expo
- Rejoignez la communauté React Native

---

**StopFinder** - Parce que chaque arrêt compte ! 🚌✨
