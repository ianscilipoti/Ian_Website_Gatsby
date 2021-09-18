import React from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

const timeout = 0//300
const timein = 200//300
const delay = 100
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    width: '100%',
    opacity: 0,
  },
  entered: {
    // transitionDelay: `${delay}ms`,
    transition: `opacity ${timein}ms ease-in-out ${delay}ms`,
    position: `absolute`,
    width: '100%',
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    position: `absolute`,
    width: '100%',
    opacity: 0,
    // display:"none"
  },
}

const PassVoronoiDataWrapper = (props) => (
  <ReactTransition {...props} mountOnEnter={true}>
    {state => (
      <div
         style={{...getTransitionStyles[state]}}>
        {React.cloneElement(props.children, {voronoiClipData: props.voronoiClipData, isAnimating: props.isAnimating})}
        {/* {props.children} */}
      </div>
    )}
  </ReactTransition>
);

const Transition = (props) => {
//class Transition extends React.PureComponent {
  const { children, location, voronoiClipData } = props

  return <TransitionGroup component={null} childFactory={(child) => React.cloneElement(child, {voronoiClipData: voronoiClipData})}>
    <PassVoronoiDataWrapper 
    key={location.pathname}
    timeout={{
      enter: (timein+delay),
      exit: (timeout),
    }}
    >
      {children}
    </PassVoronoiDataWrapper>
  </TransitionGroup>
  
}

export default Transition