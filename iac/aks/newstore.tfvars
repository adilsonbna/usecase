# terraform.tfvars
resource_group_name   = "aks-iac-for-usecase"
location              = "East US2"
aks_name              = "aks-usecase"
dns_prefix            = "myusecase"
node_count            = 2
vm_size               = "Standard_D2s_v3"
argocd_chart_version  = "5.27.0"