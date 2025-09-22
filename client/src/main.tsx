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
import ProfileMain from "@/routes/ProfileMain.tsx";
import AdminDashboard from "@/routes/AdminDashboard.tsx";
import UsersManagement from "@/components/UsersManagement.tsx";
import {HelmetProvider} from "react-helmet-async";
import Submissions from "@/routes/Submissions.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <TanstackQueryProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App/>}/>

            <Route path={'auth'} element={<AuthLayout/>}>
              <Route path={'login'} element={<Login/>}/>
              <Route path={'register'} element={<Register/>}/>
            </Route>

            <Route path={'register-competition'} element={<RegistrationLayout/>}>
              <Route index path={':competitionId'} element={<RegisterCompetition/>}/>
              <Route path={'success'} element={<PaymentSuccess/>}/>
            </Route>

            <Route path={'profile'} element={<ProfileLayout/>}>
              <Route index element={<ProfileMain/>}/>
              <Route path={'settings'} element={<div>Profile settings</div>}/>
              <Route path={'admin'} element={<AdminDashboard/>}/>
              <Route path={'users'} element={<UsersManagement/>}/>
              <Route path={'submissions'} element={<Submissions/>}/>
            </Route>

            <Route path={'*'} element={<NotFoundPage/>}/>
          </Routes>
        </BrowserRouter>
      </TanstackQueryProvider>
    </HelmetProvider>
  </StrictMode>,
)
