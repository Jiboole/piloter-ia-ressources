# Ressource compagnon — édition 2026, révision 0.7

Cette procédure figure aussi au chapitre 5 du tome 2. Elle est vérifiée sur documentation officielle, mais doit encore être jouée dans un compte de test. Aucun essai réel dans Make n’est revendiqué.

# 05 - Assembler le circuit, de la demande à la relecture

Nous allons réunir les gestes des chapitres précédents. À la fin, une demande fictive complète doit posséder une seule ligne de suivi, un dossier Drive et une proposition A_RELIRE. Une demande sans objectif doit s’arrêter avec une explication. Une répétition identique ne doit pas provoquer un second appel au modèle. Le scénario B du chapitre 6 préparera le brouillon seulement après une décision humaine.

## Préparer une petite installation dont on comprend les limites

Gardez la planification désactivée. Exécutez un événement à la fois et n’autorisez personne à modifier Dossiers pendant un essai. Le laboratoire n’est pas un service multi-utilisateur : deux exécutions concurrentes pourraient franchir les mêmes contrôles. Son intérêt est de rendre chaque décision visible avant d’apprendre à renforcer ces garanties.

Dans un nouveau classeur de test, créez trois feuilles. **Entrees** contient les événements de l’annexe, **Dossiers** contient l’état courant et **Journal** conserve le résultat de chaque passage. N’effacez pas les essais précédents dans votre classeur personnel : repartez d’une nouvelle copie nommée « Studio Local - scénario A ».

Dans Entrees, utilisez ces en-têtes exacts, dans cet ordre : event_id, dossier_id, commerce, objectif, faits, inconnus, date_souhaitee, note. Pour le premier essai, ne saisissez que E-001. Le champ date_souhaitee est vide ou au format année-mois-jour, par exemple 2026-10-15. La note reste une pièce d’entrée : elle ne sera pas transmise au modèle.

Dans Dossiers, créez les colonnes dossier_id, commerce, objectif, faits, inconnus, date_souhaitee, statut, motif, drive_folder_id, version_proposition, texte_brouillon, manques, decision, version_approuvee, approbateur, date_accord et gmail_draft_id. Laissez les lignes de données vides. Dans Journal, créez event_id, dossier_id, etape, resultat, motif et heure. Tous ces champs sont des textes pour cet atelier, sauf l’heure de suivi dont vous pouvez choisir l’affichage dans Sheets.

Le formulaire du chapitre 2 reste une autre porte d’entrée. Pour les essais, la feuille Entrees permet notamment une ligne vide que Forms refuserait. Après les tests, faites pointer le déclencheur vers la feuille de réponses du formulaire et remappez chaque question vers son champ. Ajoutez alors une question « Référence de soumission » pour event_id, un identifiant unique fourni par l’opérateur de test. Ne faites pas passer cette convention de laboratoire pour une génération fiable d’identifiants en production.

## Rendre l’absence observable avant de chercher une ligne

Une recherche Sheets vide peut ne produire aucun paquet. Ajouter un routeur après elle ne fait pas renaître ce paquet. Pour ne pas dépendre d’une option implicite, notre montage utilise un petit **index** dans Make : une liste des identifiants dont la ligne a déjà été créée. L’index ne contient ni brief ni décision ; Sheets reste la référence du dossier.

Dans Make, ouvrez Data stores et créez « SL - index laboratoire », avec un champ texte `repere`. Réservez-lui l’espace minimal proposé compatible avec votre offre. Il doit être vide, comme Dossiers. La clé de chaque entrée sera le dossier_id. La documentation de Make décrit **Check the existence of a record** : ce module retourne un résultat de présence même quand la clé n’existe pas. C’est précisément la différence avec une recherche sans résultat. Référence : https://help.make.com/l6du-data-stores.

Pourquoi accepter cette petite complication ? Elle donne au lecteur un embranchement explicite « existe / n’existe pas ». En contrepartie, il faut maintenir l’index et la feuille ensemble. Si vous importez des dossiers existants, préparez leurs clés avant l’essai. Si une panne survient entre la création de ligne et l’ajout de clé, arrêtez et réconciliez les deux. Un second registre n’élimine pas les pannes ; il rend notre choix de routage contrôlable.

## Poser le déclencheur et les deux chemins

