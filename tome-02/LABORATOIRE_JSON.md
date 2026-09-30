# Premier laboratoire JSON dans Make

Édition 2026, révision 0.17. Complément du chapitre 4 du tome 2. Procédure vérifiée le 29 septembre 2026 pour le module Parse JSON seul. Les libellés d’interface peuvent évoluer.

## Objectif

Passer d’un texte JSON à des champs lisibles par un scénario. Il ne s’agit ni d’une génération par IA ni d’une validation de la vérité du contenu. Ce laboratoire ne demande aucune connexion Gmail, Drive ou fournisseur d’IA ; les exécutions consomment néanmoins des crédits Make.

## Saisie

1. Choisir **Create scenario**, puis le grand **+** du canevas initial. Rechercher **JSON**, puis **Parse JSON**.
2. Laisser la planification désactivée. Vérifier que le module JSON est le point de départ (l’horloge lui est associée).
3. Coller l’objet ci-dessous dans **JSON string**. Pour ce premier essai, Data structure peut rester vide : Make propose de déduire les champs à l’exécution manuelle.
4. Cliquer sur **Save** dans le module.

```json
{
  "dossier_id": "SL-001",
  "version": "prop-v1",
  "textes": [
    "Le samedi, retrouvez le brunch du Café des Tilleuls.",
    "Un brunch au café pour retrouver les habitués.",
    "Le Café des Tilleuls prépare son rendez-vous du samedi."
  ],
  "manques": ["horaire", "prix", "menu", "réservation"]
}
```

## Exécution et observation

1. Cliquer sur **Run once**. Dans ce laboratoire isolé, l’avertissement sur les données inutilisées en fin de scénario est attendu ; **Run anyway** permet cet essai. Ne généralisez pas ce choix à d’autres alertes ou à un scénario réel.
2. Ouvrir la bulle d’exécution au-dessus du module. Dans **Output**, repérer un seul **Bundle 1**, l’identifiant **SL-001**, la version **prop-v1**, puis les listes **textes** et **manques**.
3. Utiliser les **+** des listes pour comparer les valeurs avec l’exemple. La coche verte signifie que le module s’est exécuté ; elle ne signifie pas que les propositions ont été approuvées.
4. Enregistrer le scénario depuis sa barre d’outils et laisser la planification désactivée.

Le test manuel observé affiche une opération et un crédit. Ce chiffre porte sur le parseur de cet essai, pas sur le coût du circuit complet.

Si l’exécution se termine sans sortie, vérifier le point de départ : un module simplement posé à côté n’est pas automatiquement relié au déclenchement.

## Limites à conserver

La réussite de Parse JSON ne remplace pas les contrôles de structure du chapitre 5, notamment le nombre de textes. Un JSON à deux textes peut être lisible, mais ne satisfait pas notre contrat de trois propositions. Le contrôle suivant doit refuser cette progression. Une proposition contenant un prix inventé doit aussi être refusée sur le fond, même si le JSON est valide.

Les connexions Google et la création d’un brouillon dans le scénario B ont été essayées séparément depuis ce laboratoire. L’appel au modèle, le scénario A complet et ses neuf cas de recette restent à vérifier. Aucune réussite de Parse JSON seul ne clôt ces essais.

## Prolongement : mapping et filtre

## Voir le mapping, puis lui demander une preuve

Nous allons prolonger le laboratoire JSON sans connecter un compte externe. Parse JSON sait lire l’objet du livre ; une deuxième étape va en recevoir la référence. Le résultat recherché n’est pas une copie tapée au clavier, mais une relation qui reste correcte lorsque l’entrée change.

Une association se comprend avec trois éléments : le module qui fournit la donnée, le champ choisi dans sa sortie et l’emplacement qui doit la recevoir. L’exemple SL-001 visible dans le panneau vous aide à reconnaître la donnée. Ce n’est pas cette valeur d’exemple que vous voulez figer. Vous voulez le champ dossier_id, quelle que soit sa valeur lors du prochain essai.

1. Repartez du scénario JSON après une exécution réussie. Cliquez sur le petit + attaché à ce module, et non sur un emplacement libre du canevas. Choisissez Tools, puis Set variable.
2. Dans Variable name, saisissez reference_dossier. Cliquez dans Variable value pour ouvrir les données disponibles à gauche.
3. Sous le module JSON, sélectionnez dossier_id. Make insère un repère coloré dans le champ. Sur la capture, son préfixe 2 correspond au numéro du module source ; votre numéro peut être différent.


