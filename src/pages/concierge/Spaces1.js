import React, { useEffect, useReducer } from 'react';
import { BigTitle, MidTitle, ConciergeCard, Button } from 'components';
import styled from 'styled-components';
import Util from  './../../lib/Util';
import Media from 'react-media';

const initialState = {
  active : 'off',
  cards : Util.spaces1.map(
    c => {
        c.selected = false;
      return c;
    }),
  spaces : {
    category : '',
    space : '',
    subcategory : '',
  },
  cardIds : {
    category : '',
    space : '',
    subcategory : '',
  },
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
    default: {
      throw new Error(`unexpected action.type: ${action.type}`)
    }
  }
}

const Spaces1 = (props) => {


  const [state, dispatch] = useReducer(reducer, initialState)

  
  useEffect(() => {
    if(!props.location.state)  { return false;}
    if(!props.location.state.formData) { return false;}
    if(!props.location.state.formData.spaces) { return false;}
    if(!props.location.state.formData.spaces.category) { return false;}

    const spaces = props.location.state.formData.spaces;
    const cardIds = props.location.state.formData.cardIds;
    const cards = state.cards.map(
      c => {
        if (c.id === props.location.state.formData.cardIds.category) {
          c.selected = true;
        } else {
          c.selected = false;
        }
        return c;
      });
   
    updateSpaces(spaces);
    updateCardIds(cardIds);
    updateCards(cards);
    updateActive('on');

  }, []);



  const updateSpaces = (spaces) => dispatch({ type: 'updateSpaces', spaces: spaces });
  const updateCardIds = (cardIds) => dispatch({ type: 'updateCardIds', cardIds: cardIds });
  const updateCards = (cards) => dispatch({ type: 'updateCards', cards: cards })
  const updateActive = (active) => dispatch({ type: 'updateActive', active: active })

  const handleActiveChange = (card, e) => {

    e.preventDefault();
    const cards = state.cards.map(
      c => {
        if (c.id === card.id) {
          c.selected = true;
        } else {
          c.selected = false;
        }
        return c;
      });
    const spaces = {
      ...state.spaces,
      category: card.value,
    } 
    const cardIds = {
      ...state.cardIds,
      category: card.id,
    } 
    updateCards(cards);
    updateActive('on');
    updateSpaces(spaces);
    updateCardIds(cardIds);

  }

  const movePage = _ => {

    console.log(state);
    return false;

    if(state.active === 'on'){
        let {history, location} = props
        if(!location.state){
            location.state = {
                formData : {},
            }
        }

        const preLocalStorageFormData = JSON.parse( '{}') ;
        localStorage.formData =  JSON.stringify(
            {
                ...preLocalStorageFormData,
                spaces : state.spaces,
                cardIds : state.cardIds,
                specialty : {
                    main : 'interior'
                },
                status : 'koreaBuild'
            }
        )


        history.push({
            pathname:'/concierge/spaces2',
            state: {
                formData : {
                    ...location.state.formData,
                    spaces : state.spaces,
                    cardIds : state.cardIds,
                    specialty : {
                        main : 'interior'
                    },
                    status : 'koreaBuild'
                }
            }
        })
    }

  }

  return (
    <div>

        <Media query="(max-width: 1146px)">
           {matches =>
              matches ? (

               <MobilePage>
                  <div>
                    <BigTitle text="공간유형 선택" type="B"/>
                    <MidTitle text="컨설팅이 필요한 공간을 선택해 주세요." type="B" />
                  </div>

                      <MoblileContentBox >
                          <ConciergeCard id={state.cards[0].id} title={state.cards[0].title} subTitle={state.cards[0].subTitle} img={state.cards[0].imgSrc} selected={state.cards[0].selected} onClick={(e) => handleActiveChange(state.cards[0], e)} type={"S"}/>
                          <ConciergeCard id={state.cards[1].id} title={state.cards[1].title} subTitle={state.cards[1].subTitle} img={state.cards[1].imgSrc} selected={state.cards[1].selected} onClick={(e) => handleActiveChange(state.cards[1], e)} type={"S"}/>
                      </MoblileContentBox>
                      <MoblileContentBox style={{marginTop:10}}>
                        <ConciergeCard id={state.cards[2].id} title={state.cards[2].title} subTitle={state.cards[2].subTitle} img={state.cards[2].imgSrc} selected={state.cards[2].selected} onClick={(e) => handleActiveChange(state.cards[2], e)} type={"S"}/>
                        <UnusefulCard />
                      </MoblileContentBox>

                  <div>
                    <BttonBox type="S">
                        <Button type="S"
                        onClick={
                             e =>{
                               let {history} = props;
                               history.push('/')
                             }
                           }
                        >이전으로</Button>
                        <Button type="S" active={state.active}

                          onClick={_ => {movePage()}
                        }
                        >다음으로 </Button>
                      </BttonBox>
                   </div>
               </MobilePage>

           ) : (
             <Page>
            <div style={{margin:'0 auto'}}>
              <BigTitle text="공간유형 선택" />
              <MidTitle text="컨설팅이 필요한 공간을 선택해 주세요." />
            </div>

            <ContentBox>
              {
                state.cards.map((card, index)=>
                  <ConciergeCard
                    key={index}
                    id={card.id}
                    title={card.title}
                    img={card.imgSrc}
                    subTitle={card.subTitle}
                    selected={card.selected}
                    type={"M"}
                    onClick={ e => handleActiveChange(card, e)}
                  />
                )
              }
            </ContentBox>
            <div  style={{margin:'0 auto',paddingBottom:"250px"}}>
            <BttonBox>
                <Button
                        onClick={
                            e =>{
                                let {history} = props;
                                history.push('/')
                            }
                        }
                >이전으로</Button>
                <Button active={state.active}
                    onClick={_ => {movePage()}}
                >다음으로 </Button>
             </BttonBox>
             </div>

            </Page>
           )
        }
        </Media>
        
    </div>

  );
};

export default Spaces1;


    
const ContentBox = styled.div`
 
height: 330px;
margin: 0 auto;
margin-top: 170px;
`;

const MoblileContentBox = styled.div`
  margin-top: 15px;
  display:flex;
  flex-direction:row;
  justify-content : center;
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
 flex-wrap: wrap;
 
 justify-content : flex-start;
 align-item:center;
 height:${p => `
   ${p.height}px;
`}
`;

const UnusefulCard = styled.div`
  width: 156px;
  height: 204px;
  margin-left: 7px;
  @media only screen and (max-width: 320px) {
    margin-left: 1px;
  }
`;

const MobilePage = styled.div`
  

@media only screen and (max-width: 320px) {
 
}
`

