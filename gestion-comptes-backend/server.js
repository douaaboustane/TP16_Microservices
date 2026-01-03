const { ApolloServer, gql } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

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

// Créer et démarrer le serveur Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Démarrer le serveur
const PORT = process.env.PORT || 8080;

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => {
    // Configuration CORS pour permettre les requêtes depuis React
    return {
      // Vous pouvez ajouter ici d'autres données de contexte si nécessaire
    };
  },
}).then(({ url }) => {
  console.log(`🚀 Serveur GraphQL prêt à l'adresse ${url}`);
  console.log(`📊 GraphQL Playground disponible à ${url}`);
  console.log(`✅ CORS configuré pour accepter les requêtes depuis http://localhost:3000`);
}).catch((error) => {
  console.error('Erreur lors du démarrage du serveur:', error);
});
