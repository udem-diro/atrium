# Suivi de projet

## Semaine 1

??? note "Discussion initiale et cadrage du projet"
    - [x] Définir l’idée générale et les fonctionnalités principales du projet
    - [x] Clarifier ce que le projet fait et ce qu’il ne fait pas
        * [x] Le projet est une **plateforme de partage d’informations** (professeurs → étudiants)
        * [x] Permet aux étudiants de chercher des opportunités et contacter directement les professeurs via email
        * [ ] Pas une plateforme de **gestion de candidatures** (pas de suivi, acceptation/rejet)
    - [x] Discussion sur l’utilisation potentielle par le personnel administratif

!!! info "Notes"
    - Les rôles principaux : **étudiants, professeurs, personnel administratif**
    - Objectif : simplifier la recherche et l’accès à l’information

!!! warning "Difficultés rencontrées"
    - Aucune difficulté technique majeure cette semaine, principalement cadrage conceptuel

!!! abstract "Prochaines étapes"
    - Identifier les informations pertinentes à afficher
    - Définir les actions possibles pour chaque rôle : étudiants, professeurs, administrateurs

---

## Semaine 2

??? note "Premières réflexions techniques et fonctionnelles"
    - [x] Discussion sur les intégrations possibles
        * [x] Décision : pas besoin d’intégration avec les API/bibliothèques de l’université
    - [x] Premières idées sur les workflows et l’interface
    - [ ] Définir quelles informations sont pertinentes pour étudiants et professeurs
    - [x] Début de réflexion sur la confidentialité et la visibilité des données
        * [ ] Décider si l’information est publique ou contrôlée par paramètres de visibilité

!!! info "Notes"
    - Importance d’anticiper les enjeux de **confidentialité** et de **gestion de la visibilité**
    - Début de réflexion sur la structuration de l’interface utilisateur

!!! warning "Difficultés rencontrées"
    - Pas de blocage technique, mais plusieurs questions ouvertes à explorer (visibilité, workflow précis)

!!! abstract "Prochaines étapes"
    - Esquisser un prototype visuel de l’interface
    - Rechercher des plateformes similaires pour s’inspirer
    - Approfondir la réflexion sur les données pertinentes pour chaque rôle

---

## Semaine 3

??? note "Travail sur le prototype et inspiration"
    - [x] Présentation d’outils et plateformes similaires
    - [x] Création d’un prototype préliminaire :
        * Vue principale (hub d’informations)
        * Vue profil des professeurs et étudiants
    - [x] Discussions sur les améliorations possibles : optimisation, ajout de vues et options
    - [x] Importance de consulter le personnel administratif pour enrichir les fonctionnalités

!!! info "Notes"
    - Le prototype sert de base pour discuter des besoins réels des utilisateurs
    - La participation de l’administration est cruciale pour compléter les cas d’usage

!!! warning "Difficultés rencontrées"
    - Nécessité de clarifier davantage les besoins de l’administration avant d’avancer

!!! abstract "Prochaines étapes"
    - Corriger et améliorer le prototype selon les retours
    - Démarrer l’analyse logicielle (exigences, besoins, cas d’utilisation, workflows détaillés)
    - Structurer `etudes_preliminaires.md`

---

## Semaine 4

??? note "Affinage du prototype et des informations pertinentes"
    - [x] Discussions autour du prototype : bonnes orientations, pas de problèmes majeurs de design
    - [x] Liste des informations pour chaque acteur (professeur, étudiant, administration)
        * Définir ce que chaque acteur peut publier et ce qu’il recherche
        * Filtrer les informations pertinentes (obligatoires vs optionnelles)
        * Réflexion sur la présentation des informations aux utilisateurs
    - [x] Exemple concret : 
        * Lorsqu’un étudiant saisit son programme d’études → une liste de cours lui est proposée
        * Il peut cocher les cours suivis
        * Automatisation : calcul automatique du nombre de crédits
    - [x] Discussion sur l’utilisation possible d’API externes (LinkedIn, Microsoft Teams) pour enrichir les informations et les disponibilités

!!! info "Notes"
    - Le projet avance dans une bonne direction
    - Le prototype devient plus complet et commence à intégrer des cas concrets
    - Les API externes pourraient apporter une valeur ajoutée mais nécessitent une étude plus approfondie

!!! warning "Difficultés rencontrées"
    - Aucune difficulté majeure signalée, mais des recherches nécessaires sur l’intégration des API externes (LinkedIn, Teams)

