
import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  
  font-size: 30px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: center;
  color: rgba(27, 27, 27, 0.7);
  padding-top: 80px;
  ${p => p.type === 'B' && `
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.2px;
      color: rgba(27, 27, 27, 0.7);
      padding-top: 40px;
      @media only screen and (max-width: 320px) {
        
      }
  `}

    ${p => p.type === 'StylesB' && `
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.2px;
      color: rgba(27, 27, 27, 0.7);
      padding-top: 40px;
  `}

  ${p => p.type === 'inforMobile' && `
      height: 25px;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.3px;
      text-align:center;
      color: rgba(27, 27, 27, 0.7);
      padding-top: 28px;
  `}
  
  ${p => p.type === 'applicationForm' && `
      height: 49px;
      
      font-size: 40px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.5px;
      text-align: center;
      color: rgba(27, 27, 27, 0.7);
      padding-top: 69px;
  `}
  ${p => p.type === 'applicationFormMobile' && `
      height: 25px;
      
      font-size: 20px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.3px;
      text-align: center;
      color: rgba(27, 27, 27, 0.7);
      padding-top: 40px;
      padding-bottom: 13px;
  `}
`;


const BigTitle = (props) => {
  return (
      <Title type={props.type}>{props.text}</Title>
  );
};


export default BigTitle;