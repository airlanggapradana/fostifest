import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {TanstackQueryProvider} from "@/utils/QueryProvider.tsx";
import AuthLayout from "@/components/AuthLayout.tsx";
import Login from "@/routes/Login.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TanstackQueryProvider>
        <Routes>
          <Route path={'/'} element={<App/>}/>

          <Route element={<AuthLayout/>}>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register'} element={<div>Register</div>}/>
          </Route>
        </Routes>
      </TanstackQueryProvider>
    </BrowserRouter>
  </StrictMode>,
)
