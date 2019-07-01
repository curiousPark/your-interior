import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Counter, Info, ContextSample, Average, User } from './pages';

const App = () => {

  return  <BrowserRouter>
            <div className='Site-content'>
                <Route exact path="/" component={Counter}/>
                <Route exact path="/info" component={Info}/>
                <Route exact path="/context" component={ContextSample}/>
                <Route exact path="/average" component={Average}/>
                <Route exact path="/user" component={User}/>
            </div> 
          </BrowserRouter>;

          
};

export default App;