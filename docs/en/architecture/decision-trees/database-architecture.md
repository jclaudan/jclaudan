# 🧩 Complete Database Architecture Model

## 🎯 Objective
Complete guide for designing a relational database architecture with concrete PostgreSQL and MongoDB examples.

---

## 1️⃣ Domain Understanding (Functional Context)

### 🎯 Objective
Understand the "real world" to model and key processes.

### 💬 Questions to Ask
- What is the overall purpose of the system?
- Who are the main actors?
- What are the real entities?
- What actions are possible?
- What business rules apply?

### 📝 Concrete Example: E-commerce

| Element | Description |
|---------|-------------|
| **Actors** | Customer, Admin, Seller |
| **Key entities** | User, Product, Order, OrderLine, Category |
| **Business processes** | Registration, Purchase, Payment, Delivery |
| **Rules / constraints** | Stock >= ordered quantity, Price > 0, Unique email |

---

## 2️⃣ Entity and Attribute Identification

### 🎯 Objective
List tables and their properties with types and constraints.

### 📝 PostgreSQL Example

```sql
-- User table
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

-- Product table
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

-- Order table
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

### 📝 MongoDB Example

```javascript
// User collection
{
  _id: ObjectId("..."),
  email: "user@example.com",
  mot_de_passe: "$2b$10$...", // bcrypt hash
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

// Product collection
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

## 3️⃣ Entity Relationships

### 🎯 Objective
Define links between tables and their cardinality.

### 💬 Identified Relationships

| Entity A | Entity B | Cardinality | Join Table | Comment |
|----------|----------|-------------|------------|---------|
| utilisateur | commande | 1:N | - | One user can have multiple orders |
| commande | produit | N:N | ligne_commande | One order contains multiple products |
| produit | ligne_commande | 1:N | - | Each order line has one product |
| categorie | produit | 1:N | - | One category contains multiple products |

### 🧱 SQL Example - Join Tables

```sql
-- Order line table
CREATE TABLE ligne_commande (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commande_id UUID NOT NULL REFERENCES commande(id) ON DELETE CASCADE,
  produit_id UUID NOT NULL REFERENCES produit(id),
  quantite INTEGER NOT NULL CHECK (quantite > 0),
  prix_unitaire NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) GENERATED ALWAYS AS (quantite * prix_unitaire) STORED
);

-- Category table
CREATE TABLE categorie (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES categorie(id)
);

-- Product category table (N:N relation)
CREATE TABLE produit_categorie (
  produit_id UUID REFERENCES produit(id) ON DELETE CASCADE,
  categorie_id UUID REFERENCES categorie(id) ON DELETE CASCADE,
  PRIMARY KEY (produit_id, categorie_id)
);
```

---

## 4️⃣ Constraints, Integrity and Business Logic

### 🎯 Objective
Ensure data consistency with constraints and triggers.

### 🧱 PostgreSQL Example - Constraints

```sql
-- Domain constraints
ALTER TABLE produit ADD CONSTRAINT check_prix_positif CHECK (prix > 0);
ALTER TABLE produit ADD CONSTRAINT check_stock_non_negatif CHECK (stock >= 0);
ALTER TABLE ligne_commande ADD CONSTRAINT check_quantite_positive CHECK (quantite > 0);

-- Uniqueness constraints
CREATE UNIQUE INDEX idx_utilisateur_email_unique ON utilisateur(email);
CREATE UNIQUE INDEX idx_produit_sku_unique ON produit(sku);

-- Foreign key constraints with actions
ALTER TABLE commande ADD CONSTRAINT fk_commande_utilisateur 
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE;

ALTER TABLE ligne_commande ADD CONSTRAINT fk_ligne_commande_commande
  FOREIGN KEY (commande_id) REFERENCES commande(id) ON DELETE CASCADE;
```

### 🧱 Triggers for Business Logic

```sql
-- Trigger to update stock
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

-- Trigger to calculate order total
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

## 5️⃣ Performance and Scalability

### 🎯 Objective
Anticipate load and optimize queries.

### 📝 Performance Analysis

| Table | Estimated Volume | Frequent Queries | Planned Indexes | Comments |
|-------|------------------|------------------|-----------------|----------|
| utilisateur | 1M | Search by email, login | (email), (nom, prenom) | Authentication |
| produit | 100k | Search by name, category | GIN on nom, (categorie_id) | Catalog |
| commande | 10M/year | User history, stats | (utilisateur_id, date_commande) | Analytics |
| ligne_commande | 50M/year | Order details | (commande_id), (produit_id) | Billing |

### 🧱 PostgreSQL Indexes

```sql
-- Indexes for product search
CREATE INDEX idx_produit_nom_gin ON produit USING GIN (to_tsvector('french', nom));
CREATE INDEX idx_produit_categorie ON produit_categorie(categorie_id);

-- Indexes for orders
CREATE INDEX idx_commande_utilisateur_date ON commande(utilisateur_id, date_commande);
CREATE INDEX idx_commande_statut ON commande(statut);

-- Indexes for order lines
CREATE INDEX idx_ligne_commande_commande ON ligne_commande(commande_id);
CREATE INDEX idx_ligne_commande_produit ON ligne_commande(produit_id);

-- Partial indexes for active data
CREATE INDEX idx_utilisateur_actif ON utilisateur(email) WHERE est_actif = true;
CREATE INDEX idx_produit_stock ON produit(id) WHERE stock > 0;
```

### 🧱 MongoDB Indexes

```javascript
// Indexes for product search
db.produit.createIndex({ nom: "text", description: "text" })
db.produit.createIndex({ categories: 1 })
db.produit.createIndex({ prix: 1 })

// Indexes for users
db.utilisateur.createIndex({ email: 1 }, { unique: true })
db.utilisateur.createIndex({ "adresses.ville": 1 })

// Indexes for orders
db.commande.createIndex({ utilisateur_id: 1, date_commande: -1 })
db.commande.createIndex({ statut: 1 })
```

---

## 6️⃣ Security, Audit and Maintenance

### 🎯 Objective
Protect data and ensure traceability.

### 📝 Security Policy

| Element | Details |
|---------|---------|
| **Sensitive data** | mot_de_passe (bcrypt hash), personal data |
| **Roles** | admin, utilisateur, vendeur |
| **Encrypted columns** | mot_de_passe, banking data |
| **Audit trail** | audit_log table |
| **Backup** | Daily dump, replication |
| **Migration** | Versioning with tools (Prisma, Alembic) |

### 🧱 Audit and Logging

```sql
-- Audit table
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

-- Generic audit trigger
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

-- Apply trigger on sensitive tables
CREATE TRIGGER trg_audit_utilisateur
AFTER INSERT OR UPDATE OR DELETE ON utilisateur
FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

---

## 7️⃣ Migration and Versioning

### 🎯 Objective
Manage database evolution.

### 🧱 Example with Prisma

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

## 📈 Final Summary

### 📊 Entity-Relationship Diagram (Textual Example)

```
utilisateur (1)───<(N) commande (1)───<(N) ligne_commande >(1)───produit
     │                                                                    │
     │                                                                    │
     │                                                                    │
     └───<(N) produit_categorie >(N)───categorie
```

### ✅ Validation Checklist

- [ ] **Main entities defined** (utilisateur, produit, commande)
- [ ] **Logical relations coherent** (1:N, N:N)
- [ ] **Constraints and triggers integrated** (stock, prix, total)
- [ ] **Indexes and performance anticipated** (search, analytics)
- [ ] **Security and audit covered** (hash, logs, roles)
- [ ] **Migration and versioning planned** (Prisma, Alembic)

### 🧱 Additional Notes

- **Future evolutions** : Payment table, addresses, product reviews
- **Scalability** : Date partitioning for orders
- **Backup** : Daily backup strategy and replication
- **Monitoring** : Performance metrics and alerts
- **Tests** : Test data and development environments
