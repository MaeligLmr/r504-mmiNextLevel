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


//fonction pour vérifier les données en entrée
function parseEntryBody(requestBody) {
  let {
    deadline,
    achieved,
    author,
    title,
    details
  } = requestBody;
  title = title ? title.toString() : null;
  author = author ? author.toString() : null;
  details = details ? details.toString() : null;
  deadline = deadline ? new Date(deadline) : null;
  achieved = achieved ? new Date(achieved) : null;
  if (!title || !author || isNaN(deadline) || isNaN(achieved)) {
    throw new Error('Mauvais format');
  }
  return {
    deadline,
    achieved,
    author,
    title,
    details
  };
}

////////////////GET//////////////////
//fonction qui récupère tous les etablissements
app.get('/etablissements', (req, res) => {
  findEtablissements().then(entries => res.json(entries));
});

async function findEtablissements() {
  const result = await client
    .db("local")
    .collection("etablissements")
    .find().toArray();

  return (result);
}

////////////////POST//////////////////

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

/////////////GET BY ID///////////////

app.get('/etablissements/:entryId', (req, res) => {
  const entryId = req.params.entryId;

  try {
    findEtablissementsById(entryId).then(entries => res.json(entries));
  } catch (e) {
    res.status(404).json(createError('Entrée introuvable'));
  }
});

async function findEtablissementsById(id) {

  const objectId = new ObjectId(id);

  const result = await client
    .db("local")
    .collection("Etablissement")
    .find({
      _id: objectId
    }).toArray();

  return result;

};

/////////////PUT///////////////

app.put('/etablissements/:entryId', (req, res) => {
  const entryId = req.params.entryId;

  try {
    updateEtablissement(entryId, req).then(entries => res.json(entries))
  } catch (e) {
    res.status(404).json(createError('Entrée introuvable'));
  }
});

async function updateEtablissement(id, req) {

  const {
    deadline,
    achieved,
    author,
    title,
    details
  } = parseEntryBody(req.body);

  const objectId = new ObjectId(id);
  const result = await client
    .db("local")
    .collection("Etablissement")
    .updateOne({
      _id: objectId
    }, {
      $set: {
        deadline: deadline,
        achieved: achieved,
        author: author,
        title: title,
        details: details
      }
    });

  return result;
}


/////////////DELETE///////////////

app.delete('/etablissements/:entryId', (req, res) => {
  const entryId = req.params.entryId;

  try {
    deleteEtablissement(entryId).then(entries => res.json(entries));
    res.status(204).end();
  } catch (e) {
    res.status(404).json(createError('Entrée introuvable'));
  }

});

async function deleteEtablissement(id) {
  const result = await client
    .db("local")
    .collection("Etablissement")
    .deleteOne({
      _id: new ObjectId(id)
    });

  return result;
}