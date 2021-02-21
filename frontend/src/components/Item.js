import React, { useEffect, useState } from 'react'
import '../styles/Item.css'
import translate from '../i18n/translate'
import axios from 'axios'
const Item = ({ match }) => {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/Menu')
            .then(res => setMenu(res.data))
    }, [])


    return (
        <div>
            {menu.filter(item => (
                item.name === match.params.group ? item.subgroups : null
            )).map(item => (
                item.subgroups.map(sub => (
                    sub.name === match.params.subGroup ?
                        sub.items.map(item => (
                            match.params.item === item.name ?
                                <div className='item-content'>
                                    <div className='spacer'></div>
                                    <img alt='' src='../../images/test.jpg'></img>
                                    <div className='name-box'>
                                        <h5>{translate(item.name)}</h5>
                                    </div>
                                    <h1 className='title'>{translate('Description')}</h1>
                                    <div className='description-box'>
                                        <span>{translate(`${item.description}`)}</span>
                                    </div>
                                    <h1 className='title'>{translate('Alergens')}</h1>
                                    <div className='alergens-box'>
                                        <ul className='alergens-list'>
                                            {
                                                item.alergens.map(item => (
                                                    <li>{item}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                : null
                        )) : null
                ))))
            }
        </div>
    )
}

export default Item