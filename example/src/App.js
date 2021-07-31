import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { StaticDemo } from './pages/StaticDemo/StaticDemo'
import { FirebaseDemo } from './pages/FirebaseDemo/FirebaseDemo'
import { Landing } from './pages/Landing/Landing'

// import 'effectnode/dist/index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/effectnode/StaticDemo'>
          <StaticDemo />
        </Route>

        <Route path='/effectnode/FirebaseDemo'>
          <FirebaseDemo />
        </Route>

        <Route path='/'>
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App

/*


    <div style={{ whiteSpace: 'pre-wrap' }}>
      <div>Keys list</div>
      <div>{Object.keys(EN).join('\n')}</div>
    </div>
*/
