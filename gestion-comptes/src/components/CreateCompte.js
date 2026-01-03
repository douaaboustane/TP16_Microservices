import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';

const CreateCompte = () => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState('COURANT');
  
  const [saveCompte, { loading, error }] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
    onCompleted: () => {
      setSolde('');
      setType('COURANT');
    }
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveCompte({
        variables: {
          compte: {
            solde: parseFloat(solde),
            type,
          },
        },
      });
    } catch (error) {
      console.error('Erreur lors de la création du compte :', error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Créer un Compte</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Solde :
          </label>
          <input
            type="number"
            step="0.01"
            value={solde}
            onChange={(e) => setSolde(e.target.value)}
            required
            placeholder="Entrez le solde initial"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

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
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm">Erreur : {error.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Création...' : 'Créer un compte'}
        </button>
      </form>
    </div>
  );
};

export default CreateCompte;

