# Commands to Create an Infrastructure with ArgoCD

This repository contains the necessary commands and organization to set up an environment using ArgoCD.

# Folder Organization
The repository structure has been organized to separate development and production environments, ensuring better management and flexibility for testing and adjustments.

```plaintext
├── docs
├── envs
│   ├── core
│   ├── dev
│   └── prd
├── helm-charts
│   ├── monitoring
│   │   └── kube-prometheus-stack
│   └── security
│       ├── kyverno
│       └── trivy
├── iac
│   ├── aks
└── project
│   └── cicd
│       └── argocd
└── applicationset.yaml
└── kustomization.yaml 
└── project.yaml
└── root-app.yaml 
```

## Clone repository
Clone this repository to your machine

```sh
git clone https://github.com/adilson-silva1_mars/usecase.git
```

## First ArgoCD login password
Command to execute to get ArgoCD password

```sh
kubectl -n cicd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

## Add AKS Cluster on ArgoCD

```sh
argo login <your ArgoCD IP>
```

```sh
argocd cluster add <your AKS Cluster name>
```

## Add Git Repository on ArgoCD

```sh
argocd repo add <your git repository> --username <your git username> --password <your git token> 
```

### Notes
Make sure that the kubectl, helm, and kustomize tools are installed and configured on your machine.
Customize the files and directories according to your specific needs before executing the commands.