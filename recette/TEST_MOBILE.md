# Recette iOS et Android — à remplir, pas encore validée

Ressource de l’édition 2026, révision 0.13. La version de l’application demeure 1.0.0.

Tester séparément les deux systèmes. Utiliser uniquement des données fictives et un destinataire de test pour les exports. Ne pas désinstaller l'application avant le test de persistance.

Version du pack / commit :
Téléphone :
Version iOS ou Android :
Version Expo Go :
Date :
Testeur (pseudonyme) :

| Test | Geste | Résultat attendu | Observé / preuve |
|---|---|---|---|
| 1. Premier lancement | Ouvrir le projet | Écran lisible, aucun écran d'erreur | |
| 2. Saisie | Créer Café Test, objectif non vide | Une seule demande NOUVEAU | |
| 3. Relecture | Soumettre | État A_RELIRE | |
| 4. Décision incomplète | Approuver sans motif | Refus expliqué, état inchangé | |
| 5. Décision motivée | Saisir un motif puis approuver | APPROUVE, trace présente | |
| 6. Révision | Modifier l'objectif puis confirmer sur la carte | Nouvelle révision A_RELIRE, ancien accord non conservé comme accord courant | |
| 7. Redémarrage | Fermer puis rouvrir | Données et historique retrouvés | |
| 8. CSV | Partager le tableau vers Fichiers / un destinataire de test | Fichier ouvrable, colonnes et accents contrôlés | |
| 9. JSON | Partager la sauvegarde | JSON présent, historique visible dans un éditeur | |
| 10. Annulation | Annuler un partage | Aucune diffusion, retour utilisable à l'application | |
| 11. Ergonomie | Clavier, défilement, taille de texte plus grande | Champs et actions accessibles | |
| 12. Répétition | Appuyer rapidement sur une action | Pas de corruption ; relever tout doublon | |

Un succès sur iOS ne valide pas Android. Un succès dans Expo Go ne valide pas une version signée ni l'acceptation en boutique.

## Compte rendu d'un échec

Étape exacte :
Attendu :
Observé :
Message d'erreur :
Reproductible après relancement :
Capture anonymisée :
Gravité : bloquant / gênant / mineur
