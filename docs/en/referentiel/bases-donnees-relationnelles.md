# 🧩 Universal Relational Database Architecture Model

## 🗂️ General Information
**Project Name:**  
**Author / Team:**  
**Design Date:**  
**System Global Objective:**  

---

## 1️⃣ Domain Understanding

### 🎯 Objective
Identify the functional context and business needs.

### 💬 Questions to Ask
- What is the purpose of the system?  
- Who are the actors (users, roles, external systems)?  
- What are the main entities or concepts to represent?  
- What interactions exist between these entities?  
- What business rules or constraints must be respected?  

### 📝 Notes
| Element | Description |
|---------|-------------|
| Actors / Roles |  |
| Key Entities |  |
| Main Processes |  |
| Business Rules |  |

---

## 2️⃣ Entity and Attribute Identification

### 🎯 Objective
List the entities to model and their characteristics.

### 💬 Questions to Ask
- What are the main entities?  
- Which entities depend on others?  
- Which attributes must be stored?  
- Which attributes are mandatory / optional?  
- Which columns must be unique?  
- Which data can be derived or calculated?  

### 📝 Table to Fill
| Entity | Attribute | Type | Mandatory | Unique | Description |
|--------|-----------|------|-----------|--------|-------------|
| Example: |  |  |  |  |  |

---

## 3️⃣ Entity Relationships

### 🎯 Objective
Define how entities interact with each other.

### 💬 Questions to Ask
- Which entities are related to each other?  
- What is the nature of the relationship (1:1, 1:N, N:N)?  
- Which entity "owns" the other?  
- Is a join table necessary?  
- Are there weak or optional relationships?  

### 📝 Relationship Table
| Entity A | Entity B | Relationship Type | Cardinality | Details / Constraints |
|----------|----------|-------------------|-------------|----------------------|
|  |  |  |  |  |

---

## 4️⃣ Constraints and Integrity

### 🎯 Objective
Ensure data consistency and validity.

### 💬 Questions to Ask
- Which constraints must be imposed (NOT NULL, UNIQUE, CHECK...)?  
- Which foreign keys must be added?  
- Which business rules must be guaranteed by the database?  
- Which validations will be handled by the application rather than the database?  

### 📝 Constraints Table
| Table | Column / Rule | Constraint Type | Description |
|-------|---------------|-----------------|-------------|
|  |  |  |  |

---

## 5️⃣ Performance and Scalability

### 🎯 Objective
Prepare the database to handle large volumes and queries.

### 💬 Questions to Ask
- Which tables will be the largest?  
- Which queries will be the most frequent or critical?  
- Which indexes should be created?  
- Are there operations requiring cache or materialized views?  
- Are partitioning mechanisms necessary?  

### 📝 Analysis Table
| Table | Estimated Volume | Planned Indexes | Critical Queries | Comments |
|-------|------------------|-----------------|------------------|----------|
|  |  |  |  |  |

---

## 6️⃣ Security, Audit and Maintenance

### 🎯 Objective
Ensure data confidentiality, traceability and durability.

### 💬 Questions to Ask
- Which data is sensitive?  
- Which columns must be encrypted or hashed?  
- Which roles and access permissions are necessary?  
- Is historization needed (audit, log, versions)?  
- How to manage deletions (soft/hard delete)?  
- What backup and migration policy will be used?  

### 📝 Policy Table
| Element | Details |
|---------|---------|
| Sensitive Data |  |
| Permissions / Roles |  |
| Encrypted Columns |  |
| Audit / Historization |  |
| Backup / Migration |  |

---

## 7️⃣ Diagram and Validation

### 🎯 Objective
Visualize and validate the overall structure before implementation.

### 💬 Steps
1. Create an **Entity-Relationship Diagram (ERD)**  
   - Recommended tool: dbdiagram.io, DrawSQL, Lucidchart, etc.  
2. Verify:
   - Relationship consistency  
   - Primary and foreign keys defined  
   - Constraints properly placed  
   - Redundancy risks minimized (normalization)  

### ✅ Final Checklist
- [ ] Entities and attributes are identified  
- [ ] Relationships are clear and documented  
- [ ] Integrity constraints are defined  
- [ ] Indexes are anticipated  
- [ ] Security questions are addressed  
- [ ] An ERD schema has been validated  

---

## 🧱 Architecture Notes and Decisions

- Important decisions made during design:  
  - …  
  - …  
- Assumptions or points to validate:  
  - …  
  - …

---

## 📚 Resources and Best Practices

### Recommended Tools
- **Modeling**: dbdiagram.io, DrawSQL, Lucidchart
- **Migrations**: Flyway, Liquibase, Prisma
- **Monitoring**: pgAdmin, MySQL Workbench, DBeaver

### Normalization Principles
- **1NF**: Eliminate repeating groups
- **2NF**: Eliminate partial dependencies
- **3NF**: Eliminate transitive dependencies
- **BCNF**: Boyce-Codd Normal Form

### Common Patterns
- **Soft Delete**: `deleted_at` column instead of physical deletion
- **Audit Trail**: History tables to track modifications
- **UUID vs Auto-increment**: Choice based on scalability needs
