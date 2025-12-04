from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from docx import Document
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os

app = Flask(__name__)
CORS(app)

model = SentenceTransformer('all-MiniLM-L6-v2')
os.makedirs("uploads", exist_ok=True)

def save_file(f):
    path = os.path.join("uploads", f.filename)
    f.save(path)
    return path

def extract_pdf(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_docx(path):
    doc = Document(path)
    return "\n".join([p.text for p in doc.paragraphs])

@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload():
    if request.method == 'OPTIONS':
        return '', 200
    file = request.files['file']
    path = save_file(file)
    text = extract_pdf(path) if file.filename.lower().endswith('.pdf') else extract_docx(path)
    return jsonify({"resume_text": text})

@app.route('/api/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    if request.method == 'OPTIONS':
        return '', 200
    
    data = request.get_json(force=True) or {}
    resume = str(data.get('resume', '')).strip()
    job = str(data.get('job', '')).strip()

    if not resume or not job:
        return jsonify({"match_score": 0})

    r_emb = model.encode(resume)
    j_emb = model.encode(job)
    score = round(float(cosine_similarity([r_emb], [j_emb])[0][0] * 100), 1)
    return jsonify({"match_score": score})

@app.route('/')
def home():
    return '''
    <h1 style="text-align:center; color:#10b981; font-size:70px; margin-top:200px; font-weight:bold;">
    AI Resume Screener Backend<br>100% Ready
    </h1>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)