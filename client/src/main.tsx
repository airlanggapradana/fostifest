import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {TanstackQueryProvider} from "@/utils/QueryProvider.tsx";
import AuthLayout from "@/components/AuthLayout.tsx";
import Login from "@/routes/Login.tsx";
import Register from "@/routes/Register.tsx";
import {AnimatePresence} from 'framer-motion';
import RegisterCompetition from "@/routes/register-competition.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TanstackQueryProvider>
        <AnimatePresence mode={'sync'} initial={true}>
          <Routes>
            <Route path={'/'} element={<App/>}/>

            <Route element={<AuthLayout/>}>
              <Route path={'/login'} element={<Login/>}/>
              <Route path={'/register'} element={<Register/>}/>
            </Route>
            
            <Route path={'/register-competition/:competitionId'} element={<RegisterCompetition/>}/>
          </Routes>
        </AnimatePresence>
      </TanstackQueryProvider>
    </BrowserRouter>
  </StrictMode>,
)
