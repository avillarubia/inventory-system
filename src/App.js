import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
import NotFound from './views/notFound';
import Navbar from './components/navbar';
import { getCurrentUser } from './services/auth';
import RemoveItemModal from './components/removeItemModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LazyLogin = lazy(() => import('./views/login'));
const LazyRegister = lazy(() => import('./views/register'));
const LazyDashboard = lazy(() => import('./views/dashboard'));
const LazyProfile = lazy(() => import('./views/profile'));

function App() {
  const [user, setUser] = useState()
  const [file, setFile] = useState(null)
  const [item, setItem] = useState({})
  const [items, setItems] = useState([])
  const [rowClicked, setRowClicked] = useState(null)

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
    <Suspense fallback={
      <div className='vh-100 d-flex justify-content-center align-items-center'>Loading...</div>
    }
    >
      <ToastContainer />
      <RemoveItemModal
        item={item}
        setItems={setItems}
        setRowClicked={setRowClicked}
      />
      {
        user &&
        <Navbar
          file={file}

        />
      }

      <Switch >
        <Route path='/login' component={LazyLogin}></Route>
        <Route path='/register' component={LazyRegister}></Route>
        <Route path='/profile' render={() => <LazyProfile file={file} setFile={setFile} />}></Route>
        <Route
          exact path='/'
          render={() =>
            <LazyDashboard
              setItem={setItem}
              items={items}
              setItems={setItems}
              rowClicked={rowClicked}
              setRowClicked={setRowClicked}
            />
          }>
        </Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Redirect to='/not-found' />
      </Switch>
    </Suspense>
  );
}

export default App;
