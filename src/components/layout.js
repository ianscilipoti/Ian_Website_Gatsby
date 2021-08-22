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
                <Transition location={location} voronoiClipData={voronoiClipData}>
                    {/* {React.Children.map(children, child => {
                        // Checking isValidElement is the safe way and avoids a typescript
                        // error too.
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {voronoiClipData: voronoiClipData});
                        }
                    })} */}
                    {children}
                    {/* {React.cloneElement(children, {voronoiClipData: voronoiClipData})} */}
                </Transition>
            }
            
        </Background>
    </div>
}

export default Layout