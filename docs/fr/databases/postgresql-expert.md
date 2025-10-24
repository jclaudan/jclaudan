# PostgreSQL Expert - Guide Avancé

## 1. Extensions PostgreSQL

### Extensions Essentielles

#### PostGIS - Géolocalisation
```sql
-- Installation
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Types géométriques
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    point GEOMETRY(POINT, 4326),
    polygon GEOMETRY(POLYGON, 4326),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Requêtes géospatiales
SELECT name, ST_Distance(point, ST_Point(-74.0, 40.7)) as distance
FROM locations
WHERE ST_DWithin(point, ST_Point(-74.0, 40.7), 1000)
ORDER BY distance;

-- Index spatial
CREATE INDEX idx_locations_point ON locations USING GIST (point);
```

#### pg_stat_statements - Monitoring des Requêtes
```sql
-- Installation
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Configuration dans postgresql.conf
shared_preload_libraries = 'pg_stat_statements'
pg_stat_statements.max = 10000
pg_stat_statements.track = all

-- Requêtes les plus lentes
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Requêtes par base de données
SELECT 
    datname,
    query,
    calls,
    total_time
FROM pg_stat_statements pss
JOIN pg_database pd ON pss.dbid = pd.oid
WHERE datname = 'my_database'
ORDER BY total_time DESC;
```

#### pg_trgm - Recherche de Texte
```sql
-- Installation
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Recherche de similarité
SELECT name, similarity(name, 'John') as sim
FROM users
WHERE similarity(name, 'John') > 0.3
ORDER BY sim DESC;

-- Index trigram
CREATE INDEX idx_users_name_trgm ON users USING GIN (name gin_trgm_ops);

-- Recherche avec LIKE optimisée
SELECT * FROM users WHERE name ILIKE '%john%';
```

### Extensions Avancées

#### pg_cron - Tâches Planifiées
```sql
-- Installation
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Nettoyage quotidien
SELECT cron.schedule('daily-cleanup', '0 2 * * *', 'DELETE FROM logs WHERE created_at < NOW() - INTERVAL ''30 days''');

-- Sauvegarde hebdomadaire
SELECT cron.schedule('weekly-backup', '0 3 * * 0', 'SELECT pg_dump(''my_database'') > /backup/weekly.sql');

-- Lister les tâches
SELECT * FROM cron.job;

-- Supprimer une tâche
SELECT cron.unschedule('daily-cleanup');
```

#### pg_partman - Partitionnement Automatique
```sql
-- Installation
CREATE EXTENSION IF NOT EXISTS pg_partman;

-- Table partitionnée par date
CREATE TABLE logs (
    id BIGSERIAL,
    message TEXT,
    created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at);

-- Créer les partitions
SELECT partman.create_parent(
    p_parent_table => 'public.logs',
    p_control => 'created_at',
    p_type => 'range',
    p_interval => 'monthly'
);

-- Maintenance automatique
SELECT cron.schedule('partition-maintenance', '0 1 * * *', 'SELECT partman.run_maintenance()');
```

## 2. Performance et Optimisation

### Configuration Avancée

#### postgresql.conf - Paramètres Critiques
```ini
# Mémoire
shared_buffers = 256MB                    # 25% de la RAM
effective_cache_size = 1GB                # 75% de la RAM
work_mem = 4MB                            # Mémoire par opération
maintenance_work_mem = 64MB               # Mémoire pour maintenance

# Connexions
max_connections = 100
shared_preload_libraries = 'pg_stat_statements'

# WAL (Write-Ahead Logging)
wal_level = replica
max_wal_size = 1GB
min_wal_size = 80MB
checkpoint_completion_target = 0.9

# Requêtes
random_page_cost = 1.1                    # SSD
effective_io_concurrency = 200            # SSD
```

### Index Avancés

#### Index Partiels
```sql
-- Index sur les utilisateurs actifs uniquement
CREATE INDEX idx_users_active_email ON users (email) WHERE active = true;

-- Index sur les commandes récentes
CREATE INDEX idx_orders_recent ON orders (created_at) WHERE created_at > '2024-01-01';
```

