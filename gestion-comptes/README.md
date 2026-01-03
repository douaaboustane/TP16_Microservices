# Gestion des Comptes et Transactions

Application web React permettant de gérer des comptes bancaires et des transactions financières via une API GraphQL en utilisant Apollo Client.

## Fonctionnalités

- **Gestion des comptes bancaires** : création et visualisation des comptes
- **Gestion des transactions** : ajout de transactions (dépôts et retraits) et affichage de l'historique
- **Interface GraphQL** : exécution de requêtes et mutations via Apollo Client
- **Interface utilisateur moderne** : design responsive avec Tailwind CSS

## Prérequis

- Node.js (version 16 ou supérieure)
- npm (Node Package Manager)
- Connexion à une API GraphQL (par défaut configurée pour `http://localhost:8080/graphql`)

## Installation

1. Cloner ou télécharger le projet
2. Installer les dépendances :
```bash
npm install
```

## Configuration

### Configuration de l'API GraphQL

L'URL de l'API GraphQL peut être configurée de deux manières :

#### Option 1 : Variable d'environnement (recommandé)

Créez un fichier `.env` à la racine du projet et ajoutez :
```
REACT_APP_GRAPHQL_URI=http://localhost:8080/graphql
```

Remplacez l'URL par celle de votre serveur GraphQL. Par exemple :
- `http://localhost:8080/graphql` (port par défaut)
- `http://localhost:8082/api/graphql` (si votre API est sur le port 8082)
- `http://localhost:4000/graphql` (autre configuration)

**Important** : Après avoir modifié le fichier `.env`, vous devez redémarrer le serveur de développement (`npm start`).

#### Option 2 : Modification directe du code

Éditez le fichier `src/apollo/client.js` et modifiez la valeur de `GRAPHQL_URI` :
```javascript
const GRAPHQL_URI = 'http://localhost:8080/graphql'; // Modifiez cette URL
```

**Par défaut**, l'application utilise : `http://localhost:8080/graphql`

## Démarrage

### ⚠️ IMPORTANT : Démarrer le serveur backend d'abord

**Avant de lancer l'application React, vous devez démarrer votre serveur backend GraphQL.**

L'application React ne peut pas fonctionner sans le serveur backend. Si vous voyez l'erreur `ERR_CONNECTION_REFUSED`, cela signifie que le serveur backend n'est pas démarré.

### Ordre de démarrage

1. **Démarrer le serveur backend GraphQL** (consultez la documentation de votre projet backend)
2. **Configurer l'URL** (voir section Configuration ci-dessus)
3. **Démarrer l'application React** :

```bash
cd gestion-comptes
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

### Vérifier que le serveur backend est accessible

Avant de lancer l'application React, testez l'URL de votre serveur GraphQL dans le navigateur :
- `http://localhost:8080/graphql` (port par défaut)
- `http://localhost:8082/api/graphql` (si votre serveur est sur le port 8082)

Si vous voyez "This site can't be reached", le serveur backend n'est **pas démarré**.

## Structure du Projet

```
gestion-comptes/
├── src/
│   ├── apollo/
│   │   └── client.js          # Configuration Apollo Client
│   ├── components/
│   │   ├── CompteList.js      # Liste des comptes
│   │   ├── CreateCompte.js    # Formulaire de création de compte
│   │   ├── TransactionForm.js # Formulaire d'ajout de transaction
│   │   └── TransactionList.js # Liste des transactions
│   ├── graphql/
│   │   ├── mutations.js       # Mutations GraphQL
│   │   ├── queries.js         # Requêtes GraphQL
│   │   ├── types.js           # Types et énumérations
│   │   └── interfaces.js      # Interfaces TypeScript
│   ├── App.js                 # Composant principal
│   └── index.js               # Point d'entrée
├── tailwind.config.js         # Configuration Tailwind CSS
└── postcss.config.js          # Configuration PostCSS
```

## Dépendances Principales

- **React** : Bibliothèque UI
- **@apollo/client** : Client GraphQL pour React
- **graphql** : Bibliothèque GraphQL
- **tailwindcss** : Framework CSS utilitaire
- **postcss** & **autoprefixer** : Outils de traitement CSS

## Utilisation

### Créer un compte

1. Remplir le formulaire "Créer un Compte"
2. Entrer le solde initial
3. Sélectionner le type de compte (Courant ou Épargne)
4. Cliquer sur "Créer un compte"

### Ajouter une transaction

1. Remplir le formulaire "Ajouter une Transaction"
2. Sélectionner le type (Dépôt ou Retrait)
3. Entrer le montant
4. Sélectionner le compte concerné
5. Cliquer sur "Ajouter la transaction"

### Visualiser les données

- La liste des comptes affiche tous les comptes créés avec leurs détails
- L'historique des transactions affiche toutes les transactions avec leurs informations

## Notes Importantes

- Assurez-vous que l'API GraphQL est accessible avant de lancer l'application
- Les données sont automatiquement rafraîchies après chaque création ou modification
- L'interface est responsive et s'adapte aux différentes tailles d'écran

## Développement

Pour construire l'application pour la production :

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `build/`.

## Dépannage

### ❌ Erreur : ERR_CONNECTION_REFUSED ou "This site can't be reached"

**Cause** : Le serveur backend GraphQL n'est pas démarré ou n'est pas accessible.

**Solution** :
1. **Démarrez d'abord le serveur backend GraphQL** (consultez la documentation de votre projet backend)
2. Vérifiez que le serveur est accessible en ouvrant son URL dans le navigateur
3. Configurez l'URL correcte dans l'application React (voir section Configuration)
4. Redémarrez l'application React après avoir modifié la configuration

📖 **Consultez les fichiers suivants pour plus d'aide :**
- `DEMARRAGE.md` : Guide de démarrage rapide
- `BACKEND_GUIDE.md` : Guide pour créer un serveur backend GraphQL (si vous n'en avez pas)

### Erreur : "Impossible de se connecter au backend"

Si vous voyez cette erreur dans l'application React :

1. **Vérifiez que le serveur GraphQL est démarré** : Assurez-vous que votre serveur backend GraphQL est en cours d'exécution.

2. **Vérifiez l'URL configurée** : L'erreur affiche l'URL actuellement configurée. Vérifiez qu'elle correspond à l'URL de votre serveur.

3. **Modifiez l'URL si nécessaire** :
   - Créez un fichier `.env` à la racine du projet `gestion-comptes`
   - Ajoutez : `REACT_APP_GRAPHQL_URI=http://votre-url/graphql`
   - Redémarrez le serveur de développement (`npm start`)

4. **Vérifiez les CORS** : Si votre serveur GraphQL est sur un autre port, assurez-vous que les CORS sont correctement configurés côté serveur.

### Les données ne s'affichent pas

- Vérifiez la console du navigateur (F12) pour voir les erreurs détaillées
- Vérifiez que les requêtes GraphQL correspondent au schéma de votre API
- Assurez-vous que l'API retourne les données dans le format attendu

## Auteur

Projet développé dans le cadre d'une activité d'apprentissage React et GraphQL.
