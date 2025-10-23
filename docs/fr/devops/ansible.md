# 🔧 Ansible - Guide Complet

> **Ansible** est un outil d'automatisation open-source qui permet de gérer la configuration, le déploiement et l'orchestration d'infrastructures informatiques de manière simple et efficace.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-ansible)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [🟢 Premiers Pas](#-débutant---premiers-pas)
- [🟡 Playbooks et Inventaires](#-intermédiaire---playbooks-et-inventaires)
- [🟠 Roles et Collections](#-confirmé---roles-et-collections)
- [🔴 Patterns Avancés](#-senior---patterns-avancés)
- [⚫ Automatisation et CI/CD](#-expert---automatisation-et-cicd)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète Ansible

### 🎯 Modules Essentiels

| Module | Description | Exemple | Utilisation |
|--------|-------------|---------|-------------|
| **copy** | Copier des fichiers | `copy: src=file.txt dest=/tmp/` | Déploiement de fichiers |
| **template** | Rendu de templates | `template: src=config.j2 dest=/etc/app/` | Configuration dynamique |
| **file** | Gestion des fichiers | `file: path=/tmp/test state=directory` | Création de dossiers |
| **service** | Gestion des services | `service: name=nginx state=started` | Démarrage de services |
| **package** | Gestion des paquets | `package: name=nginx state=present` | Installation de paquets |
| **user** | Gestion des utilisateurs | `user: name=john state=present` | Création d'utilisateurs |
| **group** | Gestion des groupes | `group: name=developers state=present` | Création de groupes |
| **cron** | Gestion des tâches cron | `cron: name="backup" job="/bin/backup.sh"` | Planification de tâches |
| **mount** | Gestion des montages | `mount: path=/mnt/data src=/dev/sdb1` | Montage de systèmes de fichiers |
| **systemd** | Gestion systemd | `systemd: name=nginx enabled=yes` | Services systemd |

### 🎯 Modules de Réseau

| Module | Description | Exemple | Utilisation |
|--------|-------------|---------|-------------|
| **uri** | Requêtes HTTP | `uri: url=http://api.com method=GET` | Tests d'API |
| **get_url** | Téléchargement | `get_url: url=http://example.com/file.tar.gz` | Téléchargement de fichiers |
| **synchronize** | Synchronisation | `synchronize: src=/local/ dest=/remote/` | Synchronisation de fichiers |
| **ping** | Test de connectivité | `ping:` | Test de ping |
| **wait_for** | Attente | `wait_for: port=80 state=started` | Attente de services |
| **lineinfile** | Modification de lignes | `lineinfile: path=/etc/hosts line="127.0.0.1 localhost"` | Modification de fichiers |
| **replace** | Remplacement | `replace: path=/etc/config regexp='^old' replace='new'` | Remplacement de contenu |
| **blockinfile** | Blocs de texte | `blockinfile: path=/etc/config marker="# {mark} ANSIBLE MANAGED"` | Gestion de blocs |

### 🎯 Modules de Base de Données

| Module | Description | Exemple | Utilisation |
|--------|-------------|---------|-------------|
| **mysql_db** | Base MySQL | `mysql_db: name=mydb state=present` | Gestion de bases MySQL |
| **mysql_user** | Utilisateur MySQL | `mysql_user: name=user password=pass` | Gestion d'utilisateurs MySQL |
| **postgresql_db** | Base PostgreSQL | `postgresql_db: name=mydb state=present` | Gestion de bases PostgreSQL |
| **postgresql_user** | Utilisateur PostgreSQL | `postgresql_user: name=user password=pass` | Gestion d'utilisateurs PostgreSQL |
| **mongodb_user** | Utilisateur MongoDB | `mongodb_user: name=user password=pass` | Gestion d'utilisateurs MongoDB |
| **redis** | Redis | `redis: command=ping` | Commandes Redis |

### 🎯 Modules Cloud

| Module | Description | Exemple | Utilisation |
|--------|-------------|---------|-------------|
| **ec2_instance** | Instance EC2 | `ec2_instance: name=web-server image_id=ami-123` | Gestion d'instances AWS |
| **s3** | Bucket S3 | `s3: bucket=my-bucket state=present` | Gestion de buckets S3 |
| **rds** | Base RDS | `rds: name=mydb engine=mysql` | Gestion de bases RDS |
| **azure_rm_virtualmachine** | VM Azure | `azure_rm_virtualmachine: name=vm1` | Gestion de VMs Azure |
| **gcp_compute_instance** | Instance GCP | `gcp_compute_instance: name=vm1` | Gestion d'instances GCP |
| **docker_container** | Conteneur Docker | `docker_container: name=app image=nginx` | Gestion de conteneurs |
| **kubernetes** | Kubernetes | `kubernetes: name=deployment` | Gestion de ressources K8s |

### 🎯 Commandes Ansible

| Commande | Description | Exemple | Utilisation |
|----------|-------------|---------|-------------|
| **ansible** | Exécution de commandes | `ansible all -m ping` | Test de connectivité |
| **ansible-playbook** | Exécution de playbooks | `ansible-playbook site.yml` | Déploiement complet |
| **ansible-vault** | Gestion des secrets | `ansible-vault encrypt file.yml` | Chiffrement de fichiers |
| **ansible-galaxy** | Gestion des roles | `ansible-galaxy install role` | Installation de roles |
| **ansible-config** | Configuration | `ansible-config dump` | Affichage de la config |
| **ansible-inventory** | Inventaire | `ansible-inventory --list` | Affichage de l'inventaire |
| **ansible-doc** | Documentation | `ansible-doc copy` | Documentation des modules |
| **ansible-console** | Console interactive | `ansible-console` | Console interactive |

### 🎯 Configuration Ansible

| Option | Description | Valeur par défaut | Fichier |
|--------|-------------|-------------------|---------|
| **inventory** | Fichier d'inventaire | `/etc/ansible/hosts` | `ansible.cfg` |
| **host_key_checking** | Vérification des clés SSH | `True` | `ansible.cfg` |
| **remote_user** | Utilisateur distant | `root` | `ansible.cfg` |
| **private_key_file** | Clé privée SSH | `~/.ssh/id_rsa` | `ansible.cfg` |
| **timeout** | Timeout des connexions | `30` | `ansible.cfg` |
| **forks** | Nombre de processus parallèles | `5` | `ansible.cfg` |
| **gathering** | Collecte de facts | `implicit` | `ansible.cfg` |
| **fact_caching** | Cache des facts | `memory` | `ansible.cfg` |
| **retry_files_enabled** | Fichiers de retry | `True` | `ansible.cfg` |
| **stdout_callback** | Callback de sortie | `default` | `ansible.cfg` |

### 🎯 Variables Ansible

| Type | Description | Exemple | Priorité |
|------|-------------|---------|----------|
| **ansible_facts** | Facts système | `ansible_distribution` | 1 |
| **group_vars** | Variables de groupe | `group_vars/all.yml` | 2 |
| **host_vars** | Variables d'hôte | `host_vars/server1.yml` | 3 |
| **playbook_vars** | Variables de playbook | `vars:` | 4 |
| **inventory_vars** | Variables d'inventaire | `[group:vars]` | 5 |
| **extra_vars** | Variables extra | `-e "var=value"` | 6 |
| **command_line** | Ligne de commande | `--extra-vars` | 7 |

---

## 🚀 Introduction

Ansible est un outil d'automatisation open-source qui simplifie la gestion de l'infrastructure informatique en utilisant des playbooks déclaratifs et des modules idempotents.

### Qu'est-ce qu'Ansible ?
Ansible est un moteur d'automatisation qui permet de gérer la configuration, le déploiement et l'orchestration d'infrastructures informatiques de manière simple et efficace. Il utilise SSH pour communiquer avec les serveurs et ne nécessite pas d'agent installé.

### Pourquoi choisir Ansible ?
- **🎯 Simplicité** : Syntaxe YAML lisible et intuitive
- **🚀 Agentless** : Pas d'agent à installer sur les serveurs
- **🔧 Idempotent** : Exécution sûre et répétable
- **🌐 Multi-Plateforme** : Support de nombreux systèmes d'exploitation
- **☁️ Cloud-Native** : Intégration avec AWS, Azure, GCP
- **🔒 Sécurisé** : Gestion des secrets avec Ansible Vault
- **📦 Modulaire** : Modules et roles réutilisables
- **🔄 CI/CD** : Intégration avec les pipelines de déploiement

### Quand utiliser Ansible ?
- Configuration de serveurs
- Déploiement d'applications
- Gestion de configurations
- Orchestration de services
- Automatisation de tâches
- Gestion de l'infrastructure
- Provisioning de machines
- Gestion des bases de données

---

## ⚙️ Installation et Configuration

### Installation

```bash
# Installation sur Ubuntu/Debian
sudo apt update
sudo apt install software-properties-common
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt install ansible

# Installation sur CentOS/RHEL
sudo yum install epel-release
sudo yum install ansible

# Installation avec pip
pip install ansible

# Installation avec pipx
pipx install ansible

# Installation avec Homebrew (macOS)
brew install ansible
```

### Configuration de base

```ini
# ansible.cfg
[defaults]
inventory = inventory/hosts
host_key_checking = False
remote_user = ansible
private_key_file = ~/.ssh/id_rsa
timeout = 30
forks = 5
gathering = implicit
fact_caching = memory
retry_files_enabled = True
stdout_callback = yaml

[inventory]
enable_plugins = host_list, script, auto, yaml, ini, toml

[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s
pipelining = True
```

### Configuration SSH

```bash
# Configuration SSH pour Ansible
# ~/.ssh/config
Host *
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
    ServerAliveInterval 60
    ServerAliveCountMax 3

Host server1
    HostName 192.168.1.10
    User ansible
    IdentityFile ~/.ssh/id_rsa

Host server2
    HostName 192.168.1.11
    User ansible
    IdentityFile ~/.ssh/id_rsa
```

---

## 🟢 Premiers Pas

### Premier inventaire

```ini
# inventory/hosts
[webservers]
web1 ansible_host=192.168.1.10
web2 ansible_host=192.168.1.11

[databases]
db1 ansible_host=192.168.1.20

[all:vars]
ansible_user=ansible
ansible_ssh_private_key_file=~/.ssh/id_rsa
```

### Premier playbook

```yaml
# playbooks/hello-world.yml
---
- name: Hello World Playbook
  hosts: all
  become: yes
  tasks:
    - name: Display a message
      debug:
        msg: "Hello World from {{ inventory_hostname }}"
    
    - name: Check if file exists
      stat:
        path: /etc/hostname
      register: hostname_file
    
    - name: Display hostname
      debug:
        msg: "Hostname file exists: {{ hostname_file.stat.exists }}"
```

### Exécution du playbook

```bash
# Test de connectivité
ansible all -m ping

# Exécution du playbook
ansible-playbook playbooks/hello-world.yml

# Exécution avec verbose
ansible-playbook playbooks/hello-world.yml -v

# Exécution sur un groupe spécifique
ansible-playbook playbooks/hello-world.yml --limit webservers
```

### Gestion des erreurs

```yaml
# playbooks/error-handling.yml
---
- name: Error Handling Example
  hosts: all
  become: yes
  tasks:
    - name: Install package
      package:
        name: nginx
        state: present
      ignore_errors: yes
      register: install_result
    
    - name: Check installation result
      debug:
        msg: "Installation result: {{ install_result.msg }}"
      when: install_result.failed
    
    - name: Start service
      service:
        name: nginx
        state: started
      when: not install_result.failed
```

---

## 🟡 Playbooks et Inventaires

### Inventaire avancé

```yaml
# inventory/production.yml
all:
  children:
    webservers:
      hosts:
        web1:
          ansible_host: 192.168.1.10
          ansible_user: ansible
          nginx_port: 80
        web2:
          ansible_host: 192.168.1.11
          ansible_user: ansible
          nginx_port: 80
      vars:
        nginx_worker_processes: 4
        nginx_worker_connections: 1024
    
    databases:
      hosts:
        db1:
          ansible_host: 192.168.1.20
          ansible_user: ansible
          mysql_port: 3306
        db2:
          ansible_host: 192.168.1.21
          ansible_user: ansible
          mysql_port: 3306
      vars:
        mysql_root_password: "{{ vault_mysql_root_password }}"
        mysql_databases:
          - name: app_db
            encoding: utf8
          - name: test_db
            encoding: utf8
    
    load_balancers:
      hosts:
        lb1:
          ansible_host: 192.168.1.30
          ansible_user: ansible
      vars:
        haproxy_backend_servers:
          - "web1:80"
          - "web2:80"
```

### Playbook complexe

```yaml
# playbooks/webserver-setup.yml
---
- name: Configure Web Servers
  hosts: webservers
  become: yes
  vars:
    nginx_config_file: /etc/nginx/nginx.conf
    nginx_sites_dir: /etc/nginx/sites-available
    nginx_enabled_dir: /etc/nginx/sites-enabled
  
  pre_tasks:
    - name: Update package cache
      package:
        update_cache: yes
      when: ansible_os_family == "Debian"
    
    - name: Install EPEL repository
      yum:
        name: epel-release
        state: present
      when: ansible_os_family == "RedHat"
  
  tasks:
    - name: Install Nginx
      package:
        name: nginx
        state: present
    
    - name: Create Nginx configuration directory
      file:
        path: "{{ nginx_sites_dir }}"
        state: directory
        mode: '0755'
    
    - name: Configure Nginx
      template:
        src: nginx.conf.j2
        dest: "{{ nginx_config_file }}"
        backup: yes
      notify: restart nginx
    
    - name: Enable Nginx site
      file:
        src: "{{ nginx_sites_dir }}/default"
        dest: "{{ nginx_enabled_dir }}/default"
        state: link
      notify: restart nginx
    
    - name: Start and enable Nginx
      service:
        name: nginx
        state: started
        enabled: yes
  
  handlers:
    - name: restart nginx
      service:
        name: nginx
        state: restarted
```

### Templates Jinja2

```jinja2
# templates/nginx.conf.j2
user nginx;
worker_processes {{ nginx_worker_processes }};

error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections {{ nginx_worker_connections }};
}

http {
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen {{ nginx_port }} default_server;
        listen [::]:{{ nginx_port }} default_server;
        server_name _;
        root /var/www/html;
        index index.html index.htm;

        location / {
            try_files $uri $uri/ =404;
        }
    }
}
```

### Variables et facts

```yaml
# group_vars/all.yml
---
# Variables globales
app_name: "myapp"
app_version: "1.0.0"
app_user: "app"
app_group: "app"
app_home: "/opt/{{ app_name }}"

# Variables de base de données
db_host: "{{ hostvars[groups['databases'][0]]['ansible_host'] }}"
db_port: 3306
db_name: "{{ app_name }}_db"
db_user: "{{ app_name }}_user"

# Variables de configuration
nginx_worker_processes: "{{ ansible_processor_cores }}"
nginx_worker_connections: 1024
nginx_port: 80

# Variables de sécurité
ssl_cert_path: "/etc/ssl/certs/{{ app_name }}.crt"
ssl_key_path: "/etc/ssl/private/{{ app_name }}.key"
```

---

## 🟠 Roles et Collections

### Structure d'un role

```yaml
# roles/nginx/tasks/main.yml
---
- name: Install Nginx
  package:
    name: nginx
    state: present

- name: Create Nginx configuration directory
  file:
    path: "{{ nginx_config_dir }}"
    state: directory
    mode: '0755'

- name: Configure Nginx
  template:
    src: nginx.conf.j2
    dest: "{{ nginx_config_file }}"
    backup: yes
  notify: restart nginx

- name: Start and enable Nginx
  service:
    name: nginx
    state: started
    enabled: yes
```

```yaml
# roles/nginx/handlers/main.yml
---
- name: restart nginx
  service:
    name: nginx
    state: restarted
```

```yaml
# roles/nginx/defaults/main.yml
---
nginx_config_file: /etc/nginx/nginx.conf
nginx_config_dir: /etc/nginx/conf.d
nginx_sites_dir: /etc/nginx/sites-available
nginx_enabled_dir: /etc/nginx/sites-enabled
nginx_port: 80
nginx_worker_processes: "{{ ansible_processor_cores }}"
nginx_worker_connections: 1024
```

```yaml
# roles/nginx/vars/main.yml
---
nginx_packages:
  - nginx
  - nginx-module-http-headers-more-filter
```

```yaml
# roles/nginx/meta/main.yml
---
galaxy_info:
  author: "John Doe"
  description: "Nginx web server role"
  company: "My Company"
  license: "MIT"
  min_ansible_version: "2.9"
  platforms:
    - name: Ubuntu
      versions:
        - focal
        - jammy
    - name: CentOS
      versions:
        - 7
        - 8
  galaxy_tags:
    - web
    - nginx
    - http
    - server

dependencies: []
```

### Utilisation des roles

```yaml
# playbooks/site.yml
---
- name: Configure Web Servers
  hosts: webservers
  become: yes
  roles:
    - nginx
    - { role: mysql, when: "'databases' in group_names" }
    - { role: php, tags: ['php'] }

- name: Configure Database Servers
  hosts: databases
  become: yes
  roles:
    - mysql
    - { role: redis, when: "redis_enabled | default(false)" }
```

### Collections

```bash
# Installation d'une collection
ansible-galaxy collection install community.mysql

# Installation depuis un fichier requirements
ansible-galaxy collection install -r requirements.yml

# Création d'une collection
ansible-galaxy collection init my_namespace.my_collection
```

```yaml
# requirements.yml
---
collections:
  - name: community.mysql
    version: ">=1.0.0"
  - name: community.docker
    version: ">=1.0.0"
  - name: kubernetes.core
    version: ">=2.0.0"

roles:
  - name: geerlingguy.mysql
    version: ">=3.0.0"
  - name: geerlingguy.nginx
    version: ">=2.0.0"
```

---

## 🔴 Patterns Avancés

### Ansible Vault

```bash
# Créer un fichier chiffré
ansible-vault create group_vars/all/vault.yml

# Chiffrer un fichier existant
ansible-vault encrypt group_vars/all/vault.yml

# Déchiffrer un fichier
ansible-vault decrypt group_vars/all/vault.yml

# Modifier un fichier chiffré
ansible-vault edit group_vars/all/vault.yml

# Exécuter un playbook avec vault
ansible-playbook site.yml --ask-vault-pass
```

```yaml
# group_vars/all/vault.yml
---
vault_mysql_root_password: "supersecretpassword"
vault_ssl_private_key: |
  -----BEGIN PRIVATE KEY-----
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
  -----END PRIVATE KEY-----
vault_api_keys:
  - "sk-1234567890abcdef"
  - "sk-0987654321fedcba"
```

### Patterns de déploiement

```yaml
# playbooks/deploy.yml
---
- name: Deploy Application
  hosts: webservers
  become: yes
  serial: 1
  max_fail_percentage: 25
  vars:
    app_version: "{{ lookup('env', 'APP_VERSION') | default('latest') }}"
    app_artifact: "{{ app_name }}-{{ app_version }}.tar.gz"
    app_artifact_url: "{{ artifact_repository }}/{{ app_artifact }}"
  
  pre_tasks:
    - name: Check if application is running
      systemd:
        name: "{{ app_name }}"
        state: started
      register: app_running
      failed_when: false
    
    - name: Stop application
      systemd:
        name: "{{ app_name }}"
        state: stopped
      when: app_running.status.ActiveState == "active"
  
  tasks:
    - name: Download application artifact
      get_url:
        url: "{{ app_artifact_url }}"
        dest: "/tmp/{{ app_artifact }}"
        mode: '0644'
    
    - name: Extract application
      unarchive:
        src: "/tmp/{{ app_artifact }}"
        dest: "{{ app_home }}"
        remote_src: yes
        owner: "{{ app_user }}"
        group: "{{ app_group }}"
    
    - name: Update application configuration
      template:
        src: "{{ item }}.j2"
        dest: "{{ app_home }}/{{ item }}"
        owner: "{{ app_user }}"
        group: "{{ app_group }}"
        mode: '0644'
      loop:
        - "config/app.yml"
        - "config/database.yml"
        - "config/redis.yml"
      notify: restart application
    
    - name: Run database migrations
      command: "{{ app_home }}/bin/migrate"
      args:
        chdir: "{{ app_home }}"
      become_user: "{{ app_user }}"
      when: run_migrations | default(false)
    
    - name: Start application
      systemd:
        name: "{{ app_name }}"
        state: started
        enabled: yes
    
    - name: Wait for application to be ready
      uri:
        url: "http://localhost:{{ app_port }}/health"
        method: GET
        status_code: 200
      retries: 30
      delay: 10
      register: health_check
      until: health_check.status == 200
  
  handlers:
    - name: restart application
      systemd:
        name: "{{ app_name }}"
        state: restarted
```

### Tests et validation

```yaml
# playbooks/test.yml
---
- name: Run Application Tests
  hosts: webservers
  become: yes
  tasks:
    - name: Install test dependencies
      package:
        name: "{{ item }}"
        state: present
      loop:
        - python3-pytest
        - python3-requests
        - curl
    
    - name: Run unit tests
      command: "{{ app_home }}/bin/test"
      args:
        chdir: "{{ app_home }}"
      become_user: "{{ app_user }}"
      register: test_result
      failed_when: test_result.rc != 0
    
    - name: Run integration tests
      uri:
        url: "http://localhost:{{ app_port }}/api/health"
        method: GET
        status_code: 200
      register: health_check
    
    - name: Run load tests
      command: "{{ app_home }}/bin/loadtest"
      args:
        chdir: "{{ app_home }}"
      become_user: "{{ app_user }}"
      when: run_load_tests | default(false)
```

---

## ⚫ Automatisation et CI/CD

### Configuration avancée

```ini
# ansible.cfg
[defaults]
inventory = inventory/hosts
host_key_checking = False
remote_user = ansible
private_key_file = ~/.ssh/id_rsa
timeout = 30
forks = 10
gathering = smart
fact_caching = jsonfile
fact_caching_connection = /tmp/ansible_facts_cache
fact_caching_timeout = 86400
retry_files_enabled = True
stdout_callback = yaml
stderr_callback = yaml
log_path = /var/log/ansible.log
roles_path = roles:collections/ansible_collections
collections_paths = collections

[inventory]
enable_plugins = host_list, script, auto, yaml, ini, toml, constructed

[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no
pipelining = True
control_path = /tmp/ansible-ssh-%%h-%%p-%%r
```

### Intégration CI/CD

```yaml
# .github/workflows/ansible.yml
name: Ansible Deployment

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Python
      uses: actions/setup-python@v3
      with:
        python-version: '3.9'
    
    - name: Install Ansible
      run: |
        pip install ansible
        pip install ansible-lint
        pip install molecule
        pip install docker
    
    - name: Run Ansible Lint
      run: ansible-lint playbooks/
    
    - name: Run Molecule Tests
      run: |
        cd roles/nginx
        molecule test
    
    - name: Run Playbook Syntax Check
      run: ansible-playbook playbooks/site.yml --syntax-check
    
    - name: Run Playbook Dry Run
      run: ansible-playbook playbooks/site.yml --check --diff

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Python
      uses: actions/setup-python@v3
      with:
        python-version: '3.9'
    
    - name: Install Ansible
      run: pip install ansible
    
    - name: Deploy to Production
      run: ansible-playbook playbooks/site.yml
      env:
        ANSIBLE_HOST_KEY_CHECKING: False
        VAULT_PASSWORD: ${{ secrets.VAULT_PASSWORD }}
```

### Automatisation avec AWX

```yaml
# awx-job-template.yml
---
name: "Deploy Application"
description: "Deploy application to production servers"
job_type: "run"
inventory: "Production"
project: "My Project"
playbook: "playbooks/deploy.yml"
credential: "SSH Key"
vault_credential: "Vault Password"
forks: 10
limit: "webservers"
verbosity: 1
extra_vars: |
  app_version: "{{ app_version }}"
  run_migrations: true
  run_load_tests: false
```

### Monitoring et alerting

```yaml
# playbooks/monitoring.yml
---
- name: Setup Monitoring
  hosts: all
  become: yes
  tasks:
    - name: Install Prometheus Node Exporter
      package:
        name: prometheus-node-exporter
        state: present
    
    - name: Configure Node Exporter
      template:
        src: node_exporter.service.j2
        dest: /etc/systemd/system/node_exporter.service
      notify: restart node_exporter
    
    - name: Start Node Exporter
      systemd:
        name: node_exporter
        state: started
        enabled: yes
    
    - name: Install Grafana
      package:
        name: grafana
        state: present
    
    - name: Configure Grafana
      template:
        src: grafana.ini.j2
        dest: /etc/grafana/grafana.ini
      notify: restart grafana
    
    - name: Start Grafana
      systemd:
        name: grafana-server
        state: started
        enabled: yes
  
  handlers:
    - name: restart node_exporter
      systemd:
        name: node_exporter
        state: restarted
    
    - name: restart grafana
      systemd:
        name: grafana-server
        state: restarted
```

---

## 📚 Ressources

### Documentation officielle
- [Ansible Documentation](https://docs.ansible.com/)
- [Ansible Module Index](https://docs.ansible.com/ansible/latest/modules/modules_by_category.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)

### Outils et extensions
- [Ansible Lint](https://ansible-lint.readthedocs.io/)
- [Molecule](https://molecule.readthedocs.io/)
- [AWX](https://github.com/ansible/awx)

### Patterns et bonnes pratiques
- [Ansible Best Practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Ansible Collections](https://docs.ansible.com/ansible/latest/user_guide/collections_using.html)

### Intégration et CI/CD
- [Ansible CI/CD](https://docs.ansible.com/ansible/latest/user_guide/ci.html)
- [GitHub Actions](https://docs.ansible.com/ansible/latest/user_guide/ci.html#github-actions)
- [Jenkins Integration](https://docs.ansible.com/ansible/latest/user_guide/ci.html#jenkins)

---

*Dernière mise à jour : Janvier 2024*
