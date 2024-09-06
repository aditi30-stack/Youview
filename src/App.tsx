
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Body } from './Components/Body';
import { Provider } from './functionality/toggle';
import { Error } from './Components/Error';
import { WatchPage } from './Components/WatchPage';
import { Layout } from './Components/Layout';
import { SingleVideo } from './Components/SingleVideo';


const router = createBrowserRouter([{
  element: <Layout/>,
  errorElement: <Error/>,
  children: [{
    path: '/',
    element: <Body/>
  }, {
    path: '/watch',
    element: <WatchPage/>
  }, {
    path: '/:query',
    element: <SingleVideo/>
  }]
}])


function App() {
  return (
    
    <Provider>
    <RouterProvider router={router}/>

    </Provider>
    
   
  )
}

export default App;
