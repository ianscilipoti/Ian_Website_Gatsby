import React from 'react'
import Header from './header'
import Background from './background'
import './layout.module.scss'
import Transition from "../components/transition"



const Layout = ({ children, location }) => {
    return <div>
        <Header />
        <Background>
            {(voronoiClipData, isAnimating) => 
                <Transition location={location} voronoiClipData={voronoiClipData} isAnimating={isAnimating}>
                    {children} 
                </Transition>   
                // <div></div>             
            }
        </Background>
    </div>
}

export default Layout