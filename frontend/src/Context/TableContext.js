import React, {useState, createContext} from 'react'


export const TableContext = createContext();

export const TableProvider = (props) => {
    const [table, setTable] = useState(0)
    const [display, setDisplay] = useState(true)

    return (
        <TableContext.Provider value = {{table: [table, setTable], display: [display, setDisplay]}}>
            {props.children}
        </TableContext.Provider>
    )
}