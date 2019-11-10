import * as Types from '../actions/types';
import { combineReducers } from 'redux';


const editInitState=false;

const initEditData={
    type:Types.EDIT_DATA,
    id:null,
    update:false,
    payload:{
        taskname:'',
        username:''
    }

    
}
const todoReducer=(state=[],action)=>{
    console.log(state);
    switch(action.type){
        case Types.ADD_TODO:
            return [...state,action.payload];
        case Types.UPDATE_TODO:
            state=state.map(load=>load.id===action.id?action.payload:load);
            return [...state];
        case Types.DELETE_TODO:
            return state.filter(load=>load.id!==action.id);
        case Types.GET_TODO:
            return [...state];
        default :
           return  [...state];
    }
}

const editReducer=(state=initEditData,action)=>{
    if(action.type===Types.EDIT_DATA){
        // state.id=action.id;
        // state.payload=action.payload;
        return {...state,id:action.id,payload:action.payload};
    }
    // state.id=90;
    // let  payload={taskname:'done',username:'User',id:90};
    // state.payload=payload;
    return {...state};

}

const editFlag = (state=editInitState,action)=>{
    console.log(action);
    if(action.type===Types.EDIT){
        return action.edit;
    }
    return state;
}
export default combineReducers({
    todo:todoReducer,
    edit:editReducer,
    isedit:editFlag
})