#### Index Fonctionnels
```sql
-- Index sur une fonction
CREATE INDEX idx_users_upper_name ON users (UPPER(name));

-- Index sur une expression
CREATE INDEX idx_orders_total ON orders ((price * quantity));
```

#### Index Multi-colonnes Optimisés
```sql
-- Ordre des colonnes important
CREATE INDEX idx_users_status_created ON users (status, created_at);

-- Requête optimisée
SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC;
```

### Requêtes Optimisées

#### EXPLAIN ANALYZE Avancé
```sql
-- Analyse détaillée
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT JSON) 
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC;

-- Plan d'exécution avec statistiques
EXPLAIN (ANALYZE, BUFFERS, TIMING, COSTS, SUMMARY)
SELECT * FROM users WHERE email = 'john@example.com';
```

#### Requêtes avec CTE Optimisées
```sql
-- CTE avec materialization
WITH RECURSIVE user_hierarchy AS (
    -- Cas de base
    SELECT id, name, manager_id, 1 as level
    FROM users
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Cas récursif
    SELECT u.id, u.name, u.manager_id, uh.level + 1
    FROM users u
    JOIN user_hierarchy uh ON u.manager_id = uh.id
)
SELECT * FROM user_hierarchy
ORDER BY level, name;
```

## 3. Monitoring et Observabilité

### Métriques Système

#### pg_stat_database
```sql
-- Statistiques par base de données
SELECT 
    datname,
    numbackends,
    xact_commit,
    xact_rollback,
    blks_read,
    blks_hit,
    tup_returned,
    tup_fetched,
    tup_inserted,
    tup_updated,
    tup_deleted
FROM pg_stat_database
WHERE datname = 'my_database';
```

#### pg_stat_user_tables
```sql
-- Statistiques par table
SELECT 
    schemaname,
    relname,
    seq_scan,
    seq_tup_read,
    idx_scan,
    idx_tup_fetch,
    n_tup_ins,
    n_tup_upd,
    n_tup_del,
    n_live_tup,
    n_dead_tup
FROM pg_stat_user_tables
ORDER BY seq_scan DESC;
```

### Monitoring des Locks

```sql
-- Locks actifs
SELECT 
    l.locktype,
    l.database,
    l.relation::regclass,
    l.page,
    l.tuple,
    l.virtualxid,
    l.transactionid,
    l.classid,
    l.objid,
    l.objsubid,
    l.virtualtransaction,
    l.pid,
    l.mode,
    l.granted,
    a.usename,
    a.query,
    a.query_start,
    a.state
FROM pg_locks l
LEFT JOIN pg_stat_activity a ON l.pid = a.pid
WHERE NOT l.granted
ORDER BY a.query_start;
```

### Monitoring des Connexions

```sql
-- Connexions actives
SELECT 
    pid,
    usename,
    application_name,
    client_addr,
    client_port,
    backend_start,
    state,
    query_start,
    state_change,
    wait_event_type,
    wait_event,
    query
FROM pg_stat_activity
WHERE state = 'active'
ORDER BY query_start;
```

## 4. Sauvegarde et Récupération

### pg_dump Avancé

```bash
# Sauvegarde complète avec compression
pg_dump -h localhost -U postgres -d my_database \
    --verbose \
    --compress=9 \
    --format=custom \
    --file=backup_$(date +%Y%m%d_%H%M%S).dump

# Sauvegarde parallèle
pg_dump -h localhost -U postgres -d my_database \
    --jobs=4 \
    --format=directory \
    --file=backup_parallel

# Sauvegarde avec exclusions
pg_dump -h localhost -U postgres -d my_database \
    --exclude-table-data=logs \
    --exclude-schema=temp \
    --file=backup_selective.sql
```

### pg_basebackup - Sauvegarde Physique

```bash
# Sauvegarde de base
pg_basebackup -h localhost -U postgres \
    -D /backup/base_backup \
    -Ft \
    -z \
    -P

# Sauvegarde avec WAL streaming
pg_basebackup -h localhost -U postgres \
    -D /backup/base_backup \
    -Ft \
    -z \
    -P \
    -X stream
```

### Point-in-Time Recovery (PITR)

```bash
# Configuration pour PITR
# postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /backup/wal/%f'
max_wal_senders = 3
wal_keep_segments = 64

# Récupération à un point précis
pg_restore -h localhost -U postgres -d my_database \
    --clean \
    --if-exists \
    backup.dump

# Récupération avec PITR
recovery_target_time = '2024-01-15 14:30:00'
recovery_target_action = 'promote'
```

## 5. Réplication et Haute Disponibilité

### Réplication Streaming

#### Configuration Master
```sql
-- postgresql.conf
wal_level = replica
max_wal_senders = 3
wal_keep_segments = 64
hot_standby = on

-- pg_hba.conf
host replication replicator 192.168.1.0/24 md5

-- Créer l'utilisateur de réplication
CREATE USER replicator REPLICATION LOGIN PASSWORD 'secure_password';
```

#### Configuration Slave
```bash
# Initialiser le slave
pg_basebackup -h master_host -U replicator \
    -D /var/lib/postgresql/data \
    -Ft \
    -z \
    -P \
    -X stream

# Créer recovery.conf
echo "standby_mode = 'on'" > recovery.conf
echo "primary_conninfo = 'host=master_host port=5432 user=replicator password=secure_password'" >> recovery.conf
echo "trigger_file = '/tmp/postgresql.trigger'" >> recovery.conf
```

### Réplication Logique

```sql
-- Configuration
wal_level = logical
max_replication_slots = 4

-- Créer un slot de réplication
SELECT pg_create_logical_replication_slot('my_slot', 'pgoutput');

-- Créer une publication
CREATE PUBLICATION my_publication FOR TABLE users, orders;

-- Sur le slave
CREATE SUBSCRIPTION my_subscription
CONNECTION 'host=master_host port=5432 user=replicator password=secure_password dbname=my_database'
PUBLICATION my_publication
WITH (copy_data = true);
```

## 6. Sécurité Avancée

### Row Level Security (RLS)

```sql
-- Activer RLS sur une table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Politique pour les utilisateurs
CREATE POLICY user_policy ON users
    FOR ALL TO authenticated_users
    USING (id = current_setting('app.current_user_id')::int);

-- Politique pour les administrateurs
CREATE POLICY admin_policy ON users
    FOR ALL TO admin_users
    USING (true);

-- Test des politiques
SET app.current_user_id = '123';
SELECT * FROM users; -- Ne retourne que l'utilisateur 123
```

### Audit et Logging

```sql
-- Extension pgaudit
CREATE EXTENSION IF NOT EXISTS pgaudit;

-- Configuration
ALTER SYSTEM SET pgaudit.log = 'write, ddl';
ALTER SYSTEM SET pgaudit.log_relation = on;
ALTER SYSTEM SET pgaudit.log_parameter = on;

-- Logs personnalisés
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (
        table_name,
        operation,
        old_data,
        new_data,
        user_name,
        timestamp
    ) VALUES (
        TG_TABLE_NAME,
        TG_OP,
        row_to_json(OLD),
        row_to_json(NEW),
        current_user,
        NOW()
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Appliquer l'audit
CREATE TRIGGER users_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

## 7. Fonctions et Procédures Avancées

### PL/pgSQL Avancé

```sql
-- Fonction avec gestion d'erreurs
CREATE OR REPLACE FUNCTION transfer_money(
    from_account_id INTEGER,
    to_account_id INTEGER,
    amount DECIMAL
) RETURNS BOOLEAN AS $$
DECLARE
    from_balance DECIMAL;
    to_balance DECIMAL;
