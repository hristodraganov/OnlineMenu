import React, { useEffect, useState } from 'react'
import '../styles/Orders.css'
import Order from './Order'
import translate from '../i18n/translate'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
const Orders = (props) => {

    let username = 'admin'
    let password = 'admin1!'
    let match = false

    const [orders, setOrders] = useState([])
    const [table, setTable] = useState(0)

    const [startValue, setStartValue] = useState(new Date())
    const [endValue, setEndValue] = useState(new Date())
    const [startPicker, setStartPicker] = useState(false)
    const [endPicker, setEndPicker] = useState(false)

    if (props.username === username && props.password === password) {
        match = true
    }


    useEffect(() => {
        fetch('/orders').then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setOrders(jsonRes))
    }, [])

    const findByTable = () => {
        axios.post('/findByTable', { table: table })
            .then(res => {
                if (res.status === 200) {
                    setOrders(res.data)
                }
            })
    }
    const findByDate = () => {
        axios.post('/findByDate', { from: startValue.getTime(), to: endValue.getTime() })
            .then(res => {
                if (res.status === 200) {
                    setOrders(res.data)
                }
            })
    }

    return (
        match ?
            <div >
                <div className='spacer'></div>
                <div className='calendar'>
                    {startPicker ?
                        <div className='left-calendar'>
                            <Calendar
                                className='picker'
                                onChange={(date) => setStartValue(date)}
                                value={startValue}
                                maxDate={endValue}
                            />
                        </div>
                        : null}
                    {endPicker ?
                        <div className='right-calendar'>
                            <Calendar
                                className='picker'
                                minDate={startValue}
                                onChange={date => setEndValue(date)}
                                value={endValue}
                            />
                        </div>
                        : null}
                </div>

                <div className='query-control'>
                    <div className='date-query'>
                        <h2 style={{ fontWeight: 'bold', marginBottom: '1vh' }}>Find by date</h2>

                        <div className='calendar-controls'>
                            <span style={{ paddingRight: '.5rem' }}>From:</span>
                            {startPicker ?
                                <FontAwesomeIcon
                                    onClick={() => setStartPicker(!startPicker)}
                                    className='calendar-icon'
                                    color='blue'
                                    icon={faCalendarAlt}
                                    size='2x'
                                />
                                :
                                <FontAwesomeIcon
                                    onClick={() => setStartPicker(!startPicker)}
                                    className='calendar-icon'
                                    color='black'
                                    icon={faCalendarAlt}
                                    size='2x'
                                />
                            }
                            <span style={{ paddingRight: '.5rem', paddingLeft: '.5rem' }}>To:</span>
                            {endPicker ?
                                <FontAwesomeIcon
                                    onClick={() => setEndPicker(!endPicker)}
                                    className='calendar-icon' color='blue'
                                    icon={faCalendarAlt}
                                    size='2x'
                                />
                                :
                                <FontAwesomeIcon
                                    onClick={() => setEndPicker(!endPicker)}
                                    className='calendar-icon'
                                    color='black'
                                    icon={faCalendarAlt}
                                    size='2x'
                                />
                            }
                        </div>
                        <button style={{ marginTop: '1vh' }} className='find-by-date' onClick={findByDate}>Search</button>
                    </div>
                    <div className='table-query'>
                        <h2 style={{ fontWeight: 'bold' }}>Find by table</h2>
                        <select onChange={e => setTable(e.currentTarget.value)} className='table-selector'>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                        </select>
                        <button className='find-by-table' onClick={findByTable}>Search</button>
                    </div>
                </div>
                <ul className='orders'>
                    {orders.map(order => (
                        <li className='table-order'>
                            <ul>
                                <h3 className='table-number'>{translate('Table')}: {order.table} </h3>
                                {
                                    order.order.map((singleOrder, index) => (
                                        <div className='single-order-wrapper'>
                                            <li className='single-order'>
                                                <Order
                                                    name={singleOrder.name}
                                                    price={singleOrder.price}
                                                    quantity={singleOrder.quantity}
                                                    total={singleOrder.total}
                                                    date={new Date(order.date).toDateString()}
                                                />
                                            </li>
                                            {singleOrder[index + 1] ? <hr></hr> : null}
                                        </div>
                                    ))
                                }
                            </ul>

                        </li>
                    ))}
                </ul>
            </div>
            :
            <div>
                <div className='spacer'></div>
                <div>incorrect data</div>
            </div>
    )
}

export default Orders