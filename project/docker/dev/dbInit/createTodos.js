/*
Model de document Todo : 
{
  title: <String>, obligatoire
  description: <String>, optionnel
  dueDate: Datetime, optionnel
  done: boolean, obligatoire
  categories: Array<String>, optionnel
}
*/
const TODO_COLLECTION_NAME = 'todos';

// Sample data : arrays of data components. All of the same length.
const TITLES = ['ranger chambre', 'faire course', 'réparer vélo', 'lire un livre'];
const DESCRIPTIONS = [
  null,
  'Acheter des brocolis et de la sauce huitre',
  'Prendre la clé de 12',
  null
];
const DUE_DATES = [ null, '2025-02-03', '2025-01-01', null ];
const DONES = [ true, false, false, false];
const CATEGORIES = [
  ['ménage', 'maison'],
  ['maison'],
  null,
  ['culture']
];

/**
 * Create an array of sample todos
 * @returns todos
 */
function createTodos() {
  return TITLES.map((title, idx) => {
    const document = {
      title,
      done: DONES[idx]
    };
    if (DESCRIPTIONS[idx] != null) {
      document.description = DESCRIPTIONS[idx];
    }
    if (DUE_DATES[idx] != null) {
      document.dueDate = new Date(DUE_DATES[idx]);
    }
    if (CATEGORIES[idx] != null) {
      document.categories = CATEGORIES[idx];
    }
    return document;
  });
}

// Date generation and insertion
db[TODO_COLLECTION_NAME].insertMany(createTodos());