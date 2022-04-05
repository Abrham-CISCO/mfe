import {mount} from 'auth/AuthApp'
import React, {useRef, useEffect} from 'react'
import { useHistory } from 'react-router-dom';

export default ({onSigninIn}) => {
    const ref = useRef(null);
    const history = useHistory();
    useEffect(()=>{
        const {onParentNavigate} = mount(ref.current,{
            initialPath:history.location.pathname,
            onNavigate:({pathname: nextPathname})=>{ //notice here how destructuring and renaming is done
                const {pathname} = history.location;
                if(pathname !== nextPathname){
                    history.push(nextPathname)
                }
            },
            onSigninIn:() => {
                onSigninIn();
            }
        })
        history.listen(onParentNavigate)
    },[])
    return <div ref={ref}/>
}