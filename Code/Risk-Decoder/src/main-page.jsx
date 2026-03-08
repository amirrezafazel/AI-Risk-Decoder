import React from 'react';
import './styles/main-page.css';
import './styles/components/card.css';
import './styles/components/button.css';
import './styles/components/search.css';

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
import turn from './assets/flip.svg'

import ChatGPT from './TMP/chatGPT.svg'
import Claude from './TMP/Claude.svg'
import DALLE from './TMP/DALLE.svg'
import Gemini from './TMP/Gemini.svg'
import Copilot from './TMP/Copilot.svg'

import Risks from '../../../Risks/claude_risks.json'


import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";

import { UserPreferencesContext } from './contexts/UserPreferencesContext';

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

const Card = ({service_name,risk_page,icon,record}) => {
    let  [is_flipped,set_is_flipped]= useState(false);
    let navigate = useNavigate();

    function flip(){
        set_is_flipped(!is_flipped);
    }

    return (
        <div className="card_shadow">
            <div className={`full_card ${is_flipped ? "flipped" : ""}`}>

                {/*Front side of the the card*/}
                <div className="card front" onClick={flip}>
                    <div className="card__header">
                        <img className="logo" src={icon} alt={service_name + " icon"}/>
                        <h2>{service_name}</h2>
                        <img className="flip_icon" src={turn} alt="flip the card" />
                    </div>
                    <div className="card__body"
                         onWheel={(e) => e.stopPropagation()}
                         onTouchStart={(e) => e.stopPropagation()}>
                        <ul className="card__risks">
                            {record.risks_by_category.map(record => {return (<RiskRecord  icon_name={toxicty} risk={record.cat_id}/>)})}
                            <RiskRecord  icon_name={misinformation} risk="Misinformation Risks"/>
                            <RiskRecord  icon_name={safety} risk="Information & Safety Risks"/>
                            <RiskRecord  icon_name={malicious} risk="Malicious Use Risks"/>
                            <RiskRecord  icon_name={autonomy} risk="Human Autonomy & Integrity Risks"/>
                            <RiskRecord  icon_name={enviroment} risk="Socioeconomic & Environmental Risks"/>
                        </ul>
                    </div>
                    <div className="card__footer">
                        <button className="card_button"
                                onClick={(e)=>{e.stopPropagation();navigate(risk_page)}}>
                            <img className="min_icon" src={details} alt="details icon" />
                            &nbsp;View Details
                        </button>
                        <button className="card_button"
                                onClick={(e)=>{e.stopPropagation();navigate(risk_page)}}>
                            <img className="min_icon" src={read} alt="analyze icon" />
                            &nbsp;Analyze Documents
                        </button>
                    </div>
                </div>


                {/*Back side of the the card*/}
                <div className="card back" onClick={flip}
                     onWheel={(e) => e.stopPropagation()}
                     onTouchStart={(e) => e.stopPropagation()}>
                    <div className="card__header">
                        <img className="logo" src={icon} alt={service_name+" icon"}/>
                        <h2>OpenAI Seals Pentagon Deal</h2>
                        <img className="flip_icon" src={turn} alt="flip the card" />
                    </div>
                    <div className="card__body">
                        OpenAI has officially secured a massive contract to integrate its AI models into the U.S. Department of Defense's classified networks, stepping in just as the Trump administration blacklisted rival Anthropic over safety disputes.
                        While Anthropic was designated a "supply chain risk" for refusing to drop safeguards against fully autonomous weaponry and mass surveillance, OpenAI successfully negotiated terms by technically embedding these "red lines" into its cloud architecture rather than just the legal contract.
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

  /*
    getSelectedCategoryIds() is a getter method that gives you an array of all categories the user 
    chose on the input page. 
    getAdditionalPrefs() is a getter method that gives you the additional preferences of the user
    as a string.
  */
  const { _, getSelectedCategoryIds, getAdditionalPrefs } = useContext(UserPreferencesContext)

  return (
      <div id='main_page'>
          <div className="header">
              <h1>AI risk decoder</h1>
              <SearchBar />
              {getSelectedCategoryIds()}
              {getAdditionalPrefs()}
          </div>
          <div className="risk_grid">
              <Card service_name="ChatGPT" risk_page="/risk" icon={ChatGPT} record={Risks}/>
              <Card service_name="Claude" risk_page="/risk" icon={Claude} record={Risks}/>
              <Card service_name="Gemini" risk_page="/risk" icon={Gemini} record={Risks}/>
              <Card service_name="DALLE" risk_page="/risk" icon={DALLE} record={Risks}/>
              <Card service_name="Copilot" risk_page="/risk" icon={Copilot} record={Risks}/>
          </div>
      </div>
  )
}

export default MainPage