!!! abstract "Prochaines étapes"
    - Explorer Supabase pour la conception et gestion du système de données
    - Finaliser le prototype avec toutes les vues
    - Compléter la liste des exigences dans `analysis.md`

## Semaine 5

??? note "Rôle des administrateurs, logo et prototype"
    - [x] Discussion sur le rôle des administrateurs du département et les fonctionnalités qu’ils peuvent utiliser
    - [x] Choix du nom et du logo du projet
    - [x] Revue du prototype avec suggestions d’amélioration
        * Version finale V1 du prototype à terminer pour la semaine prochaine
    - [x] Début de la discussion sur le modèle de données : choix des tables et implantation sur Supabase
    - [x] Possibilité de préremplir la base avec les noms des professeurs et leurs informations de base
        * Avantage : éviter aux professeurs de créer un nouveau compte, juste changer le mot de passe temporaire
    - [ ] Difficulté : comment améliorer les interfaces et sélectionner les informations pertinentes pour chaque acteur
    - [ ] Réduire le travail manuel pour les utilisateurs

!!! info "Notes"
    - Prototype globalement bien orienté
    - Les discussions ont permis de clarifier le rôle des administrateurs et les informations à gérer pour chaque acteur

!!! warning "Difficultés rencontrées"
    - Comment rendre l’interface simple tout en présentant toutes les informations pertinentes
    - Gestion du préremplissage de la base pour les professeurs

!!! abstract "Prochaines étapes"
    - Créer le diagramme EA (Entité-Association) du système
    - Finaliser la version V1 des interfaces

## Semaine 6
??? note "Modélisation du modèle E/A et structuration des données"
    - [x] Travail approfondi sur le diagramme Entité-Association (E/A) via Visual Paradigm
    - [x] Discussions pour clarifier les relations entre acteurs (étudiants, professeurs, administration)
    - [x] Révisions successives pour obtenir une base solide et cohérente
    - [ ] Validation finale du modèle (encore en cours cette semaine)

!!! info "Notes"
    - Le modèle de données est une étape critique car il conditionne l’ensemble du projet
    - Priorité donnée à la clarté des relations et à la simplicité des structures

!!! warning "Difficultés rencontrées"
    - Travail long et complexe : nécessité d’itérer plusieurs fois pour obtenir un modèle robuste
    - Importance d’anticiper les futurs cas d’usage afin d’éviter les modifications lourdes plus tard

!!! abstract "Prochaines étapes"
    - Finaliser le modèle E/A
    - Préparer la création des tables dans Supabase

## Semaine 7
??? note "Exploration et prise en main de Supabase + Finalisation des interfaces"
    - [x] Introduction à Supabase : gestion BD, authentification, règles de visibilité
    - [x] Finalisation de la V1 du modèle E/A et préparation pour l’implémentation
    - [x] Progression sur Figma : interfaces des pages principales (home, profils, navigation)
    - [ ] Choix des derniers éléments UI (boutons, couleurs, icônes)

!!! info "Notes"
    - Supabase simplifie la gestion backend mais demande une compréhension de son workflow (policies, auth, tables)
    - Le design figma devient désormais suffisamment complet pour guider le développement

!!! warning "Difficultés rencontrées"
    - Temps nécessaire pour bien comprendre la logique Supabase (policies, row-level security)
    - Ajustements fréquents du prototype pour garder une interface claire et cohérente

!!! abstract "Prochaines étapes"
    - Créer les tables dans Supabase en suivant le modèle final
    - Commencer la mise en place du projet React

## Semaine 8
??? note "Installation du projet et première implémentation"
    - [x] Setup du projet : React + Typescript + TailwindCSS
    - [x] Connexion du projet à Supabase (client + configuration sécurisée)
    - [x] Structure du code en modules : `components`, `pages`, `views`, `apis`, `utils`
    - [x] Implémentation de la **Homepage** suivant le design Figma
    - [x] Mise en place du routing avec **React Router**
    - [x] Ajout de la librairie **react-icons**
    - [ ] Tests d’affichage sur différents devices (responsive encore en amélioration)

!!! info "Notes"
    - Organisation du code pensée pour faciliter l’évolutivité
    - Utilisation d’un store global pour éviter le *prop drilling* et améliorer la gestion du state

!!! warning "Difficultés rencontrées"
    - Prise en main du workflow React + Tailwind + Supabase (temps d’adaptation)
    - Nécessité d’optimiser la structure des composants pour éviter la duplication

