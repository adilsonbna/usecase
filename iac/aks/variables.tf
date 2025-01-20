# variables.tf
variable "resource_group_name" {
  description = "The name of the Azure resource group."
  type        = string
}

variable "location" {
  description = "The Azure region for the resource group."
  type        = string
}

variable "aks_name" {
  description = "The name of the AKS cluster."
  type        = string
}

variable "dns_prefix" {
  description = "DNS prefix for the AKS cluster."
  type        = string
}

variable "node_count" {
  description = "The number of nodes in the AKS cluster."
  type        = number
  default     = 2
}

variable "vm_size" {
  description = "The size of the VMs in the AKS cluster."
  type        = string
  default     = "Standard_D2s_v3"
}

variable "argocd_chart_version" {
  description = "The version of the ArgoCD Helm chart."
  type        = string
  default     = "5.27.0"
}