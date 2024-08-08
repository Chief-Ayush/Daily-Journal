import { useChapterContext } from "../hooks/useChapterContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ChapterDetails=({chapter})=>{
    
    const{ dispatch }=useChapterContext()
    const{ user }=useAuthContext()

    const deleteChapter=async ()=>{
        if(!user){
            return
        }

        const response= await fetch('/chapter/' + chapter._id ,{
            method: 'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_CHAPTER', payload: json})
        }
    }
    return(
        <div className="chapter-details">
            <h4>{chapter.title}</h4>
            <p id="content-details">{chapter.content}</p>
            <p id="time">{formatDistanceToNow(new Date(chapter.createdAt),{addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={deleteChapter}>delete</span>
        </div>
    )
}

export default ChapterDetails