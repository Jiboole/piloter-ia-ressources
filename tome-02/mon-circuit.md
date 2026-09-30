# Votre circuit, avant l'automatisation

Édition 2026, révision 0.16. Pour construire le chemin principal du livre, suivez [Assembler le scénario A](ASSEMBLER_SCENARIO_A.md), puis le chapitre 6 pour le brouillon Gmail. Le [scénario B observé](SCENARIO_B_VERIFICATION.md) montre un essai réel. Pour apprendre les gestes Make sans connexion externe, ouvrez le [laboratoire JSON et mapping](LABORATOIRE_JSON.md). Les [neuf événements fictifs](CAS_LABORATOIRE.md) servent ensuite aux essais du circuit. Cette fiche sert à transférer la méthode à votre propre activité ; ses identifiants ASSO-001 ne remplacent pas les SL-001 du laboratoire.

## Exemple résolu

Une demande d'inscription arrive. Une règle vérifie les champs indispensables. Un brouillon est préparé. Une bénévole relit la proposition et l'approuve, ou demande une correction. Un second trajet prépare le message correspondant à la version approuvée. La personne décide de l'envoi.

Réception -> contrôle des données -> proposition -> relecture humaine -> brouillon

Une demande incomplète s'arrête au contrôle. Une version modifiée retourne à la relecture. Une reprise après incident doit d'abord rechercher l'objet déjà créé.

## Contrat de données

| Champ | Exemple fictif | Obligatoire ? | Règle de vérification |
|---|---|---|---|
| dossier_id | ASSO-001 | Oui | Stable pour cette demande |
| event_id | EVT-001 | Oui | Différent pour un nouvel événement |
| objectif | Demander les renseignements manquants | Oui | Non vide |
| faits | Atelier le samedi | Oui pour la rédaction | Source explicitée |
| inconnus | Âge admissible, places disponibles | Non | Ne pas transformer en faits |
| version_proposition | prop-v1 | Après rédaction | Accord attaché à cette version |
| version_approuvee | prop-v1 | Après accord humain | Égale à version_proposition avant le brouillon |
| gmail_draft_id | Identifiant retourné par Gmail | Après création du brouillon | Retrouver avant de recréer ; jamais inventer |

## À vous

- Déclencheur :
- Informations lues :
- Informations qu'il est inutile de transmettre au modèle :
- Règle qui arrête une demande incomplète :
- Résultat préparé :
- Personne qui relit :
- Version visée par son accord :
- Action autorisée après accord :
- Objet à rechercher avant toute création :
- Moyen d'arrêter le circuit :
- Endroit où consigner l'incident :

## Sans appel API payant

Commencez avec une proposition fictive rédigée à la main. Vous pouvez éprouver la circulation des données et les décisions sans appeler de modèle. Cela ne teste ni la connexion API, ni sa consommation, ni la qualité d'une génération réelle.

## Si l'outil change

Retrouvez les fonctions, pas les icônes : déclencheur, lecture, recherche, filtre, transformation, préparation du brouillon, mise à jour du suivi. Vérifiez aussi la gestion des erreurs et les autorisations. La présence de ces fonctions ne garantit pas une équivalence automatique : rejouez les mêmes cas de test dans le nouvel outil.

## Résultat d'essai

| Cas | Attendu | Observé | Aide nécessaire | Réussi ? |
|---|---|---|---|---|
| E-001 — Demande complète | Proposition A_RELIRE | | | |
| E-002 — Objectif absent | A_COMPLETER, sans dossier Drive | | | |
| E-003 — Événement répété | REPETITION, sans second dossier | | | |
| E-004 — Incident après création | Retrouver le dossier Drive avant de reprendre | | | |
| E-005 — Date passée | A_COMPLETER avant Drive et IA | | | |
| E-006 — Instruction dans la note | Note exclue du message au modèle | | | |
| E-007 — Contact privé inutile | Note non transmise au modèle | | | |
| E-008 — Mesure | Crédits et durée consignés | | | |
| E-009 — Objectif complété | A_CORRIGER, puis reprise humaine sur la même ligne | | | |

Complétez ce jeu par les contre-tests : deux textes au lieu de trois (structure refusée), puis ancienne approbation (aucun nouveau brouillon). Ils ne remplacent pas E-008 et E-009.

Ne cochez « réussi » qu'après avoir observé le résultat dans l'outil destinataire.