Créez « A - Demande vers relecture ». Ajoutez **Google Sheets > Watch New Rows**, connecté à Entrees. Sélectionnez le classeur, la feuille et les en-têtes. Limitez le premier passage à une ligne. Choisissez le point de départ avant E-001 dans le réglage du déclencheur ; sinon une ligne déjà présente peut être considérée comme ancienne. Lancez Run once et examinez le paquet : E-001, SL-001 et le commerce doivent être reconnaissables.

Ajoutez **Data store > Check the existence of a record**, sélectionnez l’index et mappez dossier_id dans Key. Ajoutez ensuite un Router avec deux routes : **Absent**, résultat d’existence faux ; **Présent**, résultat vrai. Ce sont des valeurs booléennes, pas les textes « absent » et « présent » que nous utilisons comme étiquettes. Vérifiez les valeurs dans la sortie du module.

Sur Absent, ajoutez **Google Sheets > Add a Row** vers Dossiers. Mappez les six données utiles depuis Entrees, fixez statut à NOUVEAU et laissez les champs de proposition et d’accord vides. Juste après, ajoutez **Data store > Add/replace a record** : Key reçoit dossier_id et repere reçoit le même identifiant. Désactivez Overwrite an existing record : une clé déjà présente doit provoquer une erreur visible. N’activez pas un remplacement de ligne Sheets ; c’est une création. Conservez le numéro de ligne retourné par Add a Row : les mises à jour de cette route l’utiliseront.

Sur Présent, ajoutez **Google Sheets > Search Rows**, feuille Dossiers, filtre dossier_id égal à celui de l’événement. Limitez à deux résultats pour détecter une incohérence, non à un seul pour la masquer. Ajoutez immédiatement **Array aggregator**, avec Search Rows comme Source Module, aucune valeur Group by et l’option **Stop processing after an empty aggregation** désactivée. Incluez dans Aggregated fields le numéro de ligne et toutes les colonnes de Dossiers. L’agrégateur réunit les résultats dans une liste, y compris une liste vide ; les champs de la recherche doivent désormais être lus dans cette liste. Référence : https://help.make.com/aggregator.

Après l’agrégateur, ajoutez un routeur. Une route continue seulement si `length(Array)` vaut 1. L’autre, définie comme route de repli, écrit INCOHERENCE_INDEX dans Journal et s’arrête. Zéro correspond à une clé sans ligne ; deux à un identifiant dupliqué. Sur la route autorisée, `get(Array; 1)` désigne l’unique dossier trouvé. Mappez ses champs et son numéro de ligne dans les étapes suivantes, pas un ancien paquet Search Rows. Pour le vérifier, créez provisoirement deux lignes de même identifiant : aucune des deux ne doit être modifiée. Corrigez l’incohérence avant de poursuivre.

Un Router ne fusionne pas ses branches. Ne dessinez pas de flèche imaginaire de Présent vers la suite d’Absent. Le nouveau dossier continue sur Absent. Sur Présent, comparez commerce, objectif, faits, inconnus et date_souhaitee aux valeurs de l’événement avec cinq égalités reliées par ET. Si elles sont identiques, ajoutez une ligne Journal avec REPETITION et terminez cette route. L’event_id peut être différent : E-003 répète le contenu de E-001.

Si au moins un de ces champs diffère, utilisez une route de repli exclusive. Inscrivez MODIFICATION_A_EXAMINER dans Journal et mettez la ligne existante en A_CORRIGER avec le motif « Nouvelle donnée reçue : comparer avec la proposition ». Conservez l’ancien contenu et son historique ; ne le remplacez pas par une donnée non relue. Effacez l’accord courant (decision, version_approuvee, approbateur, date_accord), après avoir conservé sa trace dans Journal. Si un brouillon Gmail existe, gardez son identifiant pour le retrouver et marquez-le à revoir : ne le supprimez pas automatiquement. Ce chemin n’appelle pas le modèle. Léa décide ensuite d’une nouvelle version. Une répétition, une correction et une panne ne sont pas le même événement.

## Arrêter une demande incomplète avec une raison

Sur le chemin du nouveau dossier, après l’index, ajoutez un routeur **Admissibilité**. Première route : la longueur de l’objectif nettoyé de ses espaces est nulle. Dans le filtre, utilisez `length(trim(objectif))`, où objectif est la valeur mappée, puis comparez à 0. Ajoutez Update a Row : numéro de ligne issu de Add a Row, statut A_COMPLETER, motif « Objectif absent : compléter la demande ». Conservez les autres valeurs. Ajoutez une ligne Journal portant le même motif, puis terminez la route.

