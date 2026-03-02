import { createContext, useState } from 'react'

// The 6 risk categories used throughout the app
export const CATEGORIES = [
  { id: 'representation-toxicity', label: 'Representation & Toxicity Risks' },
  { id: 'misinformation', label: 'Misinformation Risks' },
  { id: 'information-safety', label: 'Information & Safety Risks' },
  { id: 'malicious-use', label: 'Malicious Use Risks' },
  { id: 'human-autonomy', label: 'Human Autonomy & Integrity Risks' },
  { id: 'socioeconomic-environmental', label: 'Socioeconomic & Environmental Risks' },
]

// Create React Context API shared state
export const UserPreferencesContext = createContext(null)

export function UserPreferencesProvider({ children }) {

  // Shared state for user preferences
  const [selectedCategories, setSelectedCategories] = useState(
    new Map(CATEGORIES.map(({ id }) => [id, false]))
  )
  const [additionalPrefs, setAdditionalPrefs] = useState('')

  // Setter method for preferences
  const updatePreferences = (categories, additional) => {
    setSelectedCategories(categories)
    setAdditionalPrefs(additional)
  }

  // Getter methods for selected categories and additional preferences
  const getSelectedCategoryIds = () => {
    return Array.from(selectedCategories.entries())
      .filter(([_, isSelected]) => isSelected)
      .map(([id, _]) => id)
  }

  const getAdditionalPrefs = () => {
    return additionalPrefs
  }

  const value = {
    updatePreferences,
    getSelectedCategoryIds,
    getAdditionalPrefs
  }

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  )
}
