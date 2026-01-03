# Guide de Démarrage Complet - Application Gestion des Comptes

Ce guide vous explique comment démarrer l'application complète (backend + frontend).

## 📁 Structure du Projet

```
TP16/
├── gestion-comptes/          # Application React (Frontend)
└── gestion-comptes-backend/  # Serveur GraphQL (Backend)
```

## 🚀 Démarrage Rapide

### Étape 1 : Démarrer le serveur backend GraphQL

Ouvrez un **premier terminal** et exécutez :

```bash
cd gestion-comptes-backend
npm start
```

Vous devriez voir :
```
🚀 Serveur GraphQL prêt à l'adresse http://localhost:8080/graphql
📊 GraphQL Playground disponible à http://localhost:8080/graphql
✅ CORS configuré pour http://localhost:3000
```

**✅ Vérification** : Ouvrez `http://localhost:8080/graphql` dans votre navigateur pour vérifier que le serveur fonctionne.

### Étape 2 : Démarrer l'application React

Ouvrez un **deuxième terminal** et exécutez :

```bash
cd gestion-comptes
npm start
```

L'application React sera accessible sur `http://localhost:3000`

## ⚙️ Configuration

### Configuration de l'URL GraphQL dans React

L'application React est déjà configurée pour se connecter à `http://localhost:8080/graphql` par défaut.

Si vous avez modifié le port du serveur backend, créez un fichier `.env` dans `gestion-comptes/` :

```env
REACT_APP_GRAPHQL_URI=http://localhost:8080/graphql
```

Puis redémarrez l'application React.

## 🧪 Test de l'Application

1. **Créer un compte** : Utilisez le formulaire "Créer un Compte" pour ajouter un nouveau compte
2. **Voir les comptes** : La liste des comptes s'affiche automatiquement
3. **Ajouter une transaction** : Sélectionnez un compte et ajoutez une transaction (dépôt ou retrait)
4. **Voir l'historique** : L'historique des transactions s'affiche automatiquement

## 🔧 Dépannage

### Le serveur backend ne démarre pas

- Vérifiez que le port 8080 n'est pas déjà utilisé
- Vérifiez que toutes les dépendances sont installées : `npm install` dans `gestion-comptes-backend`

### L'application React ne se connecte pas au backend

- Vérifiez que le serveur backend est bien démarré
- Vérifiez l'URL dans `gestion-comptes/src/apollo/client.js` ou dans le fichier `.env`
- Vérifiez la console du navigateur (F12) pour voir les erreurs

### Erreur CORS

- Le serveur backend est déjà configuré pour accepter les requêtes depuis `http://localhost:3000`
- Si vous utilisez un autre port pour React, modifiez la configuration CORS dans `gestion-comptes-backend/server.js`

## 📝 Notes

- Les données sont stockées en mémoire dans le backend (perdues au redémarrage)
- Le serveur backend utilise Apollo Server v5 (version moderne)
- L'application React utilise Apollo Client pour communiquer avec le backend

## 🎯 Prochaines Étapes

Pour une utilisation en production :
- Remplacez le stockage en mémoire par une base de données (MongoDB, PostgreSQL, etc.)
- Ajoutez l'authentification
- Ajoutez la validation des données
- Configurez les variables d'environnement pour la production

