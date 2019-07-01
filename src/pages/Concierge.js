import React from 'react';
import { Route } from 'react-router-dom';
import { Spaces1, Spaces2, Spaces3, Measure, Budget, Styles, Priority, Splash, Experts } from 'pages'; 

import styled from 'styled-components';

const Box = styled.div`
    position: relative;
    max-width: 1146px;
    height: auto;
    overflow:auto;
    padding-bottom: 30px;
    background: #f9f9f9;
    margin: 0 auto;
    
`;

const Concierge = ({match}) => {
    return (
        <div>
             <Box>
                <Route exact path={match.url} component={Spaces1}/>
                <Route path={`${match.url}/spaces1`} component={Spaces1}/>
                <Route path={`${match.url}/spaces2`} component={Spaces2}/>
                <Route path={`${match.url}/spaces3`} component={Spaces3}/>
                <Route path={`${match.url}/measure`} component={Measure}/>
                <Route path={`${match.url}/budget`} component={Budget}/>
                <Route path={`${match.url}/styles`} component={Styles}/>
                <Route path={`${match.url}/priority`} component={Priority}/>
                <Route path={`${match.url}/splash`} component={Splash}/>
                <Route path={`${match.url}/experts`} component={Experts}/>
           </Box>
        </div>
    );
};

export default Concierge;