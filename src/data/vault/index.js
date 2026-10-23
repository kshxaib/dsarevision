import { computerNetworksVault } from './subjects/computerNetworks.js';
import { dbmsVault } from './subjects/dbms.js';
import { sqlVault } from './subjects/sql.js';
import { oopsVault } from './subjects/oops.js';
import { operatingSystemsVault } from './subjects/operatingSystems.js';

export const vaultSubjects = [
  // Core Computer Science
  computerNetworksVault,
  dbmsVault,
  sqlVault,
  oopsVault,
  operatingSystemsVault,
];

export const vaultCategories = [
  'All',
  'Core CS',
];

export function getVaultSubjectById(id) {
  return vaultSubjects.find(s => s.id === id) || null;
}

export function getTotalVaultQuestions() {
  return vaultSubjects.reduce((acc, sub) => acc + (sub.questions?.length || 0), 0);
}
