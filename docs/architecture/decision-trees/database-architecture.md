# 🧩 Modèle complet d'architecture de base de données

## 🎯 Objectif
Guide complet pour concevoir une architecture de base de données relationnelle avec des exemples concrets PostgreSQL et MongoDB.

---

## 1️⃣ Compréhension du domaine (Contexte fonctionnel)

### 🎯 Objectif
Comprendre le "monde réel" à modéliser et les processus clés.

### 💬 Questions à se poser
- Quel est le but global du système ?
- Quels sont les acteurs principaux ?
- Quelles sont les entités réelles ?
- Quelles sont les actions possibles ?
- Quelles règles métier s'appliquent ?

### 📝 Exemple concret : E-commerce

| Élément | Description |
|----------|--------------|
| **Acteurs** | Client, Admin, Vendeur |
| **Entités clés** | Utilisateur, Produit, Commande, LigneCommande, Catégorie |
| **Processus métier** | Inscription, Achat, Paiement, Livraison |
| **Règles / contraintes** | Stock >= quantité commandée, Prix > 0, Email unique |

---

## 2️⃣ Identification des entités et attributs

### 🎯 Objectif
Lister les tables et leurs propriétés avec types et contraintes.

### 📝 Exemple PostgreSQL

```sql
-- Table utilisateur
CREATE TABLE utilisateur (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  mot_de_passe TEXT NOT NULL,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  telephone VARCHAR(20),
  date_naissance DATE,
  date_creation TIMESTAMP DEFAULT now(),
  date_modification TIMESTAMP DEFAULT now(),
  est_actif BOOLEAN DEFAULT true
);

-- Table produit
CREATE TABLE produit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  prix NUMERIC(10,2) NOT NULL CHECK (prix > 0),
  stock INTEGER NOT NULL CHECK (stock >= 0),
  sku VARCHAR(100) UNIQUE NOT NULL,
  date_creation TIMESTAMP DEFAULT now(),
  date_modification TIMESTAMP DEFAULT now()
);

-- Table commande
CREATE TABLE commande (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  utilisateur_id UUID NOT NULL REFERENCES utilisateur(id) ON DELETE CASCADE,
  statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'payee', 'expediee', 'livree', 'annulee')),
  total NUMERIC(10,2) NOT NULL,
  date_commande TIMESTAMP DEFAULT now(),
  date_paiement TIMESTAMP,
  date_expedition TIMESTAMP
);
```

### 📝 Exemple MongoDB

```javascript
// Collection utilisateur
{
  _id: ObjectId("..."),
  email: "user@example.com",
  mot_de_passe: "$2b$10$...", // Hash bcrypt
  nom: "Dupont",
  prenom: "Jean",
  telephone: "+33123456789",
  date_naissance: ISODate("1990-01-01"),
  date_creation: ISODate("2024-01-01T10:00:00Z"),
  est_actif: true,
  adresses: [
    {
      type: "livraison",
      rue: "123 Rue Example",
      ville: "Paris",
      code_postal: "75001",
      pays: "France"
    }
  ]
}

// Collection produit
{
  _id: ObjectId("..."),
  nom: "Laptop Gaming",
  description: "Ordinateur portable pour gaming",
  prix: 1299.99,
  stock: 50,
  sku: "LAP-GAM-001",
  categories: ["informatique", "gaming"],
  specifications: {
    processeur: "Intel i7",
    ram: "16GB",
    stockage: "512GB SSD"
  },
  images: ["image1.jpg", "image2.jpg"],
  date_creation: ISODate("2024-01-01T10:00:00Z")
}
```

---

## 3️⃣ Relations entre entités

### 🎯 Objectif
Définir les liens entre les tables et leur cardinalité.

### 💬 Relations identifiées

| Entité A | Entité B | Cardinalité | Table de jointure | Commentaire |
|----------|----------|-------------|-------------------|-------------|
| utilisateur | commande | 1:N | - | Un utilisateur peut avoir plusieurs commandes |
| commande | produit | N:N | ligne_commande | Une commande contient plusieurs produits |
| produit | ligne_commande | 1:N | - | Chaque ligne commande un produit |
| categorie | produit | 1:N | - | Une catégorie contient plusieurs produits |

### 🧱 Exemple SQL - Tables de jointure

