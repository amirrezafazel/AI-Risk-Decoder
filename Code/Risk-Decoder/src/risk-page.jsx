import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/main-page.css'
import './styles/InputPage.css'
import { Link } from 'react-router-dom';

function handleSubmit() {
navigate('/main')
}

function RiskPage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>risk page ~ company</h1>
      <div className="card">
            <div className="card__header">
                <h2>risk 1</h2>
            </div>
      </div>
      <div className="card">
            <div className="card__header">
                <h2>risk 2</h2>
            </div>
      </div>
      <div className="card">
            <div className="card__header">
                <h2>risk 3</h2>
            </div>
      </div>
      <div className="card">
            <div className="card__header">
                <h2>risk 4</h2>
            </div>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        back to main page
      </button>
    </>
  )
}

export default RiskPage
