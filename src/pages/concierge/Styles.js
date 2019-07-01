import React, { Component } from 'react';
import { BigTitle, MidTitle, ConciergeCard, Button } from 'components';
import Util from  './../../lib/Util';
import styled from 'styled-components';
import Media from 'react-media';
import _ from 'lodash';

const ContentBox = styled.div`
  width: 984px;
  min-height: 440px;
  height: auto;
  margin: 0 auto;
  margin-top: 40px;
`;

const MoblileContentBox = styled.div`
    margin-top: 15px;
    display:flex;
    flex-direction:row;
    justify-content : center;
    @media only screen and (max-width: 320px) {
      margin-top: 5px;
    }
`;

const BttonBox = styled.div`
  width: 456px;
  height: 60px;
  margin: 0 auto;
  margin-top: 8em;
  margin-bottom: 8em;
  padding-top: 1em;
  text-align: center;
  ${p => p.type === 'S' && `
     width: 260px;
     height: 40px;
     margin-top: 43px;
     margin-bottom: 43px;
  `}
`;

const Page = styled.div`
   display:flex;
   flex-direction:column;
   justify-content : flex-start;
   align-item:center;
   height : ${window.innerHeight}
`;
const MobilePage = styled.div`
   display:flex;
   flex-direction:column;
   justify-content : flex-start;
   align-item:center;
   height:${p => `
     ${p.height}px
  `}
`;
const UnusefulCard = styled.div`
    width: 156px;
    height: 146px;
    margin-left: 0.75em;
    margin-right: 0.75em;
    @media only screen and (max-width: 320px) {
      margin-left: -0.5em;
      margin-right: 0.5em;
      width: 140.4px;
      height: 126.36px;
    }
    @media only screen and (min-width: 321px) and (max-width: 411px) {
      margin-left: -5px;
      margin-right: 1em;
    }
`;

const Mobile320HeaderBox = styled.div`
    margin-top : 30px;
    @media only screen and (max-width: 320px) {
      margin-bottom:15px;
    }
`
const SubTitle = styled.p`
   text-align: center;
   margin : 6px 0 0 0;
   color: rgba(128, 128, 128, 0.7);
   letter-spacing: 1px;
   ${p => p.device === 'pc' && `
    font-size: 20px;
`}
`;


class Styles extends Component {
    state = {
        active : 'off',
        cards : Util.style,
        style : [],
    }
    moveInit(){
      let { history } = this.props
      history.push({
        pathname: '/concierge',
      })
  }
    componentDidMount(){
    
        if(!this.props.location.state)  {this.moveInit(); return false;}
        if(!this.props.location.state.formData.style)  { return false;}
       
        const style = this.props.location.state.formData.style;
    
        if(!style.length) return false;
        this.setState({
          active : 'on',
          style  : style,
          cards: this.state.cards.map(
            c => {
              if (style.indexOf(c.id) > -1) {
                c.selected = true;
              } else {
                c.selected = false;
              }
              return c;
            }),
         })
  
      }

    handleActiveChange = (id, e) => {
        e.preventDefault();
        const cards  = this.state.cards;
        this.setState({
            cards: cards.map(
                c => {
                    const style = this.state.style;
                    if(c.id === id){
                        if(c.selected){
                            this.setState({
                                style: style.filter(st => st !== id)
                              })
                              
                        if(this.state.style.length < 2) {
                            this.setState({
                                active:  'off',
                              })
                        }
                        }else{
                            style.push(c.id)
                            this.setState({
                                active:  'on',
                              })
                          
                        }
                        c.selected = !c.selected ;
                    
                       
                    }
                    return c;
                })

        });
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
                    style : this.state.style
                }
            )


            history.push({
                pathname:'/concierge/priority',
                state: {
                    formData : {
                        ...location.state.formData,
                        style : this.state.style
                    }
                }
            })
        }

    }



    render() {

        return (
          <Media query="(max-width: 1146px)">
            {
              m=> m
              ?(<MobilePage >
                   <div>
                  
                      <Mobile320HeaderBox>
                        <MidTitle text="인테리어하는 공간의" type="StylesB"/>
                        <MidTitle text="스타일을 선택해 주세요." type="StylesB"/>
                        <SubTitle>(복수 선택 가능)</SubTitle>
                      </Mobile320HeaderBox> 
                        
                   </div>

                   <div>
                      {
                        _.chunk(this.state.cards,2).map(
                          card2 => (
                            card2.length >= 2 
                            ? (<MoblileContentBox>
                               {
                                 card2.map((card, index)=>
                                   <ConciergeCard 
                                     type = 'Styles_s'
                                     key={index} 
                                     id={card.id}
                                     title={card.title}
                                     img={card.imgSrc}
                                     subTitle={card.subTitle}
                                     selected={card.selected}
                                     onClick={ e => this.handleActiveChange(card.id, e)}
                                   />
                               )
                               }
                              </MoblileContentBox>)
                            : (<MoblileContentBox>
                                 <ConciergeCard 
                                   type = 'Styles_s'
                                   id={card2[0].id}
                                   title={card2[0].title}
                                   img={card2[0].imgSrc}
                                   subTitle={card2[0].subTitle}
                                   selected={card2[0].selected}
                                   onClick={ e => this.handleActiveChange(card2[0].id,e)}
                                 />
                                 <UnusefulCard />
                               </MoblileContentBox>)
                          )  
                       )
                      }
                   </div>

                   <div>
                   <BttonBox type="S">
                   <Button type="S" onClick={ _ => {
                       let {history, location} = this.props
                     
                       history.push({
                         pathname:'/concierge/budget',
                         state: {
                           formData : { 
                               ...location.state.formData,
                               style : this.state.style
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
              :(<Page > 
                <BigTitle text="인테리어 하는 공간의 스타일을 선택해주세요." />
                <SubTitle device='pc'>(복수 선택 가능)</SubTitle>
                <div>
                <ContentBox>
                  { 
                    this.state.cards.map((card, index)=>
                      <ConciergeCard 
                        key={index} 
                        id={card.id}
                        title={card.title}
                        subTitle={card.subTitle}
                        selected={card.selected}
                        img={card.imgSrc}
                        type={"L"} 
                        onClick={ e => this.handleActiveChange(card.id, e)}
                      />
                    )
                  }
                </ContentBox>
                </div>
                <div>
                <BttonBox>
                    <Button onClick={ _ => {
                        let {history, location} = this.props
                      
                        history.push({
                          pathname:'/concierge/budget',
                          state: {
                            formData : { 
                                ...location.state.formData,
                                style : this.state.style
                            }
                          }
                         })
                      }     
                    }>이전으로</Button>
                    <Button active={this.state.active}

                        onClick={_ => {this.movePage()}}
                    >다음으로 </Button>
                </BttonBox>
                </div>
            </Page>)
            }
          </Media>
        );
    }
}



export default Styles;
