import './App.css'
import './styles/main-page.css'
import { useNavigate } from 'react-router-dom';
import biometric from './assets/biometric.svg'
import safety from './assets/safety.svg'
import eco from './assets/eco.svg'
import ChatGPT from './TMP/chatGPT.svg'
import search from './assets/search.svg'

const RiskRecord = ({icon_name,risk}) =>{
    return (
        <li className="risk_record">
            <div>
                <img className="icon" src={icon_name} alt="risk"/>
                {risk}
            </div>
        </li>
    )
}

const Card = ({service_name,risk_page}) => {
    let navigate = useNavigate();
    return (
        <div className="card" onClick={()=>{navigate(risk_page)}}>
            <div className="card__header">
                <img className="logo" src={ChatGPT} alt="risk"/>
                <h2>{service_name}</h2>
            </div>
            <div className="card__body">
                <ul className="card__risks">
                    <RiskRecord  icon_name={eco} risk="Enviromental Risk"/>
                    <RiskRecord  icon_name={biometric} risk="Biometric Risk"/>
                    <RiskRecord  icon_name={safety} risk="Saftey Risk"/>
                </ul>

            </div>
        </div>
    )

}
const SearchBar = () =>{
    return (
        <div className="search_bar">
            <div>
                <img className="icon" src={search} alt={"risk"}/>
                &nbsp;Search...
            </div>
        </div>
    )

}
function MainPage() {

  return (
      <div id='main_page'>
          <div className="header">
              <h1>AI risk decoder</h1>
              <SearchBar />

          </div>
          <div className="risk_grid">
              <Card service_name="ChatGPT" risk_page="/risk"/>
              <Card service_name="Claude" risk_page="/risk"/>
              <Card service_name="Gemini" risk_page="/risk"/>
              <Card service_name="DALLE" risk_page="/risk"/>
              <Card service_name="Copilot" risk_page="/risk"/>
          </div>
      </div>
  )
}

export default MainPage
