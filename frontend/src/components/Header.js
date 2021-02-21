import React, { useContext, useEffect, useState } from 'react'
import '../styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faGlassMartini, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import translate from '../i18n/translate'
import { LanguageContext } from '../Context/LanguageContext'
import { CartContext } from '../Context/CartContext'
import axios from 'axios'
function Header() {
    const [menu, setMenu] = useState([])
    const [cart] = useContext(CartContext)
    const [checked, setChecked] = useState(false)
    const [language, setLanguage] = useContext(LanguageContext)
    const [langCheck, setLangCheck] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('https://www.countryflags.io/us/flat/32.png')


    useEffect(() => {
        axios.get('http://localhost:3001/Menu')
            .then(res => setMenu(res.data))
    }, [])

    const handleCheck = () => {
        setChecked(!checked)
    }

    return (
        <header>
            <div className='hamburger-mobile' id='mobile-nav'>
                <input
                    type='checkbox'
                    checked={checked}
                    className='toggle'
                    onClick={handleCheck}>
                </input>
                <div className='hamburger'>
                    <div></div>
                </div>
                <div className='menu'>
                    <div>
                        <div>
                            <ul>
                                {menu.map(item => (
                                    <Link to={`/${item.name}`}>
                                        <li
                                            onClick={handleCheck}
                                            className='burger-link'
                                        >
                                            {translate(item.name)}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <h1>
                {translate('ONLINE MENU')}
            </h1>
            <Link to='/'>
                <h2>
                    {translate('HOME')}
                </h2>
            </Link>
            <div className='hamburger-desktop' id='desktop-nav'>
                <Link to='/Food'>
                    <FontAwesomeIcon icon={faUtensils} size='2x' />
                </Link>
                <Link to='/Drinks'>
                    <FontAwesomeIcon icon={faGlassMartini} size='2x' />
                </Link>
            </div>
            <div className='cart'>
                <Link to='/Cart'>
                    <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                </Link>
                {cart.length !== 0 ?
                    <span className='cart-items-counter'>{cart.length}</span>
                    :
                    null
                }
            </div>
            <div className='lang-options'>
                <div className='selected-lang' onClick={() => setLangCheck(!langCheck)}> 
                    <img className='selected-lang-icon' src={selectedLanguage}></img>
                </div>
                {
                    langCheck ?
                        <ul>
                            <li>
                                <a
                                    className='en'
                                    onClick={() => {
                                        setLanguage('en');
                                        setLangCheck(!langCheck);
                                        setSelectedLanguage('https://www.countryflags.io/us/flat/32.png')
                                    }}>
                                </a>
                            </li>
                            <li>
                                <a
                                    className='bg'
                                    onClick={() => {
                                        setLanguage('bg');
                                        setLangCheck(!langCheck);
                                        setSelectedLanguage('https://www.countryflags.io/bg/flat/32.png')
                                    }}>

                                </a>
                            </li>
                        </ul>
                        :
                        null
                }
            </div>
        </header>
    )
}

export default Header