import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { UserPreferencesContext, CATEGORIES } from './contexts/UserPreferencesContext'
import './styles/components/preferences.css';
import './styles/components/category-card.css';
import './styles/components/button.css';

function InputPage() {

  // Shared context for user preferences
  const { updatePreferences } = useContext(UserPreferencesContext)
  
  // Local state for user preferences
  const [selectedCategories, setSelectedCategories] = useState(
    new Map(CATEGORIES.map(({ id }) => [id, false]))
  )
  const [additionalPrefs, setAdditionalPrefs] = useState('')

  const navigate = useNavigate()

  const handleNextPage = async (userInput) => {
     /* server port */
    await fetch('http://127.0.0.1:5000/calculate_embedding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input: userInput }),
    });
    navigate('/main');
  };

  function toggleCategory(id) {
    setSelectedCategories(prev => {
      const next = new Map(prev)
      next.set(id, !next.get(id))
      return next
    })
  }

  function handleSubmit() {
    updatePreferences(selectedCategories, additionalPrefs)
    handleNextPage(additionalPrefs)
  }

  return (
    <div className="preferences-wrapper">
      <h1>AI Risk Decoder</h1>
      <p>Select the risk categories most important to you.</p>
      <div className="preferences-container">
        {CATEGORIES.map(({ id, label, icon }) => (
          <div
            key={id}
            className={`category-card${selectedCategories.get(id) ? ' selected' : ''}`}
            onClick={() => toggleCategory(id)}
          >
            <img className="icon" src={icon} style={{ filter: selectedCategories.get(id) ? "invert(1)" : "none" }} alt="risk"/>
            {label}
          </div>
        ))}
      </div>
      <div className="additional-prefs">
        <label htmlFor="additional-prefs-input">None of those quite fit? Tell us more.</label>
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
