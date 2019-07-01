// import React, { Component } from 'react';
import React from 'react';
import styled from 'styled-components';

const Msg = styled.div`
  
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  color: rgba(27, 27, 27, 0.7);
  margin-top : 5px;
  ${p => p.color  && `
    color: ${p.color}
  `}

  ${p => p.type === "timetableDestop" && `
  @media only screen and (max-width: 700px) {
     font-size:11px;
  } 
  `}
  ${p => p.type === "priority" && `
     font-size : 12px;
  `}
  ${p => p.type === "expert" && `
     font-size : 11px;
     margin-top : 27px;
     @media only screen and (max-width: 320px) {
      letter-spacing: 0px;
   } 
  `}
  ${p => p.type === "expert" && p.color && `
     font-size : 11px;
     color: ${p.color}
  `}
`;


const SmallTitle = (props) => {
  return (
    <div>
      <Msg type={props.type} color={props.color} style={props.style}>{props.text}</Msg>
    </div>
  
  );
};


export default SmallTitle;