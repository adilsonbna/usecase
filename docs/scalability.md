# Application Scalability
Seamlessly onboard new stores by reusing configuration templates.

To achieve scalability, you can leverage a GitOps approach to add multiple clusters and repositories within GitHub, enabling the deployment of various applications from a centralized location.

```plaintext
├── envs
│   ├── core
│   │   ├── monitoring
│   │   │   └── monitoring.yaml
│   │   └── security
│   │       ├── kyverno.yaml
│   │       └── trivy-operator.yaml
│   ├── dev
│   │   ├── ern
│   │   │   └── pos-system.yaml
│   │   └── kkm
│   │       └── pos-system.yaml
│   └── prd
│       ├── ern
│       │   └── pos-system.yaml
│       └── kkm
│           └── pos-system.yaml
```

For detailed instructions on how to add clusters and repositories in ArgoCD, refer to the [Installation Guide](docs/installation-guide.md)  