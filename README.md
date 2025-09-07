# To-Do List & Blog App
---
### 1. Clone the Repository
```bash
git clone <git@github.com:Irfanizam/myfirst-assessment.git>
cd <application>
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env.local file in the root directory and add Firebase credentials:

env
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
(env will be attached via email.)

4. Run the Development Server
bash
Copy code
npm run dev
Then open http://localhost:3000 in browser

Project Structure
csharp
Copy code
.
├── components/         # Reusable React components
│   ├── blogComp/       # Blog-related components
│   └── todoComp/       # To-Do related components
├── pages/              # Next.js pages
├── utils/              # Firebase setup 
├── public/             # Static assets
└── README.md          

License
This project is licensed under the MIT License.
