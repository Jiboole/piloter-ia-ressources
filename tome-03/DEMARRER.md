# Ouvrir l'application sans recopier le code

Ressource de l’édition 2026, révision 0.15. La version de l’application demeure 1.0.0.

## Ce que vous obtenez

Un atelier local pour créer une demande fictive, la faire relire, approuver une révision et exporter les données. Aucun envoi automatique, aucune synchronisation entre appareils, aucun service IA à payer pour exécuter ce code. Ce n'est pas encore une application validée pour les boutiques.

## 1. Récupérer les fichiers

Sur la page du dépôt, choisissez **Code > Download ZIP**. Décompressez l'archive. Dans Visual Studio Code, utilisez **Fichier > Ouvrir un dossier** et choisissez le sous-dossier **tome-03/studio-local**. Vous devez voir App.tsx et package.json directement dans l'explorateur, pas seulement un dossier tome-03.

Vous n'avez pas besoin de Git pour ce premier lancement. Le livre introduit Git ensuite pour comprendre et conserver vos changements.

## 2. Vérifier Node et ouvrir le terminal

Installez Node depuis https://nodejs.org/en/download et VS Code depuis https://code.visualstudio.com/download. **Node 22.18 ou plus récent** permet d’exécuter directement les tests TypeScript utilisés ici. La configuration de référence testée utilise **Node 24.19.0**, Expo **57.0.25**, React Native **0.86.3** et React **19.2.3**. Le fichier package-lock.json fixe les dépendances de cet instant. Il ne garantit pas leur innocuité ni leur compatibilité avec tous les appareils futurs.

Dans VS Code, ouvrez **Terminal > Nouveau terminal**. Sur Windows, choisissez **Command Prompt / Invite de commandes** dans le sélecteur du terminal pour éviter de modifier la politique d'exécution PowerShell. Sur macOS, le terminal intégré zsh convient.

Tapez, une commande à la fois :

```sh
node --version
npm --version
```

La première commande doit afficher une version au moins égale à 22.18. Il n’est pas nécessaire de remplacer une version compatible pour obtenir exactement v24.19.0. Si elle est inconnue, fermez puis rouvrez VS Code après l’installation. Ne poursuivez pas avec une suite de commandes correctives trouvées au hasard.

## 3. Installer puis contrôler

```sh
npm ci
node --test core.test.ts suivi.test.ts edition.test.ts
npx tsc --noEmit
```

npm ci télécharge les dépendances définies par le verrouillage. Attendez la fin. La suite doit annoncer **22 réussites et zéro échec** : 12 pour le noyau, 7 pour le suivi, 3 pour les conventions de l’écran. Le raccourci `npm test` lance ces mêmes trois fichiers. Vous pouvez aussi exécuter chaque fichier séparément en suivant les chapitres. La vérification TypeScript réussie revient à l’invite sans diagnostic d’erreur ; sa configuration concerne l’application **et les trois fichiers de tests**. Un avertissement MODULE_TYPELESS_PACKAGE_JSON peut être affiché sans faire échouer les tests. Conservez les messages en cas de problème, en retirant les chemins personnels avant partage.

Les alertes npm doivent être examinées : notre environnement de préparation signalait 11 alertes modérées. N'exécutez pas une réparation forcée sans comprendre ses changements.

## 4. Ouvrir sur téléphone

Installez Expo Go depuis la boutique officielle de votre téléphone, puis :

```sh
npm start
```

Laissez le terminal ouvert. Reliez ordinateur et téléphone au même réseau. Sur iOS, utilisez l'appareil photo pour ouvrir le QR Expo ; sur Android, utilisez le lecteur proposé par Expo Go. Ce QR de lancement temporaire n'est pas le QR des ressources du livre.

**Arrêt utile :** si Expo Go indique que le SDK du projet n'est pas pris en charge, relevez sa version et le message. N'effacez pas package-lock.json pour tenter votre chance. Consultez les [consignes Expo](https://docs.expo.dev/get-started/start-developing/) et l'[état du pack](../ERRATA.md). Les essais iOS/Android de ce pack sont en attente : cette procédure reste à confirmer sur les appareils du test.

La [matrice officielle SDK 57](https://docs.expo.dev/versions/v57.0.0/) indique Node minimum 22.13.x et iOS 16.4 minimum. Le seuil 22.18 retenu pour cet atelier permet en plus l’exécution TypeScript native sans option expérimentale. Le minimum d’Expo et la version de référence effectivement testée ne sont pas la même information.

## 5. Premier résultat observable

Saisissez un nom fictif, « Café Test » et « Préparer trois questions ». Créez la demande. Faites-la passer à la relecture, indiquez un motif, puis approuvez-la. Fermez et rouvrez l'application. Vérifiez l'état et l'historique. Suivez ensuite le [protocole mobile](../recette/TEST_MOBILE.md).

Pour arrêter le serveur local, revenez au terminal et pressez **Ctrl+C**.

## Si vous bloquez

| Message ou symptôme | Premier contrôle |
|---|---|
| package.json introuvable | Ouvrir le sous-dossier studio-local, puis un nouveau terminal |
| node ou npm inconnu | Vérifier l'installation, puis rouvrir VS Code |
| PowerShell refuse npm.ps1 | Utiliser Invite de commandes, sans désactiver globalement la sécurité |
| Téléphone ne rejoint pas le serveur | Vérifier le même Wi-Fi et un éventuel blocage du réseau |
| SDK incompatible | Consulter l'erratum ; ne pas mélanger des versions au hasard |
| Erreur de code dès le départ | Repartir d'une nouvelle extraction du ZIP dans un autre dossier, en conservant l'ancien |

Aucune commande EAS Build ou Submit n'est nécessaire à ce premier essai. La possession d'un compte Apple ou Google Play ne vaut pas autorisation de publier automatiquement.
