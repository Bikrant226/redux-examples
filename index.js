const redux=require('redux')
const BUY_CAKE='BUY_CAKE'
const BUY_CHIPS='BUY_CHIPS'
//action creator is a function that returns an action
//here buyCake() is an action creator
function buyCake(){
    return{
        //defining an action(action is an object that has type property)
        type:BUY_CAKE,
        desc:'First redux action'
    }
}

function buyChips(){
    return {
        type:BUY_CHIPS,
        desc:'Second redux action'
    }
}


//reducer takes previous state and action and returns new state
 


const initialCakeState={
    numberOfCakes:50, //initial state of cakes
}


const initialChipsState={
    numberOfChips:50, //initial state of chips
}



const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case 'BUY_CAKE':return{
            ...state, //makes copy of state object
            numberOfCakes:state.numberOfCakes-1
        }
        default:return state
    }
}

const chipsReducer=(state=initialChipsState,action)=>{
    switch(action.type){
        case 'BUY_CHIPS':return{
            ...state, //makes copy of state object
            numberOfChips:state.numberOfChips-1
        }
        default:return state
    }
}



//combining reducers
const rootReducer=redux.combineReducers({
    cake:cakeReducer,
    chips:chipsReducer
})

const combinedStore=redux.createStore(rootReducer)

console.log('Initial State:',combinedStore.getState())

const unsubscribe=combinedStore.subscribe(()=>{
    console.log('Updated state:',combinedStore.getState())
})


combinedStore.dispatch(buyChips())
combinedStore.dispatch(buyCake())
combinedStore.dispatch(buyChips())
combinedStore.dispatch(buyCake())

unsubscribe()