BEGIN
    -- Vérifier le solde
    SELECT balance INTO from_balance
    FROM accounts WHERE id = from_account_id;
    
    IF from_balance < amount THEN
        RAISE EXCEPTION 'Insufficient funds: %', from_balance;
    END IF;
    
    -- Début de transaction
    BEGIN
        -- Débiter le compte source
        UPDATE accounts 
        SET balance = balance - amount
        WHERE id = from_account_id;
        
        -- Créditer le compte destination
        UPDATE accounts 
        SET balance = balance + amount
        WHERE id = to_account_id;
        
        -- Enregistrer la transaction
        INSERT INTO transactions (from_account, to_account, amount, timestamp)
        VALUES (from_account_id, to_account_id, amount, NOW());
        
        RETURN TRUE;
        
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'Transfer failed: %', SQLERRM;
    END;
END;
$$ LANGUAGE plpgsql;
```

### Fonctions avec Types Personnalisés

```sql
-- Type personnalisé
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');

-- Fonction avec type personnalisé
CREATE OR REPLACE FUNCTION get_user_stats()
RETURNS TABLE (
    status user_status,
    count BIGINT,
    percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.status,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
    FROM users u
    GROUP BY u.status
    ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql;
```

## 8. Optimisations Avancées

### Partitionnement Intelligent

```sql
-- Table partitionnée par hash
CREATE TABLE orders (
    id BIGSERIAL,
    user_id INTEGER,
    amount DECIMAL,
    created_at TIMESTAMP
) PARTITION BY HASH (user_id);

-- Créer les partitions
CREATE TABLE orders_0 PARTITION OF orders FOR VALUES WITH (modulus 4, remainder 0);
CREATE TABLE orders_1 PARTITION OF orders FOR VALUES WITH (modulus 4, remainder 1);
CREATE TABLE orders_2 PARTITION OF orders FOR VALUES WITH (modulus 4, remainder 2);
CREATE TABLE orders_3 PARTITION OF orders FOR VALUES WITH (modulus 4, remainder 3);

-- Index sur chaque partition
CREATE INDEX idx_orders_0_user_id ON orders_0 (user_id);
CREATE INDEX idx_orders_1_user_id ON orders_1 (user_id);
CREATE INDEX idx_orders_2_user_id ON orders_2 (user_id);
CREATE INDEX idx_orders_3_user_id ON orders_3 (user_id);
```

### Materialized Views Avancées

```sql
-- Vue matérialisée avec refresh automatique
CREATE MATERIALIZED VIEW user_order_stats AS
SELECT 
    u.id,
    u.name,
    COUNT(o.id) as order_count,
    SUM(o.amount) as total_spent,
    AVG(o.amount) as avg_order_value,
    MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Index sur la vue matérialisée
CREATE UNIQUE INDEX idx_user_order_stats_id ON user_order_stats (id);

-- Refresh automatique
CREATE OR REPLACE FUNCTION refresh_user_order_stats()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_order_stats;
END;
$$ LANGUAGE plpgsql;

-- Programmer le refresh
SELECT cron.schedule('refresh-stats', '0 */6 * * *', 'SELECT refresh_user_order_stats()');
```

## 9. Monitoring et Alertes

### Scripts de Monitoring

```sql
-- Fonction de monitoring des performances
CREATE OR REPLACE FUNCTION get_performance_stats()
RETURNS TABLE (
    metric_name TEXT,
    metric_value NUMERIC,
    threshold NUMERIC,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH stats AS (
        SELECT 
            'active_connections'::TEXT as metric_name,
            COUNT(*)::NUMERIC as metric_value,
            80::NUMERIC as threshold
        FROM pg_stat_activity
        WHERE state = 'active'
        
        UNION ALL
        
        SELECT 
            'cache_hit_ratio'::TEXT,
            ROUND(
                (sum(blks_hit) * 100.0 / (sum(blks_hit) + sum(blks_read))), 2
            ),
            95::NUMERIC
        FROM pg_stat_database
        WHERE datname = current_database()
        
        UNION ALL
        
        SELECT 
            'dead_tuples_ratio'::TEXT,
            ROUND(
                (sum(n_dead_tup) * 100.0 / sum(n_live_tup + n_dead_tup)), 2
            ),
            10::NUMERIC
        FROM pg_stat_user_tables
    )
    SELECT 
        s.metric_name,
        s.metric_value,
        s.threshold,
        CASE 
            WHEN s.metric_value > s.threshold THEN 'WARNING'
            ELSE 'OK'
        END as status
    FROM stats s;
END;
$$ LANGUAGE plpgsql;
```

### Alertes Automatiques

```sql
-- Table des alertes
CREATE TABLE system_alerts (
    id SERIAL PRIMARY KEY,
    alert_type VARCHAR(50),
    message TEXT,
    severity VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP,
    resolved_by VARCHAR(50)
);

-- Fonction d'alerte
CREATE OR REPLACE FUNCTION check_system_alerts()
RETURNS void AS $$
DECLARE
    alert_record RECORD;
BEGIN
    -- Vérifier les connexions
    IF (SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active') > 80 THEN
        INSERT INTO system_alerts (alert_type, message, severity)
        VALUES ('high_connections', 'Too many active connections', 'WARNING');
    END IF;
    
    -- Vérifier le cache hit ratio
    IF (SELECT ROUND((sum(blks_hit) * 100.0 / (sum(blks_hit) + sum(blks_read))), 2)
        FROM pg_stat_database WHERE datname = current_database()) < 95 THEN
        INSERT INTO system_alerts (alert_type, message, severity)
        VALUES ('low_cache_hit', 'Cache hit ratio below 95%', 'WARNING');
    END IF;
    
    -- Vérifier l'espace disque
    IF (SELECT pg_database_size(current_database()) / 1024 / 1024 / 1024) > 10 THEN
        INSERT INTO system_alerts (alert_type, message, severity)
        VALUES ('large_database', 'Database size exceeds 10GB', 'INFO');
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Programmer les vérifications
SELECT cron.schedule('system-alerts', '*/5 * * * *', 'SELECT check_system_alerts()');
```

## 10. Maintenance et Optimisation

### Maintenance Automatique

```sql
-- Script de maintenance complète
CREATE OR REPLACE FUNCTION maintenance_routine()
RETURNS void AS $$
DECLARE
    table_record RECORD;
BEGIN
    -- ANALYZE sur toutes les tables
    FOR table_record IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('ANALYZE %I.%I', table_record.schemaname, table_record.tablename);
    END LOOP;
    
    -- VACUUM sur les tables avec beaucoup de dead tuples
    FOR table_record IN 
        SELECT schemaname, tablename
        FROM pg_stat_user_tables
        WHERE n_dead_tup > 1000
    LOOP
        EXECUTE format('VACUUM %I.%I', table_record.schemaname, table_record.tablename);
    END LOOP;
    
    -- REINDEX sur les index corrompus
    FOR table_record IN 
        SELECT schemaname, tablename
        FROM pg_stat_user_tables
        WHERE n_dead_tup > n_live_tup
    LOOP
        EXECUTE format('REINDEX TABLE %I.%I', table_record.schemaname, table_record.tablename);
    END LOOP;
    
    -- Nettoyer les logs anciens
    DELETE FROM system_alerts 
    WHERE created_at < NOW() - INTERVAL '30 days' 
    AND resolved_at IS NOT NULL;
    
END;
$$ LANGUAGE plpgsql;

-- Programmer la maintenance
SELECT cron.schedule('maintenance', '0 2 * * 0', 'SELECT maintenance_routine()');
```

## Bonnes Pratiques Expertes

1. **Monitoring Continu** : Surveiller les métriques clés en temps réel
2. **Sauvegardes Automatisées** : Automatiser les sauvegardes et tests de récupération
3. **Optimisation des Requêtes** : Analyser régulièrement les requêtes lentes
4. **Gestion des Index** : Maintenir les index et éviter la fragmentation
5. **Sécurité** : Implémenter RLS et audit pour les données sensibles
6. **Haute Disponibilité** : Configurer la réplication et le failover
7. **Maintenance Préventive** : Automatiser les tâches de maintenance
8. **Documentation** : Documenter les configurations et procédures

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
