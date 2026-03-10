import { createContext, useState } from 'react'

import safety from '../Proper_icons/information&safety.svg'
import malicious from '../Proper_icons/malicious.svg'
import autonomy from '../Proper_icons/human_autonomy&integrity.svg'
import misinformation from '../Proper_icons/misinformation.svg'
import toxicity from '../Proper_icons/representation&toxicity.svg'
import environment from '../Proper_icons/socioeconomics&enviromental.svg'

// The 6 risk categories used throughout the app
export const CATEGORIES = [
  { id: 'representation-toxicity', label: 'Representation & Toxicity Risks', icon: toxicity },
  { id: 'misinformation', label: 'Misinformation Risks', icon: misinformation },
  { id: 'information-safety', label: 'Information & Safety Risks', icon: safety },
  { id: 'malicious-use', label: 'Malicious Use Risks', icon: malicious },
  { id: 'human-autonomy', label: 'Human Autonomy & Integrity Risks', icon: autonomy },
  { id: 'socioeconomic-environmental', label: 'Socioeconomic & Environmental Risks', icon: environment },
]

// Create React Context API shared state
export const UserPreferencesContext = createContext(null)

export function UserPreferencesProvider({ children }) {

  // Shared state for user preferences, lazily initialized from localStorage
  const [selectedCategories, setSelectedCategories] = useState(() => {

      const stored = localStorage.getItem('userSelectedCategories')
      
      if (stored) {
        return new Map(JSON.parse(stored))
      } else {
        return new Map(CATEGORIES.map(({ id }) => [id, false]))
      }
  })

  const [additionalPrefs, setAdditionalPrefs] = useState(
    () => localStorage.getItem('userAdditionalPrefs') ?? ''
  )

  // Setter method for preferences that also persists to localStorage
  const updatePreferences = (categories, additional) => {
    setSelectedCategories(categories)
    setAdditionalPrefs(additional)
    localStorage.setItem('userSelectedCategories', JSON.stringify(Array.from(categories.entries())))
    localStorage.setItem('userAdditionalPrefs', additional)
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
