provider "google" {
  credentials = file("k8s-project-429019-e27396911ca8.json")
  project = "k8s-project-429019"
  region  = "us-central1"
}

resource "google_container_cluster" "primary" {
  name               = "cluster-k8s"
  location           = "us-central1-c"
  initial_node_count = 1
  logging_service          = "logging.googleapis.com/kubernetes"
  monitoring_service       = "monitoring.googleapis.com/kubernetes"

  master_auth {
    client_certificate_config {
      issue_client_certificate = false
    }
  }

  node_config {
    machine_type = "e2-standard-8"
    image_type   = "COS_CONTAINERD"
    disk_size_gb = 10
    disk_type    = "pd-standard"
  }
}