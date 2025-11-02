# Patterns POO et Programmation Fonctionnelle

## Définitions des Paradigmes

### Programmation Orientée Objet (POO)

La **Programmation Orientée Objet** est un paradigme de programmation qui organise le code autour du concept d’**objets**, qui sont des instances de classes.  
Ces objets contiennent à la fois des **données (attributs)** et des **comportements (méthodes)**.  

Les principes fondamentaux de la POO sont :

- **Encapsulation** : Regroupement des données et des méthodes qui les manipulent, avec contrôle de l'accès via des modificateurs (`public`, `private`, `protected`).
- **Héritage** : Mécanisme permettant à une classe de dériver d'une autre classe, héritant de ses attributs et méthodes.
- **Polymorphisme** : Capacité d'un objet à prendre plusieurs formes, permettant à des objets de différentes classes de répondre à la même interface.
- **Abstraction** : Modélisation des concepts essentiels en masquant les détails d'implémentation complexes.

La POO favorise la **modularité**, la **réutilisabilité** et la **maintenabilité** du code en créant des relations claires entre les différentes parties d'une application.

---

### Programmation Fonctionnelle

La **Programmation Fonctionnelle** est un paradigme de programmation qui traite le calcul comme l’évaluation de **fonctions mathématiques** et évite de changer l’état ou les données mutables.  

Ses principes fondamentaux sont :

- **Fonctions pures** : Fonctions qui, pour les mêmes entrées, produisent toujours les mêmes sorties sans effets secondaires.
- **Immuabilité** : Les données ne sont pas modifiées après leur création ; de nouvelles structures sont créées à la place.
- **Transparence référentielle** : Une expression peut être remplacée par sa valeur sans changer le comportement du programme.
- **Fonctions de première classe** : Les fonctions sont traitées comme des valeurs et peuvent être passées en paramètres, retournées ou assignées à des variables.
- **Récursion** : Utilisation de l’appel récursif comme structure de contrôle principale plutôt que les boucles.

La programmation fonctionnelle favorise la **prédictibilité**, la **testabilité** et la **raisonnabilité** du code en minimisant les effets de bord.

---

📁 **Ce dossier contient tous les design patterns classiques et les patterns de programmation fonctionnelle.**


## Design Patterns Classiques (Gang of Four)

### Patterns de Création
- **Singleton** : Assurer qu'une classe n'a qu'une seule instance
- **Factory** : Créer des objets sans spécifier leur classe exacte
- **Builder** : Construire des objets complexes étape par étape
- **Prototype** : Créer des objets en clonant une instance existante
- **Abstract Factory** : Créer des familles d'objets liés

### Patterns de Structure
- **Adapter** : Adapter une interface à une autre
- **Bridge** : Séparer l'abstraction de son implémentation
- **Composite** : Traiter des objets individuels et composites uniformément
- **Decorator** : Ajouter des fonctionnalités dynamiquement
- **Facade** : Fournir une interface simplifiée
- **Flyweight** : Partager efficacement les objets
- **Proxy** : Contrôler l'accès à un objet

### Patterns de Comportement
- **Observer** : Notifier les changements d'état
- **Strategy** : Définir une famille d'algorithmes
- **Command** : Encapsuler une demande comme objet
- **State** : Changer le comportement selon l'état
- **Template Method** : Définir le squelette d'un algorithme
- **Chain of Responsibility** : Passer les requêtes le long d'une chaîne
- **Mediator** : Définir comment des objets interagissent
- **Memento** : Capturer et restaurer l'état interne
- **Iterator** : Accéder aux éléments d'une collection
- **Visitor** : Définir une nouvelle opération sur une structure

## Patterns Fonctionnels

### Patterns de Base
- **Pure Functions** : Fonctions sans effets de bord
- **Higher-Order Functions** : Fonctions qui prennent ou retournent des fonctions
- **Function Composition** : Combiner des fonctions simples
- **Currying** : Transformer une fonction multi-paramètres
- **Partial Application** : Appliquer partiellement des arguments

### Patterns Avancés
- **Monads** : Gérer les effets de bord de manière fonctionnelle
- **Functors** : Mapper sur des structures de données
- **Applicatives** : Appliquer des fonctions dans un contexte
- **Monoids** : Combiner des valeurs de même type
- **Lenses** : Accéder et modifier des structures immutables

## Fichiers

### Patterns Classiques (Gang of Four)
- `creational-patterns.md` - Patterns de création (Singleton, Factory, Builder, Prototype, Abstract Factory, Object Pool, Variadic Functions)
- `structural-patterns.md` - Patterns de structure (Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy)
- `behavioral-patterns.md` - Patterns de comportement (Observer, Strategy, Command, State Machine, Template Method, Chain of Responsibility, Mediator, Memento, Iterator, Visitor, Reactive Programming, Saga, Sentinel)

### Patterns Fonctionnels
- `functional-patterns.md` - Patterns fonctionnels (Pure Functions, Higher-Order Functions, Currying, Partial Application, Monads, Functors, Function Composition)

### Patterns Avancés
- `architecture-patterns.md` - Patterns d'architecture
- `concurrency-patterns.md` - Patterns de concurrence

## Exemples

Chaque fichier contient :
- Description du pattern
- Exemple de code
- Cas d'usage
- Avantages et inconvénients
- Alternatives
