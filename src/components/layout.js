import React from 'react'
import Header from './header'
import Background from './background'
import './layout.module.scss'
import Transition from "../components/transition"

const Layout = ({ children, location }) => {
    return <div>
        <Header />
        <Background>
            {(voronoiClipData) => 
                <Transition location={location}>
                    {React.cloneElement(children, {voronoiClipData: voronoiClipData})}
                </Transition>
            }
            
        </Background>
    </div>
}

export default Layout