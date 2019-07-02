import React, { Component } from 'react';
import { SmallTitle, MidTitle, ExpertCard, Button as CButton} from 'components';
import axios from 'axios';
import Util from "../../lib/Util";
import styled from 'styled-components';
import _ from 'lodash';
import Media from 'react-media';


let lastPos = window.pageYOffset;
let direction = '';

class Experts extends Component {
    state = {
        active : 'off',
        experts : [],
        selExperts: [],
        open:false,
        motion:'up',
        more: 'on',
      }
      moveInit(){
        let { history } = this.props
        history.push({
          pathname: '/concierge',
        })
    }
      componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        if(!this.props.location.state)    {this.moveInit(); return false;}
        if(!this.props.location.state.experts)    { return false;}
        const experts = this.props.location.state.experts;
        if(experts){
          this.setState({
            active : 'on',
            experts : experts,
            selExperts : experts.filter(e => {if(e.selected)return e})
          })
        }
       
      }

      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }
        
      handleScroll = () => {
        let st = window.pageYOffset;
      
        if(st >= lastPos){
          direction = 'down';
        } else {
          direction = 'up';
        }

        lastPos = st;

        if(st > 100){
          this.setState({motion:direction});
        } 

      };

      handleActiveChange = (expert, event) => {
        event.preventDefault();
       
        
        if(event.target.id !== 'btn' && event.target.id !== 'modal' ){
         
          if(event.target.id === 'more'  ){
            window.open(`https://interiorbrothers.com/experts/${expert.userId}`);
            
          }
          return false;
        }
        const experts  = this.state.experts;
        const selExperts  = this.state.selExperts;

        let active = 'on';

        if(selExperts.length < 1){
          selExperts.push(expert);
        }else{
          let idx = -1;
          for(let i in selExperts){
            if(selExperts[i].userId === expert.userId){
                idx = i; 
            }
          }
          if(idx > -1){
            selExperts.splice(idx, 1);
            if(selExperts.length < 1) active = 'off';
          }else{
            if(selExperts.length < 3){
              selExperts.push(expert);
            }else{
              alert("최대 3개의 인테리어 회사에 상담 신청이 가능합니다.");
              return false;
            }
            
          }
        }

       
        this.setState({
            active : active,
            selExperts : selExperts,
            experts: experts.map( 
                e => {
                  if(e.userId === expert.userId && e.portfolioId === expert.portfolioId){
                    if(!e.selected && this.state.selExperts.length > 3){
                      alert("최대 3개의 인테리어 회사에 상담 신청이 가능합니다.");
                      return e;
                    }
                    e.selected = !expert.selected;
                    return e;
                  }
                  return e;
              }),
        });
       
        
      }

      doReset(){
        const {experts} = this.state;
        this.setState({
          active : 'off',
          selExperts : [],
          experts: experts.map( 
              e => {
                e.selected = false;
                return e;
            }),
      });
      }


      movePage(){
          const getTimeTable = () => new Promise((resolve, reject) => {
            let experts = this.state.selExperts.map( e => {
                return e.userId;
            });
           
            experts = _.uniq(experts);

            axios.get(`${Util.baseUrl}/concierge/timetable`, {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'},
                params: {
                  experts: experts,
                  kind   : 'timetable',
                },
                responseType:'json',
                timeout: 1000 
              }).then( response => {
              
                    const timetableMap = new Map();

                    for(let i = 1; i <= 5; i++){
                      timetableMap.set(i, response.data.timetable.filter(d => d.dayCode === i ))
                    }

                    
                    this.setState({
                      timetable : timetableMap,
                    })
                   
                   resolve(true);
                },

                error => { console.log(error); reject(error) }
              );
          
          });

          const mv = () => new Promise((resolve, reject) => {
              localStorage.timetable =  JSON.stringify(Array.from(this.state.timetable.entries()));
              let {history, location} = this.props;

              let pathname = '';
              if(localStorage.userInfo && localStorage.userInfo != '{}'){
                  pathname = '/consulting/timetable';
              }else{
                  localStorage.currentHeaderPage = 5;
                  pathname = '/user/signIn';
              }
              history.push({
                  pathname:pathname,
                  state: {
                      ...location.state,
                      formData : {
                          ...location.state.formData,
                      },
                      timetable : this.state.timetable
                  },
              })
              resolve(true);
          });

        const mp = async _ =>{
            if(this.state.active === 'on'){
                if(this.state.selExperts.length < 1){
                  return alert("전문가를 1명이상 선택해주세요!");
                }
                await getTimeTable();
                await mv();

            }
        }

        mp();
        
      }

      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
      };

      handleClick = () => {
        this.setState({ open: true });
      };

      moreClick = () => {
        this.setState({more: 'off'});
      }
    render() {
        return (
          <Media query="(max-width: 1146px)"> 
            {
              m => m 
              ? (<>
                
                  <div style={{paddingTop:'20px'}}>
                    <MidTitle type="expert" text="맞춤 전문가(회사)를 추천 드립니다."  style={{fontSize:'19px'}} />
                    <SmallTitle type="expert" text="기입한 정보에 기반하여 최적의 전문가를 순서대로 보여줍니다." style={{marginTop:'5px', fontSize: '10px'}}    />
                    <SmallTitle type="expert" text="최대 3개의 인테리어회사와 상담신청이 가능합니다." style={{marginTop:'0px', fontSize: '10px'}}  />
                  </div>

                  
                  <MobleContentBox more={this.state.more}>
                  {
                  this.state.experts.map((expert, index)=> 
                    <ExpertCard 
                      style={{display:'box'}}
                      key={index}  
                      id={expert.userId}
                      title={expert.businessName}
                      subTitle={expert.title}
                      img={expert.portfolioPhotos}
                      logo={expert.profileImage}
                      mainSpecialty={expert.mainSpecialty}
                      career={expert.career}
                      businessType={expert.businessType}
                      availableArea={expert.availableArea}
                      selected = {expert.selected}
                      timetable = {expert.timetable}
                      onClick={ e => this.handleActiveChange(expert, e)}
                      type={"M"}
                      device = "Mobile"
                    />
                  )
                }  
                
                 
                </MobleContentBox>
                <MoreBtn more={this.state.more}  device = "mobile"  onClick={ e => this.moreClick()}>추천 전문가 더보기</MoreBtn>
                <QuickMenu motion = {this.state.motion}>
                  <div style={{width:'320px', margin: '0 auto', marginTop:'14px',}}>
                    <Reset  
                      onClick={ _ => this.doReset()}><img src='/img/concierge/reset.jpg'/></Reset> 
                    <Choose  active={this.state.active}
                      onClick={ _ => this.movePage()}><B  active={this.state.active}>선택완료</B>(현재 선택한 회사 {this.state.selExperts.length}개)</Choose>
                  </div>
                 </QuickMenu>
                </>) 
              :(<div><div >
                <div style={{paddingTop:'40px'}}>
                  <MidTitle text="맞춤 전문가(회사)를 추천 드립니다." />
                </div>
                <div style={{marginTop:'20px'}}>
                  <SmallTitle text="기입한 정보에 기반하여 최적의 전문가를 순서대로 보여줍니다."    />
                  <SmallTitle text="최대 3개의 인테리어회사와 상담신청이 가능합니다."  />

        

                </div>
                
                <ContentBox more={this.state.more}>
          
                  {
                  this.state.experts.map((expert, index)=>
                    <ExpertCard 
                      key={index}  
                      id={expert.userId}
                      title={expert.businessName}
                      subTitle={expert.title}
                      img={expert.portfolioPhotos}
                      logo={expert.profileImage}
                      mainSpecialty={expert.mainSpecialty}
                      career={expert.career}
                      businessType={expert.businessType}
                      availableArea={expert.availableArea}
                      selected = {expert.selected}
                      timetable = {expert.timetable}
                      onClick={ e => this.handleActiveChange(expert, e)}
                      type={"M"}
                    />
                  )
                  
                }  
  
                </ContentBox>
                <MoreBtn more={this.state.more}   onClick={ e => this.moreClick()}>추천 전문가 더보기</MoreBtn>
               
                
              </div>
                <div style={{width: '100%', height:'180px', display: 'inline-grid'}}>
                    
                    <BttonBox>
                      
                      <CButton onClick={ _ => {
                              let {history, location} = this.props
                          
                              history.push({
                              pathname:'/concierge/priority',
                              state: {
                                  formData : { 
                                      ...location.state.formData,
                                      experts : this.state.selExperts,
                                  }
                              }
                              })
                          }     
                          }>이전으로</CButton>
                          
                          <CButton active={this.state.active}
                        
                          onClick={ _ => this.movePage()}
                          >다음으로 </CButton>                  
                    
                    </BttonBox>
                </div>
              </div>
              
              )

              
            }
          </Media>


        );
      }
    }



