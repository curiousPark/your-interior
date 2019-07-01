import React, { Component } from 'react';
import { BigTitle, MidTitle, ConciergeTextCard, Button } from 'components';
import styled from 'styled-components';
import Util from "../../lib/Util";
import Media from 'react-media';
import _ from 'lodash';


class Spaces2 extends Component {

  

    state = {
        active : 'off',
        cards : [],
        parentTitle : '',
      }

      moveInit(){
        let { history } = this.props
        history.push({
          pathname: '/concierge',
        })
    }
      componentDidMount(){
         if(!this.props.location.state)  {this.moveInit(); return false;}
        
         
         let cardIds = this.props.location.state.formData.cardIds;
         let parentId = cardIds.category
         let parentTitle = Util.spaces1.filter(card => card.id === parentId)[0].title;
      
         let cards = Util.spaces2.filter(card => card.parentId === parentId);

         this.setState({
           spaces : this.props.location.state.formData.spaces,
           cardIds : cardIds,
           active : 'on',
           cards: cards.map(
            c => {
              if (c.id === this.props.location.state.formData.cardIds.space) {
                c.selected = true;
              } else {
                c.selected = false;
              }
              return c;
            }),
            parentTitle : parentTitle,
          })
          if(!this.props.location.state.formData.spaces.space){
            this.setState({
              active : 'off'
            })
          }
      }
     

      handleActiveChange = (card, e) => {
        e.preventDefault();
        const cards  = this.state.cards;
  
        this.setState({
            active : 'on',
            cards: cards.map( 
                c => {
                  if(c.id === card.id){
                    c.selected = true;
                  }else{
                    c.selected = false;
                  }
                  return c;
              }),
    
              spaces: {
                ...this.state.spaces,
                space: card.value,
              },
              cardIds : {
                ...this.state.cardIds,
                space: card.id,
              }
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
                    spaces : this.state.spaces,
                    cardIds : this.state.cardIds,
                }
            )


            history.push({
                pathname:'/concierge/spaces3',
                state: {
                    formData : {
                        ...location.state.formData,
                        spaces : this.state.spaces,
                        cardIds : this.state.cardIds,
                    }
                }
            })
        }

    }

    render() {
        
        return (
          <Media query="(max-width: 1146px)">
            {
              m => m ? (
                <MobilePage>
                <div>
                    <BigTitle text="공간유형 선택" type="B" />
                    <MidTitle text={this.state.parentTitle} type="B" />
                </div>
                <div style={{width:"320px",margin:"0 auto"}}>
                 {
                  _.chunk(this.state.cards,2).map(
                     (card2, i) => (
                       card2.length >= 2 
                       ? (<MoblileContentBox style={{width:"320px"}}key={i}>
                          {
                            card2.map((card, index)=>
                              <ConciergeTextCard 
                                type = 'M'
                                key={index} 
                                id={card.id}
                                title={card.title}
                                subTitle={card.subTitle}
                                selected={card.selected}
                                onClick={ e => this.handleActiveChange(card, e)}
                              />
                          )
                          }
                         </MoblileContentBox>)
                       : (<MoblileContentBox>
                            <ConciergeTextCard 
                              type = 'M'
                              key= {0} 
                              id={card2[0].id}
                              title={card2[0].title}
                              subTitle={card2[0].subTitle}
                              selected={card2[0].selected}
                              onClick={ e => this.handleActiveChange(card2[0], e)}
                            />
                           
                            {React.cloneElement(
                              <ConciergeTextCard 
                              type = 'M'
                              key= {0} 
                              id={card2[0].id}
                              title={card2[0].title}
                              subTitle={card2[0].subTitle}
                              selected={card2[0].selected}
                              onClick={ e => this.handleActiveChange(card2[0], e)}
                              style={{visibility:'hidden'}}
                            />
                            )}
                          </MoblileContentBox>)
                         
                     )  
                  )
                 }
                 </div>
                 <BttonBox type="S">
                 <Button type="S" onClick={_ => {
                     let {history,location} = this.props
                     history.push({
                       pathname:'/concierge/spaces1',
                       state: {
                         formData : { 
                             ...location.state.formData,
                             spaces : this.state.spaces,
                             cardIds : this.state.cardIds,
                         }
                       }
                     })
                   }     
                 }>이전으로</Button>
                 <Button type="S" active={this.state.active}

                         onClick={_ => {this.movePage()}}
                 >다음으로 </Button>
               
             </BttonBox>
              </MobilePage>
              ):(
              <Page >
                  <div>
                    <BigTitle text="공간유형 선택" />
                    <MidTitle text={this.state.parentTitle}  />
              

                    {
                      this.state.cards.length <=4 ?
                      (
                        <ContentBoxLess>
                        { 
                          this.state.cards.map((card, index)=>
                            <ConciergeTextCard 
                              key={index} 
                              id={card.id}
                              title={card.title}
                              subTitle={card.subTitle}
                              selected={card.selected}
                              onClick={ e => this.handleActiveChange(card, e)}
                            />
                          )
                        } 
                        </ContentBoxLess>
                      ):
                      (
                        <ContentBox>
                    { 
                      this.state.cards.map((card, index)=>
                        <ConciergeTextCard 
                          key={index} 
                          id={card.id}
                          title={card.title}
                          subTitle={card.subTitle}
                          selected={card.selected}
                          onClick={ e => this.handleActiveChange(card, e)}
                        />
                      )
                    } 
                    </ContentBox>
                      )
                    }
                    



                    <BttonBox style={{paddingBottom:"200px"}}>
                        <Button onClick={_ => {
                            let {history,location} = this.props
                          
                            history.push({
                              pathname:'/concierge/spaces1',
                              state: {
                                formData : { 
                                    ...location.state.formData,
                                    spaces : this.state.spaces,
                                    cardIds : this.state.cardIds,
                                }
                              }
                            })
                          }     
                        }>이전으로</Button>
                        <Button active={this.state.active}

                                onClick={ _ => {this.movePage()}}
                        >다음으로 </Button>
                      
                    </BttonBox>
                </div>

              </Page>
              )
            }
          </Media>

        );
      }
    }


    const ContentBox = styled.div`
    width: 1072px;
    min-height: 330px;
    height: auto;
    margin: 0 auto;
    margin-top: 170px;
  `;
  
  const ContentBoxLess = styled.div`
  width: 1072px;
  min-height: 330px;
  height: auto;
  margin: 0 auto;
  margin-top: 170px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  `
  
  const MoblileContentBox = styled.div`
      margin-top: 0px;
      display:flex;
      flex-direction:row;
      justify-content : center;
      margin: 0 auto;
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
       margin-top: 43px;
    `}
  `;
  
  const Page = styled.div`
     display:flex;
     flex-direction:column;
     justify-content : flex-start;
     
     height:${p => `
       ${p.height}px;
    `}
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

export default Spaces2;
