import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_COMPTES, GET_ALL_TRANSACTIONS } from '../graphql/queries';

const TransactionForm = () => {
  const [type, setType] = useState('DEPOT');
  const [montant, setMontant] = useState('');
  const [compteId, setCompteId] = useState('');
  
  const { data: comptesData, loading: comptesLoading } = useQuery(GET_ALL_COMPTES);
  
  const [addTransaction, { loading, error }] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [
      { query: GET_ALL_TRANSACTIONS },
      { query: GET_ALL_COMPTES }
    ],
    onCompleted: () => {
      setMontant('');
      setCompteId('');
      setType('DEPOT');
    }
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!compteId) {
      alert('Veuillez sélectionner un compte');
      return;
    }
    try {
      await addTransaction({
        variables: {
          transactionRequest: {
            type,
            montant: parseFloat(montant),
            compteId,
          },
        },
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la transaction :', error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Ajouter une Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type :
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="DEPOT">Dépôt</option>
            <option value="RETRAIT">Retrait</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Montant :
          </label>
          <input
            type="number"
            step="0.01"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
            placeholder="Entrez le montant"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compte :
          </label>
          {comptesLoading ? (
            <p className="text-gray-500">Chargement des comptes...</p>
          ) : (
            <select
              value={compteId}
              onChange={(e) => setCompteId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un compte</option>
              {comptesData && comptesData.allComptes && comptesData.allComptes.map((compte) => (
                <option key={compte.id} value={compte.id}>
                  {compte.id} - {compte.type} (Solde: {compte.solde}€)
                </option>
              ))}
            </select>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm">Erreur : {error.message}</p>
        )}

        <button
          type="submit"
          disabled={loading || !compteId}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Ajout...' : 'Ajouter la transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;