```sql
-- Table ligne de commande
CREATE TABLE ligne_commande (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commande_id UUID NOT NULL REFERENCES commande(id) ON DELETE CASCADE,
  produit_id UUID NOT NULL REFERENCES produit(id),
  quantite INTEGER NOT NULL CHECK (quantite > 0),
  prix_unitaire NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) GENERATED ALWAYS AS (quantite * prix_unitaire) STORED
);

-- Table catégorie
CREATE TABLE categorie (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES categorie(id)
);

-- Table produit_categorie (relation N:N)
CREATE TABLE produit_categorie (
  produit_id UUID REFERENCES produit(id) ON DELETE CASCADE,
  categorie_id UUID REFERENCES categorie(id) ON DELETE CASCADE,
  PRIMARY KEY (produit_id, categorie_id)
);
```

---

## 4️⃣ Contraintes, intégrité et logique métier

### 🎯 Objectif
Garantir la cohérence des données avec des contraintes et triggers.

### 🧱 Exemple PostgreSQL - Contraintes

```sql
-- Contraintes de domaine
ALTER TABLE produit ADD CONSTRAINT check_prix_positif CHECK (prix > 0);
ALTER TABLE produit ADD CONSTRAINT check_stock_non_negatif CHECK (stock >= 0);
ALTER TABLE ligne_commande ADD CONSTRAINT check_quantite_positive CHECK (quantite > 0);

-- Contraintes d'unicité
CREATE UNIQUE INDEX idx_utilisateur_email_unique ON utilisateur(email);
CREATE UNIQUE INDEX idx_produit_sku_unique ON produit(sku);

-- Contraintes de clé étrangère avec actions
ALTER TABLE commande ADD CONSTRAINT fk_commande_utilisateur 
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE;

ALTER TABLE ligne_commande ADD CONSTRAINT fk_ligne_commande_commande
  FOREIGN KEY (commande_id) REFERENCES commande(id) ON DELETE CASCADE;
```

### 🧱 Triggers pour la logique métier

```sql
-- Trigger pour mettre à jour le stock
CREATE OR REPLACE FUNCTION maj_stock_apres_commande()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE produit
  SET stock = stock - NEW.quantite,
      date_modification = now()
  WHERE id = NEW.produit_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_maj_stock
AFTER INSERT ON ligne_commande
FOR EACH ROW
EXECUTE FUNCTION maj_stock_apres_commande();

-- Trigger pour calculer le total de la commande
CREATE OR REPLACE FUNCTION maj_total_commande()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE commande
  SET total = (
    SELECT COALESCE(SUM(total), 0)
    FROM ligne_commande
    WHERE commande_id = NEW.commande_id
  )
  WHERE id = NEW.commande_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_maj_total_commande
AFTER INSERT OR UPDATE OR DELETE ON ligne_commande
FOR EACH ROW
EXECUTE FUNCTION maj_total_commande();
```

---

## 5️⃣ Performance et évolutivité

### 🎯 Objectif
Anticiper la charge et optimiser les requêtes.

### 📝 Analyse de performance

| Table | Volume estimé | Requêtes fréquentes | Index prévus | Commentaires |
|-------|---------------|-------------------|--------------|--------------|
| utilisateur | 1M | Recherche par email, connexion | (email), (nom, prenom) | Authentification |
| produit | 100k | Recherche par nom, catégorie | GIN sur nom, (categorie_id) | Catalogue |
| commande | 10M/an | Historique utilisateur, stats | (utilisateur_id, date_commande) | Analytics |
| ligne_commande | 50M/an | Détails commande | (commande_id), (produit_id) | Facturation |

### 🧱 Index PostgreSQL

```sql
-- Index pour la recherche de produits
CREATE INDEX idx_produit_nom_gin ON produit USING GIN (to_tsvector('french', nom));
CREATE INDEX idx_produit_categorie ON produit_categorie(categorie_id);

-- Index pour les commandes
CREATE INDEX idx_commande_utilisateur_date ON commande(utilisateur_id, date_commande);
CREATE INDEX idx_commande_statut ON commande(statut);

-- Index pour les lignes de commande
CREATE INDEX idx_ligne_commande_commande ON ligne_commande(commande_id);
CREATE INDEX idx_ligne_commande_produit ON ligne_commande(produit_id);

-- Index partiels pour les données actives
CREATE INDEX idx_utilisateur_actif ON utilisateur(email) WHERE est_actif = true;
CREATE INDEX idx_produit_stock ON produit(id) WHERE stock > 0;
```

### 🧱 Index MongoDB

