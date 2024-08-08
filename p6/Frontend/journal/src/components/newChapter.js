import {useState} from 'react'
import { useChapterContext } from '../hooks/useChapterContext'
import { useAuthContext } from '../hooks/useAuthContext'

const NewChapter=()=>{
    const{dispatch} =useChapterContext()
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [error,setError]=useState(null)
    const [emptyfield,setEmptyfield]=useState([])
    const{ user } = useAuthContext()

    const handleSubmit=async (e)=>{
        e.preventDefault()

        if(!user){
            setError("You must be logged in")
            return
        }

        const chapter={title,content}
        const response = await fetch('/chapter',{
            method: 'POST',
            body: JSON.stringify(chapter),
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyfield(json.emptyfield)
        }else{
            setTitle('')
            setContent('')
            setError(null)
            dispatch({type: 'CREATE_CHAPTER',payload: json})
        }
        
        
        
    }
    return(
        <form className='new-chapter' onSubmit={handleSubmit}>
            <h3>Write your new Chapter</h3>
            
            <textarea
                id='title'
                type='text'
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
                placeholder='Chapter Name'
                className={emptyfield.includes('title')? 'error':''}
                >
            </textarea>

            <textarea
                id='content'
                type='text'
                onChange={(e)=>setContent(e.target.value)}
                value={content}
                placeholder="What's on your mind?"
                className={emptyfield.includes('content')? 'error':''}
                >
            </textarea>
            
            <button>Done</button>
            {error && <div className='error'>{error}</div>}
        </form>

    )
}
export default NewChapter