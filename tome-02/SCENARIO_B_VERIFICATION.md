# Scénario B — essai observé sur données fictives

Édition 2026, révision 0.15. Complément du chapitre 6 du tome 2. Essai du 29 septembre 2026 ; planification désactivée.

## Le résultat

Huit lignes fictives ont été préparées dans Dossiers. SL-B01 possédait une décision APPROUVE portant sur sa version courante prop-v2, un approbateur, une date, un texte et aucun identifiant de brouillon. Sept autres lignes violaient chacune une condition : ancienne version approuvée, approbateur absent, date absente, brouillon déjà enregistré, décision A_CORRIGER, versions vides ou texte vide.

Le scénario exécuté suivait ce trajet : Search Rows dans Google Sheets, filtre « Accord courant sans brouillon », Gmail « Create a draft email », Update a Row dans Dossiers, puis Add a Row dans Journal. Au premier passage, SL-B01 seul a franchi le filtre. Le brouillon a été constaté dans Gmail ; son identifiant a été inscrit dans la ligne, passée à BROUILLON_PRET. Journal contient une trace de l’action. Les sept autres lignes sont restées inchangées.

Dans cet essai, la sortie Gmail présentait `draftId` pour le brouillon et `id` pour son message. Mappez `draftId` vers `gmail_draft_id`, puis vérifiez la valeur en ouvrant le brouillon. Le nom des champs peut varier avec le connecteur : inspectez votre sortie réelle.

Au second passage, sans modifier les données, aucun dossier n’a franchi le filtre et Gmail n’a pas été appelé. Une recherche indépendante dans Gmail n’a trouvé aucun nouveau brouillon. Aucun message n’a été envoyé.

## Ce que cela valide

Le chemin normal du scénario B, les sept refus préparés et le rejeu sans deuxième brouillon ont fonctionné dans ce laboratoire. Les captures authentiques de ces deux passages sont intégrées au chapitre 6 du livre. L’essai isolé des connexions Sheets, Drive et Gmail avait également réussi.

## Ce qui reste à éprouver

Le scénario A complet et ses neuf événements, une panne après la création Gmail mais avant l’écriture Sheets, la reprise contrôlée et deux exécutions simultanées n’ont pas été validés. Un second passage bloqué par le filtre ne garantit pas à lui seul l’absence de doublon en cas de panne ou de concurrence. Retrouvez alors le brouillon dans Gmail, rapprochez son identifiant de la ligne du dossier et consignez la décision avant toute reprise.

Les captures d’un compte privé et le blueprint contenant des identifiants de connexion ne sont pas publiés dans ce dépôt. Le livre montre uniquement les zones utiles de l’interface avec des données fictives.
