# Guide : Créer un Serveur Backend GraphQL

Si vous n'avez pas encore de serveur backend GraphQL, ce guide vous aidera à en créer un simple pour tester l'application React.

## Option 1 : Serveur GraphQL avec Node.js et Apollo Server (Recommandé)

### Étape 1 : Créer le projet backend

Dans un nouveau terminal, créez un nouveau dossier pour le backend :

```bash
cd ..
mkdir gestion-comptes-backend
cd gestion-comptes-backend
npm init -y
```

### Étape 2 : Installer les dépendances

```bash
npm install apollo-server graphql
```

### Étape 3 : Créer le serveur

Créez un fichier `server.js` :

```javascript
const { ApolloServer, gql } = require('apollo-server');

// Données en mémoire (pour la démo)
let comptes = [
  { id: '1', solde: 1000, dateCreation: new Date().toISOString(), type: 'COURANT' },
  { id: '2', solde: 5000, dateCreation: new Date().toISOString(), type: 'EPARGNE' }
];

let transactions = [];
let nextCompteId = 3;
let nextTransactionId = 1;

// Définition du schéma GraphQL
const typeDefs = gql`
  enum TypeCompte {
    COURANT
    EPARGNE
  }

  enum TypeTransaction {
    DEPOT
    RETRAIT
  }

  type Compte {
    id: ID!
    solde: Float!
    dateCreation: String!
    type: TypeCompte!
  }

  type Transaction {
    id: ID!
    type: TypeTransaction!
    montant: Float!
    date: String!
    compte: Compte!
  }

  type SoldeStats {
    count: Int!
    sum: Float!
    average: Float!
  }

  type TransactionStats {
    count: Int!
    sumDepots: Float!
    sumRetraits: Float!
  }

  input CompteRequest {
    solde: Float!
    type: TypeCompte!
  }

  input TransactionRequest {
    type: TypeTransaction!
    montant: Float!
    compteId: ID!
  }

  type Query {
    allComptes: [Compte!]!
    compteById(id: ID!): Compte
    totalSolde: SoldeStats!
    findCompteByType(type: TypeCompte!): [Compte!]!
    compteTransactions(id: ID!): [Transaction!]!
    allTransactions: [Transaction!]!
    transactionStats: TransactionStats!
  }

  type Mutation {
    saveCompte(compte: CompteRequest!): Compte!
    deleteCompte(id: ID!): Boolean!
    addTransaction(transactionRequest: TransactionRequest!): Transaction!
  }
`;

// Résolveurs
const resolvers = {
  Query: {
    allComptes: () => comptes,
    compteById: (_, { id }) => comptes.find(c => c.id === id),
    totalSolde: () => {
      const sum = comptes.reduce((acc, c) => acc + c.solde, 0);
      return {
        count: comptes.length,
        sum,
        average: comptes.length > 0 ? sum / comptes.length : 0
      };
    },
    findCompteByType: (_, { type }) => comptes.filter(c => c.type === type),
    compteTransactions: (_, { id }) => transactions.filter(t => t.compte.id === id),
    allTransactions: () => transactions,
    transactionStats: () => {
      const depots = transactions.filter(t => t.type === 'DEPOT');
      const retraits = transactions.filter(t => t.type === 'RETRAIT');
      return {
        count: transactions.length,
        sumDepots: depots.reduce((acc, t) => acc + t.montant, 0),
        sumRetraits: retraits.reduce((acc, t) => acc + t.montant, 0)
      };
    }
  },
  Mutation: {
    saveCompte: (_, { compte }) => {
      const newCompte = {
        id: String(nextCompteId++),
        solde: compte.solde,
        dateCreation: new Date().toISOString(),
        type: compte.type
      };
      comptes.push(newCompte);
      return newCompte;
    },
    deleteCompte: (_, { id }) => {
      const index = comptes.findIndex(c => c.id === id);
      if (index !== -1) {
        comptes.splice(index, 1);
        return true;
      }
      return false;
    },
    addTransaction: (_, { transactionRequest }) => {
      const compte = comptes.find(c => c.id === transactionRequest.compteId);
      if (!compte) {
        throw new Error('Compte non trouvé');
      }

      // Mettre à jour le solde
      if (transactionRequest.type === 'DEPOT') {
        compte.solde += transactionRequest.montant;
      } else {
        if (compte.solde < transactionRequest.montant) {
          throw new Error('Solde insuffisant');
        }
        compte.solde -= transactionRequest.montant;
      }

      const newTransaction = {
        id: String(nextTransactionId++),
        type: transactionRequest.type,
        montant: transactionRequest.montant,
        date: new Date().toISOString(),
        compte: { ...compte }
      };
      transactions.push(newTransaction);
      return newTransaction;
    }
  }
};

// Créer le serveur Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});

// Démarrer le serveur
server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`🚀 Serveur GraphQL prêt à l'adresse ${url}`);
  console.log(`📊 GraphQL Playground disponible à ${url}graphql`);
});
```

### Étape 4 : Démarrer le serveur

```bash
node server.js
```

Le serveur sera accessible sur `http://localhost:8080/graphql`

### Étape 5 : Configurer l'application React

Dans le projet React, créez un fichier `.env` :

```env
REACT_APP_GRAPHQL_URI=http://localhost:8080/graphql
```

Puis redémarrez l'application React.

## Option 2 : Utiliser un serveur backend existant

Si vous avez déjà un serveur backend (Spring Boot, Express, etc.), assurez-vous qu'il :

1. **Expose un endpoint GraphQL** sur un port accessible
2. **Configure les CORS** pour autoriser les requêtes depuis `http://localhost:3000`
3. **Implémente le schéma GraphQL** correspondant aux requêtes définies dans `src/graphql/queries.js` et `src/graphql/mutations.js`

### Configuration CORS (exemple pour Express.js)

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Configuration CORS (exemple pour Spring Boot)

```java
@CrossOrigin(origins = "http://localhost:3000")
```

## Vérification

Pour vérifier que votre serveur fonctionne :

1. Ouvrez `http://localhost:8080/graphql` (ou l'URL de votre serveur) dans le navigateur
2. Vous devriez voir une interface GraphQL (GraphQL Playground, GraphiQL, etc.)
3. Testez une requête simple :

```graphql
query {
  allComptes {
    id
    solde
    type
  }
}
```

## Problèmes courants

### Le serveur ne démarre pas

- Vérifiez que le port n'est pas déjà utilisé
- Vérifiez les logs d'erreur
- Assurez-vous que toutes les dépendances sont installées

### Erreur CORS

- Configurez les CORS pour autoriser `http://localhost:3000`
- Vérifiez que les headers sont correctement configurés

### Les requêtes ne fonctionnent pas

- Vérifiez que le schéma GraphQL correspond aux requêtes de l'application React
- Testez les requêtes dans GraphQL Playground/GraphiQL
- Vérifiez la console du navigateur pour les erreurs détaillées

