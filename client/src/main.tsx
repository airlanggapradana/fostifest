import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {TanstackQueryProvider} from "@/utils/QueryProvider.tsx";
import AuthLayout from "@/components/AuthLayout.tsx";
import Login from "@/routes/Login.tsx";
import Register from "@/routes/Register.tsx";
import RegisterCompetition from "@/routes/register-competition.tsx";
import RegistrationLayout from "@/components/RegistrationLayout.tsx";
import PaymentSuccess from "@/routes/PaymentSuccess.tsx";
import NotFoundPage from "@/routes/NotFound.tsx";
import ProfileLayout from "@/components/ProfileLayout.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<App/>}/>

          <Route element={<AuthLayout/>}>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register'} element={<Register/>}/>
          </Route>

          <Route element={<RegistrationLayout/>}>
            <Route path={'/register-competition/:competitionId'} element={<RegisterCompetition/>}/>
            <Route path={'/register-competition/success'} element={<PaymentSuccess/>}/>
          </Route>

          <Route path={'/profile'} element={<ProfileLayout/>}>
            <Route index element={<div>Profile main</div>}/>
            <Route path={'settings'} element={<div>Profile settings</div>}/>
          </Route>

          <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </TanstackQueryProvider>
  </StrictMode>,
)
