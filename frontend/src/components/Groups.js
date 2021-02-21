import React, { useEffect, useState} from 'react'
import Card from './Card'
import '../styles/Groups.css'
import { Link } from 'react-router-dom'
import translate from '../i18n/translate'
import Error from './Error'
import axios from 'axios'
const Groups = ({ match }) => {

    const [menu, setMenu] = useState([])    

    useEffect(() => {
        axios.get('http://localhost:3001/Menu')
            .then(res => setMenu(res.data))
    }, [])
    return (

        <div>
            {/* eslint eqeqeq: 0 */
                match.params.group == 'Food' || match.params.group == 'Drinks' ?
                    <section className='drinkTypes' >
                        <div className='spacer'></div>
                        <div className='drinkTypes-grid' >
                            {
                                menu.filter(item => (
                                    item.name === match.params.group ? item.subgroups : null
                                )).map(item => (item.subgroups.map(sub => (
                                    <Link to={`/${match.params.group}/${sub.name}`}>
                                        <Card src={"../../images/" + sub.image} text={translate(sub.name)} orientation='vertical' />

                                    </Link>
                                ))))
                            }
                        </div>
                    </section>
                    :
                    <Error />
            }

        </div>


    )
}

export default Groups