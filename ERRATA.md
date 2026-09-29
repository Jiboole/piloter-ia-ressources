# Errata et état des vérifications

Édition 2026, révision courante **0.12 du 29 septembre 2026**, commune aux livres et aux ressources. Le numéro de l’application d’atelier reste **1.0.0**, identique dans `app.json` et `package.json`. Ces numéros identifient des objets différents : la révision des ressources et la version de l’application.

## Révision 0.12 : compléments Make et dernier audit

- Lexiques et index renvoient à la page de définition, et non à la première occurrence ou à l’ouverture approximative d’un chapitre.
- Tome 1 : adresse de démarrage, jetons/tokens, kit v1 conservé, versions v3/v4 dans le dossier final ; atelier Make facultatif sans accès aux comptes Google ; grille de décision avant un effet externe.
- Tome 2 : mapping vérifié en SL-001 puis SL-002, filtre accepté/refusé, six paliers d’assemblage, formule du début de jour avec fuseau explicite, reprise manuelle des dossiers arrêtés et événement E-009. Les guides compagnons sont synchronisés avec ces étapes.
- Tome 3 : explication de nextId corrigée sans modifier le code métier ; vingt-deux tests annoncés par la commande complète ; les trois tests d’édition sont désormais aussi imprimés en annexe D. Ils étaient déjà téléchargeables et joints au PDF 0.11 : le défaut était l’écart de présentation et de comptage, pas leur absence du pack.
- Les captures supplémentaires sont issues des essais Make réels, recadrées et converties en gris sans rééchantillonnage. Un export natif du laboratoire est fourni ; aucune clé ni connexion Google n’y figure.
- Le nouveau cas E-009 complète E-002, passe d’abord par le signalement de modification, puis par une reprise humaine sur la même ligne. Il ne crée pas un second dossier. Il ne faut pas interpréter la simple arrivée de E-009 comme une relance automatique réussie.

**Limite maintenue :** les essais JSON/mapping/filtre/dates ne prouvent pas le fonctionnement du circuit A/B Google complet. L’autorisation Google dans Make, les neuf cas réels du circuit et les essais sur appareil restent à achever. Les résultats de rendu et de code des PDF sont consignés dans le rapport livré avec le pack.

**Essai des dates exécuté le 29 septembre 2026 :** la formule de début de jour et la date saisie emploient toutes deux Europe/Paris. Le filtre refuse 2000-01-01 et accepte 2026-09-29. Ce laboratoire reste manuel, planification désactivée, sans connexion Google.

**Limite de reproduction :** les dix captures sont authentiques et n'ont pas été suréchantillonnées. Leur résolution native reste inférieure à 250–300 ppp à certaines tailles imprimées. La recapture haute définition et la vérification sur l'épreuve papier restent ouvertes ; la réussite des tests locaux ne clôt pas ce contrôle.

## Historique — pack livres 0.11

Les notes de bas de page suivent désormais leur appel sans duplication. Les encadrés courts restent entiers ; les coupures du code respectent les signatures, instructions courtes et composants JSX. Le code est composé à 9 points sans modification des sources de l’application. La casse des modules Data store est harmonisée dans le guide d’assemblage.

Les cinq captures authentiques sont conservées et converties en niveaux de gris sans agrandissement artificiel. Les recadrages Notion sont nettoyés. **Leur recapture à haute définition native reste ouverte** : cette révision ne constitue donc pas un BAT commercial définitif.

