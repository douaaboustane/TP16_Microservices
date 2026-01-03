import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Configuration de l'URL de l'API GraphQL
// Modifiez cette URL selon votre configuration backend
// Exemples :
// - http://localhost:8080/graphql (port par défaut)
// - http://localhost:8082/api/graphql (si votre API est sur le port 8082)
const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:8080/graphql';

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export { client };

