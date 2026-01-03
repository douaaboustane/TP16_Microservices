# Guide de Démarrage Rapide

## ⚠️ Erreur de Connexion : ERR_CONNECTION_REFUSED

Si vous voyez l'erreur `ERR_CONNECTION_REFUSED` ou "This site can't be reached", cela signifie que **le serveur backend GraphQL n'est pas démarré**.

## 📋 Étapes pour résoudre le problème

### Étape 1 : Démarrer le serveur backend GraphQL

**Vous devez d'abord démarrer votre serveur backend GraphQL** avant de lancer l'application React.

Le serveur doit être accessible sur l'une de ces URLs :
- `http://localhost:8080/graphql` (port par défaut)
- `http://localhost:8082/api/graphql` (si votre serveur est sur le port 8082)
- `http://localhost:8082/api` (si votre endpoint GraphQL est directement sur `/api`)

**Comment démarrer le serveur backend ?**

Si vous n'avez pas encore de serveur backend :
- 📖 **Consultez le fichier `BACKEND_GUIDE.md`** pour créer un serveur GraphQL simple
- Le guide inclut un exemple complet de serveur avec Apollo Server

Si vous avez déjà un serveur backend :
- Consultez la documentation de votre projet backend
- Cherchez un fichier `README.md` dans le projet backend
- Exécutez généralement une commande comme : `npm start`, `mvn spring-boot:run`, `python manage.py runserver`, etc.

### Étape 2 : Configurer l'URL dans l'application React

Une fois que vous savez sur quelle URL votre serveur GraphQL est accessible, configurez l'application React :

#### Option A : Créer un fichier `.env` (Recommandé)

1. Créez un fichier `.env` à la racine du projet `gestion-comptes`
2. Ajoutez l'URL de votre serveur GraphQL :

```env
REACT_APP_GRAPHQL_URI=http://localhost:8082/api/graphql
```

**Exemples selon votre configuration :**
- Si votre serveur est sur le port 8080 : `REACT_APP_GRAPHQL_URI=http://localhost:8080/graphql`
- Si votre serveur est sur le port 8082 avec `/api/graphql` : `REACT_APP_GRAPHQL_URI=http://localhost:8082/api/graphql`
- Si votre serveur est sur le port 8082 avec `/api` : `REACT_APP_GRAPHQL_URI=http://localhost:8082/api`

#### Option B : Modifier directement le code

Éditez le fichier `src/apollo/client.js` et modifiez la ligne 8 :

```javascript
const GRAPHQL_URI = 'http://localhost:8082/api/graphql'; // Modifiez selon votre serveur
```

### Étape 3 : Redémarrer l'application React

Après avoir modifié la configuration, **redémarrez** le serveur de développement React :

```bash
cd gestion-comptes
npm start
```

## ✅ Vérification

Pour vérifier que votre serveur backend est accessible :

1. Ouvrez votre navigateur
2. Accédez à l'URL de votre serveur GraphQL (ex: `http://localhost:8082/api/graphql`)
3. Vous devriez voir soit :
   - Une interface GraphQL (GraphQL Playground, GraphiQL, etc.)
   - Une réponse JSON
   - Une page d'erreur mais **pas** "This site can't be reached"

Si vous voyez toujours "This site can't be reached", le serveur backend n'est **pas démarré**.

## 🔍 Dépannage

### Le serveur backend ne démarre pas

- Vérifiez que toutes les dépendances sont installées
- Vérifiez les logs d'erreur du serveur
- Vérifiez que le port n'est pas déjà utilisé par une autre application

### L'URL est correcte mais ça ne fonctionne pas

- Vérifiez les CORS dans la configuration du serveur backend
- Vérifiez que l'endpoint GraphQL est bien `/graphql` ou `/api/graphql` selon votre configuration
- Vérifiez la console du navigateur (F12) pour voir les erreurs détaillées

### Comment trouver l'URL correcte ?

1. Consultez la documentation de votre projet backend
2. Regardez les fichiers de configuration du serveur (application.properties, .env, config.js, etc.)
3. Vérifiez les logs du serveur au démarrage - ils indiquent généralement l'URL d'écoute

## 📝 Ordre de démarrage recommandé

1. **D'abord** : Démarrer le serveur backend GraphQL
2. **Ensuite** : Démarrer l'application React (`npm start`)
3. **Enfin** : Ouvrir `http://localhost:3000` dans le navigateur

