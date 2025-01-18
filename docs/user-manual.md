# Commands to Create an Application with ArgoCD

This step contains the necessary commands to Create an Application with ArgoCD

### 3. Configure a RootApp into New Project
Apply manifest using kubectl e kustomize:

```sh
kubectl apply -f project/root-app.yaml
```

Checking current status:

```sh
kubectl get applications -n cicd
NAME               SYNC STATUS   HEALTH STATUS
root-app-of-apps   OutOfSync     Healthy
```

Sync application

```sh
argocd app sync root-app-of-apps
```