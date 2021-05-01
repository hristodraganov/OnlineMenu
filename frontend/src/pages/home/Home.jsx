import React, { useEffect, useContext, useState } from 'react'
import './Home.css'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import TableModal from '../../components/modal/TableModal'
import { TableContext } from '../../Context/TableContext'
import translate from '../../i18n/translate'
import axios from 'axios'

function Home() {


    const { display } = useContext(TableContext)
    const [displayModal] = display
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/category/get')
            .then(res => setCategories(res.data.data.categories))
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
                        categories.map(item => (
                            <Link to={`/${item.name}`}>
                                <Card
                                    src={"../../images/" + item.image}
                                    text={translate(item.name)}
                                    orientation='vertical'
                                    showImg={true}
                                />
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