import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createMemoryHistory, createBrowserHistory, initialPath} from 'history'
const mount = (el, {onNavigate,defaultHistory}) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    })
    history.listen(onNavigate)
    ReactDOM.render(
        <App history={history}/>,
        el
    )
    return {
        onParentNavigate({pathname:nextPathname}){ //on order to detect container navigation changes
            const {pathname} = history.location
            if(pathname !== nextPathname){
                history.push(nextPathname);
            }
        }
    }
}


if(process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector("#_marketing-dev-root");
    if(devRoot){
        mount(devRoot,{defaultHistory:createBrowserHistory()})
    }
}
export {mount}