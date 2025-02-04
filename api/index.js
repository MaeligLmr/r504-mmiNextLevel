const express = require('express');
const bodyParser = require('body-parser');
const {
  MongoClient,
  ObjectId
} = require('mongodb');
let client; //on initialise le client ici pour que toutes les fonctions y aient accès

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Gestion des en-têtes HTTP
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000'); // A CHANGER --> uniquement pour le local
  res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

async function main() {
  const uri = "mongodb://127.0.0.1"; // Localhost --> à changer pendant l'hébergement

  // Connexion avec la base MongoDB
  client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  }
}

//fonction qui liste les base de données en prenant le client en paramètre
async function listDatabases(client) {
  databasesList = await client
    .db().admin().listDatabases();
  console.log("Databases :");
  databasesList.databases.forEach(db =>
    console.log(` - ${db.name}`));
};
main().catch(console.error);

//fonction pour créer des messages d'erreur personnalisés 
function createError(errorMessage) {
  return {
    error: errorMessage,
  };
}

//fonction qui transforme les données en entrée en un tableau d'objets parcours
function formatParcours(tabParcours) {
  let tabObjetsParcours = [];

  for (let i = 0; i < tabParcours.length; i++) {
    tabObjetsParcours[i] += {
      nomParcours: tabParcours[0].nomParcours
    };
  }

  return tabObjetsParcours;
}

/*-----------------------------------------GET------------------------------------------*/

// Récupération de tous les établissements
app.get('/api/etablissements', (req, res) => {
  findEtablissements().then(entries => res.json(entries));
});

// Fonction qui récupère tous les établissements
async function findEtablissements() {
  const result = await client
    .db("test")
    .collection("etablissements")
    .find().toArray();

  return (result);
}

// Récupération de tous les masters
app.get('/api/masters', (req, res) => {
  findMasters().then(entries => res.json(entries));
});

// Fonction qui récupère tous les masters
async function findMasters() {
  const result = await client
    .db("test")
    .collection("masters")
    .find().toArray();

  return (result);
}

// Récupérations des FORMATIONS (une mention pour une université)
app.get('/api/formations', (req, res) => {
  getMentionByUniv().then(formations => res.json(formations));
});

//fonction qui éclate les tableaux des masters, pour avoir un document par master
async function getMentionByUniv() {
  const result = await client
    .db('test')
    .collection('etablissements')
    .aggregate([{
        $unwind: "$masters"
      },
      {
        $addFields: {
          idFormation: {
            $concat: [{
              "$toString": "$masters._idMaster"
            }, {
              "$toString": "$_id"
            }]
          }
        }
      }
    ]).toArray();

  return result;
}

// Récupération d'un établissement via son ID passée en paramètre
app.get('/api/etablissements/:entryId', (req, res) => {
  // ID de l'établissement à trouver
  const entryId = req.params.entryId;

  try {
    findEtablissementsById(entryId).then(entries => res.json(entries));
  } catch (e) {
    res.status(404).json(createError('Entrée introuvable'));
  }
});

// Fonction qui récupère l'établissement en fonction de l'ID en paramètre
async function findEtablissementsById(id) {
  // ID de l'établissement à trouver
  const objectId = new ObjectId(id);

  const result = await client
    .db("test")
    .collection("etablissements")
    .find({
      _id: objectId
    }).toArray();

  console.log(id);
  return result;

};

// Requête qui récupère un master dont l'ID est passée en paramètre
app.get('/api/masters/:entryId', (req, res) => {
  // ID du master en paramètre
  const entryId = req.params.entryId;

  try {
    findMasterById(entryId).then(entries => res.json(entries));
  } catch (e) {
    res.status(404).json(createError('Entrée introuvable'));
  }
});

// Fonction qui récupère un master en fonction de l'ID en paramètre
async function findMasterById(id) {
  // ID du master en paramètre
  const objectId = new ObjectId(id);

  const result = await client
    .db("test")
    .collection("masters")
    .find({
      _id: objectId
    }).toArray();

  return result;

};


/*--------------------------------------PUT------------------------------------- */

// Requête de modification du document d'un établissement dont l'ID est passée en paramètre
// pour ajouter une formation à une université
app.put('/api/etablissements/update/etablissement/:idUniv', async (req, res) => {
  // Récupération et formatage de l'ID de l'établissement
  const objectId = new ObjectId(req.params.idUniv);

  try {
    // Mise à jour de l'établissement
    updateEtablissement(objectId, req.body)
      .then(nouvelEtablissement => {
        if (!nouvelEtablissement) {
          res.status(404).json(createError('Document introuvable.'));
        } else {
          res.status(200).json(nouvelEtablissement);
        }
      });

  } catch (e) {
    res.status(404).json(createError(e.message));
  }

});

// Permet de mettre à jour le document d'un établissement dont on fournit l'ID et le nouvel objet en paramètre
async function updateEtablissement(univId, datas) {
  //datas correspond aux données du formulaire (le nouvel objet de l'établissement)
  //mastersId correspond au tableau des id de l'établissement

  /*const {
    
  } = parseEntryBody(req.body);*/ //vérification des données en entrée à faire plus tard

  // On ne remplace pas l'ID du document
  if (datas.hasOwnProperty('_id')) {
    delete datas._id;
  }

  // Mise à jour du document
  await client
    .db("test")
    .collection("etablissements")
    .updateOne({
      _id: univId
    }, {
      $set: datas
    });

  // Récupération du document mis à jour
  const result = await client
    .db("test")
    .collection("etablissements")
    .findOne({
      _id: univId
    });

  return result;
}

app.listen(5000);