!!! abstract "Prochaines étapes"
    - Améliorer les vues secondaires (profils, liste des projets/offres)
    - Finaliser le responsive design

## Semaine 9
??? note "Refinements du code et finalisation du modèle Supabase"
    - [x] Refactoring du code pour améliorer la lisibilité et modularité
    - [x] Finalisation complète du modèle E/A
    - [x] Création et configuration des tables dans Supabase
    - [x] Amélioration du responsive design (mobile → tablette → desktop)
    - [ ] Début de création des endpoints / fichiers API pour communiquer avec Supabase

!!! info "Notes"
    - La base de données est maintenant fonctionnelle et prête à accueillir les données réelles
    - L’interface devient stable et utilisable dans ses premières pages

!!! warning "Difficultés rencontrées"
    - Ajustements délicats pour faire correspondre exactement les vues avec les données réelles
    - Adaptation progressive au système de policies de Supabase

!!! abstract "Prochaines étapes"
    - Terminer l’implémentation des vues restantes
    - Créer les API CRUD pour les entités (professeur, étudiant, projet, etc.)
    - Connecter l’interface aux données et implémenter les fonctionnalités interactives
    
## Semaine 10

??? note "Implémentation des vues restantes et début de l’authentification"
    - [x] Finalisation des vues restantes de l’application
    - [x] Début de l’implémentation du signup et login
    - [ ] Gestion automatique de la création d’un profil étudiant après l’inscription
    - [ ] Résolution des incohérences entre auth.users et la table etudiants

!!! info "Notes"
    - L’interface est presque complète sur la partie visuelle
    - Les premières interactions réelles commencent à être intégrées

!!! warning "Difficultés rencontrées"
    - Problème lors du signup : la création d'un étudiant depuis auth.users ne se faisait pas correctement
    - Nécessité d’ajuster la logique Supabase (triggers, RLS, inserts liés)

!!! abstract "Prochaines étapes"
    - Terminer le système d’inscription complet (étudiant + profil)
    - Stabiliser le login
    - Connecter les premières données réelles au frontend

## Semaine 11

??? note "Connexion du frontend à la base de données et fonctionnalités de recherche/tri"
    - [x] Liaison complète du frontend avec la base de données Supabase
    - [x] Affichage dynamique basé sur les données réelles
    - [x] Ajout de la barre de recherche
    - [x] Filtrage et triage (filtres rapides + dropdown)
    - [x] Signup fonctionnel
    - [x] Login entièrement opérationnel

!!! info "Notes"
    - L'application commence à être pleinement interactive
    - Le contenu affiché provient désormais de données réelles

!!! warning "Difficultés rencontrées"
    - Adaptation du système de filtres avec les structures de données
    - Synchronisation entre chargement initial et mises à jour dynamiques

!!! abstract "Prochaines étapes"
    - Offrir aux utilisateurs connectés la possibilité de modifier leur profil
    - Débuter l’ajout des opportunités côté professeur

## Semaine 12

??? note "Gestion des profils utilisateurs et ajout des opportunités"
    - [x] Ajout de la modification du profil étudiant
    - [x] Ajout de la modification du profil professeur
    - [x] Implémentation de l'ajout des opportunités (fonctionnalité cœur)
    - [x] Améliorations visuelles de l’interface
    - [x] Corrections de bugs mineurs dans l’UI

!!! info "Notes"
    - L’application est maintenant fonctionnelle pour les deux types d’utilisateurs
    - L’ajout d’opportunités rend l’outil réellement utile

!!! warning "Difficultés rencontrées"
    - Gestion des droits (RLS) pour la modification des profils
    - Compatibilité responsive et cohérence graphique

!!! abstract "Prochaines étapes"
    - Finaliser toutes les fonctionnalités restantes
    - Commencer les tests utilisateurs

## Semaine 13

??? note "Finalisation, tests et préparation du rendu"
    - [x] Rédaction du rapport final
    - [x] Préparation de la présentation orale
    - [x] Tests utilisateurs avec plusieurs personnes
    - [x] Corrections des bugs détectés

!!! info "Notes"
    - Les tests externes ont permis de repérer plusieurs problèmes mineurs corrigés rapidement
    - L’application atteint un niveau de stabilité suffisant pour le rendu final

!!! warning "Difficultés rencontrées"
    - Ajustements de dernière minute sur l’UX
    - Quelques incohérences de données résolues avant la livraison

!!! abstract "Prochaines étapes"
    - Livraison du projet
    - Présentation finale devant le jury
