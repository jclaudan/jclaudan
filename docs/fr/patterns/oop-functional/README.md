# Patterns POO et Programmation Fonctionnelle

Ce dossier contient tous les design patterns classiques et les patterns de programmation fonctionnelle.

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

- `creational-patterns.md` - Patterns de création
- `structural-patterns.md` - Patterns de structure
- `behavioral-patterns.md` - Patterns de comportement
- `functional-patterns.md` - Patterns fonctionnels
- `architecture-patterns.md` - Patterns d'architecture
- `concurrency-patterns.md` - Patterns de concurrence

## Exemples

Chaque fichier contient :
- Description du pattern
- Exemple de code
- Cas d'usage
- Avantages et inconvénients
- Alternatives