```javascript
// Index pour la recherche de produits
db.produit.createIndex({ nom: "text", description: "text" })
db.produit.createIndex({ categories: 1 })
db.produit.createIndex({ prix: 1 })

// Index pour les utilisateurs
db.utilisateur.createIndex({ email: 1 }, { unique: true })
db.utilisateur.createIndex({ "adresses.ville": 1 })

// Index pour les commandes
db.commande.createIndex({ utilisateur_id: 1, date_commande: -1 })
db.commande.createIndex({ statut: 1 })
```

---

## 6️⃣ Sécurité, audit et maintenance

### 🎯 Objectif
Protéger les données et assurer la traçabilité.

### 📝 Politique de sécurité

| Élément | Détails |
|---------|---------|
| **Données sensibles** | mot_de_passe (hash bcrypt), données personnelles |
| **Rôles** | admin, utilisateur, vendeur |
| **Colonnes chiffrées** | mot_de_passe, données bancaires |
| **Historisation** | table audit_log |
| **Sauvegarde** | dump quotidien, réplication |
| **Migration** | Versioning avec outils (Prisma, Alembic) |

### 🧱 Audit et logging

```sql
-- Table d'audit
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  operation VARCHAR(10) NOT NULL, -- INSERT, UPDATE, DELETE
  old_values JSONB,
  new_values JSONB,
  utilisateur_id UUID,
  timestamp TIMESTAMP DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);

-- Trigger d'audit générique
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    table_name,
    operation,
    old_values,
    new_values,
    utilisateur_id
  ) VALUES (
    TG_TABLE_NAME,
    TG_OP,
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN NEW.utilisateur_id ELSE OLD.utilisateur_id END
  );
  
  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$ LANGUAGE plpgsql;

-- Application du trigger sur les tables sensibles
CREATE TRIGGER trg_audit_utilisateur
AFTER INSERT OR UPDATE OR DELETE ON utilisateur
FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

---

## 7️⃣ Migration et versioning

### 🎯 Objectif
Gérer l'évolution de la base de données.

### 🧱 Exemple avec Prisma

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Utilisateur {
  id              String   @id @default(uuid())
  email           String   @unique
  mot_de_passe    String
  nom             String
  prenom          String
  telephone       String?
  date_naissance  DateTime?
  date_creation   DateTime @default(now())
  est_actif       Boolean  @default(true)
  
  commandes       Commande[]
  
  @@map("utilisateur")
}

model Produit {
  id            String   @id @default(uuid())
  nom           String
  description   String?
  prix          Decimal  @db.Decimal(10, 2)
  stock         Int
  sku           String   @unique
  date_creation DateTime @default(now())
  
  lignes_commande LigneCommande[]
  categories      ProduitCategorie[]
  
  @@map("produit")
}

model Commande {
  id              String      @id @default(uuid())
  utilisateur_id  String
  statut          StatutCommande @default(EN_ATTENTE)
  total           Decimal     @db.Decimal(10, 2)
  date_commande   DateTime    @default(now())
  
  utilisateur     Utilisateur @relation(fields: [utilisateur_id], references: [id], onDelete: Cascade)
  lignes          LigneCommande[]
  
  @@map("commande")
}

enum StatutCommande {
  EN_ATTENTE
  PAYEE
  EXPEDIEE
  LIVREE
  ANNULEE
}
```

---

## 📈 Synthèse finale

### 📊 Diagramme entité-relation (exemple textuel)

```
utilisateur (1)───<(N) commande (1)───<(N) ligne_commande >(1)───produit
     │                                                                    │
     │                                                                    │
     │                                                                    │
     └───<(N) produit_categorie >(N)───categorie
```

### ✅ Checklist de validation

- [ ] **Entités principales définies** (utilisateur, produit, commande)
- [ ] **Relations logiques cohérentes** (1:N, N:N)
- [ ] **Contraintes et triggers intégrés** (stock, prix, total)
- [ ] **Index et performance anticipés** (recherche, analytics)
- [ ] **Sécurité et audit couverts** (hash, logs, rôles)
- [ ] **Migration et versioning prévus** (Prisma, Alembic)

### 🧱 Notes supplémentaires

- **Évolutions futures** : Table paiement, adresses, avis produits
- **Scalabilité** : Partitioning par date pour les commandes
- **Backup** : Stratégie de sauvegarde quotidienne et réplication
- **Monitoring** : Métriques de performance et alertes
- **Tests** : Données de test et environnements de développement