4. Enregistrez le module, lancez Run once, puis ouvrez la sortie de Tools. Vous devez retrouver reference_dossier égal à SL-001. Le module n’écrit rien dans Sheets, Drive ou Gmail : il conserve seulement une valeur temporaire pendant cet essai.
5. Dans l’entrée JSON, changez uniquement dossier_id en SL-002. Enregistrez, relancez et inspectez la nouvelle sortie de Tools. Elle doit afficher SL-002 sans modification de ce deuxième module.

Ce second essai est décisif. Une constante SL-001 tapée dans Tools donnerait le bon résultat au premier passage, mais échouerait au second. Vous venez de distinguer « cela ressemble au résultat attendu » de « la relation fonctionne ». La même épreuve servira pour le numéro de ligne Sheets, l’identifiant du dossier Drive et la version approuvée.


## Lire une capture sans lui attribuer plus qu’elle ne montre

Dans l’inspecteur Make, Input désigne ce que le module a reçu et Output ce qu’il a produit. Le résumé d’opérations et de crédits décrit cette exécution technique. Les textes de notre laboratoire sont fournis à l’avance ; leur présence dans Output ne prouve donc pas qu’un modèle les a rédigés.


La sortie détaillée permet de compter les trois propositions et de repérer les informations manquantes. Pour déclarer le contenu utilisable, il faut encore le comparer aux faits de l’entretien. Une exécution réussie et une proposition fidèle sont deux observations différentes ; aucune ne remplace l’autre.

## Ajouter une barrière sans appeler une IA

Une fois le mapping vérifié, vous pouvez apprendre le filtre sur une copie de ce laboratoire. Entre JSON et Tools, ouvrez le lien et configurez un filtre nommé « Un seul dossier autorisé ». À gauche, sélectionnez dossier_id depuis JSON ; choisissez l’égalité de texte ; à droite, saisissez SL-001. Il s’agit volontairement d’une restriction de laboratoire, pas d’une règle pour tous les clients.


Prévoyez les résultats avant de lancer : SL-001 doit atteindre Tools ; SL-002 doit s’arrêter sur le lien. Le second cas ne constitue pas une panne. C’est le résultat attendu d’une condition fausse. Examinez le détail du filtre et vérifiez qu’aucune sortie nouvelle de Tools n’a été produite pour le cas refusé. Ne lisez pas la bulle d’un ancien essai comme la preuve du passage courant.

Retirez ensuite cette restriction dans une copie de travail destinée aux autres dossiers, ou remplacez-la par la règle métier réellement voulue. Conserver « égal à SL-001 » dans le circuit général ferait échouer tous les autres dossiers. Une protection de test n’est pas automatiquement une protection de production.

## Construire une erreur qui apprend quelque chose

Gardez une copie de l’objet JSON correct. Dans un essai distinct, retirez la virgule qui sépare dossier_id et version. Le parseur doit signaler un JSON invalide. Tools ne doit pas recevoir une nouvelle référence issue de cette entrée. Rétablissez la virgule et rejouez le cas de référence : la sortie doit redevenir lisible.

Comparez maintenant cette erreur avec un objet valide qui ne contient que deux textes. Le premier objet est illisible pour le parseur ; le second peut être lu, mais ne respecte pas notre demande de trois propositions. C’est pourquoi le contrôle de structure du chapitre 5 reste nécessaire. Ajouter une consigne plus insistante au modèle ne réparerait pas une virgule retirée dans la configuration ; activer « ignorer l’erreur » ne donnerait pas le troisième texte manquant.

Votre journal peut tenir en quatre lignes : entrée utilisée, résultat attendu, résultat observé, correction. Inscrivez « non exécuté » si vous n’avez pas lancé un cas. Ce n’est pas un échec de lecture : c’est une information qui évite de prendre une intention pour un résultat acquis.


## Blueprint de démonstration

Le fichier [mapping-et-filtre.blueprint.json](mapping-et-filtre.blueprint.json) est l’export natif du laboratoire exécuté le 29 septembre 2026. Il contient JSON puis Tools, avec la restriction SL-001 déjà active. Pour apprendre le mapping seul, utilisez d’abord une copie sans ce filtre. Ce fichier ne construit pas le scénario A/B et ne contient aucune connexion Google ou clé API. Importez-le uniquement dans un nouveau scénario de test, gardez la planification désactivée et contrôlez chaque module avant Run once. Le petit emplacement vide éventuel n’est pas une étape exécutée.