Deuxième route : objectif non vide ET date_souhaitee vide. Elle poursuit la production. Troisième route : objectif non vide ET date présente. Convertissez cette date avec `parseDate(date_souhaitee; "YYYY-MM-DD")`, puis comparez-la au début du jour de l’essai dans le même fuseau horaire. Une date antérieure s’arrête en A_COMPLETER, motif « Date dépassée : confirmer une nouvelle date ». Une date du jour ou future peut continuer. Une date illisible est une erreur de donnée : interrompez le test, corrigez-la, n’utilisez pas la date courante par défaut.

Les routes « sans date » et « date acceptable » requièrent la même chaîne aval. Pour rester explicite, dupliquez cette chaîne sur les deux routes et vérifiez les mappings après duplication. Ne raccordez pas arbitrairement deux routes entre elles. Vous pouvez apprendre la chaîne sur le chemin sans date avant de dupliquer les modules. E-005 éprouve uniquement la route de date dépassée et ne doit atteindre ni Drive ni le modèle.

## Créer puis retrouver le dossier documentaire

Dans Google Drive, préparez manuellement un dossier parent privé nommé « Studio Local - laboratoire ». Sur la route admissible, ajoutez **Google Drive > Create a Folder**, sélectionnez ce parent et construisez un nom avec dossier_id et commerce. Aucun destinataire ni partage public n’est ajouté. Le dossier sert de rangement ; le scénario ne crée pas encore une page de présentation prête à envoyer.

Immédiatement après, placez Update a Row vers Dossiers. Mappez l’identifiant de dossier retourné par Drive dans drive_folder_id. Le numéro de ligne reste celui de la création Sheets, pas l’identifiant Drive. Ce sont deux références de nature différente.

Pour E-004, insérez temporairement, entre ces deux modules, un filtre qui refuse ce seul event_id. Le dossier est créé mais son identifiant n’est pas enregistré. Observez cette situation, puis retirez ce filtre de test. Avant de reprendre, cherchez le dossier dans le parent, vérifiez le nom et son contenu, puis inscrivez son identifiant dans la bonne ligne Sheets. Ne relancez pas toute la branche de création. Continuez la partie génération sur ce dossier existant avec un scénario de reprise copié, dont la première étape Search Rows lit cette ligne connue. Le chapitre 8 approfondit cette reprise contrôlée.

## Préparer trois textes sans appel payant à l’IA

Commencez avec **JSON > Parse JSON** et l’objet fixe du chapitre 4. Pour un dossier autre que SL-001, adaptez seulement dossier_id dans cet objet. La version reste prop-v1. Le but est de tester le routage et la validation sans appel d’IA facturé ; les modules restent comptés dans le quota Make.

Lorsque ce palier fonctionne, insérez **OpenAI > Generate a completion** avant Parse JSON. Choisissez une connexion API autorisée, un modèle accessible compatible avec cette opération et une seule complétion. Dans Messages, placez les règles du chapitre 4 dans un message de rôle system, puis les données dans un message user. Choisissez le format JSON object. L’instruction doit demander explicitement du JSON. Ne renseignez aucun outil appelable.

Le message user contient uniquement dossier_id, objectif, faits, inconnus et la version attendue prop-v1. Mappez ces valeurs depuis l’événement contrôlé, jamais la feuille entière. **Ne mappez pas note** : E-006 et E-007 restent dans le registre d’entrée, hors de la demande envoyée. L’identifiant de brouillon, le destinataire et l’approbateur ne sont pas des sorties attendues du modèle.

Exécutez un seul appel. Dans sa sortie, développez la première entrée de Choices, puis Message et Content. Le contenu doit être un texte JSON commençant par une accolade. Mappez ce **Content** dans **JSON string** de Parse JSON, à la place de l’objet fixe. Ne mappez ni l’identifiant de la réponse, ni la collection Choices entière. Selon la présentation du connecteur, un champ Result peut exposer le même texte ; retenez-le seulement après avoir comparé sa valeur à Content. La documentation décrit les paramètres du module, pas une preuve de fonctionnement dans votre compte : https://apps.make.com/openai-modules.

Si la sortie contient un refus, une erreur de quota ou un JSON tronqué, arrêtez cette exécution et consignez sa cause. N’utilisez pas une ancienne réponse conservée comme si elle provenait de ce dossier. Les crédits Make et la consommation de l’API sont deux dépenses distinctes. La réussite du palier simulé ne teste ni cette connexion ni le coût réel.

