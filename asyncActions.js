const redux=require('redux')
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios=require('axios')
const initialState={
    loading:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE= 'FETCH_USERS_FAILURE'

//action creators

const fetchUsersRequest=()=>{
    return{
      type:FETCH_USERS_REQUEST  
    }
}

const fetchUsersSuccess=users=>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure=error=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}


//reducers

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCESS:
            return{
                ...state,
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USERS_FAILURE:
            return{
                ...state,
                loading:false,
                users:[],
                error:action.payload
            }

    }
}


//async action creator

const fetchUsers=()=>{
    return function(dispatch){   //thunk middleware
        dispatch(fetchUsersRequest)
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res=>{
                const users=res.data.map(e=>e.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(err=>{
                console.log(err.message)
                dispatch(fetchUsersFailure(err.message))
            })   
    }
}

const store=redux.createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchUsers())