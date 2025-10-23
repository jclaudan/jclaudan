# 🏗️ Terraform - Guide Complet

> **Terraform** est un outil d'Infrastructure as Code (IaC) open-source développé par HashiCorp qui permet de définir, provisionner et gérer l'infrastructure cloud de manière déclarative et versionnée.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-terraform)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [🟢 Premiers Pas](#-débutant---premiers-pas)
- [🟡 Ressources et Modules](#-intermédiaire---ressources-et-modules)
- [🟠 State et Workspaces](#-confirmé---state-et-workspaces)
- [🔴 Patterns Avancés](#-senior---patterns-avancés)
- [⚫ Multi-Cloud et CI/CD](#-expert---multi-cloud-et-cicd)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète Terraform

### 🎯 Providers Essentiels

| Provider | Description | Ressources Principales | Utilisation |
|----------|-------------|----------------------|-------------|
| **AWS** | Amazon Web Services | `aws_instance`, `aws_s3_bucket`, `aws_rds_instance` | Cloud AWS |
| **Azure** | Microsoft Azure | `azurerm_virtual_machine`, `azurerm_storage_account` | Cloud Azure |
| **GCP** | Google Cloud Platform | `google_compute_instance`, `google_storage_bucket` | Cloud GCP |
| **Docker** | Docker | `docker_container`, `docker_image` | Conteneurs |
| **Kubernetes** | Kubernetes | `kubernetes_deployment`, `kubernetes_service` | Orchestration |
| **Local** | Système local | `local_file`, `local_sensitive_file` | Fichiers locaux |
| **Null** | Ressources nulles | `null_resource` | Provisioning |
| **Random** | Valeurs aléatoires | `random_string`, `random_password` | Génération de données |
| **TLS** | Certificats TLS | `tls_private_key`, `tls_cert_request` | Sécurité |
| **HTTP** | Requêtes HTTP | `http_data_source` | APIs externes |

### 🎯 Types de Ressources AWS

| Type | Ressource | Description | Exemple |
|------|-----------|-------------|---------|
| **Compute** | `aws_instance` | Instance EC2 | Serveur web |
| **Storage** | `aws_s3_bucket` | Bucket S3 | Stockage d'objets |
| **Database** | `aws_rds_instance` | Instance RDS | Base de données |
| **Network** | `aws_vpc` | VPC | Réseau virtuel |
| **Security** | `aws_security_group` | Security Group | Pare-feu |
| **Load Balancer** | `aws_lb` | Load Balancer | Répartition de charge |
| **DNS** | `aws_route53_record` | Record DNS | Résolution DNS |
| **IAM** | `aws_iam_role` | Rôle IAM | Permissions |
| **Lambda** | `aws_lambda_function` | Fonction Lambda | Serverless |
| **API Gateway** | `aws_api_gateway_rest_api` | API Gateway | API REST |

### 🎯 Types de Ressources Azure

| Type | Ressource | Description | Exemple |
|------|-----------|-------------|---------|
| **Compute** | `azurerm_virtual_machine` | Machine virtuelle | Serveur web |
| **Storage** | `azurerm_storage_account` | Compte de stockage | Stockage d'objets |
| **Database** | `azurerm_mysql_server` | Serveur MySQL | Base de données |
| **Network** | `azurerm_virtual_network` | Réseau virtuel | Réseau privé |
| **Security** | `azurerm_network_security_group` | NSG | Pare-feu |
| **Load Balancer** | `azurerm_lb` | Load Balancer | Répartition de charge |
| **DNS** | `azurerm_dns_record` | Record DNS | Résolution DNS |
| **Identity** | `azurerm_user_assigned_identity` | Identité managée | Permissions |
| **Functions** | `azurerm_function_app` | Function App | Serverless |
| **API Management** | `azurerm_api_management` | API Management | API REST |

### 🎯 Types de Ressources GCP

| Type | Ressource | Description | Exemple |
|------|-----------|-------------|---------|
| **Compute** | `google_compute_instance` | Instance Compute | Serveur web |
| **Storage** | `google_storage_bucket` | Bucket Cloud Storage | Stockage d'objets |
| **Database** | `google_sql_database_instance` | Instance Cloud SQL | Base de données |
| **Network** | `google_compute_network` | Réseau VPC | Réseau privé |
| **Security** | `google_compute_firewall` | Règle de pare-feu | Pare-feu |
| **Load Balancer** | `google_compute_target_pool` | Target Pool | Répartition de charge |
| **DNS** | `google_dns_record_set` | Record DNS | Résolution DNS |
| **Identity** | `google_service_account` | Compte de service | Permissions |
| **Functions** | `google_cloudfunctions_function` | Cloud Function | Serverless |
| **API Gateway** | `google_api_gateway_api` | API Gateway | API REST |

### 🎯 Commandes Terraform

| Commande | Description | Exemple | Utilisation |
|----------|-------------|---------|-------------|
| **init** | Initialiser le workspace | `terraform init` | Premier setup |
| **plan** | Planifier les changements | `terraform plan` | Voir les modifications |
| **apply** | Appliquer les changements | `terraform apply` | Créer/modifier l'infra |
| **destroy** | Détruire l'infrastructure | `terraform destroy` | Nettoyer l'infra |
| **validate** | Valider la configuration | `terraform validate` | Vérifier la syntaxe |
| **format** | Formater le code | `terraform fmt` | Formatage automatique |
| **show** | Afficher l'état | `terraform show` | Voir l'état actuel |
| **output** | Afficher les outputs | `terraform output` | Voir les valeurs |
| **import** | Importer une ressource | `terraform import aws_instance.web i-1234567890abcdef0` | Importer l'existant |
| **state** | Gérer l'état | `terraform state list` | Lister les ressources |
| **workspace** | Gérer les workspaces | `terraform workspace list` | Lister les workspaces |
| **providers** | Gérer les providers | `terraform providers` | Voir les providers |

### 🎯 Fonctions Terraform

| Fonction | Description | Exemple | Utilisation |
|----------|-------------|---------|-------------|
| **concat** | Concaténer des listes | `concat(["a", "b"], ["c"])` | Fusionner des listes |
| **join** | Joindre des éléments | `join(",", ["a", "b", "c"])` | Créer une chaîne |
| **split** | Diviser une chaîne | `split(",", "a,b,c")` | Créer une liste |
| **length** | Longueur d'une liste | `length(["a", "b", "c"])` | Compter les éléments |
| **lookup** | Rechercher dans une map | `lookup(map, "key", "default")` | Valeur par clé |
| **merge** | Fusionner des maps | `merge(map1, map2)` | Combiner des maps |
| **keys** | Clés d'une map | `keys(map)` | Liste des clés |
| **values** | Valeurs d'une map | `values(map)` | Liste des valeurs |
| **file** | Lire un fichier | `file("file.txt")` | Contenu d'un fichier |
| **templatefile** | Template de fichier | `templatefile("template.tpl", vars)` | Rendu de template |
| **jsonencode** | Encoder en JSON | `jsonencode(object)` | Sérialisation JSON |
| **jsondecode** | Décoder du JSON | `jsondecode(string)` | Désérialisation JSON |
| **base64encode** | Encoder en base64 | `base64encode("hello")` | Encodage base64 |
| **base64decode** | Décoder du base64 | `base64decode("aGVsbG8=")` | Décodage base64 |
| **md5** | Hash MD5 | `md5("hello")` | Calcul de hash |
| **sha256** | Hash SHA256 | `sha256("hello")` | Calcul de hash |
| **uuid** | UUID aléatoire | `uuid()` | Identifiant unique |
| **timestamp** | Timestamp actuel | `timestamp()` | Date/heure actuelle |
| **formatdate** | Formater une date | `formatdate("YYYY-MM-DD", timestamp())` | Formatage de date |

### 🎯 Configuration Terraform

| Option | Description | Valeur par défaut | Fichier |
|--------|-------------|-------------------|---------|
| **required_version** | Version Terraform | Aucune | `versions.tf` |
| **required_providers** | Providers requis | Aucun | `versions.tf` |
| **backend** | Backend de state | Local | `backend.tf` |
| **provider** | Configuration provider | Aucune | `providers.tf` |
| **variable** | Variables d'entrée | Aucune | `variables.tf` |
| **output** | Variables de sortie | Aucune | `outputs.tf` |
| **locals** | Variables locales | Aucune | `locals.tf` |
| **data** | Sources de données | Aucune | `data.tf` |
| **resource** | Ressources à créer | Aucune | `main.tf` |
| **module** | Modules à utiliser | Aucun | `modules.tf` |

---

## 🚀 Introduction

Terraform est un outil d'Infrastructure as Code (IaC) qui permet de définir, provisionner et gérer l'infrastructure cloud de manière déclarative et versionnée.

### Qu'est-ce que Terraform ?
Terraform est un outil d'Infrastructure as Code développé par HashiCorp qui permet de définir l'infrastructure cloud et on-premise dans des fichiers de configuration déclaratifs. Il gère l'état de l'infrastructure et permet de créer, modifier et détruire des ressources de manière prévisible.

### Pourquoi choisir Terraform ?
- **🏗️ Infrastructure as Code** : Définition déclarative de l'infrastructure
- **☁️ Multi-Cloud** : Support de nombreux providers cloud
- **🔄 State Management** : Gestion de l'état de l'infrastructure
- **📦 Modularité** : Réutilisation de code avec les modules
- **🔒 Sécurité** : Gestion des secrets et des permissions
- **📊 Planification** : Visualisation des changements avant application
- **🔄 Versioning** : Contrôle de version de l'infrastructure
- **🌐 Écosystème** : Large communauté et modules disponibles

### Quand utiliser Terraform ?
- Provisioning d'infrastructure cloud
- Gestion de configurations
- Déploiement d'applications
- Gestion de l'infrastructure on-premise
- Automatisation de l'infrastructure
- Multi-cloud et hybrid cloud
- Disaster recovery
- Scaling automatique

---

## ⚙️ Installation et Configuration

### Installation

```bash
# Installation sur Ubuntu/Debian
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Installation sur CentOS/RHEL
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install terraform

# Installation avec Homebrew (macOS)
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Installation avec Chocolatey (Windows)
choco install terraform

# Installation avec pip
pip install terraform

# Installation avec Go
go install github.com/hashicorp/terraform@latest
```

### Configuration de base

```hcl
# versions.tf
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}
```

```hcl
# providers.tf
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "Terraform"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}
```

### Configuration des backends

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

---

## 🟢 Premiers Pas

### Premier fichier Terraform

```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1d0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "HelloWorld"
  }
}
```

### Variables et outputs

```hcl
# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

# outputs.tf
output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.web.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.web.public_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.web.public_dns
}
```

### Exécution des commandes

```bash
# Initialiser Terraform
terraform init

# Vérifier la configuration
terraform validate

# Formater le code
terraform fmt

# Planifier les changements
terraform plan

# Appliquer les changements
terraform apply

# Afficher les outputs
terraform output

# Détruire l'infrastructure
terraform destroy
```

### Ressources de base

```hcl
# main.tf
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "main-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-west-2a"
  map_public_ip_on_launch = true
  
  tags = {
    Name = "public-subnet"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "main-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "public-rt"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}
```

---

## 🟡 Ressources et Modules

### Modules personnalisés

```hcl
# modules/ec2-instance/main.tf
resource "aws_instance" "this" {
  ami           = var.ami_id
  instance_type = var.instance_type
  subnet_id     = var.subnet_id
  key_name      = var.key_name
  
  vpc_security_group_ids = var.security_group_ids
  
  tags = merge(
    var.tags,
    {
      Name = var.name
    }
  )
}

# modules/ec2-instance/variables.tf
variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "Instance type for the EC2 instance"
  type        = string
  default     = "t2.micro"
}

variable "subnet_id" {
  description = "Subnet ID for the EC2 instance"
  type        = string
}

variable "key_name" {
  description = "Key pair name for the EC2 instance"
  type        = string
}

variable "security_group_ids" {
  description = "Security group IDs for the EC2 instance"
  type        = list(string)
  default     = []
}

variable "name" {
  description = "Name for the EC2 instance"
  type        = string
}

variable "tags" {
  description = "Tags for the EC2 instance"
  type        = map(string)
  default     = {}
}

# modules/ec2-instance/outputs.tf
output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.this.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.this.public_ip
}

output "instance_private_ip" {
  description = "Private IP address of the EC2 instance"
  value       = aws_instance.this.private_ip
}
```

### Utilisation des modules

```hcl
# main.tf
module "web_server" {
  source = "./modules/ec2-instance"
  
  ami_id            = "ami-0c55b159cbfafe1d0"
  instance_type     = "t2.micro"
  subnet_id         = aws_subnet.public.id
  key_name          = aws_key_pair.main.key_name
  security_group_ids = [aws_security_group.web.id]
  name              = "web-server"
  
  tags = {
    Environment = "production"
    Role        = "web"
  }
}

module "db_server" {
  source = "./modules/ec2-instance"
  
  ami_id            = "ami-0c55b159cbfafe1d0"
  instance_type     = "t2.small"
  subnet_id         = aws_subnet.private.id
  key_name          = aws_key_pair.main.key_name
  security_group_ids = [aws_security_group.db.id]
  name              = "db-server"
  
  tags = {
    Environment = "production"
    Role        = "database"
  }
}
```

### Data sources

```hcl
# data.tf
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}
```

### Locals et fonctions

```hcl
# locals.tf
locals {
  common_tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
    Owner       = "DevOps Team"
  }
  
  vpc_cidr = "10.0.0.0/16"
  
  availability_zones = slice(data.aws_availability_zones.available.names, 0, 2)
  
  public_subnet_cidrs = [
    cidrsubnet(local.vpc_cidr, 8, 1),
    cidrsubnet(local.vpc_cidr, 8, 2)
  ]
  
  private_subnet_cidrs = [
    cidrsubnet(local.vpc_cidr, 8, 11),
    cidrsubnet(local.vpc_cidr, 8, 12)
  ]
  
  database_subnet_cidrs = [
    cidrsubnet(local.vpc_cidr, 8, 21),
    cidrsubnet(local.vpc_cidr, 8, 22)
  ]
}
```

---

## 🟠 State et Workspaces

### Gestion du state

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-locks"
    
    # Configuration pour le versioning
    versioning = true
    
    # Configuration pour la réplication
    replication_configuration {
      role = "arn:aws:iam::123456789012:role/terraform-state-replication"
      rules {
        id     = "replication"
        status = "Enabled"
        destination {
          bucket = "arn:aws:s3:::my-terraform-state-bucket-replica"
          region = "us-east-1"
        }
      }
    }
  }
}
```

### Workspaces

```bash
# Lister les workspaces
terraform workspace list

# Créer un nouveau workspace
terraform workspace new staging

# Sélectionner un workspace
terraform workspace select production

# Afficher le workspace actuel
terraform workspace show

# Supprimer un workspace
terraform workspace delete staging
```

### Gestion du state

```bash
# Lister les ressources dans le state
terraform state list

# Afficher une ressource spécifique
terraform state show aws_instance.web

# Déplacer une ressource
terraform state mv aws_instance.web aws_instance.web_server

# Supprimer une ressource du state
terraform state rm aws_instance.web

# Importer une ressource existante
terraform import aws_instance.web i-1234567890abcdef0

# Afficher le state complet
terraform state pull > terraform.tfstate
```

### Configuration des workspaces

```hcl
# terraform.tfvars.production
environment = "production"
instance_type = "t3.medium"
min_size = 2
max_size = 10
desired_capacity = 3

# terraform.tfvars.staging
environment = "staging"
instance_type = "t3.small"
min_size = 1
max_size = 3
desired_capacity = 1

# terraform.tfvars.development
environment = "development"
instance_type = "t3.micro"
min_size = 1
max_size = 2
desired_capacity = 1
```

---

## 🔴 Patterns Avancés

### Modules réutilisables

```hcl
# modules/vpc/main.tf
resource "aws_vpc" "this" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = var.enable_dns_hostnames
  enable_dns_support   = var.enable_dns_support
  
  tags = merge(
    var.tags,
    {
      Name = var.name
    }
  )
}

resource "aws_internet_gateway" "this" {
  count  = var.create_igw ? 1 : 0
  vpc_id = aws_vpc.this.id
  
  tags = merge(
    var.tags,
    {
      Name = "${var.name}-igw"
    }
  )
}

resource "aws_subnet" "public" {
  count = length(var.public_subnet_cidrs)
  
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true
  
  tags = merge(
    var.tags,
    {
      Name = "${var.name}-public-${count.index + 1}"
      Type = "public"
    }
  )
}

resource "aws_subnet" "private" {
  count = length(var.private_subnet_cidrs)
  
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]
  
  tags = merge(
    var.tags,
    {
      Name = "${var.name}-private-${count.index + 1}"
      Type = "private"
    }
  )
}

# modules/vpc/variables.tf
variable "name" {
  description = "Name of the VPC"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "enable_dns_hostnames" {
  description = "Enable DNS hostnames in the VPC"
  type        = bool
  default     = true
}

variable "enable_dns_support" {
  description = "Enable DNS support in the VPC"
  type        = bool
  default     = true
}

variable "create_igw" {
  description = "Create an Internet Gateway for the VPC"
  type        = bool
  default     = true
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "List of public subnet CIDR blocks"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "List of private subnet CIDR blocks"
  type        = list(string)
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}

# modules/vpc/outputs.tf
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.this.id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.this.cidr_block
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.this[0].id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private[*].id
}
```

### Utilisation des modules

```hcl
# main.tf
module "vpc" {
  source = "./modules/vpc"
  
  name               = "main"
  cidr_block         = "10.0.0.0/16"
  availability_zones = data.aws_availability_zones.available.names
  
  public_subnet_cidrs = [
    cidrsubnet("10.0.0.0/16", 8, 1),
    cidrsubnet("10.0.0.0/16", 8, 2)
  ]
  
  private_subnet_cidrs = [
    cidrsubnet("10.0.0.0/16", 8, 11),
    cidrsubnet("10.0.0.0/16", 8, 12)
  ]
  
  tags = local.common_tags
}

module "security_groups" {
  source = "./modules/security-groups"
  
  vpc_id = module.vpc.vpc_id
  
  tags = local.common_tags
}

module "ec2_instances" {
  source = "./modules/ec2-instances"
  
  vpc_id              = module.vpc.vpc_id
  public_subnet_ids   = module.vpc.public_subnet_ids
  private_subnet_ids  = module.vpc.private_subnet_ids
  security_group_ids  = module.security_groups.security_group_ids
  
  tags = local.common_tags
}
```

### Gestion des secrets

```hcl
# secrets.tf
resource "aws_secretsmanager_secret" "database_password" {
  name                    = "database-password"
  description             = "Database password for the application"
  recovery_window_in_days = 7
  
  tags = local.common_tags
}

resource "aws_secretsmanager_secret_version" "database_password" {
  secret_id = aws_secretsmanager_secret.database_password.id
  secret_string = jsonencode({
    username = "admin"
    password = random_password.database_password.result
  })
}

resource "random_password" "database_password" {
  length  = 32
  special = true
}

# Utilisation du secret
data "aws_secretsmanager_secret_version" "database_password" {
  secret_id = aws_secretsmanager_secret.database_password.id
}

locals {
  database_credentials = jsondecode(data.aws_secretsmanager_secret_version.database_password.secret_string)
}
```

---

## ⚫ Multi-Cloud et CI/CD

### Configuration multi-cloud

```hcl
# providers.tf
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = local.common_tags
  }
}

