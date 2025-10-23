# 🔧 Ansible - Complete Guide

> **Ansible** is an open-source automation tool that allows you to manage configuration, deployment, and orchestration of IT infrastructure in a simple and efficient way.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-ansible-reference-tables)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation and Configuration](#️-installation-and-configuration)
- [🟢 Getting Started](#-beginner---getting-started)
- [🟡 Playbooks and Inventories](#-intermediate---playbooks-and-inventories)
- [🟠 Roles and Collections](#-advanced---roles-and-collections)
- [🔴 Advanced Patterns](#-senior---advanced-patterns)
- [⚫ Automation and CI/CD](#-expert---automation-and-cicd)
- [📚 Resources](#-resources)

---

## 🎯 Complete Ansible Reference Tables

### 🎯 Essential Modules

| Module | Description | Example | Usage |
|--------|-------------|---------|-------|
| **copy** | Copy files | `copy: src=file.txt dest=/tmp/` | File deployment |
| **template** | Template rendering | `template: src=config.j2 dest=/etc/app/` | Dynamic configuration |
| **file** | File management | `file: path=/tmp/test state=directory` | Directory creation |
| **service** | Service management | `service: name=nginx state=started` | Service startup |
| **package** | Package management | `package: name=nginx state=present` | Package installation |
| **user** | User management | `user: name=john state=present` | User creation |
| **group** | Group management | `group: name=developers state=present` | Group creation |
| **cron** | Cron job management | `cron: name="backup" job="/bin/backup.sh"` | Task scheduling |
| **mount** | Mount management | `mount: path=/mnt/data src=/dev/sdb1` | Filesystem mounting |
| **systemd** | systemd management | `systemd: name=nginx enabled=yes` | systemd services |

### 🎯 Network Modules

| Module | Description | Example | Usage |
|--------|-------------|---------|-------|
| **uri** | HTTP requests | `uri: url=http://api.com method=GET` | API testing |
| **get_url** | Download | `get_url: url=http://example.com/file.tar.gz` | File downloading |
| **synchronize** | Synchronization | `synchronize: src=/local/ dest=/remote/` | File synchronization |
| **ping** | Connectivity test | `ping:` | Ping test |
| **wait_for** | Wait | `wait_for: port=80 state=started` | Service waiting |
| **lineinfile** | Line modification | `lineinfile: path=/etc/hosts line="127.0.0.1 localhost"` | File modification |
| **replace** | Replacement | `replace: path=/etc/config regexp='^old' replace='new'` | Content replacement |
| **blockinfile** | Text blocks | `blockinfile: path=/etc/config marker="# {mark} ANSIBLE MANAGED"` | Block management |

### 🎯 Database Modules

| Module | Description | Example | Usage |
|--------|-------------|---------|-------|
| **mysql_db** | MySQL database | `mysql_db: name=mydb state=present` | MySQL database management |
| **mysql_user** | MySQL user | `mysql_user: name=user password=pass` | MySQL user management |
| **postgresql_db** | PostgreSQL database | `postgresql_db: name=mydb state=present` | PostgreSQL database management |
| **postgresql_user** | PostgreSQL user | `postgresql_user: name=user password=pass` | PostgreSQL user management |
| **mongodb_user** | MongoDB user | `mongodb_user: name=user password=pass` | MongoDB user management |
| **redis** | Redis | `redis: command=ping` | Redis commands |

### 🎯 Cloud Modules

| Module | Description | Example | Usage |
|--------|-------------|---------|-------|
| **ec2_instance** | EC2 instance | `ec2_instance: name=web-server image_id=ami-123` | AWS instance management |
| **s3** | S3 bucket | `s3: bucket=my-bucket state=present` | S3 bucket management |
| **rds** | RDS database | `rds: name=mydb engine=mysql` | RDS database management |
| **azure_rm_virtualmachine** | Azure VM | `azure_rm_virtualmachine: name=vm1` | Azure VM management |
| **gcp_compute_instance** | GCP instance | `gcp_compute_instance: name=vm1` | GCP instance management |
| **docker_container** | Docker container | `docker_container: name=app image=nginx` | Container management |
| **kubernetes** | Kubernetes | `kubernetes: name=deployment` | K8s resource management |

### 🎯 Ansible Commands

| Command | Description | Example | Usage |
|---------|-------------|---------|-------|
| **ansible** | Execute commands | `ansible all -m ping` | Connectivity testing |
| **ansible-playbook** | Execute playbooks | `ansible-playbook site.yml` | Complete deployment |
| **ansible-vault** | Secret management | `ansible-vault encrypt file.yml` | File encryption |
| **ansible-galaxy** | Role management | `ansible-galaxy install role` | Role installation |
| **ansible-config** | Configuration | `ansible-config dump` | Configuration display |
| **ansible-inventory** | Inventory | `ansible-inventory --list` | Inventory display |
| **ansible-doc** | Documentation | `ansible-doc copy` | Module documentation |
| **ansible-console** | Interactive console | `ansible-console` | Interactive console |

### 🎯 Ansible Configuration

| Option | Description | Default Value | File |
|--------|-------------|---------------|------|
| **inventory** | Inventory file | `/etc/ansible/hosts` | `ansible.cfg` |
| **host_key_checking** | SSH key verification | `True` | `ansible.cfg` |
| **remote_user** | Remote user | `root` | `ansible.cfg` |
| **private_key_file** | Private SSH key | `~/.ssh/id_rsa` | `ansible.cfg` |
| **timeout** | Connection timeout | `30` | `ansible.cfg` |
| **forks** | Parallel processes | `5` | `ansible.cfg` |
| **gathering** | Fact gathering | `implicit` | `ansible.cfg` |
| **fact_caching** | Fact caching | `memory` | `ansible.cfg` |
| **retry_files_enabled** | Retry files | `True` | `ansible.cfg` |
| **stdout_callback** | Output callback | `default` | `ansible.cfg` |

### 🎯 Ansible Variables

| Type | Description | Example | Priority |
|------|-------------|---------|----------|
| **ansible_facts** | System facts | `ansible_distribution` | 1 |
| **group_vars** | Group variables | `group_vars/all.yml` | 2 |
| **host_vars** | Host variables | `host_vars/server1.yml` | 3 |
| **playbook_vars** | Playbook variables | `vars:` | 4 |
| **inventory_vars** | Inventory variables | `[group:vars]` | 5 |
| **extra_vars** | Extra variables | `-e "var=value"` | 6 |
| **command_line** | Command line | `--extra-vars` | 7 |

---

## 🚀 Introduction

Ansible is an open-source automation tool that simplifies IT infrastructure management by using declarative playbooks and idempotent modules.

### What is Ansible?
Ansible is an automation engine that allows you to manage configuration, deployment, and orchestration of IT infrastructure in a simple and efficient way. It uses SSH to communicate with servers and doesn't require an agent to be installed.

### Why choose Ansible?
- **🎯 Simplicity** : Readable and intuitive YAML syntax
- **🚀 Agentless** : No agent to install on servers
- **🔧 Idempotent** : Safe and repeatable execution
- **🌐 Multi-Platform** : Support for many operating systems
- **☁️ Cloud-Native** : Integration with AWS, Azure, GCP
- **🔒 Secure** : Secret management with Ansible Vault
- **📦 Modular** : Reusable modules and roles
- **🔄 CI/CD** : Integration with deployment pipelines

### When to use Ansible?
- Server configuration
- Application deployment
- Configuration management
- Service orchestration
- Task automation
- Infrastructure management
- Machine provisioning
- Database management

---

## ⚙️ Installation and Configuration

### Installation

```bash
# Installation on Ubuntu/Debian
sudo apt update
sudo apt install software-properties-common
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt install ansible

# Installation on CentOS/RHEL
sudo yum install epel-release
sudo yum install ansible

# Installation with pip
pip install ansible

# Installation with pipx
pipx install ansible

# Installation with Homebrew (macOS)
brew install ansible
```

### Basic configuration

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

### SSH Configuration

```bash
# SSH configuration for Ansible
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

## 🟢 Getting Started

### First inventory

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

### First playbook

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

### Playbook execution

```bash
# Connectivity test
ansible all -m ping

# Playbook execution
ansible-playbook playbooks/hello-world.yml

# Execution with verbose
ansible-playbook playbooks/hello-world.yml -v

# Execution on specific group
ansible-playbook playbooks/hello-world.yml --limit webservers
```

### Error handling

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

## 🟡 Playbooks and Inventories

### Advanced inventory

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

### Complex playbook

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

### Jinja2 Templates

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

### Variables and facts

```yaml
# group_vars/all.yml
---
# Global variables
app_name: "myapp"
app_version: "1.0.0"
app_user: "app"
app_group: "app"
app_home: "/opt/{{ app_name }}"

# Database variables
db_host: "{{ hostvars[groups['databases'][0]]['ansible_host'] }}"
db_port: 3306
db_name: "{{ app_name }}_db"
db_user: "{{ app_name }}_user"

# Configuration variables
nginx_worker_processes: "{{ ansible_processor_cores }}"
nginx_worker_connections: 1024
nginx_port: 80

# Security variables
ssl_cert_path: "/etc/ssl/certs/{{ app_name }}.crt"
ssl_key_path: "/etc/ssl/private/{{ app_name }}.key"
```

---

## 🟠 Roles and Collections

### Role structure

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

### Using roles

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
# Install a collection
ansible-galaxy collection install community.mysql

# Install from requirements file
ansible-galaxy collection install -r requirements.yml

# Create a collection
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

## 🔴 Advanced Patterns

### Ansible Vault

```bash
# Create an encrypted file
ansible-vault create group_vars/all/vault.yml

# Encrypt an existing file
ansible-vault encrypt group_vars/all/vault.yml

# Decrypt a file
ansible-vault decrypt group_vars/all/vault.yml

# Edit an encrypted file
ansible-vault edit group_vars/all/vault.yml

# Execute a playbook with vault
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

### Deployment patterns

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

### Tests and validation

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

## ⚫ Automation and CI/CD

### Advanced configuration

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

### CI/CD Integration

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

### Automation with AWX

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

### Monitoring and alerting

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

## 📚 Resources

### Official Documentation
- [Ansible Documentation](https://docs.ansible.com/)
- [Ansible Module Index](https://docs.ansible.com/ansible/latest/modules/modules_by_category.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)

### Tools and Extensions
- [Ansible Lint](https://ansible-lint.readthedocs.io/)
- [Molecule](https://molecule.readthedocs.io/)
- [AWX](https://github.com/ansible/awx)

### Patterns and Best Practices
- [Ansible Best Practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Ansible Collections](https://docs.ansible.com/ansible/latest/user_guide/collections_using.html)

### Integration and CI/CD
- [Ansible CI/CD](https://docs.ansible.com/ansible/latest/user_guide/ci.html)
- [GitHub Actions](https://docs.ansible.com/ansible/latest/user_guide/ci.html#github-actions)
- [Jenkins Integration](https://docs.ansible.com/ansible/latest/user_guide/ci.html#jenkins)

---

*Last updated: January 2024*
