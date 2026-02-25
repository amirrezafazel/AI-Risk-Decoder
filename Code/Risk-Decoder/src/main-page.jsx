import './App.css'
import './styles/main-page.css'

import safety from './Proper_icons/information&safety.svg'
import malicious from './Proper_icons/malicious.svg'
import autonomy from './Proper_icons/human_autonomy&integrity.svg'
import misinformation from './Proper_icons/misinformation.svg'
import toxicty from './Proper_icons/representation&toxicity.svg'
import enviroment from './Proper_icons/socioeconomics&enviromental.svg'

import search from './assets/search.svg'

import ChatGPT from './TMP/chatGPT.svg'
import Claude from './TMP/Claude.svg'
import DALLE from './TMP/DALLE.svg'
import Gemini from './TMP/Gemini.svg'
import Copilot from './TMP/Copilot.svg'


import {useState} from "react";

const RiskRecord = ({icon_name,risk}) =>{
    return (
        <li className="risk_record">
            <div>
                <img className="icon" src={icon_name} alt="risk"/>
                <div className="risk_text">
                    {risk}
                </div>

            </div>
        </li>
    )
}

const Card = ({service_name,risk_page,icon}) => {
    let  [is_flipped,set_is_flipped]= useState(false);

    function flip(){
        set_is_flipped(!is_flipped);
        risk_page;
    }
    return (
        <div className={`full_card ${is_flipped ? "flipped" : ""}`}>
            <div className="card front" onClick={flip}>
                <div className="card__header">
                    <img className="logo" src={icon} alt={service_name+" icon"}/>
                    <h2>{service_name}</h2>
                </div>
                <div className="card__body">
                    <ul className="card__risks">
                        <RiskRecord  icon_name={toxicty} risk="Representation & Toxicity Risks"/>
                        <RiskRecord  icon_name={misinformation} risk="Misinformation Risks"/>
                        <RiskRecord  icon_name={safety} risk="Information & Safety Risks"/>
                        <RiskRecord  icon_name={malicious} risk="Malicious Use Risks"/>
                        <RiskRecord  icon_name={autonomy} risk="Human Autonomy & Integrity Risks"/>
                        <RiskRecord  icon_name={enviroment} risk="Socioeconomic & Environmental Risks"/>

                    </ul>
                    <div>Button 1</div>
                    <div>Button 2</div>
                </div>
            </div>
            <div className="card back" onClick={flip}>
                <div className="card__header">
                    <img className="logo" src={icon} alt={service_name+" icon"}/>
                    <h2>{service_name}</h2>
                </div>
                <div className="card__body">
                    Bad for enviroment and what not
                </div>
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
              <Card service_name="ChatGPT" risk_page="/risk" icon={ChatGPT}/>
              <Card service_name="Claude" risk_page="/risk" icon={Claude}/>
              <Card service_name="Gemini" risk_page="/risk" icon={Gemini}/>
              <Card service_name="DALLE" risk_page="/risk" icon={DALLE}/>
              <Card service_name="Copilot" risk_page="/risk" icon={Copilot}/>
          </div>
      </div>
  )
}

export default MainPage