## Contrôler avant d’écrire A_RELIRE

Après Parse JSON, ajoutez un Router avec deux routes. La première porte le filtre **Structure conforme**. Exigez l’égalité du dossier_id retourné avec le dossier courant, version égale à prop-v1, une liste textes contenant exactement trois éléments et une liste manques. Dans la structure JSON configurée, textes et manques sont des listes de textes, pas des objets libres. Contrôlez aussi que les trois textes ne sont pas vides. Les fonctions `length`, `get` et `trim` permettent respectivement de compter, de lire les éléments 1 à 3 et de retirer les espaces périphériques.

Définissez la seconde route comme route de repli ; elle écrit « Structure non conforme » dans Journal, puis s’arrête. Si le parsing échoue avant le routeur, l’exécution doit rester en erreur visible et la ligne ne doit pas passer à A_RELIRE. Dans le laboratoire, inspectez cet échec et notez-le ; ne configurez pas une gestion d’erreur qui substitue automatiquement une réponse vide. Une condition qui n’a pas pu être vérifiée n’est pas une condition réussie.

Pour une sortie conforme, ajoutez Update a Row vers la même ligne : version_proposition reçoit prop-v1, texte_brouillon reçoit les trois textes séparés par des retours de ligne, manques reçoit la liste lisible et statut reçoit A_RELIRE. Laissez decision, version_approuvee, approbateur, date_accord et gmail_draft_id vides. Aucun champ « approuve » fourni par le modèle n’est mappé.

Ajoutez enfin une ligne Journal : event_id, dossier_id, étape « proposition », résultat A_RELIRE et heure de l’essai. Si note n’était pas vide, le motif indique « Note d’entrée écartée » sans recopier son contenu. Ouvrez Sheets et relisez réellement les trois textes contre les faits. A_RELIRE signifie « disponible pour examen », pas « vérité vérifiée ». Un horaire inventé avec un JSON conforme doit être corrigé au chapitre 6.

## Trois passages, puis cinq contre-épreuves

Repartez d’un index et d’une feuille Dossiers vides pour cette série, mais conservez les en-têtes. Rejouez les événements de l’annexe en ajoutant une ligne à la fois dans Entrees, après le dernier point lu par le déclencheur.

| Essai | Ce que vous devez observer |
|---|---|
| E-001 | Une ligne SL-001, une clé d’index, un dossier Drive, trois textes A_RELIRE ; aucun accord |
| E-002 | Une ligne SL-002 A_COMPLETER avec motif ; aucun dossier Drive et aucun appel au modèle |
| E-003 après E-001 | Journal REPETITION ; toujours une seule ligne SL-001, aucun nouvel appel ni dossier |
| Réponse à deux textes | Pas de passage à A_RELIRE ; motif structure ou erreur visible |
| E-004 | Objet Drive retrouvé avant reprise ; pas de seconde création aveugle |
| E-005 | Date passée signalée ; aucune proposition produite |
| E-006 et E-007 | Champ note absent du message transmis ; aucune permission élargie |
| E-008 | Résultat conforme et crédits réellement observés consignés, sans extrapolation prématurée |

**Vous avez réussi si** vous pouvez montrer les objets dans Sheets et Drive, expliquer les arrêts et retrouver l’événement dans Journal. Un dessin sans ces observations n’est pas la preuve recherchée. Les modules décrits sont documentés ; les essais dans vos comptes, leurs permissions et leurs interfaces restent à exécuter. Notez l’aide nécessaire : elle indique une amélioration à apporter au mode opératoire, pas une faute du lecteur.

## Adapter les états à votre activité

Un nouvel état est utile s’il change la prochaine action, son responsable ou une condition de passage. « Client sympathique » ne définit pas un état de traitement. « Mesures à recevoir » peut en définir un pour Nadia, puisqu’il interdit de préparer un devis ferme. Pour Tom, demande reçue et place confirmée doivent rester distinctes. Pour Sami, accord sur une révision ne signifie pas séance planifiée.

Avant d’ajouter un état, écrivez quatre éléments : comment on y entre, qui doit agir, ce qui permet d’en sortir et ce qui reste interdit. Si vous ne pouvez pas les nommer, une note peut suffire. Cette grille empêche de multiplier les couleurs sans clarifier le travail.
