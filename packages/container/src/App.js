import React, {lazy,Suspense,useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Progress from './components/progress'
import { StylesProvider,createGenerateClassName} from '@material-ui/core'

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
    productionPrefix:'co'
})

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header isSignedIn={isSignedIn}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignOut={()=> setIsSignedIn(false)} onSignIn={()=> setIsSignedIn(true)}/>
                            </Route>
                            <Route path="/">
                                <MarketingLazy/>
                            </Route>
                        </Switch>
                    </Suspense>
                </div> 
            </BrowserRouter>
        </StylesProvider>)
}