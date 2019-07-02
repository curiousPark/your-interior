import React, { useEffect, useReducer } from 'react';
import { BigTitle, MidTitle, ConciergeTextCard, Button } from 'components';
import styled from 'styled-components';
import Util from "../../lib/Util";
import Media from 'react-media';
import _ from 'lodash';

const initialState = {
  active : 'off',
  cards : [],
  parentTitle : '',
}

const reducer = (state, action) => {
 
  switch (action.type) {
    case 'reset': {
      return initialState
    }
    case 'updateSpaces': {
      return { ...state, spaces: action.spaces }
    }
    case 'updateCardIds': {
      return { ...state, cardIds: action.cardIds }
    }
    case 'updateCards': {
      return { ...state, cards: action.cards }
    }
    case 'updateActive': {
      return { ...state, active: action.active }
    }
    case 'updateParentTitle': {
      return { ...state, parentTitle: action.parentTitle }
    }


    default: {
      throw new Error(`unexpected action.type: ${action.type}`)
    }
  }
}

const Spaces2 = (props) => {


  const [state, dispatch] = useReducer(reducer, initialState)

  const moveInit = () => {
    let { history } = props
    history.push({
      pathname: '/concierge',
    })
}

  const updateSpaces = (spaces) => dispatch({ type: 'updateSpaces', spaces: spaces });
  const updateCardIds = (cardIds) => dispatch({ type: 'updateCardIds', cardIds: cardIds });
  const updateCards = (cards) => dispatch({ type: 'updateCards', cards: cards })
  const updateActive = (active) => dispatch({ type: 'updateActive', active: active })
  const updateParentTitle = (parentTitle) => dispatch({ type: 'updateParentTitle', parentTitle: parentTitle })
 
  const getPostData = () => {
    if(!props.location.state)  {moveInit(); return false;}
        
         
    const cardIds = props.location.state.formData.cardIds;
    
    const parentId = cardIds.category
    const parentTitle = Util.spaces1.filter(card => card.id === parentId)[0].title;
    const cards = Util.spaces2.filter(card => card.parentId === parentId).map(
      c => {
        if (c.id === props.location.state.formData.cardIds.space) {
          c.selected = true;
        } else {
          c.selected = false;
        }
        return c;
      });

    updateSpaces(props.location.state.formData.spaces);
    updateCardIds(cardIds);
    updateCards(cards);
    updateActive(props.location.state.formData.spaces.space ? 'on' : 'off');
    updateParentTitle(parentTitle);
    
  }
  
  useEffect(() => {
    getPostData()
 
  }, []);

  
  

  const handleActiveChange = (card, e) => {
    e.preventDefault();

    const cards  = state.cards.map( 
      c => {
        if(c.id === card.id){
          c.selected = true;
        }else{
          c.selected = false;
        }
        return c;
    });

    const spaces = {
      ...state.spaces,
      space: card.value,
    } 
    const cardIds = {
      ...state.cardIds,
      space: card.id,
    } 

    updateCards(cards);
    updateActive('on');
    updateSpaces(spaces);
    updateCardIds(cardIds);

  }

  const movePage = () =>{
    if(state.active === 'on'){
        let {history, location} = props
        if(!location.state){
            location.state = {
                formData : {},
            }
        }

        const preLocalStorageFormData = JSON.parse( localStorage.formData ) ;
        localStorage.formData =  JSON.stringify(
            {
                ...preLocalStorageFormData,
                spaces : state.spaces,
                cardIds : state.cardIds,
            }
        )

            console.log(state);
        history.push({
            pathname:'/concierge/spaces3',
            state: {
                formData : {
                    ...location.state.formData,
                    spaces : state.spaces,
                    cardIds : state.cardIds,
                }
            }
        })
    }

}

  return (
    <Media query="(max-width: 1146px)">
    {
      m => m ? (
        <MobilePage>
        <div>
            <BigTitle text="공간유형 선택" type="B" />
            <MidTitle text={state.parentTitle} type="B" />
        </div>
        <div style={{width:"320px",margin:"0 auto"}}>
         {
          _.chunk(state.cards,2).map(
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
                        onClick={ e => handleActiveChange(card, e)}
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
                      onClick={ e => handleActiveChange(card2[0], e)}
                    />
                   
                    {React.cloneElement(
                      <ConciergeTextCard 
                      type = 'M'
                      key= {0} 
                      id={card2[0].id}
                      title={card2[0].title}
                      subTitle={card2[0].subTitle}
                      selected={card2[0].selected}
                      onClick={ e => handleActiveChange(card2[0], e)}
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
             let {history,location} = props
             history.push({
               pathname:'/concierge/spaces1',
               state: {
                 formData : { 
                     ...location.state.formData,
                     spaces : state.spaces,
                     cardIds : state.cardIds,
                 }
               }
             })
           }     
         }>이전으로</Button>
         <Button type="S" active={state.active}

                 onClick={_ => {movePage()}}
         >다음으로 </Button>
       
     </BttonBox>
      </MobilePage>
      ):(
      <Page >
          <div>
            <BigTitle text="공간유형 선택" />
            <MidTitle text={state.parentTitle}  />
      

            {
              state.cards.length <=4 ?
              (
                <ContentBoxLess>
                { 
                  state.cards.map((card, index)=>
                    <ConciergeTextCard 
                      key={index} 
                      id={card.id}
                      title={card.title}
                      subTitle={card.subTitle}
                      selected={card.selected}
                      onClick={ e => handleActiveChange(card, e)}
                    />
                  )
                } 
                </ContentBoxLess>
              ):
              (
                <ContentBox>
            { 
              state.cards.map((card, index)=>
                <ConciergeTextCard 
                  key={index} 
                  id={card.id}
                  title={card.title}
                  subTitle={card.subTitle}
                  selected={card.selected}
                  onClick={ e => handleActiveChange(card, e)}
                />
              )
            } 
            </ContentBox>
              )
            }
            



            <BttonBox style={{paddingBottom:"200px"}}>
                <Button onClick={_ => {
                    let {history,location} = props
                  
                    history.push({
                      pathname:'/concierge/spaces1',
                      state: {
                        formData : { 
                            ...location.state.formData,
                            spaces : state.spaces,
                            cardIds : state.cardIds,
                        }
                      }
                    })
                  }     
                }>이전으로</Button>
                <Button active={state.active}

                        onClick={ _ => {movePage()}}
                >다음으로 </Button>
              
            </BttonBox>
        </div>

      </Page>
      )
    }
  </Media>
  );
};
export default Spaces2;

 

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

