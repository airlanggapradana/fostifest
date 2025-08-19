import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {TanstackQueryProvider} from "@/utils/QueryProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TanstackQueryProvider>
        <Routes>
          <Route path={'/'} element={<App/>}/>
        </Routes>
      </TanstackQueryProvider>
    </BrowserRouter>
  </StrictMode>,
)
