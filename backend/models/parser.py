import pdfplumber
from docx import Document

class ResumeParser:
    def __init__(self):
        self.text = ""
    
    def extract_text(self, filepath):
        if filepath.endswith('.pdf'):
            with pdfplumber.open(filepath) as pdf:
                self.text = "\n".join(page.extract_text() or "" for page in pdf.pages)
        else:  # docx
            doc = Document(filepath)
            self.text = "\n".join(p.text for p in doc.paragraphs)
        return self.text
    
    def get_skills(self):
        skills_list = ['python', 'java', 'javascript', 'react', 'flask', 'django', 'sql', 'mongodb', 
                       'aws', 'docker', 'git', 'machine learning', 'nlp', 'html', 'css', 'node.js', 
                       'typescript', 'excel', 'tableau', 'tensorflow', 'pytorch', 'scikit-learn']
        text = self.text.lower()
        return [skill.title() for skill in skills_list if skill in text]