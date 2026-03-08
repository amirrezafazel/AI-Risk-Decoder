import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import './styles/components/preferences.css';
import './styles/components/category-card.css'; 
import './styles/components/button.css'
import './styles/components/risk-box.css'
import './styles/components/risk-layout.css'

import safety from './Proper_icons/information&safety.svg'
import malicious from './Proper_icons/malicious.svg'
import autonomy from './Proper_icons/human_autonomy&integrity.svg'
import misinformation from './Proper_icons/misinformation.svg'
import toxicty from './Proper_icons/representation&toxicity.svg'
import enviroment from './Proper_icons/socioeconomics&enviromental.svg'

function RiskPage() {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)

  const RISKS = [
    ['Advanced models are now capable of discovering zero-day vulnerabilities and assisting in complex industrial intrusions','#d9a3a3', malicious],
    ['OpenAI\'s 2026 contract with the Pentagon risks integrating unpredictable generative models into classified defense networks','#d9a3a3', autonomy],
    ['Corporate definitions of "imminent threat" create a lethal gap where AI identifies violent ideation but fails to alert authorities in time','#edcca8', safety],
    ['Generative models continue to perpetuate "techno-patriarchy" by disproportionately hyper-sexualizing female imagery','#edcca8', toxicty],
    ['Rolling out Western-centric AI in low-income countries - like the "Horizon 1000" health initiative - risks undermining local data sovereignty','#c5e6c9', autonomy],
    ['The "agreeable" nature of AI leads it to validate a user\'s harmful intent rather than challenging it, creating a "digital groomer" effect','#c5e6c9', toxicty]
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%' }}>
      <h1 style={{ textAlign: 'center', margin: '2vh 0' }}>OpenAI Risks</h1>

      <div className="risk_page" style={{
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
        gap: '2vw',
        padding: '0 3vw',
        alignItems: 'start',
        width: '100%',
        boxSizing: 'border-box'
      }}>

        <div className="risk_column">
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5vh'
          }}>
            {RISKS.map(([r, c, icon], i) => (
              <li key={i} className="risk_box" style={{
                background: c,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                boxSizing: 'border-box'
              }}>
                <img
                  className="icon"
                  src={icon}
                  alt=""
                  style={{ width: '2.5rem', height: '2.5rem', flexShrink: 0 }}
                />
                <span className="label" style={{ flex: 1, textAlign: 'left' }}>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="news_article" style={{
          position: 'sticky',
          top: '2vh',
          boxSizing: 'border-box'
        }}>
          <div className="news_article__badge">Breaking News</div>
          <h2>The "War for Classified AI": OpenAI Seals Pentagon Deal as Anthropic is Blacklisted</h2>
          <p>
            OpenAI has officially secured a massive contract to integrate its AI models into the U.S. Department of Defense's classified networks, stepping in just as the Trump administration blacklisted rival Anthropic over safety disputes.
            While Anthropic was designated a "supply chain risk" for refusing to drop safeguards against fully autonomous weaponry and mass surveillance, OpenAI successfully negotiated terms by technically embedding these "red lines" into its cloud architecture rather than just the legal contract.
          </p>
        </aside>
      </div>

      <div style={{ textAlign: 'center', margin: '3vh 0' }}>
        <button className="submit-btn" onClick={() => navigate('/main')}>
          Back to main
        </button>
      </div>
    </div>
  )
}

export default RiskPage