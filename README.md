# SafeConnect - Campus Safety System

**SafeConnect** (formerly SafetyFirst) is a comprehensive campus safety web application designed to bridge the gap between students and campus security. It features real-time incident reporting, danger zone mapping, AI-powered assistance, and a dedicated command center for security personnel.

![SafeConnect Banner](https://via.placeholder.com/800x200?text=SafeConnect+Campus+Safety)

## 🚀 Features

### For General Users (Students/Staff)
-   **Google Login**: Quick and secure sign-in.
-   **Danger Zones Map**: View safe zones (College Campus) and potential danger zones on an interactive OpenStreetMap.
-   **Incident Reporting**: Submit real-time reports with photos and descriptions.
-   **AI Chat Assistant**: Get safety advice and answers from a Gemini-powered AI chatbot.
-   **SOS Button**: One-click emergency signal (simulated).
-   **Profile Management**: View personal details and log out.

### For Authorized Personnel (Security/Response Team)
-   **Authorized Login**: Secure access via Google Login + Shared Access Password.
-   **Command Center Dashboard**:
    -   **Squad Status**: Manage active/busy/break status.
    -   **Live Tracking**: Real-time map view of student locations (simulated).
    -   **Active Alerts**: Monitor high-priority security and medical alerts.
    -   **User Reports**: Live feed of submitted incident reports with "Case Status" tracking (Pending/Done).
-   **Role-Based Navigation**: Specialized menu and profile access for authorized operations.

## 🛠️ Tech Stack

-   **Frontend**: React.js, Vite
-   **Language**: JavaScript (ES6+)
-   **Styling**: Vanilla CSS (Variables & Responsive Design), Lucide React (Icons)
-   **Maps**: Leaflet.js, React-Leaflet, OpenStreetMap
-   **Backend / Database**: Firebase (Firestore, Auth, Hosting)
-   **AI Integration**: Google Gemini API (`gemini-flash-latest`)

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/safeconnect.git
    cd safeconnect
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your keys:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    VITE_AUTHORIZED_PASSWORD=admin123
    ```
    *(Note: Firebase config is currently in `src/firebase.js`)*

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## 🔒 Authorization

-   **General Access**: Sign in with any Google account.
-   **Authorized Access**:
    1.  Sign in with Google.
    2.  Click "Authorized User" tab.
    3.  Enter the shared password (Default: `admin123`).

## 📸 Screenshots

<img width="1920" height="1140" alt="Screenshot 2025-12-25 032326" src="https://github.com/user-attachments/assets/d6113967-3f31-4745-877d-308700d1a1bc" />
<img width="1896" height="1055" alt="Screenshot 2025-12-25 032541" src="https://github.com/user-attachments/assets/2be7c518-6fa0-4292-b0c2-466454a98b24" />
<img width="1873" height="908" alt="Screenshot 2025-12-25 032724" src="https://github.com/user-attachments/assets/4cd4422e-63dc-4e61-aa16-218a06d45a3c" />


## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.


