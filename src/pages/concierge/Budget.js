import React, { Component } from 'react';
import { BigTitle, MidTitle, ConciergeInput, Button } from 'components';
import styled from 'styled-components';
import Util from "../../lib/Util";
import Media from 'react-media';
 

const ContentBox = styled.div`
  display:flex;
  flex-direction:column;
  align-item:center;
  width: 322px;
  min-height: 330px;
  height: auto;
  margin: 0 auto;
  margin-top: 170px;
  ${p => p.mobile === 'is' && `
    text-align : center;
    margin-top: 6em;   
  `}
  @media only screen and (max-height: 568px) {
    margin-top: 5em; 
  }
  @media only screen and (max-width: 320px) {
    width: 300px; 
  }
`;

const BttonBox = styled.div`
  width: 456px;
  height: 60px;
  margin: 0 auto;
  margin-top: 130px;
  text-align: center;
  ${p => p.type === 'S' && `
     width: 260px;
     height: 40px;
     margin-top: 0px;
     padding-bottom:5em;
  `}
`;

const InlineBox = styled.div`
    width: 50px;
    height: 1px;
    background-color: #8a8a8a;   
    margin: 0 auto;
    margin-top: 48px;
    margin-bottom: 48px;
`;

const MobilePage = styled.div`
   display:flex;
   flex-direction:column;
   justify-content : space-around;
   align-item:center;
   height:${p => `
     ${p.height}px;
  `}
`;
const Page = styled.div`
   display:flex;
   flex-direction:column;
   justify-content : flex-start;
   align-item:center;
   height:${p => `
     ${p.height}px;
  `}
`;

const AddtionTitlt = styled.span`
font-size: 22px;
padding-left: 5px;
color:#000;
font-weight:400;
${p => p.device === "mobile" &&`
   font-size: 20px;
`}
${p => p.device !== "mobile" &&`
    position: relative;
    vertical-align: top;
    height: 52px;
    line-height: 52px;
`}
`


class Budget extends Component {
  
    state = {
        active : 'off',
        focus : [
            {id: 0, active: "off"},
            {id: 1, active: "off"},
        ],
        min: '',
        max: '',
        windowHeight : window.innerHeight
    }
    moveInit(){
        let { history } = this.props
        history.push({
          pathname: '/concierge',
        })
    }
    componentDidMount(){
        if(!this.props.location.state)   {this.moveInit(); return false;}
        if(!this.props.location.state.formData.budget)   {return false;}
        const budget = this.props.location.state.formData.budget;
  
        if(isNaN(budget.min)) budget.min = 0;
        if(isNaN(budget.max)) budget.max = 0;
 
        
        this.setState({
            active : 'on',
            min: Util.numberComma(budget.min),
            max: Util.numberComma(budget.max),
        })
      
        if((budget.min < 1 || budget.max < 1)){
            this.setState({
              active : 'off',
          })
        }
     }

    
    handleChange = (e) => {
        const val = Util.removeComma(e.target.value);
        
        const re = /^[0-9\b]+$/; 
        if (!re.test(val)) {
            this.setState({
                [e.target.name]: '',
                active: 'off',
            });
            return false;
        }


        let active = 'off';
        const min = Util.removeComma(this.state.min);
        const max = Util.removeComma(this.state.max);
        
        if(re.test(min) && re.test(max) ){
            active = 'on';
        }
        if(re.test(min) && e.target.name ==='max'){
            active = 'on';
        }
        if(re.test(max) && e.target.name ==='min'){
            active = 'on';
        }
      
        
        this.setState({
            active : active,
            [e.target.name]: Util.numberComma(e.target.value)
        });
        
    }

    handleActiveChange = (id, e) => {
        e.preventDefault();
        const focus  = this.state.focus;

        
        this.setState({
           
            focus: focus.map( 
                a => {
                  if(a.id === id){
                    a.active = 'on';
                  }else{
                    a.active = 'off';
                  }
                  return a;
              })
            
        });
      }
      

      movePage(path, type){

        const mp = _ =>{



            let {history, location} = this.props


            const preLocalStorageFormData = JSON.parse( localStorage.formData ) ;
            localStorage.formData =  JSON.stringify(
                {
                    ...preLocalStorageFormData,
                    budget : {
                        min : Util.removeComma(this.state.min),
                        max : Util.removeComma(this.state.max)
                    }
                }
            )


            history.push({
                pathname:path,
                state: {
                    formData : { 
                        ...location.state.formData,
                        budget : {
                            min : Util.removeComma(this.state.min),
                            max : Util.removeComma(this.state.max)
                        }
                    }
                  }
            })
          
      
        }
        if(type === 1){
            if(this.state.active === 'on'){
               
                if(Util.removeComma(this.state.min) > Util.removeComma(this.state.max)){
                    alert("최소예산이 최대예산보다 클 수 없습니다.");
                  }else{
                    mp();
                  }
            }
        }else{
          mp();
        } 
      }

    render() {
       
        return (
            <Media query="(max-width: 1146px)"> 
              {m => m 
                ? (<MobilePage >
                    <div>
                        <BigTitle text="면적/예산 설정" type="B" />
                        <MidTitle text="예산은 어떻게 되나요?" type="B" />
                    </div>
                    
                    <div>
                        <ContentBox mobile='is'>
                        <div>
                          <ConciergeInput  mobile="budget" name="min" active={this.state.focus[0].active} onFocus={(e) => this.handleActiveChange(this.state.focus[0].id, e)}  onChange={this.handleChange}  value={this.state.min}  /> 
                        </div>
                         <InlineBox/>
                        <div>
                           <ConciergeInput  mobile="budget" name="max" active={this.state.focus[1].active} onFocus={(e) => this.handleActiveChange(this.state.focus[1].id, e)}  onChange={this.handleChange}  value={this.state.max}  />
                        </div>
                        </ContentBox>
                    </div>

                    <div>
                    <BttonBox type="S">
                    <Button type="S" onClick={ _ => this.movePage('/concierge/measure',0)}>이전으로</Button>
                        <Button type="S" active={this.state.active}
                            onClick={ _ => this.movePage('/concierge/styles',1)}
                        >다음으로 </Button>  
                </BttonBox>
                    
                    </div>
                    
                </MobilePage>) 





                : (<Page>
                    <BigTitle text="면적/예산 설정" />
                    <MidTitle text="예산은 어떻게 되나요?" />
                    <ContentBox>
                    <div style={{width:"400px"}}>
                    <ConciergeInput name="min" active={this.state.focus[0].active} onFocus={(e) => this.handleActiveChange(this.state.focus[0].id, e)}  onChange={this.handleChange}  value={this.state.min}   style={{width:'320px',display:'inline-block'}}/>
                  </div>
                   <InlineBox/>
                  <div style={{width:"400px"}}>
                     <ConciergeInput name="max" active={this.state.focus[1].active} onFocus={(e) => this.handleActiveChange(this.state.focus[1].id, e)}  onChange={this.handleChange}  value={this.state.max}  style={{width:'320px'}}/>
                  </div>
                    </ContentBox>
                    <BttonBox style={{paddingBottom:"200px"}}>
                        <Button onClick={ _ => this.movePage('/concierge/measure',0)}>이전으로</Button>
                        <Button active={this.state.active}
                            onClick={ _ => this.movePage('/concierge/styles',1)}
                        >다음으로 </Button>

                    </BttonBox>
                </Page>)
              }
            </Media>
        );
      }
    }



export default Budget;
