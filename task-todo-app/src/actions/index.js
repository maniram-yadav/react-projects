import * as Types from './types';

export const addTodo=(todo)=>{
    return {
        type:Types.ADD_TODO,
        payload:todo
    }
}

export const fetchTodo=()=>{
    return {
        type:Types.GET_TODO
        }
}

export const updateTodo=(todo,todoid)=>{
    console.log(todo);
    return {
        type:Types.UPDATE_TODO,
        payload:todo,
        id:todoid
    }
}

export const deleteTodo=(todoid)=>{
    return {
        type:Types.DELETE_TODO,
        id:todoid
    }
}


export const editData=(payload,editid)=>{
    console.log(payload);
    return {
        type:Types.EDIT_DATA,
        id:editid,
        update:true,
        payload:payload
    }
}


export const updateEdit=(edit)=>{
    return {
        type:Types.EDIT,
        edit:edit
    }
}