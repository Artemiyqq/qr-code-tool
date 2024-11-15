# QR Code Tool

QR Code Tool is a Full Stack React + .NET application that allows users to create, download, and scan QR codes. The app supports PNG and SVG generation, as well as decoding QR codes from PNG and JPG images.

## Features
- **Generate QR Codes**: Create QR codes from text inputs.
- **Download QR Codes**: Available in PNG and SVG formats.
- **Scan QR Codes**: Upload a QR code image (PNG or JPG) to decode its contents.

## Technologies Used
- **Backend**: ASP.NET Core with QRCoder and ZXing.Net libraries
- **Frontend**: React, Material UI, react-hook-form, yup

## Branches

### Main
The main branch contains the core app code with instructions to run locally.

### Dockerized App (`dockerized-app`)
The `dockerized-app` branch contains all configurations and Docker files needed to run the app in a containerized environment.

## Getting Started

### Prerequisites
For the main branch:
- **Node.js**: Ensure you have Node.js installed for running the frontend.
- **.NET SDK**: Required for running the backend API.

### Running Locally (Main Branch)
1. Clone the repository and switch to the `main` branch.
2. Install dependencies in the `client` and `server` directories.
3. Configure environment variables:
   * Create a **.env** file in `client/qr-code-tool-frontend` folder with the following:
     
     ```plaintext
     VITE_REACT_APP_API_URL = https://localhost:7044/api
     ```
5. Run the backend server and frontend app concurrently.
   * You can create a `tasks.json` file in the `.vscode` folder with the following content to easily run the app with **Ctrl+Shift+P** => **Tasks: Run Task** => **Run All**:
     
     ```json
       {
          "version": "2.0.0",
          "tasks": [
              {
                  "label": "Run .NET API",
                  "type": "shell",
                  "command": "dotnet",
                  "args": [
                      "watch",
                      "run"
                  ],
                  "group": {
                      "kind": "build",
                      "isDefault": true
                  },
                  "problemMatcher": "$msCompile",
                  "options": {
                      "cwd": "${workspaceFolder}/server/QrCodeToolApi/QrCodeToolApi"
                  }
              },
              {
                  "label": "Run React App",
                  "type": "shell",
                  "command": "npm",
                  "args": [
                      "run",
                      "dev"
                  ],
                  "isBackground": true,
                  "problemMatcher": [],
                  "options": {
                      "cwd": "${workspaceFolder}/client/qr-code-tool-frontend"
                  }
              },
              {
                  "label": "Run All",
                  "dependsOn": [
                      "Run .NET API",
                      "Run React App"
                  ],
                  "dependsOrder": "parallel",
                  "problemMatcher": [
                      "$eslint-compact"
                  ]
              }
          ]
      }
     ```

### Running with Docker (Dockerized-App Branch)

To run the app with Docker, switch to the `dockerized-app` branch and use Docker Compose:

1. Clone the repository and switch to the `dockerized-app` branch:
   
   ```
     git checkout dockerized-app
   ```
2. Ensure Docker is installed and running.
3. In the project root directory, use Docker Compose to build and run the services:
   
   ```
     docker-compose up --build
   ```
5. Access the frontend in your browser at [http://localhost:5173](http://localhost:5173).
   The frontend is configured to communicate with the backend API at **http://localhost:7044/api**.

## Contributing
Feel free to open issues or submit pull requests for new features or improvements!

## License
This project is licensed under the MIT License.

---

Thank you for using QR Code Tool!
