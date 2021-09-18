import React from 'react'
import Header from './header'
import Background from './background'
import './layout.module.scss'
import Transition from "../components/transition"
import PageTransition from '../components/pageTransition'


const Layout = ({ children, location }) => {

    const [latestKey, setLatestKey] = React.useState(null);

    const animationFinished = () => {
        setLatestKey(location.key);
    }

    return <div>
        <Header />
        <Background animationFinished={animationFinished}>
            {(voronoiClipData, isAnimating) => 
                // <Transition location={location} voronoiClipData={voronoiClipData} isAnimating={isAnimating}>
                //     {children} 
                // </Transition>   
                
                <PageTransition in={!isAnimating && location.key===latestKey}>
                    {React.cloneElement(children, {voronoiClipData: voronoiClipData, isAnimating: isAnimating})} 
                </PageTransition>
            }
        </Background>
    </div>
}

export default Layout