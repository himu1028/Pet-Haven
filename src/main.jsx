import 'flowbite'; 
import 'flowbite/dist/flowbite.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  RouterProvider,
} from "react-router";
import { router } from './Routes/router.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './AuthContext/AuthProvider.jsx';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'; 

// ✅ Create QueryClient instance
const queryClient = new QueryClient();

// AOS animation setup
AOS.init({
  disable: false,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: true,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,
  offset: 120,
  delay: 0,
  duration: 400,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
