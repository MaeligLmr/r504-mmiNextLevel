# Stage 1 : Installation des dépendances. On utilise une image node "complete" pour le bundling.
# Utiliser 2 stages différents (un pour le build, un pour l'exection) évite de re-télécharger toutes les dépendances à chaque build, le fait uniquement si le fichier package.json ou package-lock.json change entre 2 build ; et permet aussi d'avoir une image finale d'application (le 2ème stage) plus petite
FROM node:latest AS build
# Convention: on ne travaille pas sur / (le workdir par défaut de l'image node) mais dans un sous-dossier que l'on sait vide
WORKDIR /usr/src/app
# On ne copie que les fichier package.json et package-lock.json => si au prochain build, ces fichier n'on pas changé, on repartira de l'image des dépendances précédante
COPY package*.json /usr/src/app/
# On installe les dépendances, et uniquement celle pour la prod
RUN npm ci --omit=dev

# Stage 2 : image terminale de l'application. On part d'une version stable et maitrisé d'une image node, 
FROM node:lts-alpine@sha256:6e80991f69cc7722c561e5d14d5e72ab47c0d6b6cfb3ae50fb9cf9a7b30fdf97
# installation de dumb-init : un programme utilitaire pour correctement arrêter notre api lorsqu'un signal d'arrêt sera envoyé au conteneur
RUN apk add dumb-init
# La variable d'environnement NODE_ENV valuée à "production" permet à Node et ses bibliothèques d'automatiquement utiliser les paramètres optimaux pour la performance et la sécurité
ENV NODE_ENV production
# Convention: on ne travaille pas sur / (le workdir par défaut de l'image node) mais dans un sous-dossier que l'on sait vide
WORKDIR /usr/src/app

# On utilisera l'utilisateur node comme propriétaire du processus node et non pas root par défaut pour limiter ses droits et améliorer la sécurité
# On copie donc nos données applicative en changeant le propriétaire des fichiers (root par défaut)
# Copie des dépendances depuis le stage 1
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
# Copie du codebase de l'api
COPY --chown=node:node . /usr/src/app
# Change maintenant d'utilisateur pour le reste des commande
USER node
# Commande de démarrage : dumb-init pour gérer le traitement du signal d'arrêt qui a son tour va lancer node
CMD ["dumb-init", "node", "index.js"]
