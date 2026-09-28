# Errata et état des vérifications

Édition 2026, révision documentaire **0.7 du 28 septembre 2026**. Le numéro de l’application d’atelier est **1.0.0**, identique dans `app.json` et `package.json`. Ces numéros identifient des objets différents : la révision des ressources et la version de l’application.

## Corrections de cette révision

- Un atelier complet décrit l’assemblage du scénario A dans Make, ses branches et les huit cas à rejouer. Le module OpenAI et son raccordement à Parse JSON sont nommés. La construction est documentée ; son exécution dans un compte Make n’est pas déclarée acquise.
- Le brouillon Gmail utilise partout `gmail_draft_id` et la proposition `prop-v2`. Aucun envoi automatique n’est ajouté.
- `suivi.ts`, `suivi.test.ts`, `edition.test.ts` et le README de l’application sont inclus dans le dépôt. Ils sont également joints au PDF de lecture du tome 3.
- Les lignes des sources TypeScript imprimées ont été composées sans retour artificiel dans les chaînes, expressions ou attributs JSX. Le code complet des annexes et du chapitre de suivi reste identique aux fichiers fournis.
- Les identifiants suivent `SL-001`, `SL-002`, etc. La révision d’un dossier ne consomme pas un numéro de dossier. Les événements d’approbation ne recopient plus des champs sans rapport avec cette action.
- Les livres intègrent les correspondances d’états, une passerelle vers le code, les prérequis et coûts datés, un index, des URL imprimables et des QR ciblés par tome. Les doublons signalés ont été fusionnés sans supprimer leurs éléments uniques.
- La composition a été revue : apostrophes hors code, tableaux, marges miroir, titres solidaires, flèches, liens, notes et polices incorporées. Les couvertures sont recalculées à la pagination effective.

## Vérifications réellement exécutées

Environnement : Node.js 24.19.0, dépendances verrouillées du projet fourni.

- `node --test core.test.ts suivi.test.ts edition.test.ts` : **22 tests réussis, 0 échec** (12 noyau, 7 suivi, 3 conventions de l’édition).
- Vérification TypeScript de l’application ; vérification séparée stricte du noyau et des fichiers de tests : réussies.
- Code extrait des PDF : `core.ts`, `App.tsx`, `core.test.ts`, `suivi.ts`, `suivi.test.ts` et `tsconfig.json` identiques aux fichiers canoniques, hors lignes vides. Les tests exécutés sur cette extraction passent également.
- Deux contre-épreuves sur copies isolées : suppression du garde-fou de révision ancienne et comptage des événements à la place des dossiers. Chacune est détectée par un échec. Après restauration : 22 tests réussis.
- `expo export --platform all` : export JavaScript réussi pour Android (607 modules) et iOS (580 modules). **Ce ne sont pas des applications signées ni des essais sur téléphone.**
- QR des ressources et codes-barres des trois ISBN décodés ; sommaires et renvois contrôlés ; texte des éditions Lecture et KDP identique, hormis la couverture ajoutée au PDF de lecture.

## Ce qui reste à éprouver dans les conditions réelles

- Complément de composition du 28 septembre 2026 (pack livres 0.8) : trois détails de captures Notion authentiques sont intégrés au tome 1. Une base privée fictive « Mes dossiers de test », la fiche SL-001 et ses quatre choix de statut ont été créés ; le changement de statut a été vérifié dans l’interface. Les libellés français de la procédure ont été corrigés. Cela ne valide pas encore le parcours complet Drive–Notion–Gmail ni sa réalisation sans assistance par un lecteur.
- Le scénario Make et ses captures authentiques restent à réaliser : l’accès au compte n’a pas pu être établi à l’issue de la connexion Google. Aucun scénario exécuté ni aucune interface Make générée n’est présenté comme une preuve. Le retour d’un lecteur sans assistance reste également attendu.
- Essais sur téléphones iOS et Android, Expo Go, EAS, TestFlight et Google Play. Utiliser le [protocole mobile](recette/TEST_MOBILE.md) : il reste à renseigner.
- Contrôle dans KDP Previewer et épreuve papier : non effectués. Les contrôles locaux de format et de polices ne valent pas acceptation par KDP.
- Le visuel existant de couverture a été conservé. Son fichier export est à 300 ppp, mais agrandir une image ne crée pas de détail photographique supplémentaire. L’épreuve papier doit confirmer sa qualité perçue.

## Règle de mise à jour

Un test exécuté, une vérification documentaire et une validation par un lecteur sont des preuves différentes. Chaque correction indique la version, le symptôme et son contrôle. Vérifiez de nouveau les interfaces, versions, tarifs et conditions des boutiques avant un usage réel. Aucun calendrier de maintenance permanent n’est promis.

Pour signaler un problème, indiquez le tome, le chapitre, le numéro imprimé de page, la version du pack et le premier résultat inattendu. Ne transmettez ni secret, ni donnée client, ni capture de compte non anonymisée.
