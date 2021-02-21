import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import '../styles/Items.css'
import { uuid } from 'uuidv4'
import Error from './Error'
import axios from 'axios'
const Items = ({ match }) => {

    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/Menu')
            .then(res => setMenu(res.data))
    }, [])

    const renderCards = (group, subgroup) => {
        return (
            <section className='items'>
                <div className='spacer'></div>
                <div className='items-grid'>
                    {menu.filter(item => (
                        item.name === group ? item.subgroups : null
                    )).map(item => (
                        item.subgroups.map(sub => (
                            sub.name === subgroup ? sub.items.map(item => (
                                <Card
                                    id={uuid()}
                                    src={'../../images/test.jpg'}
                                    name={item.name}
                                    description={<Link style={{ color: '#000' }} to={`/${match.params.group}/${match.params.subGroup}/${item.name}`}>{item.description}</Link>}
                                    price={item.price}
                                />
                            )) : null
                        ))))
                    }
                    {/* {items.map(item => (
                        <Card
                            id={uuid()}
                            src={'../../images/test.jpg'}
                            name={translate(item.name)}
                            description={<Link style={{ color: '#000' }} to={`/${match.params.group}/${match.params.subGroup}/${item.name}`}>{item.description}</Link>}
                            price={item.price}
                        />
                    ))} */
                    }
                </div>
            </section>
        )
    }

    //used to avoid duplicate error message 
    const renderSwitch = (group, subGroup) => {
        switch (group) {
            case 'Food':
                if (subGroup == 'Main' ||
                    subGroup == 'Appetizers' ||
                    subGroup == 'Sushi' ||
                    subGroup == 'Pizza' ||
                    subGroup == 'Meat' ||
                    subGroup == 'Salads' ||
                    subGroup == 'Pasta') {
                    return (
                        renderCards(group, subGroup)
                    )
                } else {
                    return <Error />
                }
            case 'Drinks':
                if (subGroup == 'Hot Drinks' ||
                    subGroup == 'Cold Drinks' ||
                    subGroup == 'Vodka' ||
                    subGroup == 'Whiskey' ||
                    subGroup == 'Gin' ||
                    subGroup == 'Soft' ||
                    subGroup == 'Wine' ||
                    subGroup == 'Aperitives' ||
                    subGroup == 'Cognac' ||
                    subGroup == 'Cocktails') {
                    return (
                        renderCards(group, subGroup)
                    )
                } else {
                    return <Error />
                }
            default:
                return <Error />
        }
    }

    return (
        <div>
            {renderSwitch(match.params.group, match.params.subGroup)}
        </div>
    )
}


export default Items