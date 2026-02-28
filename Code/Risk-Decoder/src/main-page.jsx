import './App.css'
import './styles/main-page.css'

import safety from './Proper_icons/information&safety.svg'
import malicious from './Proper_icons/malicious.svg'
import autonomy from './Proper_icons/human_autonomy&integrity.svg'
import misinformation from './Proper_icons/misinformation.svg'
import toxicty from './Proper_icons/representation&toxicity.svg'
import enviroment from './Proper_icons/socioeconomics&enviromental.svg'

import search from './assets/search.svg'
import read from './assets/read.svg'
import details from './assets/details.svg'
import original from './assets/original.svg'

import ChatGPT from './TMP/chatGPT.svg'
import Claude from './TMP/Claude.svg'
import DALLE from './TMP/DALLE.svg'
import Gemini from './TMP/Gemini.svg'
import Copilot from './TMP/Copilot.svg'


import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
    let navigate = useNavigate();

    function flip(){
        set_is_flipped(!is_flipped);
    }

    return (
        <div className={`full_card ${is_flipped ? "flipped" : ""}`}>

            {/*Front side of the the card*/}
            <div className="card front" onClick={flip}>
                <div className="card__header">
                    <img className="logo" src={icon} alt={service_name+" icon"}/>
                    <h2>{service_name}</h2>
                </div>
                <div className="card__body"
                     onWheel={(e) => e.stopPropagation()}
                     onTouchStart={(e) => e.stopPropagation()}>
                    <ul className="card__risks">
                        <RiskRecord  icon_name={toxicty} risk="Representation & Toxicity Risks"/>
                        <RiskRecord  icon_name={misinformation} risk="Misinformation Risks"/>
                        <RiskRecord  icon_name={safety} risk="Information & Safety Risks"/>
                        <RiskRecord  icon_name={malicious} risk="Malicious Use Risks"/>
                        <RiskRecord  icon_name={autonomy} risk="Human Autonomy & Integrity Risks"/>
                        <RiskRecord  icon_name={enviroment} risk="Socioeconomic & Environmental Risks"/>
                    </ul>
                </div>
                <div className="card__footer">
                    <div className="card_button"
                         onClick={(e)=>{e.stopPropagation();navigate(risk_page)}}>
                        <img className="min_icon" src={details} alt="details icon"/>
                        &nbsp;View Details
                    </div>
                    <div className="card_button"
                         onClick={(e)=>{e.stopPropagation();navigate(risk_page)}}>
                        <img className="min_icon" src={read} alt="analyze icon"/>
                        &nbsp;Analyze Documents
                    </div>
                </div>
            </div>


            {/*Back side of the the card*/}
            <div className="card back" onClick={flip}
                 onWheel={(e) => e.stopPropagation()}
                 onTouchStart={(e) => e.stopPropagation()}>
                <div className="card__header">
                    <img className="logo" src={icon} alt={service_name+" icon"}/>
                    <h2>{service_name}</h2>
                </div>
                <div className="card__body">
                    Beautiful is better than ugly.
                    Explicit is better than implicit.
                    Simple is better than complex.
                    Complex is better than complicated.
                    Flat is better than nested.
                    Sparse is better than dense.
                    Readability counts.
                    Special cases aren't special enough to break the rules.
                    Although practicality beats purity.
                    Errors should never pass silently.
                    Unless explicitly silenced.
                    In the face of ambiguity, refuse the temptation to guess.
                    There should be one-- and preferably only one --obvious way to do it.[c]
                    Although that way may not be obvious at first unless you're Dutch.
                    Now is better than never.
                    Although never is often better than right now.[d]
                    If the implementation is hard to explain, it's a bad idea.
                    If the implementation is easy to explain, it may be a good idea.
                    Namespaces are one honking great idea – let's do more of those!
                </div>
                <div className="card__footer">
                    <div className="card_button"
                         onClick={(e)=>{e.stopPropagation();navigate(risk_page)}}>
                        <img className="min_icon" src={original} alt="original icon"/>
                        &nbsp;See Original
                    </div>
                </div>
            </div>
        </div>
    )

}
const SearchBar = () =>{
    return (
        <form className="search_bar">
            <input placeholder="Search..."/>

                <button >
                    <img className="min_icon" src={search} alt={"risk"}/>
                </button>
        </form>
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
