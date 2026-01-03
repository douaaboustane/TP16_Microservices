// Interface pour un compte
export const Compte = {
  id: String,
  solde: Number,
  dateCreation: String,
  type: String,
};

// Interface pour une transaction
export const Transaction = {
  id: String,
  type: String,
  montant: Number,
  date: String,
  compte: Object,
};

// Interface pour les statistiques de solde
export const SoldeStats = {
  count: Number,
  sum: Number,
  average: Number,
};

// Interface pour les statistiques de transaction
export const TransactionStats = {
  count: Number,
  sumDepots: Number,
  sumRetraits: Number,
};

// Interface pour les demandes de création de compte
export const CompteRequest = {
  solde: Number,
  type: String,
};

// Interface pour les demandes de création de transaction
export const TransactionRequest = {
  type: String,
  montant: Number,
  compteId: String,
};

