import React from 'react'
import AppWrapper from './components/AppWrapper'
import {LanguageProvider} from './Context/LanguageContext'

export default function App() {
    return(
        <LanguageProvider>
            <AppWrapper/>
        </LanguageProvider>
    
    )
}