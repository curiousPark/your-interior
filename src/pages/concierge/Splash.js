import React, { Component } from 'react';
import { SmallTitle, MidTitle, Button, ProgressBar } from 'components';
import axios from 'axios';
import styled from 'styled-components';
import Util from "../../lib/Util";
import CountUp from 'react-countup';
import _ from 'lodash';
import Media from 'react-media';

const ContentBox = styled.div`
  width: 820px;
  min-height: 330px;
  height: auto;
  margin: 0 auto;
  margin-top: 110px;
  
  ${p => p.device === "Mobile" && `
      width: 280px;
      margin-top: 60px;
      min-height:270px;
  `}
`;

const BttonBox = styled.div`
  width: 208px;
  height: 60px;
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
  ${p => p.type === 'S' && `
     width: 130px;
     height: 40px;
     margin-top: 0px;
  `}
`;

const Researching = styled.div`
    
    font-size: 25px;
    font-weight: ${p => p.fw};
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    text-align: center;
    color: rgba(27, 27, 27, 0.7);
    margin-top: 20px;
    ${p => p.device === "Mobile" && `
       font-size: 15px;
       margin-top: 0px;
    `}
`;


class Splash extends Component {
  
    state = {
        active : 'off',
        percentage : "0",

    }
    moveInit(){
        let { history } = this.props
        history.push({
          pathname: '/concierge',
        })
    }
    componentDidMount(){
       
        if(!this.props.location.state) {this.moveInit(); return false;}
        this.doProgressBar();
        this.getAPI();
    }

    doProgressBar() {

         setTimeout(() => {
            this.setState({ percentage : this.state.percentage*1+25});
            setTimeout(() => {
                this.setState({ percentage : this.state.percentage*1+25});
                setTimeout(() => {
                    this.setState({ percentage : this.state.percentage*1+25});
                    setTimeout(() => {
                        this.setState({ 
                            percentage : this.state.percentage*1+25,
                            active : 'on',
                        });
                        }, 1500);
                    }, 1500);
                }, 1500);
            }, 1500); 

      
     
    }

    getAPI(){
        
        const doConcierge = _ => new Promise((resolve, reject) => {
            this.props.location.state.formData.limit = 20;
            this.props.location.state.formData.channel = 'consulting';
            axios.get(`${Util.baseUrl}/concierge/experts`, {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'},
                params: {
                  formData: this.props.location.state.formData
                },
                responseType:'json',
              
              }).then( response => {
                    let mArr = [];
                    for(let i = 0; i < 3; i++){
                        let m = new Map();
                        mArr.push(m.set(i+1, []));
                    }


                    this.setState({
                        experts : response.data.experts.map( expert => {
                            expert.src = Util.srcConvert(expert.src, 1);
                            expert.profileImage = Util.dehtmlSpecialChars(expert.profileImage);
                            expert.businessName = Util.dehtmlSpecialChars(expert.businessName);
                            expert.title = Util.dehtmlSpecialChars(expert.title);
                            expert.mainSpecialty = Util.mainSpecialty[expert.mainSpecialty];
                            expert.businessType = Util.businessType[expert.businessType];
                            expert.selected = false;
                            expert.timetable = mArr;
                            expert.portfolioPhotos = response.data.portfolioPhotos.filter(p =>  expert.portfolioId === p.pid)
                            return expert;
                          })
                    })


                    resolve(true);
                },
                error => { console.log(error); reject(error) }
              );
          
          });

          const getTimeTable = () => new Promise((resolve, reject) => {
            let experts = this.state.experts.map( e => {
                return e.userId;
            });
            experts = _.uniq(experts);
          
            axios.get(`${Util.baseUrl}/concierge/timetable`, {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'},
                params: {
                  experts: experts,
                  kind   : 'experts',
                },
                responseType:'json',
                timeout: 1000 
              }).then( response => {
                   
                
                    let timetable =_.groupBy(response.data.timetable, function(o){
                        return o.expertId;
                    });


                    let map = new Map();
                    for(let t in timetable){

                        let s = _.groupBy(timetable[t], function(o){
                            return o.dayCode;
                        });
                       
                      map.set(t,s);
                    }
                 
                    let experts = this.state.experts;
                

                    for(let e of experts){
                        e.timetable = map.get(e.userId.toString());
                    }

        
                   

                    this.setState({
                        experts : experts
                    })
               
                    console.log(this.state.experts);

                   resolve(true);
                },

                error => { console.log(error); reject(error) }
              );
          
          });
          const call = async() =>{
            await doConcierge();
            await getTimeTable();
          }

          call();

          
    }
    
    movePage(){

        const mp = () =>{
            if(this.state.active === 'on'){

                localStorage.experts =  JSON.stringify(this.state.experts);


                let {history, location} = this.props;
                history.push({
                    pathname:'/concierge/experts',
                    state: {
                        formData : { 
                            ...location.state.formData,
                        },
                        experts : this.state.experts
                    },
                })
            }
        }

        mp();
    }

    render() {
       
        return (
            <Media query="(max-width: 1146px)">
               {
                   m => m 
                   ?(<>
                      <div style={{padding:40}}>
                        <MidTitle type="priority" text="데이터 매칭중입니다…"  />
                        <SmallTitle type="priority" text="선택하신 기준을 중심으로" />
                        <SmallTitle type="priority" text="가장 적합한 포트톨리오와 전문가를 추천해 드립니다."  />
                      </div>
                      <div>
                            <ContentBox device="Mobile">
                            <ProgressBar percentage={this.state.percentage} device="Mobile" />
                                <div style={{marginTop: "40px"}}>
                                    <Researching fw="600" device="Mobile">나에게 적합한 인테리어 회사 매칭중...</Researching>
                                    <Researching fw="400" device="Mobile"> <CountUp end={100} duration={8}  decimal="," separator=","/>% </Researching>
                                </div>
                            
                            </ContentBox>
                      </div>

                      <div>
                            <BttonBox type="S" >
                                <Button type = "S" active={this.state.active}
                                
                                onClick={ _ => this.movePage()}
                                >결과보기 </Button>                  
                            </BttonBox>
                      </div>
                    </>)
                   :(

                    <div>
                    <MidTitle type="splash" text="데이터 매칭중입니다…"  />
                    <SmallTitle text="컨시어지 서비스는 전문가들의 실제사례로 이루어진 빅데이터를 활용해 " />
                    <SmallTitle text="가장 적합한 전문가를 매칭해드립니다. 잠시만 기다려주세요."  />
                   
                    <ContentBox>
                     <ProgressBar percentage={this.state.percentage} />
                        <div style={{marginTop: "80px"}}>
                            <Researching fw="600">나에게 적합한 인테리어 회사 매칭중...</Researching>
                            <Researching fw="400"> <CountUp end={100} duration={8}  decimal="," separator=","/>% </Researching>
                        </div>
                    
                    </ContentBox>
                    <BttonBox style={{paddingBottom:"200px"}}>
                        <Button active={this.state.active}
                      
                        onClick={ _ => this.movePage()}
                        >결과보기 </Button>                  
                    </BttonBox>
                </div>
    
                   )
               }
            </Media>

        );
      }
    }

export default Splash;
