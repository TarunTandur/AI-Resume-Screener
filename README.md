\# 🎯 AI Resume Screener



An intelligent resume screening application powered by AI, built with React and Flask.



\## ✨ Features



\- 📄 Resume upload and parsing

\- 🤖 AI-powered candidate matching using Sentence Transformers

\- ⚡ Fast and accurate screening

\- 🎨 Modern, responsive UI

\- 🔍 Smart keyword extraction



\## 🛠️ Tech Stack



\*\*Frontend:\*\*

\- React + Vite

\- Modern CSS

\- Responsive Design



\*\*Backend:\*\*

\- Flask (Python)

\- Sentence Transformers

\- PyTorch

\- PDF Processing



\## 🚀 Setup Instructions



\### Backend Setup



1\. Navigate to backend folder:

```bash

cd backend

```



2\. Create and activate virtual environment:

```bash

\# Windows

python -m venv venv

venv\\Scripts\\activate



\# Mac/Linux

python3 -m venv venv

source venv/bin/activate

```



3\. Install dependencies:

```bash

pip install -r requirements.txt

```



4\. Run the Flask server:

```bash

python app.py

```



Backend will run on `http://localhost:5000`



\### Frontend Setup



1\. Navigate to frontend folder:

```bash

cd frontend

```



2\. Install dependencies:

```bash

npm install

```



3\. Run development server:

```bash

npm run dev

```



Frontend will run on `http://localhost:5173`



\## 📁 Project Structure

```

AI-Resume-Screener/

├── backend/

│   ├── app.py              # Flask application

│   ├── requirements.txt    # Python dependencies

│   └── venv/              # Virtual environment (not in repo)

├── frontend/

│   ├── src/

│   │   ├── App.jsx        # Main React component

│   │   └── main.jsx       # Entry point

│   ├── package.json       # Node dependencies

│   └── vite.config.js     # Vite configuration

└── README.md

```



\## 🎓 How It Works



1\. User uploads resume (PDF format)

2\. Backend extracts text and processes it

3\. AI model (Sentence Transformers) analyzes the content

4\. System matches resume against job requirements

5\. Results displayed with matching score



\## 🔧 Requirements



\- Python 3.10+

\- Node.js 16+

\- npm or yarn



\## 📝 License



This project is open source and available under the MIT License.



\## 👨‍💻 Author



\*\*Tarun Tandur\*\*

\- GitHub: \[@TarunTandur](https://github.com/TarunTandur)



\## 🤝 Contributing



Contributions, issues, and feature requests are welcome!



---



⭐ Star this repo if you found it helpful!

