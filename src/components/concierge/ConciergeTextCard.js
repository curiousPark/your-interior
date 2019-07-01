import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 252px;
  height: 133px;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
  float: left;
  margin-left: 14px;
  margin-top: 20px;
  cursor: pointer;
  position : relative;
  ${p => p.selected && `
    border: 1px solid #ffd400;
    box-shadow: 1px 5px 10px 0 rgba(95, 95, 95, 0.5);
  `}
  ${p => p.type === 'M' && `
      width: 156px;
      margin: 0 auto;
      margin-top: 20px;
      height: 83px;
  `}
  @media only screen and (max-width: 320px) {
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const Modal = styled.div`
   position : absolute; 
   left:0;
   top:0;
   z-index:1000;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.3);
   visibility:hidden;
   ${p=>p.selected && `
   visibility:visible;
   `}
`

const TitleBox = styled.div`
  
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 28px;
  margin-top: 43px;
  letter-spacing: 0.2px;
  text-align: center;
  color: rgba(128, 128, 128, 0.7);
  ${p => p.type === 'M' && `
      height: 40px;
      margin-top: 15px;
      font-size: 15px;
      font-weight: 500;
      line-height: 40px;
      letter-spacing: 0.2px;
  `}
  
`;
const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: rgba(27, 27, 27, 0.7);
  ${p => p.type === 'M' && `
      font-size: 15px;
      height:22px;
  `}
`;
const Fw300 = styled.div`
font-weight: 300;
  ${p => p.type === 'M' && `

  font-size: 13px;
  `}
 
  
`

const SpaceTextCard = ({selected, type,...p}) => {
  return (
    <Card selected={selected} type={type} onClick={p.onClick} {...p} >
      <TitleBox type={type}>
        <Title type={type}>{p.title}</Title>
        <Fw300 type={type}>{p.subTitle}</Fw300>
      </TitleBox>
      <Modal selected={selected}/>
    </Card>
  
  );
};


export default SpaceTextCard;