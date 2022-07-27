import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login/Login.jsx';
import { authRoutes, publicRoutes } from '../utils/constants';

function AppRouter() {
  const user = useSelector((store) => store.user.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {user.isActivated
            ? authRoutes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={route.element}
                />
              ))
            : publicRoutes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={route.element}
                />
              ))}
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
