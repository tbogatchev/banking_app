import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4 className="ui header">Project approach:</h4>
    <div>
      I started this project with my favorite barebone tech stack: the react-redux-koa starter pack.
      It can be found <a href="https://github.com/davezuko/react-redux-starter-kit">here</a>.
    </div>
    <div style={{marginTop:'20px'}}>I designed the project to be easily scalable by putting in logic for dispatching an HTTP POST. </div>
    <div>Click the "Banking App" link above to see it. </div>
  </div>
)

export default HomeView
