import React from 'react'
import Header from './header'
import Background from './background'
import PageTransition from '../components/pageTransition'
import '../common/common.module.scss'
import {wrapper} from '../common/safariLayoutFix.module.scss'


const Layout = ({ children, location }) => {

    const [latestKey, setLatestKey] = React.useState(null);

    const animationFinished = () => {
        setLatestKey(location.key);
    }

    return <div className={wrapper}>
        <Header />
        <div style={{marginTop:"56px"}}>
            <Background animationFinished={animationFinished}>
                {(voronoiClipData, isAnimating) => 
                    <PageTransition in={!isAnimating && location.key===latestKey}>
                        {React.cloneElement(children, {voronoiClipData: voronoiClipData, isAnimating: isAnimating})} 
                    </PageTransition>
                }
            </Background>
        </div>
    </div>
}

export default Layout