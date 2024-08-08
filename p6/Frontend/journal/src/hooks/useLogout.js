import { useAuthContext} from './useAuthContext'
import { useChapterContext } from './useChapterContext'

export const useLogout=()=>{

    const {dispatch}=useAuthContext()
    const{ dispatch: chapterDispatch } = useChapterContext()
    const logout =()=>{
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        chapterDispatch({type: 'SET_CHAPTERS', payload: null})
    }

    return {logout}
}