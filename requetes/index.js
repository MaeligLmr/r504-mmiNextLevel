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
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

async function main() {
  const uri = "mongodb://127.0.0.1";
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

/*
//fonction pour vérifier les données en entrée -------- EN CHANTIER
function parseEntryBody(requestBody) {
  let {
    nom,
    urlSite,
    ville,
    region,
    idMaster,
    urlMaster,
    nomParcours,
    anneesParcours,
    alternancePossible,
    enDistanciel,
    urlParcours
  } = requestBody;
  nom = nom ? nom.toString() : null;
  urlSite = urlSite ? urlSite.toString() : null;
  ville = ville ? ville.toString() : null;
  region = region ? region.toString() : null;
  

  if (!nom || !urlSite ) {
    throw new Error('Informations manquantes ou mauvais format');
  }
  return {
    nom,
    
  };
}
*/


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

//requete qui récupère tous les etablissements
app.get('/api/etablissements', (req, res) => {
  findEtablissements().then(entries => res.json(entries));
});

//fonction qui récupère tous les établissements
async function findEtablissements() {
  const result = await client
    .db("test")
    .collection("etablissements")
    .find().toArray();

  return (result);
}

//requete qui récupère tous les masters
app.get('/api/masters', (req, res) => {
  findMasters().then(entries => res.json(entries));
});

//fonction qui récupère tous les établissements
async function findMasters() {
  const result = await client
    .db("test")
    .collection("masters")
    .find().toArray();

  return (result);
}

//requete qui récupère un établissement avec l'id
app.get('/api/etablissements/:entryId', (req, res) => {
  const entryId = req.params.entryId;

  try {
    findEtablissementsById(entryId).then(entries => res.json(entries));
  } catch (e) {
    res.status(404).json(createError('Entrée introuvable'));
  }
});

//fonction qui récupère l'établissement en fonction de l'id en paramètre
async function findEtablissementsById(id) {

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

//requete qui récupère un master avec l'id
app.get('/api/masters/:entryId', (req, res) => {
  const entryId = req.params.entryId;

  try {
    findMasterById(entryId).then(entries => res.json(entries));
  } catch (e) {
    res.status(404).json(createError('Entrée introuvable'));
  }
});

//fonction qui récupère un master en fonction de l'id en paramètre
async function findMasterById(id) {

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

//requete pour modifier le document d'un établissement
//pour ajouter une formation à une université
app.put('/update/etablissement', async (req, res) => {

  try {
    //const mastersId = await getMastersID(req.body.idEtab); //on recupère les id des masters (=mention) de l'établissement concerné
    //console.log(mastersId[0]._id);
    //mastersId[0]._id correspond au tableau contenu dans la réponse de getMastersID
    updateEtablissement(req.body, mastersId[0]._id).then(entries => res.json(entries));

  } catch (e) {
    res.status(404).json(createError('Entrée introuvable'));
  }

});

async function updateEtablissement(datas, mastersId) {
  //datas correspond aux données du formulaire
  //mastersId correspond au tableau des id de l'établissement

  /*const {
    
  } = parseEntryBody(req.body);*/ //vérification des données en entrée à faire plus tard

  // const objectId = new ObjectId(id);
  // const result = await client
  //   .db("test")
  //   .collection("etablissements")
  //   .updateOne({
  //     _id: objectId
  //   }, {
  //     $set: {

  //     }
  //   });
  const result = true;

  return result;
}

app.get('/idMasters', async (req, res) => {
  try {
    getMastersID(req.body.idEtab).then(entries => res.json(entries));
  } catch (er) {

  }
})

//récupère les id des masters disponibles dans un établissement
async function getMastersID(idEtab) {
  etablissement = new ObjectId(idEtab);

  const result = await client
    .db('test')
    .collection('etablissements')
    .aggregate([{
        $match: {
          _id: etablissement //cherche l'établissement avec l'id passé en parametre
        }
      },
      {
        $group: {
          _id: "$masters._idMaster" //groupe par l'id des masters
        }
      }
    ]).toArray();

  return result; //retourne un tableau du type : [{_id: ['id1', 'id2','id3']}]
}

/*--------------------------------------POST-----------------------------------

app.post('/etablissements', (req, res) => {
  try {
    insertEtablissement(req).then(newEntry => res.json(newEntry));
  } catch (e) {
    res.status(400).json(createError(e.message));
  }
});

async function insertEtablissement(newEtablissement) {
  const {
    nom,
    urlSite,
    ville,
    region,
    idMaster,
    urlMaster,
    nomParcours,
    anneesParcours,
    alternancePossible,
    enDistanciel,
    urlParcours
  } = parseEntryBody(newEtablissement.body);

  const etabToInsert = {
    _id: new ObjectId,
    nom,
    urlSite,
    ville,
    region,
    masters: [{
      idMaster,
      urlMaster,
      nomParcours,
      anneesParcours,
      alternancePossible,
      enDistanciel,
      urlParcours
    }],
  }

  const result = await client
    .db("test")
    .collection("Etablissement")
    .insertOne(etabToInsert);

  return result;
}
*/

app.listen(5000);