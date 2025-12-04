import { useState } from 'react'
import axios from 'axios'
import { Upload, Sparkles, Loader2 } from 'lucide-react'

function App() {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resumeText, setResumeText] = useState('')

  const uploadResume = async () => {
    if (!file) return alert("Please select a resume file!")
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await axios.post('http://localhost:5000/api/upload', form)
      setResumeText(res.data.resume_text)
      alert('Resume parsed successfully! Now paste the Job Description.')
    } catch (err) {
      alert('Backend not running? Start python app.py')
    }
  }

  const analyze = async () => {
    if (!resumeText) return alert('Parse your resume first!')
    if (!jobDesc.trim()) return alert('Please paste the job description!')
    setLoading(true)
    setScore(null)
    try {
      const res = await axios.post('http://localhost:5000/api/analyze', {
        resume: resumeText,
        job: jobDesc
      })
      setScore(Math.round(res.data.match_score))
    } catch (err) {
      alert('Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-white flex items-center justify-center gap-6">
            <Sparkles className="animate-pulse" size={80} />
            AI RESUME SCREENER
          </h1>
          <p className="text-xl text-white mt-4 opacity-90">Get instant match score using AI</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <h2 className="text-4xl font-bold text-white">Upload Resume & Match with Job</h2>
          </div>

          <form className="p-10 space-y-10">
            {/* Resume Upload */}
            <div className="text-center">
              <label className="block text-2xl font-semibold text-gray-800 mb-6">
                Upload Your Resume (PDF/DOCX)
              </label>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block mx-auto text-lg file:mr-4 file:py-4 file:px-8 file:rounded-full file:border-0 file:text-lg file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700"
              />
              <button
                type="button"
                onClick={uploadResume}
                className="mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-20 py-5 rounded-2xl text-2xl font-bold flex items-center gap-4 mx-auto shadow-xl transition transform hover:scale-105"
              >
                <Upload size={40} />
                Parse Resume
              </button>
            </div>

            <div className="border-t-4 border-gray-200 -mx-10" />

            {/* Job Description */}
            <div>
              <label className="block text-2xl font-semibold text-gray-800 mb-6 text-center">
                Paste Full Job Description
              </label>
              <textarea
                rows="10"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the complete job description here..."
                className="w-full p-6 text-lg border-4 border-gray-300 rounded-2xl focus:border-indigo-600 outline-none resize-none transition"
              />
            </div>

            {/* Analyze Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={analyze}
                disabled={loading}
                className="w-full max-w-2xl mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-5xl font-black py-10 rounded-3xl shadow-2xl disabled:opacity-60 transition transform hover:scale-105 flex justify-center items-center gap-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={70} />
                    ANALYZING...
                  </>
                ) : (
                  'GET MATCH SCORE'
                )}
              </button>
            </div>

            {/* Result */}
            {score !== null && (
              <div className="text-center p-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border-8 border-green-500 animate-pulse">
                <div className="text-9xl font-black text-green-600 drop-shadow-lg">
                  {score}%
                </div>
                <p className="text-5xl font-extrabold mt-8 text-gray-800">
                  {score >= 90
                    ? 'PERFECT MATCH!'
                    : score >= 75
                    ? 'EXCELLENT FIT!'
                    : score >= 60
                    ? 'GOOD CANDIDATE'
                    : 'NEEDS IMPROVEMENT'}
                </p>
              </div>
            )}
          </form>
        </div>

        
        
      </div>
    </div>
  )
}

export default App