Le gain moyen de **15 %** du tome 1 est conservé après vérification de la publication finale de Brynjolfsson, Li et Raymond, QJE 2025, sur 5 172 agents : [DOI 10.1093/qje/qjae044](https://doi.org/10.1093/qje/qjae044). Il ne faut pas lui substituer les 14 % d’une version antérieure de l’étude.

## Historique — corrections reprises du pack 0.11

- Un atelier complet décrit l’assemblage du scénario A dans Make, ses branches et les huit cas à rejouer. Le module OpenAI et son raccordement à Parse JSON sont nommés. La construction est documentée ; son exécution dans un compte Make n’est pas déclarée acquise.
- Le brouillon Gmail utilise partout `gmail_draft_id` et la proposition `prop-v2`. Aucun envoi automatique n’est ajouté.
- `suivi.ts`, `suivi.test.ts`, `edition.test.ts` et le README de l’application sont inclus dans le dépôt. Ils sont également joints au PDF de lecture du tome 3.
- Les lignes des sources TypeScript imprimées ont été composées sans retour artificiel dans les chaînes, expressions ou attributs JSX. Le code complet des annexes et du chapitre de suivi reste identique aux fichiers fournis.
- Les identifiants suivent `SL-001`, `SL-002`, etc. La révision d’un dossier ne consomme pas un numéro de dossier. Les événements d’approbation ne recopient plus des champs sans rapport avec cette action.
- Les livres intègrent les correspondances d’états, une passerelle vers le code, les prérequis et coûts datés, un index, des URL imprimables et des QR ciblés par tome. Les doublons signalés ont été fusionnés sans supprimer leurs éléments uniques.
- La composition a été revue : apostrophes hors code, tableaux, marges miroir, titres solidaires, flèches, liens, notes et polices incorporées. Les couvertures sont recalculées à la pagination effective.

## Vérifications locales — état 0.12

Environnement : Node.js 24.19.0, dépendances verrouillées du projet fourni.

- `node --test core.test.ts suivi.test.ts edition.test.ts` : **22 tests réussis, 0 échec** (12 noyau, 7 suivi, 3 conventions de l’édition).
- Vérification TypeScript de l’application ; vérification séparée stricte du noyau et des fichiers de tests : réussies.
- Code extrait des PDF : `core.ts`, `App.tsx`, `core.test.ts`, `suivi.ts`, `suivi.test.ts`, `edition.test.ts` et `tsconfig.json` identiques aux fichiers canoniques, hors lignes vides. Les vingt-deux tests exécutés sur cette extraction passent également.
- Deux contre-épreuves sur copies isolées : suppression du garde-fou de révision ancienne et comptage des événements à la place des dossiers. Chacune est détectée par un échec. Après restauration : 22 tests réussis.
- `expo export --platform all` : export JavaScript réussi pour Android (607 modules) et iOS (580 modules). **Ce ne sont pas des applications signées ni des essais sur téléphone.**
- QR des ressources et codes-barres des trois ISBN décodés ; sommaires et renvois contrôlés ; texte des éditions Lecture et KDP identique, hormis la couverture ajoutée au PDF de lecture.

## Ce qui reste à éprouver dans les conditions réelles

- Complément de composition du 28 septembre 2026 (pack livres 0.8) : trois détails de captures Notion authentiques sont intégrés au tome 1. Une base privée fictive « Mes dossiers de test », la fiche SL-001 et ses quatre choix de statut ont été créés ; le changement de statut a été vérifié dans l’interface. Les libellés français de la procédure ont été corrigés. Cela ne valide pas encore le parcours complet Drive–Notion–Gmail ni sa réalisation sans assistance par un lecteur.
- Complément du 29 septembre 2026 (pack livres 0.10) : l’accès Make est établi. Un laboratoire à un seul module **JSON > Parse JSON** a été exécuté manuellement avec l’objet fictif du chapitre 4 du tome 2, puis enregistré en laissant sa planification désactivée. L’inspecteur affiche un paquet de sortie, `dossier_id = SL-001`, `version = prop-v1`, ainsi que les listes `textes` et `manques`. Deux captures authentiques montrent la saisie et cet inspecteur ; le résumé affiche une opération et un crédit pour cet essai. **Ce résultat ne valide pas le circuit A/B complet, les connexions Google, l’appel au modèle ni les huit cas de recette.** Aucun courriel n’a été envoyé. Le retour d’un lecteur sans assistance reste attendu.
- Essais sur téléphones iOS et Android, Expo Go, EAS, TestFlight et Google Play. Utiliser le [protocole mobile](recette/TEST_MOBILE.md) : il reste à renseigner.
- Contrôle dans KDP Previewer et épreuve papier : non effectués. Les contrôles locaux de format et de polices ne valent pas acceptation par KDP.
- Le visuel existant de couverture a été conservé. Son fichier export est à 300 ppp, mais agrandir une image ne crée pas de détail photographique supplémentaire. L’épreuve papier doit confirmer sa qualité perçue.

## Règle de mise à jour

Un test exécuté, une vérification documentaire et une validation par un lecteur sont des preuves différentes. Chaque correction indique la version, le symptôme et son contrôle. Vérifiez de nouveau les interfaces, versions, tarifs et conditions des boutiques avant un usage réel. Aucun calendrier de maintenance permanent n’est promis.

Pour signaler un problème, indiquez le tome, le chapitre, le numéro imprimé de page, la version du pack et le premier résultat inattendu. Ne transmettez ni secret, ni donnée client, ni capture de compte non anonymisée.
