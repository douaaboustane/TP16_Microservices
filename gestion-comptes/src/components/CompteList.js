import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_COMPTES } from "../graphql/queries";

// Récupérer l'URL configurée depuis les variables d'environnement ou utiliser la valeur par défaut
const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:8080/graphql';

const CompteList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);
  
  if (loading) return <p className="text-center py-4">Chargement...</p>;
  if (error) {
    const errorMessage = error.message || 'Erreur inconnue';
    const isNetworkError = error.networkError || errorMessage.includes('fetch') || errorMessage.includes('Network');
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Liste des Comptes</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold mb-2">Erreur de connexion</p>
          <p className="text-red-600 text-sm mb-2">
            {isNetworkError 
              ? "Impossible de se connecter au backend. Vérifiez que le serveur GraphQL est démarré."
              : `Erreur : ${errorMessage}`}
          </p>
          <p className="text-red-500 text-xs mt-2">
            URL configurée : {GRAPHQL_URI}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Liste des Comptes</h2>
      {data && data.allComptes && data.allComptes.length > 0 ? (
        <div className="space-y-4">
          {data.allComptes.map((compte) => (
            <div key={compte.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600">ID: <span className="font-semibold text-gray-800">{compte.id}</span></p>
              <p className="text-lg font-bold text-blue-600 mt-2">Solde: {compte.solde}€</p>
              <p className="text-sm text-gray-600 mt-1">Date de création: {new Date(compte.dateCreation).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mt-1">
                Type: <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  compte.type === 'COURANT' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>{compte.type}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">Aucun compte trouvé</p>
      )}
    </div>
  );
};

export default CompteList;

