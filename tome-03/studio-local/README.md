# Studio Local — code de l’édition 2026 révisée

Ressource de l’édition 2026, révision 0.17. La version de l’application demeure 1.0.0.

Ce dossier est la source des annexes du tome 3 et des pièces jointes du PDF.
Application locale pédagogique, données fictives uniquement. Aucun compte client,
aucune synchronisation entre appareils, aucun envoi automatique.

## Démarrer

1. Lire `../DEMARRER.md` et ouvrir un terminal dans ce dossier.
2. Utiliser une version LTS de Node compatible (22.18 ou plus pour les tests).
   Le fichier `.nvmrc` conserve la référence reproductible de préparation.
3. Exécuter `npm ci`, puis `node --test core.test.ts suivi.test.ts edition.test.ts`.
4. Exécuter `npx tsc --noEmit`, puis `npx expo start` pour les essais Expo Go.

Les 16 tests du noyau, les 7 tests de suivi et les 3 tests de correction sont
distincts. Un contrôle de types ne remplace pas les essais sur appareil.

## Comprendre les fichiers

- `core.ts` : journal d’événements, règles, stockage, CSV, identifiants et
  sélection des champs utiles à chaque geste.
- `App.tsx` : saisie, relecture, sauvegarde et partage sur un appareil.
- `suivi.ts` : compte les dossiers dans chaque état ; il ne compte pas les gestes.
- `core.test.ts`, `suivi.test.ts`, `edition.test.ts` : exemples exécutables et
  contrôles de non-régression.

Ne reformatez pas les fichiers en recopiant leurs lignes depuis le livre.
Les sources sont volontairement composées sur des lignes courtes. Les tirets
typographiques de la prose ne doivent jamais remplacer la ponctuation du code.

## Limites

La fonction de suivi est testée séparément et n’est pas affichée dans l’écran
de base. Le chapitre 11 explique ce qu’exigerait son intégration. Les sauvegardes
restent locales ; ne les confondez pas avec une sauvegarde distante. Une décision
signée d’un prénom est une déclaration, pas une authentification.

Avant toute distribution, réaliser `../../recette/TEST_MOBILE.md` sur iOS et
Android et vérifier les conditions des boutiques. Le livre ne promet aucune
acceptation automatique. Ne placez ni secrets ni données de clients dans ce dépôt.
