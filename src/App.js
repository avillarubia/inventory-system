import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
import NotFound from './views/notFound';
import Navbar from './components/navbar';
import { getCurrentUser } from './services/auth';

const LazyLogin = lazy(() => import('./views/login'));
const LazyRegister = lazy(() => import('./views/register'));
const LazyDashboard = lazy(() => import('./views/dashboard'));
const LazyProfile = lazy(() => import('./views/profile'));

function App() {
  const [user, setUser] = useState()
  const [file, setFile] = useState()

  const history = useHistory()

  useEffect(() => {
    const _user = getCurrentUser()
    setUser(_user)

    if (user) {
      history.push('/')
    }

    else if (window.location.href.includes('login')) {
      history.push('/login')
    }

    else {
      if (!_user) {
        history.push('/register')
      }
    }
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {
        user &&
        <Navbar file={file} />
      }
      <Switch >
        <Route path='/login' component={LazyLogin}></Route>
        <Route path='/register' component={LazyRegister}></Route>
        <Route path='/profile' render={() => <LazyProfile file={file} setFile={setFile} />}></Route>
        <Route exact path='/' component={LazyDashboard}></Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Redirect to='/not-found' />
      </Switch>
    </Suspense>
  );
}

export default App;
