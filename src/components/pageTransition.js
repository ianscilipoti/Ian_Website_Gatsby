import { Transition } from 'react-transition-group'
import React from 'react'

const duration = 200;

const defaultStyle = {
  
  opacity: 0,
  position: `absolute`,
  width: '100%',
  zIndex: 2
}

const transitionStyles = {
  entering: { opacity: 1, transition: `opacity ${duration}ms ease-in-out`, visibility:"visible"},
  entered:  { opacity: 1},
  exiting:  { opacity: 0},
  exited:  { opacity: 0, visibility:"hidden"},
};

const PageTransition = (props) => {
  return <Transition in={props.in} mountOnEnter={true} exit={false} timeout={{enter: duration, exit: 0}}>
    {state => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {props.in ? props.children : ""}
      </div>
    )}
  </Transition>
}

export default PageTransition