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

/*-----------------------------------------GET------------------------------------------*/

//requete qui récupère tous les etablissements
app.get('/etablissements', (req, res) => {
  findEtablissements().then(entries => res.json(entries));
});

//fonction qui récupère tous les établissements
async function findEtablissements() {
  const result = await client
    .db("local")
    .collection("etablissements")
    .find().toArray();

  return (result);
}

//requete qui récupère un établissement avec l'id
app.get('/etablissements/:entryId', (req, res) => {
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
    .db("local")
    .collection("etablissement")
    .find({
      _id: objectId
    }).toArray();

  return result;

};

//requete qui récupère un master avec l'id
app.get('/etablissements/:entryId', (req, res) => {
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
    .db("local")
    .collection("masters")
    .find({
      _id: objectId
    }).toArray();

  return result;

};


/*--------------------------------------PUT------------------------------------- */

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
    .db("local")
    .collection("Etablissement")
    .insertOne(etabToInsert);

  return result;
}
*/
