# Études préliminaires

## Analyse du problème

Dans le contexte universitaire, les étudiants ont besoin d’un accès clair et centralisé aux opportunités proposées par les professeurs (projets de recherche, stages, encadrements, disponibilités).  
Actuellement, l’information est dispersée sur plusieurs canaux (emails, affiches, annonces ponctuelles, plateformes externes), ce qui rend difficile la recherche rapide et efficace.  

Du côté des professeurs, il n’existe pas d’outil simple pour partager ces informations de manière structurée et accessible.  
Le personnel administratif, quant à lui, n’a pas de plateforme centralisée pour superviser ou faciliter la diffusion de ces données.

**Problème principal :**  
- Manque de centralisation et de visibilité de l’information.  
- Difficulté pour les étudiants à trouver rapidement des opportunités pertinentes.  
- Absence d’un outil intuitif pour le partage d’informations académiques.  

---

## Exigences

### Exigences fonctionnelles
- Les professeurs doivent pouvoir publier leurs informations (opportunités de recherche, disponibilité pour supervision, domaines d’intérêt).  
- Les étudiants doivent pouvoir consulter, rechercher et filtrer ces informations.  
- Les étudiants doivent pouvoir contacter directement un professeur via son adresse email.  
- Le personnel administratif doit pouvoir avoir un rôle de consultation et éventuellement de validation de certaines informations.  
- L’interface doit proposer des vues claires : page d’accueil (hub d’informations), profils des professeurs, éventuellement profils étudiants.  

### Exigences non fonctionnelles
- **Simplicité d’utilisation** : interface intuitive et claire.  
- **Accessibilité** : compatible avec différents navigateurs et appareils.  
- **Confidentialité** : gestion de la visibilité des informations partagées.  
- **Performance** : recherche rapide dans les opportunités disponibles.  
- **Évolutivité** : possibilité d’ajouter de nouvelles fonctionnalités si besoin (ex. filtres supplémentaires, statistiques).  

---

## Recherche de solutions

### Solutions existantes
- Plateformes de gestion de candidatures (ex. AcademicJobs, LinkedIn, Portails de stages universitaires).  
    - Points communs : centralisation des offres, mise en relation étudiants-professeurs.  
    - Limites : souvent orientées vers la gestion des candidatures (soumission, suivi, acceptation/rejet).  

- Outils de communication génériques (emails, forums, Moodle, sites web départementaux).  
    - Points communs : diffusion d’information.  
    - Limites : peu structurés, information dispersée, difficile à rechercher efficacement.  

### Justification du choix retenu
Le projet se distingue des plateformes de candidature en se concentrant uniquement sur **le partage d’informations**.  
Ce choix permet de :  
- Réduire la complexité technique (pas de gestion de candidatures).  
- Offrir un outil simple et ciblé répondant directement aux besoins identifiés.  
- Faciliter l’adoption par les étudiants et professeurs en gardant une interface claire.  

---

## Méthodologie

Le projet suivra une approche itérative et incrémentale, inspirée des méthodes agiles :  
- **Phase 1** : Analyse des besoins (actuellement en cours).  
- **Phase 2** : Conception des prototypes (maquettes, workflows, validation avec le superviseur et utilisateurs potentiels).  
- **Phase 3** : Développement progressif des fonctionnalités principales.  
- **Phase 4** : Tests et validation (avec étudiants, professeurs, personnel administratif).  
- **Phase 5** : Améliorations et déploiement final.  

Chaque semaine, un suivi sera effectué (voir `suivi.md`) pour documenter l’avancement, ajuster les objectifs et intégrer les retours.
