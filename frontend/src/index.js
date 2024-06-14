import React from 'react';
import { createRoot } from 'react-dom/client'; // Обновленный импорт
import App from './mainpage/App'; // Путь к вашему основному компоненту приложения
import './index.css';

const currentPage = window.location.pathname;
console.log(currentPage);
//if (/^\/[0-9]+s[0-9]+$/.test(currentPage)) {
    
    const root = createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
//}
