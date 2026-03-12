import React, { useEffect } from 'react';
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

import Risks from '../../../Data/database.json'
import Incidents from '../../../Data/incidents.json'

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserPreferencesContext } from './contexts/UserPreferencesContext';

const symbol_conversions = {
    "information and safety": safety,
    "malicious use": malicious,
    "human autonomy and integrity harms": autonomy,
    "misinformation": misinformation,
    "representation and toxicity": toxicty,
    "socioeconomic and environmental harms": enviroment
}

const databse_to_front = {
    "information and safety": "information-safety",
    "malicious use": "malicious-use",
    "human autonomy and integrity harms": "human-autonomy",
    "misinformation": "misinformation",
    "representation and toxicity": "representation-toxicity",
    "socioeconomic and environmental harms": "socioeconomic-environmental"
}

const icon_conversions = {
    "Apple Intelligence": "Apple",
    "ChatGPT": "OpenAI",
    "Claude": "Claude",
    "Canva Magic Studio": "Canva",
    "Copilot": "Copilot",
    "Cursor": "Cursor",
    "DALLE": "OpenAI",
    "DeepSeek": "Deepseek",
    "ElevenLabs": "Elevenlabs",
    "Fyxer": "Fyxer",
    "Gemini": "Gemini",
    "Github Copilot": "Githubcopilot",
    "Iris": "Iris",
    "Loveable": "Loveable",
    "Manus": "Manus",
    "Midjourney": "Midjourney",
    "Nano Banana": "Nanobanana",
    "NotebookLM": "Notebooklm",
    "Perplexity": "Perplexity",
    "Sora": "Sora",
    "Teal": "Teal",
    "VEO Google Deepmind": "Deepmind",
    "clockwise": "Clockwise",
    "n8n": "N8n"
}

const RiskRecord = ({ icon_name, risk }) => {
    return (
        <li className="risk_record">
            <div>
                <img className="icon" src={icon_name} alt="risk" />
                <div className="risk_text">
                    {risk}
                </div>
            </div>
        </li>
    )
}

const Card = ({ service_name, risk_page, record, articles, fears, bestMatch }) => {
    let [is_flipped, set_is_flipped] = useState(false);
    let navigate = useNavigate();
    const [icon, setIcon] = useState(null);
    useEffect(() => {
        import(`../../Logos/${icon_conversions[service_name]}.svg`)
            .then(module => setIcon(module.default))
            .catch(() => setIcon(null));
    }, [service_name]);

    function flip() {
        set_is_flipped(!is_flipped);
    }
    const goToExternalUrl = (url) => {
        window.location.href = url;
    };

    const get_value = (risk) => {
        var ret = 0;
        if (risk.description === bestMatch) ret += 10000;
        if (risk.severity == "critical") { ret += 20 }
        else if (risk.severity == "high") { ret += 10 }
        for (let i = 0; i < fears.length; i++) {
            if (databse_to_front[risk.tag] === fears[i]) {
                ret += 100 + i
            }
        }
        return ret
    }

    record.risks = record.risks && [...record.risks].sort((risk1, risk2) => {
        return get_value(risk2) - get_value(risk1)
    })

    return (
        <div className="card_shadow">
            <div className={`full_card ${is_flipped ? "flipped" : ""}`}>

                {/*Front side of the the card*/}
                <div className="card front" onClick={flip}>
                    <div className="card__header">
                        <img className="logo" src={icon} alt={service_name + " icon"} />
                        <h2>{service_name}</h2>
                        <img className="flip_icon" src={turn} alt="flip the card" />
                    </div>
                    <div className="card__body"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}>
                        <ul className="card__risks">
                            {record.risks && record.risks.map(record => {
                                return (
                                    <RiskRecord icon_name={symbol_conversions[record.tag]} risk={record.title} />
                                )
                            })}
                        </ul>
                    </div>
                    <div className="card__footer">
                        <button className="card_button"
                            onClick={(e) => {
                                e.stopPropagation(); window.scrollTo(0, 0);
                                navigate(risk_page, {
                                    state: { service_name, record, articles }
                                })
                            }}>
                            <img className="min_icon" src={details} alt="details icon" />
                            &nbsp;View Details
                        </button>
                        <button className="card_button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (record.documents) {
                                    goToExternalUrl(Object.values(record.documents)[0].source);
                                }
                            }}>
                            <img className="min_icon" src={read} alt="analyze icon" />
                            &nbsp;View Source
                        </button>
                    </div>
                </div>

                {/*Back side of the the card*/}
                <div className="card back" onClick={flip}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}>
                    <div className="card__header">
                        <img className="logo" src={icon} alt={service_name + " icon"} />
                        <h2>{articles.incidents[0].title}</h2>
                        <img className="flip_icon" src={turn} alt="flip the card" />
                    </div>
                    <div className="card__body">
                        {articles && articles.incidents[0].description}
                    </div>
                    <div className="card__footer">
                        <div className="card_button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (articles) {
                                    goToExternalUrl(articles.incidents[0].link);
                                }
                            }}>
                            <img className="min_icon" src={original} alt="article icon" />
                            &nbsp;See Article
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SearchBar = ({ setSearchTerm }) => {
    return (
        <form className="search_bar" onSubmit={event => { event.preventDefault() }}>
            <input placeholder="Search..." onChange={event => setSearchTerm(event.target.value)} />
            <button>
                <img className="min_icon" src={search} alt={"risk"} />
            </button>
        </form>
    )
}

function MainPage() {
    const { _, getSelectedCategoryIds, getAdditionalPrefs } = useContext(UserPreferencesContext)
    const [searchTerm, setSearchTerm] = useState("")
    const fears = getSelectedCategoryIds()

    /* fetch best matching risk description */
    const [bestMatches, setBestMatches] = useState({});
    useEffect(() => {
        const run = async () => {
            const results = {};
            for (const [key, val] of Object.entries(Risks)) {
                if (!val.risks) continue;
                const res = await fetch('http://127.0.0.1:5000/best_match', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ record: val, n: 1 }),
                });
                const data = await res.json();
                results[key] = data.result;
            }
            setBestMatches(results);
        };
        run();
    }, []);

    /* sorting cards */
    const get_value = (risks) => {
        var ret = 0;
        for (const risk of risks) {
            for (let i = 0; i < fears.length; i++) {
                if (databse_to_front[risk.tag] === fears[i]) {
                    ret += 1
                }
            }
        }
        return ret
    }

    const company_cards = Object.entries(Risks).sort(([k1, v1], [k2, v2]) => {
        if (v1.risks && v2.risks) {
            return get_value(v2.risks) - get_value(v1.risks)
        }
        else if (v1.risks) { return -1 }
        else if (v2.risks) { return 1 }
        return 0
    })

    /* passes in bestMatch to be used by Card */
    return (
        <div id='main_page'>
            <div className="header">
                <h1>AI risk decoder</h1>
                <SearchBar setSearchTerm={setSearchTerm} />
            </div>
            <div className="risk_grid">
                {company_cards.map(([key, val]) => {
                    if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return (
                            <Card
                                service_name={key.replaceAll("_", " ")}
                                risk_page="/risk"
                                record={val}
                                articles={Incidents[key]}
                                fears={fears}
                                bestMatch={bestMatches[key]}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default MainPage