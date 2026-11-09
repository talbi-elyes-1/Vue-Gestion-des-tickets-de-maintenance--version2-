Gestion des tickets de maintenance
1. Présentation du projet
Ce projet est réalisé dans le cadre du TP 2 du module Framework côté client — Vue.js 3.

Il s’agit d’une application web de suivi des tickets de maintenance. Elle permet de consulter, rechercher, filtrer, créer, modifier et supprimer des tickets. Les opérations sont enregistrées via une API REST simulée avec JSON Server.
2. Technologies utilisées
- Vue.js 3
- Vue Router
- Vite
- Axios
- JSON Server
- JavaScript
- HTML et CSS
3. Structure du projet
Vue-Gestion-des-tickets-de-maintenance
│
├── db.json
├── package.json
├── package-lock.json
├── README.md
├── captures/
│   ├── 01-creation-ticket.png
│   ├── 02-ticket-dans-la-liste.png
│   ├── 03-modification-ticket.png
│   ├── 04-details-ticket.png
│   ├── 05-confirmation-suppression.png
│   ├── 06-validation-champ-obligatoire.png
│   └── 07-ticket-inexistant.png
│
└── src/
    ├── components/
    ├── router/
    ├── services/
    │   └── ticketService.js
    ├── views/
    └── App.vue
4. Installation
Cloner le projet :
git clone URL_DU_DEPOT
Accéder au dossier du projet :
cd Vue-Gestion-des-tickets-de-maintenance
Installer les dépendances :
npm install
5. Lancement du projet
Démarrer JSON Server dans un premier terminal :
npx json-server db.json --port 3000
L’API est accessible à l’adresse :

http://localhost:3000/tickets

Dans un deuxième terminal, démarrer l’application Vue :
npm run dev
L’application est accessible à l’adresse indiquée par Vite, généralement :

http://localhost:5173/
6. Fonctionnalités réalisées
- Récupération et affichage des tickets depuis l’API REST avec Axios.
- Recherche des tickets et filtrage par statut et priorité.
- Création d’un ticket avec titre, description, demandeur et priorité.
- Initialisation du statut à « Ouvert » et de la date de création à la date du jour.
- Validation des champs obligatoires : titre, description et demandeur.
- Consultation des détails d’un ticket et retour à la liste.
- Modification d’un ticket et enregistrement des changements via l’API.
- Changement du statut d’un ticket et actualisation de l’interface.
- Suppression d’un ticket après confirmation.
- Affichage d’un message en cas d’erreur réseau ou de ticket inexistant.
- Désactivation du bouton pendant l’enregistrement pour éviter les envois répétés.
7. Captures d’écran
Les captures d’écran du projet sont disponibles dans le dossier captures/.
- 01-creation-ticket.png
- 02-ticket-dans-la-liste.png
- 03-modification-ticket.png
- 04-details-ticket.png
- 05-confirmation-suppression.png
- 06-validation-champ-obligatoire.png
- 07-ticket-inexistant.png
8. Questions et réponses
1. Quelle est la différence entre POST, PUT et PATCH ?
POST permet de créer une nouvelle ressource. PUT remplace généralement une ressource existante, tandis que PATCH ne modifie que certains de ses champs. Dans ce projet, POST est utilisé pour créer un ticket et PUT ou PATCH pour le modifier.
2. Pourquoi demander une confirmation avant DELETE ?
La confirmation évite qu’un ticket soit supprimé par erreur. Elle donne à l’utilisateur la possibilité d’annuler avant la suppression définitive.
3. Quel est le rôle de Vue Router ?
Vue Router associe les URL aux vues de l’application. Il permet de naviguer entre la liste (/tickets), le formulaire de création (/tickets/nouveau) et la page de détail ou d’édition (/tickets/:id) sans recharger toute l’application.
4. Comment éviter les doublons lors de l’enregistrement ?
Le bouton de soumission est désactivé pendant l’enregistrement. Un indicateur d’envoi empêche de lancer une nouvelle requête tant que la première n’est pas terminée.
9. Difficultés rencontrées
À compléter avec les difficultés réellement rencontrées pendant le TP et les solutions trouvées.
10. Conclusion
Ce TP m’a permis de mettre en pratique les opérations CRUD avec une API REST, de gérer la navigation avec Vue Router et de construire une application interactive avec Vue.js 3.