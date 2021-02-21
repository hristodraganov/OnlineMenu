import React, { useEffect, useContext, useState } from 'react'
import '../styles/Home.css'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import TableModal from './TableModal'
import { TableContext } from '../Context/TableContext'
import translate from '../i18n/translate'
import axios from 'axios'

function Home() {
    

    const { display } = useContext(TableContext)
    const [displayModal] = display
    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/Menu')
            .then(res => setMenu(res.data))
    }, [])

    return (
        <main>
            <section className='s1'>
                {displayModal ? <TableModal /> : null}
                <div className='spacer'></div>
                <h1>{translate('Welcome')}</h1>
                <p>
                    {translate('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tortor nibh, iaculis et cursus at, efficitur in justo. Vestibulum est.')}
                </p>
            </section>
            <section className='s2'>
                <div className='spacer'></div>
                <div className='grid'>
                    {
                        menu.map(item => (
                            <Link to={`/${item.name}`}>
                                <Card src={"../../images/" + item.image} text={translate(item.name)} orientation='vertical' />
                            </Link>
                        ))
                    }
                    {/* IF ANY CONNECTION TO WAITER'S MOBILE APP IS AVAILABLE */}
                    {/* <Card src={"../../images/waiter.jpg"} text={translate('Waiter')} orientation='vertical' /> */}
                </div>
            </section>
        </main>
    )
}

export default Home