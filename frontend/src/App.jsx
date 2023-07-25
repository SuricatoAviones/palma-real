
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './paginas/Auth/Login'

import Dashboard from './paginas/Dashboard/Dashboard'

import RutaProtegida from './layout/RutaProtegida'
import Deportes from './paginas/Deportes/Deportes'
import Deportistas from './paginas/Deportistas/Deportistas'
import Churuatas from './paginas/Churuatas/Churuatas'
import Socios from './paginas/Socios/Socios'
import Locales from './paginas/Locales/Locales'
import Entradas from './paginas/Entradas/Entradas'





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
          <Route path="deportes" element={<Deportes/>} />
          <Route path="deportistas" element={<Deportistas/>} />
          <Route path="socios" element={<Socios/>} />
          <Route path="locales" element={<Locales/>} />
          <Route path="entradas" element={<Entradas/>} />
          <Route path="churuatas" element={<Churuatas/>} />
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
