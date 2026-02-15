import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import './styles/InputPage.css'

const CATEGORIES = [
  { id: 'environmental', label: 'Environmental' },
  { id: 'existential', label: 'Existential' },
  { id: 'data-privacy', label: 'Data Privacy' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'safeguards', label: 'Safeguards' },
  { id: 'malware', label: 'Malware & Cyber Warfare' },
  { id: 'user-liability', label: 'User Liability and Indemnification' },
  { id: 'biometric', label: 'Biometric & Identity Theft' },
  { id: 'child-safety', label: 'Age Compliance and Child Safety' },
]

function InputPage() {
  const [selectedCategories, setSelectedCategories] = useState(
    new Map(CATEGORIES.map(({ id }) => [id, false]))
  )
  const [additionalPrefs, setAdditionalPrefs] = useState('')
  const navigate = useNavigate()

  function toggleCategory(id) {
    setSelectedCategories(prev => {
      const next = new Map(prev)
      next.set(id, !next.get(id))
      return next
    })
  }

  function handleSubmit() {
    navigate('/main')
  }

  return (
    <div className="preferences-wrapper">
      <h1>AI Risk Decoder</h1>
      <p>Select the risk categories most important to you.</p>
      <div className="preferences-container">
        {CATEGORIES.map(({ id, label }) => (
          <div
            key={id}
            className={`category-card${selectedCategories.get(id) ? ' selected' : ''}`}
            onClick={() => toggleCategory(id)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="additional-prefs">
        <label htmlFor="additional-prefs-input">Additional preferences (optional)</label>
        <textarea
          id="additional-prefs-input"
          className="additional-prefs-input"
          placeholder="Describe any other risk areas you care about..."
          value={additionalPrefs}
          onChange={e => setAdditionalPrefs(e.target.value)}
          rows={4}
        />
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default InputPage
