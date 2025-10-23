# 🏗️ Terraform - Complete Guide

> **Terraform** is an open-source Infrastructure as Code (IaC) tool developed by HashiCorp that allows you to define, provision, and manage cloud infrastructure in a declarative and versioned way.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-terraform-reference-tables)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation and Configuration](#️-installation-and-configuration)
- [🟢 Getting Started](#-beginner---getting-started)
- [🟡 Resources and Modules](#-intermediate---resources-and-modules)
- [🟠 State and Workspaces](#-advanced---state-and-workspaces)
- [🔴 Advanced Patterns](#-senior---advanced-patterns)
- [⚫ Multi-Cloud and CI/CD](#-expert---multi-cloud-and-cicd)
- [📚 Resources](#-resources)

---

## 🎯 Complete Terraform Reference Tables

### 🎯 Essential Providers

| Provider | Description | Main Resources | Usage |
|----------|-------------|----------------|-------|
| **AWS** | Amazon Web Services | `aws_instance`, `aws_s3_bucket`, `aws_rds_instance` | AWS Cloud |
| **Azure** | Microsoft Azure | `azurerm_virtual_machine`, `azurerm_storage_account` | Azure Cloud |
| **GCP** | Google Cloud Platform | `google_compute_instance`, `google_storage_bucket` | GCP Cloud |
| **Docker** | Docker | `docker_container`, `docker_image` | Containers |
| **Kubernetes** | Kubernetes | `kubernetes_deployment`, `kubernetes_service` | Orchestration |
| **Local** | Local system | `local_file`, `local_sensitive_file` | Local files |
| **Null** | Null resources | `null_resource` | Provisioning |
| **Random** | Random values | `random_string`, `random_password` | Data generation |
| **TLS** | TLS certificates | `tls_private_key`, `tls_cert_request` | Security |
| **HTTP** | HTTP requests | `http_data_source` | External APIs |

### 🎯 AWS Resource Types

| Type | Resource | Description | Example |
|------|----------|-------------|---------|
| **Compute** | `aws_instance` | EC2 instance | Web server |
| **Storage** | `aws_s3_bucket` | S3 bucket | Object storage |
| **Database** | `aws_rds_instance` | RDS instance | Database |
| **Network** | `aws_vpc` | VPC | Virtual network |
| **Security** | `aws_security_group` | Security Group | Firewall |
| **Load Balancer** | `aws_lb` | Load Balancer | Load balancing |
| **DNS** | `aws_route53_record` | DNS Record | DNS resolution |
| **IAM** | `aws_iam_role` | IAM Role | Permissions |
| **Lambda** | `aws_lambda_function` | Lambda Function | Serverless |
| **API Gateway** | `aws_api_gateway_rest_api` | API Gateway | REST API |

### 🎯 Azure Resource Types

| Type | Resource | Description | Example |
|------|----------|-------------|---------|
| **Compute** | `azurerm_virtual_machine` | Virtual machine | Web server |
| **Storage** | `azurerm_storage_account` | Storage account | Object storage |
| **Database** | `azurerm_mysql_server` | MySQL server | Database |
| **Network** | `azurerm_virtual_network` | Virtual network | Private network |
| **Security** | `azurerm_network_security_group` | NSG | Firewall |
| **Load Balancer** | `azurerm_lb` | Load Balancer | Load balancing |
| **DNS** | `azurerm_dns_record` | DNS Record | DNS resolution |
| **Identity** | `azurerm_user_assigned_identity` | Managed identity | Permissions |
| **Functions** | `azurerm_function_app` | Function App | Serverless |
| **API Management** | `azurerm_api_management` | API Management | REST API |

### 🎯 GCP Resource Types

| Type | Resource | Description | Example |
|------|----------|-------------|---------|
| **Compute** | `google_compute_instance` | Compute instance | Web server |
| **Storage** | `google_storage_bucket` | Cloud Storage bucket | Object storage |
| **Database** | `google_sql_database_instance` | Cloud SQL instance | Database |
| **Network** | `google_compute_network` | VPC network | Private network |
| **Security** | `google_compute_firewall` | Firewall rule | Firewall |
| **Load Balancer** | `google_compute_target_pool` | Target Pool | Load balancing |
| **DNS** | `google_dns_record_set` | DNS Record | DNS resolution |
| **Identity** | `google_service_account` | Service account | Permissions |
| **Functions** | `google_cloudfunctions_function` | Cloud Function | Serverless |
| **API Gateway** | `google_api_gateway_api` | API Gateway | REST API |

### 🎯 Terraform Commands

| Command | Description | Example | Usage |
|---------|-------------|---------|-------|
| **init** | Initialize workspace | `terraform init` | Initial setup |
| **plan** | Plan changes | `terraform plan` | View modifications |
| **apply** | Apply changes | `terraform apply` | Create/modify infrastructure |
| **destroy** | Destroy infrastructure | `terraform destroy` | Clean up infrastructure |
| **validate** | Validate configuration | `terraform validate` | Check syntax |
| **format** | Format code | `terraform fmt` | Automatic formatting |
| **show** | Show state | `terraform show` | View current state |
| **output** | Show outputs | `terraform output` | View values |
| **import** | Import resource | `terraform import aws_instance.web i-1234567890abcdef0` | Import existing |
| **state** | Manage state | `terraform state list` | List resources |
| **workspace** | Manage workspaces | `terraform workspace list` | List workspaces |
| **providers** | Manage providers | `terraform providers` | View providers |

### 🎯 Terraform Functions

| Function | Description | Example | Usage |
|----------|-------------|---------|-------|
| **concat** | Concatenate lists | `concat(["a", "b"], ["c"])` | Merge lists |
| **join** | Join elements | `join(",", ["a", "b", "c"])` | Create string |
| **split** | Split string | `split(",", "a,b,c")` | Create list |
| **length** | List length | `length(["a", "b", "c"])` | Count elements |
| **lookup** | Lookup in map | `lookup(map, "key", "default")` | Value by key |
| **merge** | Merge maps | `merge(map1, map2)` | Combine maps |
| **keys** | Map keys | `keys(map)` | List of keys |
| **values** | Map values | `values(map)` | List of values |
| **file** | Read file | `file("file.txt")` | File content |
| **templatefile** | File template | `templatefile("template.tpl", vars)` | Template rendering |
| **jsonencode** | JSON encode | `jsonencode(object)` | JSON serialization |
| **jsondecode** | JSON decode | `jsondecode(string)` | JSON deserialization |
| **base64encode** | Base64 encode | `base64encode("hello")` | Base64 encoding |
| **base64decode** | Base64 decode | `base64decode("aGVsbG8=")` | Base64 decoding |
| **md5** | MD5 hash | `md5("hello")` | Hash calculation |
| **sha256** | SHA256 hash | `sha256("hello")` | Hash calculation |
| **uuid** | Random UUID | `uuid()` | Unique identifier |
| **timestamp** | Current timestamp | `timestamp()` | Current date/time |
| **formatdate** | Format date | `formatdate("YYYY-MM-DD", timestamp())` | Date formatting |

### 🎯 Terraform Configuration

| Option | Description | Default Value | File |
|--------|-------------|---------------|------|
| **required_version** | Terraform version | None | `versions.tf` |
| **required_providers** | Required providers | None | `versions.tf` |
| **backend** | State backend | Local | `backend.tf` |
| **provider** | Provider configuration | None | `providers.tf` |
| **variable** | Input variables | None | `variables.tf` |
| **output** | Output variables | None | `outputs.tf` |
| **locals** | Local variables | None | `locals.tf` |
| **data** | Data sources | None | `data.tf` |
| **resource** | Resources to create | None | `main.tf` |
| **module** | Modules to use | None | `modules.tf` |

---

## 🚀 Introduction

Terraform is an Infrastructure as Code (IaC) tool that allows you to define, provision, and manage cloud infrastructure in a declarative and versioned way.

### What is Terraform?
Terraform is an Infrastructure as Code tool developed by HashiCorp that allows you to define cloud and on-premise infrastructure in declarative configuration files. It manages infrastructure state and allows you to create, modify, and destroy resources in a predictable way.

### Why choose Terraform?
- **🏗️ Infrastructure as Code** : Declarative infrastructure definition
- **☁️ Multi-Cloud** : Support for many cloud providers
- **🔄 State Management** : Infrastructure state management
- **📦 Modularity** : Code reuse with modules
- **🔒 Security** : Secret and permission management
- **📊 Planning** : Change visualization before application
- **🔄 Versioning** : Infrastructure version control
- **🌐 Ecosystem** : Large community and available modules

### When to use Terraform?
- Cloud infrastructure provisioning
- Configuration management
- Application deployment
- On-premise infrastructure management
- Infrastructure automation
- Multi-cloud and hybrid cloud
- Disaster recovery
- Automatic scaling

---

## ⚙️ Installation and Configuration

### Installation

```bash
# Installation on Ubuntu/Debian
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Installation on CentOS/RHEL
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install terraform

# Installation with Homebrew (macOS)
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Installation with Chocolatey (Windows)
choco install terraform

# Installation with pip
pip install terraform

# Installation with Go
go install github.com/hashicorp/terraform@latest
```

### Basic configuration

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

### Backend configuration

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

## 🟢 Getting Started

### First Terraform file

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

### Variables and outputs

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

### Command execution

```bash
# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Format code
terraform fmt

# Plan changes
terraform plan

# Apply changes
terraform apply

# Show outputs
terraform output

# Destroy infrastructure
terraform destroy
```

### Basic resources

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

## 🟡 Resources and Modules

### Custom modules

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

### Using modules

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

### Locals and functions

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

## 🟠 State and Workspaces

### State management

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-locks"
    
    # Configuration for versioning
    versioning = true
    
    # Configuration for replication
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
# List workspaces
terraform workspace list

# Create new workspace
terraform workspace new staging

# Select workspace
terraform workspace select production

# Show current workspace
terraform workspace show

# Delete workspace
terraform workspace delete staging
```

### State management

```bash
# List resources in state
terraform state list

# Show specific resource
terraform state show aws_instance.web

# Move resource
terraform state mv aws_instance.web aws_instance.web_server

# Remove resource from state
terraform state rm aws_instance.web

# Import existing resource
terraform import aws_instance.web i-1234567890abcdef0

# Show complete state
terraform state pull > terraform.tfstate
```

### Workspace configuration

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

## 🔴 Advanced Patterns

### Reusable modules

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

### Using modules

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

### Secret management

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

# Using the secret
data "aws_secretsmanager_secret_version" "database_password" {
  secret_id = aws_secretsmanager_secret.database_password.id
}

locals {
  database_credentials = jsondecode(data.aws_secretsmanager_secret_version.database_password.secret_string)
}
```

---

## ⚫ Multi-Cloud and CI/CD

### Multi-cloud configuration

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

### Multi-cloud infrastructure

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

### CI/CD with GitHub Actions

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

### Terraform Tests

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

### Monitoring and alerting

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

## 📚 Resources

### Official Documentation
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform Provider Registry](https://registry.terraform.io/)
- [Terraform CLI Reference](https://developer.hashicorp.com/terraform/cli)

### Tools and Extensions
- [Terraform Cloud](https://www.terraform.io/cloud)
- [Terragrunt](https://terragrunt.gruntwork.io/)
- [Terraform CDK](https://developer.hashicorp.com/terraform/cdktf)

### Patterns and Best Practices
- [Terraform Best Practices](https://developer.hashicorp.com/terraform/cloud-docs/recommended-practices)
- [Terraform Modules](https://developer.hashicorp.com/terraform/language/modules)
- [Terraform State](https://developer.hashicorp.com/terraform/language/state)

### Integration and CI/CD
- [Terraform CI/CD](https://developer.hashicorp.com/terraform/cloud-docs/run)
- [GitHub Actions](https://developer.hashicorp.com/terraform/cloud-docs/run/ui)
- [Jenkins Integration](https://developer.hashicorp.com/terraform/cloud-docs/run/api)

---

*Last updated: January 2024*
