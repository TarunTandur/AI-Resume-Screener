from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

class ResumeMatcher:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
    
    def get_match_score(self, resume_text, job_description):
        embeddings = self.model.encode([resume_text, job_description])
        score = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
        return round(score * 100, 2)