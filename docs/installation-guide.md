# Commands to Create an Infrastructure with ArgoCD

This repository contains the necessary commands and organization to set up an environment using ArgoCD.

# Folder Organization
The repository structure has been organized to separate development and production environments, ensuring better management and flexibility for testing and adjustments.

```plaintext
├── docs
├── envs
│   ├── dev
│   │   ├── monitoring
│   │   └── security
│   └── prd
├── helm-charts
│   ├── monitoring
│   │   └── kube-prometheus-stack
│   │       └── templates
│   │           ├── alertmanager
│   │           ├── exporters
│   │           ├── grafana
│   │           ├── prometheus
│   │           ├── prometheus-operator
│   │           └── thanos-ruler
│   └── security
│       └── kyverno
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

### 1. Clone repository
Clone this repository to our machina

```sh
git clone https://github.com/adilson-silva1_mars/usecase.git
```

### 2. First ArgoCD login password
Command to execute to get ArgoCD password

```sh
kubectl -n cicd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

### 3. Add AKS Cluster on ArgoCD

```sh
argo login <your ArgoCD IP>
```

```sh
argocd cluster add <your AKS Cluster name>
```

### 4. Add Git Repository on ArgoCD

```sh
argocd repo add <your git repository> --username <your git username> --password <your git token> 
```

### Notes
Make sure that the kubectl, helm, and kustomize tools are installed and configured on your machine.
Customize the files and directories according to your specific needs before executing the commands.