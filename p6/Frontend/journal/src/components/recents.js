import { useEffect} from 'react'
import ChapterDetails from './chapterDetails'
import NewChapter from './newChapter'
import { useChapterContext } from '../hooks/useChapterContext'
import {useAuthContext} from '../hooks/useAuthContext'


const Recents=()=>{
    const {chapters,dispatch}=useChapterContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchChapters = async()=>{
            const response = await fetch("/chapter", {
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_CHAPTERS', payload:json})
            }
        }

        if(user){
            fetchChapters()
        }
        
    }, [dispatch,user])
    return(
        <div className="recents">
            
            <div className="chapters">
            <h2>Recents</h2>
                {chapters && chapters.map((chapter)=>(
                    <ChapterDetails key={chapter.id} chapter={chapter} />
                ))}
            </div>
            <NewChapter />
        </div>
    )
}
export default Recents