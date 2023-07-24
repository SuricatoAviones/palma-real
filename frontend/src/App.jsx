
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './paginas/Auth/Login'

import Dashboard from './paginas/Dashboard/Dashboard'

import RutaProtegida from './layout/RutaProtegida'



function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path= "/" element = {<AuthLayout />}>
            <Route index element = {<Login />} />
        </Route>
        <Route path='/admin' element={<RutaProtegida />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
