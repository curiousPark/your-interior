// import React, { Component } from 'react';
import React from 'react';
import styled from 'styled-components';


const Msg = styled.div`
  
  font-size: 40px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: center;
  color: rgba(27, 27, 27, 0.7);
  padding-top: 10px;
  ${p => p.type === 'B' && `
      text-align: center;
      
      font-size: 20px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.2px;
      color: rgba(27, 27, 27, 0.7);
      padding-top: 0px;
      padding-bottom: 30px;
      @media only screen and (max-width: 320px) {
        padding-bottom: 0; 
      }   
  `}

  ${p => p.type === 'StylesB' && `
      text-align: center;
      
      font-size: 20px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.2px;
      color: rgba(27, 27, 27, 0.7);
      padding-top: 0px;
      padding-bottom: 0px; 
  `}

  ${p => p.type ==="styles" && `
     font-size: 31px;
  `}

  ${p => p.type === "timetableDestop" && `

  padding-top: 1em;
  @media only screen and (max-width: 700px) {
     font-size:20px;
     padding-top: 1.1em;
  } 
  `}

  ${p => p.type === "priority" && `
     padding-bottom: 1px;
     padding-top: 1px;
     font-size:17px;
  `}

  ${p => p.type === "splash" && `
     padding-top: 45px;
  `}

  ${p => p.type === "expert" && `
     padding-bottom: 1px;
     padding-top: 1px;
     font-size:20px;
  `}

  ${p => p.type === "applicationForm" && `
   margin-top:50px;
  
  font-size: 23px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.6px;
  text-align: center;
  color: rgba(28, 28, 28, 0.7);
  `}

  ${p => p.type === "ConsultingResult" && `
  width:950px;
  margin-top:10px;
  
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  color: rgba(27, 27, 27, 0.7);
  height:20px;
  `}
    ${p => p.type === "ConsultingResultMobile" && `
      
      font-size: 11px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.3px;
      text-align: center;
      color: rgba(27, 27, 27, 0.7);
      margin-top:0;
      padding-top:0;
  `}
`;


const MidTitle = (props) => {
  return (
      <Msg type={props.type} style={props.style}>{props.text}</Msg>
  );
};


export default MidTitle;