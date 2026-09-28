# Errata et vérifications

État initial du pack : 28 septembre 2026, ressources associées aux manuscrits 0.4.

## Corrigé dans les ressources

- Le code mobile est disponible en fichiers : aucune recopie depuis un PDF n'est nécessaire.
- Un tableau distingue kit, proposition et révision ; les statuts ne sont pas tous interchangeables.
- Des supports « votre projet » et un protocole de test mobile sont disponibles.
- Le dossier Drive du QR historique a été retrouvé ; ses droits indiquent une lecture publique par lien.

## Vérifications locales

Le noyau du livre a passé 12 tests, le contrôle TypeScript et un export JavaScript Android. Le pack public a ensuite été installé avec npm ci --ignore-scripts : ses 12 tests et son contrôle TypeScript passent, et son export JavaScript iOS réussit (609 modules). Cet export n'est pas un binaire signé. Les essais humains, sur téléphones iOS/Android, EAS et boutiques sont des preuves différentes et ne sont pas acquis.

## À traiter dans les prochaines versions des ouvrages

- Captures authentiques des gestes, schémas et parcours Make précis.
- Prérequis, versions, accès et éventuels coûts annoncés avant les exercices.
- Passerelle progressive vers le code et cas personnel accompagné.
- Glyphes de flèches, espaces de fin de chapitre et repérage des exercices.
- Promesse du tome 3 et conditions d'un gain de temps positif.
- Intégration visible du lien et du QR des ressources.

## Règle de mise à jour

Chaque modification doit préciser la version concernée, le symptôme, la correction et ce qui a été testé. Une procédure documentée par un fournisseur n'est pas présentée comme un essai exécuté. Un changement d'outil ou de tarif demande une nouvelle vérification ; aucun calendrier de maintenance permanent n'est promis ici.
