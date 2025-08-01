# Upload Portal

A self-hosted, browser-based file uploader designed for use with LucidLink Filespaces. Built with a React frontend and Express.js backend, this framework allows organizations to easily deploy and manage secure file upload portals.

---

## 🚀 Features

- Direct-to-LucidLink file uploads via web browser
- Simple authentication via username/password
- Files securely streamed to LucidLink-mounted directory
- Supports large file uploads
- Docker deployment support with volume bind for LucidLink integration

---

## 📦 Folder Structure

```
project-root/
├── backend/            # Express backend API and static frontend
│   ├── Dockerfile
│   ├── frontend-dist/  # Compiled React frontend served by Express
│   │   ├── assets/
│   │   ├── icon.svg
│   │   ├── index.html
│   │   └── logo.svg
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── docker-compose.yml  # Docker Compose deployment
└── README.md
```

---

## ⚙️ Setup Instructions

### 📦 Installing LucidLink on Linux (CLI)

You can install the LucidLink client on a Linux server via the command line using one of the following methods:

#### **Method 1: Using the Official Install Script**

1. Download the latest installer script:
   ```bash
   curl -fsSL https://www.lucidlink.com/download/latest/install-lucid.sh -o install-lucid.sh
   ```
2. Make the script executable:
   ```bash
   chmod +x install-lucid.sh
   ```
3. Run the installer (as root or using sudo):
   ```bash
   sudo ./install-lucid.sh
   ```

#### **Method 2: Using the latest .deb release**

1. Download the latest `.deb` package:
   ```bash
   wget https://www.lucidlink.com/download/new-ll-latest/linux-deb/stable/ -O lucidinstaller.deb
   ```
2. Update apt and install:
   ```bash
   sudo apt update -y
   sudo apt install ./lucidinstaller.deb -y
   ```

---

After either installation method, verify the binary:

```bash
lucid --version
```

This installs the `lucid` CLI client to `/usr/local/bin/lucid`.

---

### 🖥️ LucidLink Filespace Systemd Setup

For persistent LucidLink Filespace mounting via `systemd`, you can use the following service unit:

```ini
[Unit]
Description=LucidLink filespace Daemon
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
EnvironmentFile=/root/lucidlink.service.pwd
WorkingDirectory=/root

ExecStartPre=/bin/sleep 15

ExecStart=/usr/local/bin/lucid daemon

ExecStartPost=/bin/bash -c 'until lucid status | grep -q "Unlinked"; do sleep 1; done'
ExecStartPost=/bin/bash -c "/usr/local/bin/lucid link --fs '${FILESPACE}' --user '${USER}' --password '${PASSWORD}' --mount-point /media/filespace"

ExecStop=/usr/local/bin/lucid exit

Restart=always
RestartSec=10

StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Make sure to:

- Save this as `/etc/systemd/system/lucidlink.service`
- Create `/root/lucidlink.service.pwd` with:
  ```
  FILESPACE=your_filespace_name
  USER=your_username
  PASSWORD=your_password
  ```
- Reload systemd and enable the service:
  ```bash
  sudo systemctl daemon-reexec
  sudo systemctl daemon-reload
  sudo systemctl enable lucidlink.service
  sudo systemctl start lucidlink.service
  ```

---

### 🧱 Local Development Setup

#### Backend (Express)

1. Navigate to the backend folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables:
   - Copy the example file:
     ```
     cp .env.example .env
     ```
   - Fill out `.env` with your details:
     - `UPLOAD_DIR`: Path to your LucidLink-mounted upload directory
     - `UPLOAD_USERNAME` and `UPLOAD_PASSWORD`: Your chosen login credentials
4. Mount your LucidLink Filespace as desired.
5. Start the backend server:
   ```
   node server.js
   ```

### 🐳 Docker Deployment

You can run the entire app (frontend + backend) using Docker Compose:

1. Ensure your LucidLink Filespace is mounted locally, e.g., at:

   ```
   /Volumes/cloudworks/prod/uploads
   ```

2. From the project root, run:

   ```bash
   docker-compose up --build
   ```

3. Open your browser to [http://localhost:5050](http://localhost:5050)

Environment variables are defined in `docker-compose.yml`. These include:

- `UPLOAD_DIR`: where uploaded files will be saved inside the container
- `UPLOAD_USERNAME` / `UPLOAD_PASSWORD`: login credentials
- `UPLOAD_TOKEN`: (optional) token for bearer auth

---

## 🔒 Security Notes

- Each deployment is self-hosted by the customer.
- Environment variables (credentials, upload directory) are never exposed to the client.
- Protect your deployment with HTTPS.
- We recommend reverse proxying behind NGINX for production deployments.

---

## 📁 Customization

- To customize authentication or add multi-user support, modify the backend’s `/login` and `/upload` routes.

---

## 🛠 Future Enhancements

- JWT-based authentication (optional)
- Per-user upload directories
- Docker deployment support

---

## 📜 License

This project is provided as a framework for private, self-hosted use.
