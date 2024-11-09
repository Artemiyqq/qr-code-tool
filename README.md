# QR Code Tool

QR Code Tool is a Full Stack React+.NET application that allows users to create, download, and scan QR codes. The app supports PNG and SVG generation, as well as decoding QR codes from PNG and JPG images.

## Features
- **Generate QR Codes**: Create QR codes from text inputs.
- **Download QR Codes**: Available in PNG and SVG formats.
- **Scan QR Codes**: Upload a QR code image (PNG or JPG) to decode its contents.

## Technologies Used
- **Backend**: ASP.NET Core with QRCoder and ZXing.Net libraries
- **Frontend**: React, Material UI, react-hook-form, yup

## Getting Started
### Prerequisites
- **Node.js:** Ensure you have Node.js installed for running the frontend.
- **.NET SDK:** Required for running the backend API.

1. Clone the repository.
2. Install dependencies in the `client` and `server` directories.
3. Configure environment variables as needed.
   * Create **.env** file in client/qr-code-tool-frontend folder with next content
     
     ```
     VITE_REACT_APP_API_URL = https://localhost:7044/api
     ```
5. Run the backend server and frontend app concurrently.
   * In VS Code you can create file `tasks.jon` inside of **.vscode** folder with next content and then easily run app with **Ctrl+Shift+P** => **Tasks: Run Task** => **Run All**
     
       ```
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

## Contributing
Feel free to open issues or submit pull requests for new features or improvements!

## License
This project is licensed under the MIT License.

---

Thank you for using QR Code Tool!
