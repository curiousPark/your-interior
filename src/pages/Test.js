import React from 'react';
import { Route } from 'react-router-dom';
import { Counter, Info, ContextSample, Average, User } from 'pages'; 



const Test = ({match}) => {
    return (
        <div>
            <Route exact path={match.url} component={User}/>
            <Route path={`${match.url}/counter`} component={Counter}/>
            <Route path={`${match.url}/info`} component={Info}/>
            <Route path={`${match.url}/context`} component={ContextSample}/>
            <Route path={`${match.url}/average`} component={Average}/>
        </div>
    );
};

export default Test;