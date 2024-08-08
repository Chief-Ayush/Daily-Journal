import { createContext, useReducer } from "react";

export const ChapterContext=createContext()

export const chapterReducer=(state,action)=>{
    switch(action.type){
        case 'SET_CHAPTERS':
            return{
                chapters:action.payload
            }
        case 'CREATE_CHAPTER':
            return{
                chapters: [action.payload, ...state.chapters]
            }
        case 'DELETE_CHAPTER':
            return{
                chapters: state.chapters.filter((w)=> w._id!==action.payload._id)
            }
        default:
            return state
    }
}

export const ChapterContextProvider=({children})=>{
    const [state, dispatch]= useReducer(chapterReducer,{
        chapters:null
    })

    
    return(
        <ChapterContext.Provider value={{...state, dispatch}}>
            {children}
        </ChapterContext.Provider>
)
}