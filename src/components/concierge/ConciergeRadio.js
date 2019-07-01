import React from 'react';
import styled from 'styled-components';

const Cr = styled.div`
  width: 500px;
  height: 80px;
  border: 1px solid #ebebeb;
  ${p => p.active === 'on' && `
    border: 1px solid #ffd400;
    background-color: #ffffff;
  `}
  ${p => p.device ==='Mobile' && `
    width : 320px;
    height 72px;
  `}
`;

const CrInput = styled.input`
  width: 66px;
  position: relative;
  height: 20px;
  margin-top: 30px;
  float: left;
  position: relative;
  left: 4px;
  &:focus {
    outline: none;
  }
  ${p => p.device ==='Mobile' && `
    width: 56px;
    margin-top: 23px;
    left:16px;
  `}
`;
const CrLabel = styled.label`
  position: relative;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: rgba(27, 27, 27, 0.7);
`;

const TitleDiv =  styled.div`
  margin-top : 17px;
  font-size: 19px;
  font-weight: 600;
  color: rgba(27, 27, 27, 0.7);
  ${p => p.id !== 'auto' && `
  width: 90px;
   float: left;
   margin-top : 25px;
  `}
  ${p => p.device ==='Mobile' && `
    font-size: 14px;
  `}
  ${p => p.device ==='Mobile' && p.id ==='auto' &&`
    font-size: 15px;
    margin-top : 5px;
  `}
  
`;
const ContentDiv =  styled.div`
 
  margin-top : 4px;
  
  font-size: 10px;
  font-weight: 500;
  color: rgba(27, 27, 27, 0.7);
  word-spacing: -2px;
  ${p => p.device ==='Mobile' && `
    font-size: 8px;
    margin-top : 0px;
    width: 245px;
    float: right;
    position: relative;
    left: -18px;
  `}
`;

const ContentDiv2 =  styled.div`
  
  font-size: 15px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -1px;
  color: rgba(27, 27, 27, 0.7);
  float: left;
  margin-top: 31px;
  margin-left: 20px;
  ${p => p.device ==='Mobile' && `
    font-size: 10px;
    word-wrap:break-word; 
    margin-top: 26px;
  margin-left: 8px;
  `}
`;

const ConciergeRadio = (props) => {
  return (
    <Cr active={props.active} device={props.device}>
      <CrInput
          type="radio"
          name={props.name}
          value={props.value}
          id={props.id}
          checked={props.checked}
          title={props.title}
          subTitle={props.subTitle}
          onChange={props.onChange}
          device={props.device}
        />
      {
       props.id === "auto" ? 
        <CrLabel htmlFor={props.id} device={props.device}>
          <TitleDiv device={props.device} id={props.id}>{props.title}</TitleDiv>
          <ContentDiv device={props.device} >{props.subTitle}</ContentDiv>
        </CrLabel>
        :
        <CrLabel htmlFor={props.id} device={props.device}> 
          <TitleDiv device={props.device}>{props.title}</TitleDiv>
         <ContentDiv2 device={props.device}>{props.subTitle}</ContentDiv2>
        </CrLabel>
      }
  </Cr>
  )
};


export default ConciergeRadio;