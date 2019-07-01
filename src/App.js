import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Concierge, Test } from './pages';

const App = () => {

  return  <BrowserRouter>
            <div className='Site-content'>
                <Route exact path="/" component={Concierge}/>
                <Route path path="/concierge" component={Concierge}/>
                <Route path="/test" component={Test}/>
              
            </div> 
          </BrowserRouter>;

          
};

export default App;