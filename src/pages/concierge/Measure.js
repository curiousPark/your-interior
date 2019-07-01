import React, { Component } from 'react';
import { BigTitle, MidTitle, ConciergeInput, Button } from 'components';
import styled from 'styled-components';
import Media from 'react-media';


const SubTitle = styled.p`
   text-align: center;
   margin : 6px 0 0 0;
   color: rgba(128, 128, 128, 0.7);
   letter-spacing: 1px;
`;

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
     width: 315px;
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
     margin-top : 0;
     padding-bottom:5em;
  `}

`;

const ArrowBox = styled.div`
    width: 320px;
    height: 24px;
    margin: 0 auto;
    margin-top: 36px;
    margin-bottom: 36px;
    text-align: center;
    @media only screen and (max-width: 320px) {
        width: 300px; 
      }
`;

const ArrowImg = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const MobilePage = styled.div`
   display:flex;
   flex-direction:column;
   justify-content : flex-start;
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



class Measure extends Component {
  
    state = {
        active : 'off',
        focus : [
            {id: 0, active: "off"},
            {id: 1, active: "off"},
        ],
       
        meter: '',
        py: '',
        windowHeight : window.innerHeight
    }

    moveInit(){
        let { history } = this.props
        history.push({
          pathname: '/concierge',
        })
    }
    componentDidMount(){
        if(!this.props.location.state) {this.moveInit(); return false;}
        if(!this.props.location.state.formData.measure) {return false;}
        const measure = this.props.location.state.formData.measure;
        this.setState({
            active : 'on',
            meter: measure.meter,
            py: measure.py,
        })
        
        if(measure.meter < 1 || measure.py < 1 ){
            this.setState({
              active : 'off'
            })
          }
     }

     meterToPy = val => {
        this.setState({
            py: (val / 3.3).toFixed(2)
        });
    }
    
     pyToMeter = val => {
        this.setState({
             meter: (val * 3.3).toFixed(2)
        });
    }
    
    handleChange = (e) => {
        const val = e.target.value;
        const re = /^[0-9\b]+$/; 
    
        if (!re.test(val)) {
            this.setState({
                [e.target.name]: '',
                active: 'off',
            });
        }else{
           
            this.setState({
                [e.target.name]: e.target.value
            });
            e.target.name === 'meter' ? this.meterToPy(e.target.value) : this.pyToMeter(e.target.value)
    
            if(e.target.value < 1 || !e.target.value){
                this.setState({
                    active : 'off',        
                });
                return false;
            }else{
                this.setState({
                    active : 'on',
                });
            }
        } 
   
    
    }

    handleActiveChange = (id, e) => {
        e.preventDefault();
        const focus  = this.state.focus;
        if(e.target.value < 1){
            this.setState({
                active : 'off',  
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
            return false;
        }else{
            this.setState({
                active : 'on',
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
      }

    movePage(){
        if(this.state.active === 'on'){
            let {history, location} = this.props
            if(!location.state){
                location.state = {
                    formData : {},
                }
            }

            const preLocalStorageFormData = JSON.parse( localStorage.formData ) ;
            localStorage.formData =  JSON.stringify(
                {
                    ...preLocalStorageFormData,
                    measure : {
                        meter : this.state.meter,
                        py : this.state.py
                    }
                }
            )


            history.push({
                pathname:'/concierge/budget',
                state: {
                    formData : {
                        ...location.state.formData,
                        measure : {
                            meter : this.state.meter,
                            py : this.state.py
                        }
                    }
                }
            })
        }

    }


    render() {
       
        return (
            <Media query="(max-width: 1146px)">
               {
                   m => m 
                   ? (<MobilePage>
                      <div>
                        <BigTitle text="면적/예산 설정" type="B" />
                        <MidTitle text="공간의 면적이 어떻게 되나요?" type="B" />
                      </div>

                      <div>
                        <ContentBox mobile='is'>
                            <div>
                            <ConciergeInput mobile="budget" name="py" active={this.state.focus[1].active} onFocus={(e) => this.handleActiveChange(this.state.focus[1].id, e)}  onChange={this.handleChange}  value={this.state.py} />
                            </div>
                            <ArrowBox>
                                <ArrowImg src='/img/concierge/arrowUp.png'/>
                                <ArrowImg src='/img/concierge/arrowDown.png'/>
                            </ArrowBox>
                            <div>
                            <ConciergeInput mobile="budget" name="meter" active={this.state.focus[0].active} onFocus={(e) => this.handleActiveChange(this.state.focus[0].id, e)}  onChange={this.handleChange}  value={this.state.meter}/>

                                <SubTitle>1평은 약 3.3㎡입니다</SubTitle>
                            </div>           
                        </ContentBox>
                      </div>
                    <div>
                        <BttonBox type="S">
                        <Button type="S" onClick={ _ => {
                            let {history, location} = this.props
                          
                            history.push({
                              pathname:'/concierge/spaces3',
                              state: {
                                formData : { 
                                    ...location.state.formData,

                                }
                              }
                             })
                          }     
                        }>이전으로</Button>
                        <Button type="S" active={this.state.active}

                                onClick={_ => {this.movePage()}}
                        >다음으로 </Button>
                     </BttonBox>
                        
                    </div>
                

        </MobilePage>) 
                   : (<Page>
                    <div>
                    <BigTitle text="면적/예산 설정" />
                    <MidTitle text="공간의 면적이 어떻게 되나요?"  />
                  </div>
                    <ContentBox>
                        <div>
                         <ConciergeInput  name="py" active={this.state.focus[1].active} onFocus={(e) => this.handleActiveChange(this.state.focus[1].id, e)}  onChange={this.handleChange}  value={this.state.py}  style={{width:'320px'}}/>

                        </div>
                        <ArrowBox>
                            <ArrowImg src='/img/concierge/arrowUp.png'/>
                            <ArrowImg src='/img/concierge/arrowDown.png'/>
                        </ArrowBox>
                        <div>
                        <ConciergeInput  name="meter" active={this.state.focus[0].active} onFocus={(e) => this.handleActiveChange(this.state.focus[0].id, e)}  onChange={this.handleChange}  value={this.state.meter}  style={{width:'320px'}}/>
                        <SubTitle>1평은 약 3.3㎡입니다</SubTitle>
                        </div>   
                        
                    </ContentBox>
                    <BttonBox style={{paddingBottom:"200px"}}>
                        <Button onClick={ _ => {
                            let {history, location} = this.props
                          
                            history.push({
                              pathname:'/concierge/spaces3',
                              state: {
                                formData : { 
                                    ...location.state.formData,
                                    measure : {
                                        meter : this.state.meter,
                                        py : this.state.py
                                    }
                                }
                              }
                             })
                          }     
                        }>이전으로</Button>
                        <Button active={this.state.active}

                                onClick={_ => {this.movePage()}}
                        >다음으로 </Button>
                    
                      
                    </BttonBox>
                </Page>
               )
               }
            </Media>
            
           );
        }
      }



export default Measure;
