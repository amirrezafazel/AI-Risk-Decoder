import { useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
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

  /*Here are the service name, risk json and articles*/
  const location = useLocation();
  const {service_name,record,articles} = location.state || {};

  const severityColors = {
    critical: "#d9a3a3",
    high:     "#edcca8",
    medium:   "#c5e6c9"
  };

  const tagToIcon = {
    "information and safety": safety,
    "malicious use": malicious,
    "human autonomy and integrity harms": autonomy,
    "misinformation": misinformation,
    "representation and toxicity": toxicty,
    "socioeconomic and environmental harms": enviroment,
  };

  const RISKS = record.risks.map(r => [r.description, severityColors[r.severity], tagToIcon[r.tag]]);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%' }}>
      <h1 style={{ textAlign: 'center', margin: '2vh 0' }}>{service_name} Risks</h1>

      <div className="risk_page" style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
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
              <li key={i} className="risk_box" style={{ background: c }}>
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

        {articles?.incidents?.length > 0 && (
            <div style={{ position: 'sticky', top: '2vh', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {articles.incidents.slice(0, 2).map((incident, i) => (
                <aside className="news_article" key={i} style={{ boxSizing: 'border-box', position: 'static' }}>
                    <div className="news_article__badge">Breaking News</div>
                    <h2>{incident.title}</h2>
                    <p>{incident.description}</p>
                </aside>
                ))}
            </div>
        )}
      </div>

      <div style={{ textAlign: 'center', margin: '3vh 0' }}>
        <button className="submit-btn" onClick={() => {navigate('/main'); window.scrollTo(0, 0);}}>
          Back to main
        </button>
      </div>
    </div>
  )
}

export default RiskPage