export default Experts;


const ContentBox = styled.div`
  width: 984px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 37px;
  position : relative;
  ${p => p.more === 'on' && `
    height: 1200px;
    overflow: hidden;
`}
`;

const MobleContentBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content : flex-start;
  align-items: center;
  flex-direction: column;
  text-align:center;
  padding-bottom: 40px;
  ${p => p.more === 'on' && `
  height: 3200px;
  overflow: hidden;
`}
`;

const BttonBox = styled.div`
  width: 456px;
  height: 60px;
  margin: 0 auto;
  margin-top: 70px;
  padding-bottom: 50px;
`;

const QuickMenu = styled.div`
  width: 100%;
  height: 62px;
  background-color:#555555;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  -webkit-transition: bottom .5s;
  -moz-transition: bottom .5s;
  transition: bottom .5s;
  z-index: 1000;
  ${p => p.motion === 'down' && `
    bottom: -70px;
`}
`;

const Reset = styled.div`
  width: 34px;
  height: 34px;
  background-color: #555555;
  float: left;

`;

const Choose = styled.div`
  width: 268px;
  height: 36px;
  line-height: 35px;
  float: left;
  margin-left: 15px;
  background-color: #ffe20c;
  
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  color: rgba(27, 27, 27, 0.7);
  ${p => p.active === 'off' && `
    background-color: #ebebeb;
    color: rgba(189, 189, 189, 0.9);
  
  `}
`;

const B = styled.b`
  font-size: 16px;
  font-weight: bold;
  color: rgba(27, 27, 27, 0.9);
  ${p => p.active === 'off' && `
  color: rgba(189, 189, 189, 0.9);

`}
`;


const MoreBtn = styled.div`
  width: 206px;
  height: 58px;
  border: 1px solid #979797;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  line-height: 58px;
  color: rgba(27,27,27,0.7);
  margin 0 auto;
  margin: 0 10px;
  cursor: pointer;
  background-color: #ffffff;
  color: rgba(27,27,27,0.9);
  margin: 0 auto;
 margin-top: 30px;
 ${p => p.device === 'mobile' && `
 width: 180px;
 height: 52px;
 font-size: 17px;
 line-height: 52px;
`}
  ${p => p.more === 'off' && `
    display: none;
`}
`;

