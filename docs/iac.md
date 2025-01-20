# Infrastructure as Code (IaC): 
Manage store-level configurations and deployments using GitOps practices.

```plaintext
├── iac
│   └── aks
│       ├── main.tf
│       ├── terraform.tfvars
│       └── variables.tf
```

## main.tf
This is the primary configuration file where you define the resources you want to create and manage in your infrastructure.

## variables.tf
This file is used to define input variables for your Terraform configurations. It helps you make your configuration more dynamic and reusable by externalizing values.

## terraform.tfvars
This file is used to provide values for the variables defined in variables.tf. It simplifies the process of passing values into your configuration, especially for environments like staging, production, or development.

# How to execute IaC to deploy AKS Cluster 

## Clone repository
Clone this repository to your machine

```sh
git clone https://github.com/adilsonbna/usecase.git
```

## IaC AKS folder structure
Go to iac/aks folder to execute commands below:

Run terraform init to:
- Create a new Terraform project.
- Modifying the backend configuration.
- Adding or updating provider requirements.
- Changing module dependencies.

```sh
terraform init
```

Run terraform plan to:
- Validate configurations.
- Preview changes.
- Ensure the planned changes align with expectations.

```sh
terraform plan
```

Run terraform apply to:
- Execute the changes from the plan.
- Provision resources or update your infrastructure.

```sh
terraform apply
```

# IaC for ArgoCD helm chart deployment
Here's an example of an Infrastructure as Code (IaC) configuration for deploying ArgoCD using the Helm chart via Terraform. 

This would go in your main.tf file:

```plaintext
resource "helm_release" "argocd" {
  name       = "argocd"
  chart      = "argo-cd"
  namespace  = "cicd"
  repository = "https://argoproj.github.io/argo-helm"
  version    = var.argocd_chart_version

  create_namespace = true

  values = [
    file("project/cicd/argocd/values.yaml")
  ]
}
```

### Check Installation Guide Next Steps
You're referring to a folder structure and its hierarchy for ArgoCD applications, where applications are automatically installed based on the directory organization.

- [Installation Guide](docs/installation-guide.md)  

