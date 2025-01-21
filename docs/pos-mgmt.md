# POS Management
Automate POS updates and manage store-specific configurations.

# Application Customization Pos System
```plaintext
├── ci
│   ├── Dockerfile
│   ├── package.json
│   ├── public
│   │   └── style.css
│   ├── server.js
│   └── views
│       └── index.html
```

# CI Pipeline

1. Build and Push Docker Image to Docker Hub with SHA Tagging
2. Run Trivy Scan
3. Calculate duration and record completion time
4. Send Enhanced Notification to Slack

```plaintext
.github
└── workflows
    └── deploy.yml
```

# Vulnerabilities Scan inside Pipeline to approve or not push image to deploy

![TrivyScan](img/trity-scan-pipe.jpg)



