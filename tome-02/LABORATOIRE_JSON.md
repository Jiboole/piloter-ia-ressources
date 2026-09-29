# Premier laboratoire JSON dans Make

Complément du chapitre 4 du tome 2. Procédure vérifiée le 29 septembre 2026 pour le module Parse JSON seul. Les libellés d’interface peuvent évoluer.

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

Les connexions Google, l’appel au modèle, les brouillons Gmail et les huit cas de recette du circuit complet restent à vérifier séparément. Aucune réussite de ce laboratoire ne clôt ces essais.