provider "azurerm" {
  features {}
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}
```

### Infrastructure multi-cloud

```hcl
# main.tf
# AWS Resources
module "aws_infrastructure" {
  source = "./modules/aws"
  
  environment = var.environment
  region      = var.aws_region
  
  tags = local.common_tags
}

# Azure Resources
module "azure_infrastructure" {
  source = "./modules/azure"
  
  environment = var.environment
  location    = var.azure_location
  
  tags = local.common_tags
}

# Google Cloud Resources
module "gcp_infrastructure" {
  source = "./modules/gcp"
  
  environment = var.environment
  region      = var.gcp_region
  project_id  = var.gcp_project_id
  
  tags = local.common_tags
}

# Cross-cloud networking
module "cross_cloud_networking" {
  source = "./modules/cross-cloud-networking"
  
  aws_vpc_id     = module.aws_infrastructure.vpc_id
  azure_vnet_id  = module.azure_infrastructure.vnet_id
  gcp_vpc_id     = module.gcp_infrastructure.vpc_id
  
  tags = local.common_tags
}
```

### CI/CD avec GitHub Actions

```yaml
# .github/workflows/terraform.yml
name: Terraform

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  TF_VERSION: '1.6.0'
  TF_VAR_environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}

jobs:
  terraform:
    name: Terraform
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        workspace: [production, staging, development]
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: ${{ env.TF_VERSION }}
    
    - name: Terraform Format
      run: terraform fmt -check
      working-directory: ./infrastructure
    
    - name: Terraform Init
      run: terraform init
      working-directory: ./infrastructure
      env:
        TF_WORKSPACE: ${{ matrix.workspace }}
    
    - name: Terraform Validate
      run: terraform validate
      working-directory: ./infrastructure
      env:
        TF_WORKSPACE: ${{ matrix.workspace }}
    
    - name: Terraform Plan
      run: terraform plan -out=tfplan
      working-directory: ./infrastructure
      env:
        TF_WORKSPACE: ${{ matrix.workspace }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
        AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
        AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
        GOOGLE_CREDENTIALS: ${{ secrets.GOOGLE_CREDENTIALS }}
    
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && matrix.workspace == 'production'
      run: terraform apply tfplan
      working-directory: ./infrastructure
      env:
        TF_WORKSPACE: ${{ matrix.workspace }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
        AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
        AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
        GOOGLE_CREDENTIALS: ${{ secrets.GOOGLE_CREDENTIALS }}
```

### Tests Terraform

```hcl
# tests/terraform_test.go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestTerraformAwsExample(t *testing.T) {
    terraformOptions := &terraform.Options{
        TerraformDir: "../",
        VarFiles:     []string{"terraform.tfvars"},
    }
    
    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)
    
    // Test outputs
    instanceId := terraform.Output(t, terraformOptions, "instance_id")
    assert.NotEmpty(t, instanceId)
    
    publicIp := terraform.Output(t, terraformOptions, "instance_public_ip")
    assert.NotEmpty(t, publicIp)
}
```

### Monitoring et alerting

```hcl
# monitoring.tf
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "terraform-dashboard"
  
  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6
        
        properties = {
          metrics = [
            ["AWS/EC2", "CPUUtilization", "InstanceId", aws_instance.web.id],
            [".", "NetworkIn", ".", "."],
            [".", "NetworkOut", ".", "."]
          ]
          period = 300
          stat   = "Average"
          region = var.aws_region
          title  = "EC2 Metrics"
        }
      }
    ]
  })
}

resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "high-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors ec2 cpu utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  
  dimensions = {
    InstanceId = aws_instance.web.id
  }
}

resource "aws_sns_topic" "alerts" {
  name = "terraform-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = "admin@example.com"
}
```

---

## 📚 Ressources

### Documentation officielle
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform Provider Registry](https://registry.terraform.io/)
- [Terraform CLI Reference](https://developer.hashicorp.com/terraform/cli)

### Outils et extensions
- [Terraform Cloud](https://www.terraform.io/cloud)
- [Terragrunt](https://terragrunt.gruntwork.io/)
- [Terraform CDK](https://developer.hashicorp.com/terraform/cdktf)

### Patterns et bonnes pratiques
- [Terraform Best Practices](https://developer.hashicorp.com/terraform/cloud-docs/recommended-practices)
- [Terraform Modules](https://developer.hashicorp.com/terraform/language/modules)
- [Terraform State](https://developer.hashicorp.com/terraform/language/state)

### Intégration et CI/CD
- [Terraform CI/CD](https://developer.hashicorp.com/terraform/cloud-docs/run)
- [GitHub Actions](https://developer.hashicorp.com/terraform/cloud-docs/run/ui)
- [Jenkins Integration](https://developer.hashicorp.com/terraform/cloud-docs/run/api)

---

*Dernière mise à jour : Janvier 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

