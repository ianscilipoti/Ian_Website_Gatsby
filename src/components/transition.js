import React from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

const timeout = 1500
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    width: '100%',
    opacity: 1,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    position: `absolute`,
    width: '100%',
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    position: `absolute`,
    width: '100%',
    opacity: 0,
  },
}

const PassVoronoiDataWrapper = (props) => (
  <ReactTransition {...props}>
    {state => (
      <div style={{
        ...getTransitionStyles[state]
      }}>
        {React.cloneElement(props.children, {voronoiClipData: props.voronoiClipData})}
        {/* {props.children} */}
      </div>
    )}
  </ReactTransition>
);

class Transition extends React.PureComponent {
  render() {
    const { children, location, voronoiClipData } = this.props

    return (
      <TransitionGroup component={null} childFactory={(child) => React.cloneElement(child, {voronoiClipData: voronoiClipData})}>
        {/* <ReactTransition //onExiting={()=>{debugger;}}
          key={location.pathname}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition> */}

        <PassVoronoiDataWrapper 
        key={location.pathname}
        timeout={{
          enter: timeout,
          exit: timeout,
        }}
        >
          {children}
        </PassVoronoiDataWrapper>
      </TransitionGroup>
    )
  }
}

export default Transition