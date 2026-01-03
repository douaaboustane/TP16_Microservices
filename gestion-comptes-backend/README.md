# Serveur Backend GraphQL - Gestion des Comptes

Serveur GraphQL pour l'application de gestion des comptes bancaires et transactions.

## Installation

Les dépendances sont déjà installées. Si nécessaire :

```bash
npm install
```

## Démarrage

Pour démarrer le serveur :

```bash
npm start
```

Le serveur sera accessible sur `http://localhost:8080/graphql`

## Configuration

### Port

Par défaut, le serveur écoute sur le port **8080**. Pour changer le port, définissez la variable d'environnement `PORT` :

```bash
PORT=8082 npm start
```

### CORS

Le serveur utilise `startStandaloneServer` qui gère automatiquement les CORS. Par défaut, toutes les origines sont autorisées en développement.

Pour restreindre les origines en production, vous pouvez utiliser Express avec `expressMiddleware` (voir la documentation Apollo Server).

## Structure

- `server.js` : Fichier principal du serveur GraphQL
- Données en mémoire : Les comptes et transactions sont stockés en mémoire (redémarrage = perte des données)

## Endpoints GraphQL

### Queries (Requêtes)

- `allComptes` : Récupère tous les comptes
- `compteById(id: ID!)` : Récupère un compte par son ID
- `totalSolde` : Calcule les statistiques de solde
- `findCompteByType(type: TypeCompte!)` : Trouve les comptes par type
- `compteTransactions(id: ID!)` : Récupère les transactions d'un compte
- `allTransactions` : Récupère toutes les transactions
- `transactionStats` : Calcule les statistiques des transactions

### Mutations

- `saveCompte(compte: CompteRequest!)` : Crée un nouveau compte
- `deleteCompte(id: ID!)` : Supprime un compte
- `addTransaction(transactionRequest: TransactionRequest!)` : Ajoute une transaction

## Test

Pour tester le serveur, ouvrez `http://localhost:8080/graphql` dans votre navigateur et essayez cette requête :

```graphql
query {
  allComptes {
    id
    solde
    type
    dateCreation
  }
}
```

## Notes

- Les données sont stockées en mémoire et seront perdues au redémarrage du serveur
- Pour une utilisation en production, remplacez le stockage en mémoire par une base de données
- Le serveur utilise Apollo Server v5 (version moderne)

