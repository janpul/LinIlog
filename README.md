==================================================
          LinIlog Configuration Guide
              Prepared by Group 11
==================================================

Welcome! This guide will help you set up and run the LinIlog application locally.

--------------------------------------------------
📦 Prerequisites
--------------------------------------------------
- Visual Studio Code
- Node.js and npm
- MongoDB (local or cloud)

--------------------------------------------------
🛠️ Setup Instructions
--------------------------------------------------

1️⃣  Import the Application source code into Visual Studio Code.

2️⃣  Open a terminal and run:
    > cd linilog
    > npm install

3️⃣  Set up MongoDB:
    - Create a database called: linilog
    - Add two collections (case-sensitive):
        • admins
        • signupforms

4️⃣  Create a new terminal and navigate to the frontend folder:
    > cd linilog

5️⃣  Open another terminal and navigate to the backend server folder:
    > cd linilog/server

6️⃣  Start both the frontend and backend:
    > npm start

✅  You have successfully connected the frontend and backend of the LinIlog project!

--------------------------------------------------
🌐 MongoDB Configuration (Deployed Version)
--------------------------------------------------

MongoDB Connection String: mongodb+srv://linilog-admin:i5soS6bvIq8IWGte@linilog-cluster.ticvhip.mongodb.net/?retryWrites=true&w=majority&appName=LinIlog-Cluster

--------------------------------------------------
🌐 Deployed Version
--------------------------------------------------
Alternatively, access the deployed LinIlog website here:
🔗 https://linilog.vercel.app

--------------------------------------------------
📁 Folder Structure
--------------------------------------------------
linilog/
├── src/            --> Frontend application
├── server/         --> Backend server/API
└── README.txt      --> Configuration instructions

--------------------------------------------------
🧩 Notes
--------------------------------------------------
- Ensure MongoDB is running before starting the backend.
- If issues occur with npm, re-run 'npm install' in the corresponding folders.

Thank you for using LinIlog! 🚀
