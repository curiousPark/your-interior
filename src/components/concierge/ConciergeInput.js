import React from 'react';
import styled from 'styled-components';

const Ci = styled.input`
  width: 255px;
  height: 52px;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
  
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-align: left;
  line-height: 58px;
  color: rgba(27, 27, 27, 0.7);
  margin: 0 auto;
  padding-right: 45px;
  padding-left: 20px;
  background-image : url('/img/concierge/unit.svg');
  background-position:center right 5px; 
  background-repeat:no-repeat;
  background-size: 42px;
  ${p => p.name === 'meter' && `
    background-image : url('/img/concierge/m2.svg');
  `}
  ${p => p.name === 'py' && `
    background-image : url('/img/concierge/py.svg');
  `}
  ${p => p.active === 'off' && `
   border: 1px solid #ebebeb;
  `}
  ${p => p.active === 'on' && `
    border: 1px solid #ffd400;
  `}
  ${p => p.mobile === 'is' && `
        width: 220px;
        height: 40px;
        font-size: 15px;
  `}
  ${p => p.mobile === 'budget' && `
        width: 230px;
        height: 40px;
        font-size: 15px;
        line-height: 0px;
  `}
  @media only screen and (max-width: 320px) {
    padding-left: 15px;
  }
  &:focus {
    outline: none;
  }
`;


const ConciergeInput = ({active, type, mobile,...p}) => {
  return (
    <Ci type="text" name={p.name} mobile = {mobile} active={active} onFocus={p.onFocus} onChange={p.onChange} value={p.value} style={p.style} />
  )
};


export default ConciergeInput;