import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

// Récupérer l'URL configurée depuis les variables d'environnement ou utiliser la valeur par défaut
const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:8080/graphql';

const TransactionList = () => {
  const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);
  
  if (loading) return <p className="text-center py-4">Chargement...</p>;
  if (error) {
    const errorMessage = error.message || 'Erreur inconnue';
    const isNetworkError = error.networkError || errorMessage.includes('fetch') || errorMessage.includes('Network');
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Historique des Transactions</h2>
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Historique des Transactions</h2>
      {data && data.allTransactions && data.allTransactions.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {data.allTransactions.map((transaction) => (
            <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-gray-600">ID: <span className="font-semibold text-gray-800">{transaction.id}</span></p>
                  <p className="text-sm text-gray-600 mt-1">Compte: <span className="font-semibold">{transaction.compte?.id || 'N/A'}</span></p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  transaction.type === 'DEPOT' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.type}
                </span>
              </div>
              <p className={`text-xl font-bold mt-2 ${
                transaction.type === 'DEPOT' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'DEPOT' ? '+' : '-'}{transaction.montant}€
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Date: {new Date(transaction.date).toLocaleString()}
              </p>
              {transaction.compte && (
                <p className="text-xs text-gray-500 mt-1">
                  Solde après transaction: {transaction.compte.solde}€
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">Aucune transaction trouvée</p>
      )}
    </div>
  );
};

export default TransactionList;

