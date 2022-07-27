import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkAuth, postLogout } from './asyncActions/user';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { appPaths, authLinks, publicLinks } from './utils/constants';

import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import Loader from './components/UI/Loader/Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [showToggle, setShowToggle] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // function routeChange() {
  //   if (!searchParams.get('link') && user.isAuth) {
  //     navigate(`/${appPaths.login}`, { replace: true });
  //   }
  // }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth(dispatch);
    }
  }, []);

  const user = useSelector((store) => store.user);
  const loading = useSelector((store) => store.loading);

  useEffect(() => {
    if (loading.isFetching) {
      return;
    }
    if (user.isAuth) {
      if (user.user.isActivated) {
        navigate(`/${appPaths.created}`, { replace: true });
      } else {
        navigate(`/${appPaths.activation}`, { replace: true });
      }
    } else {
      navigate(`/${appPaths.login}`, { replace: true });
    }
  }, [user?.isAuth]);

  const rootLinkClass = [`navbar_links`];
  function activeLink(link) {
    if (location.pathname === link) {
      rootLinkClass.push('active_link');
      return rootLinkClass.join(' ');
    }
    return `navbar_links`;
  }

  const toggleShow = (event) => {
    event.stopPropagation();
    setShowToggle(!showToggle);
  };

  if (loading.isLoading) {
    return <Loader />;
  }

  return (
    <div className="App" onClick={() => setShowToggle(false)}>
      <div>
        <nav className="navbar_container">
          <div className="navber_links_container">
            {user.user.isActivated
              ? authLinks.map((elem) => (
                  <NavLink
                    className={activeLink(elem.link)}
                    key={elem.id}
                    to={elem.link}
                  >
                    {elem.title}
                  </NavLink>
                ))
              : publicLinks.map((elem) => (
                  <NavLink
                    className="navbar_links"
                    key={elem.id}
                    to={elem.link}
                  >
                    {elem.title}
                  </NavLink>
                ))}
          </div>
          <div className="navbar_user_container" onClick={(e) => toggleShow(e)}>
            {user.user.email && !user.user.isActivated ? (
              <span className="user_activate">Активируйте свой аккаунт:</span>
            ) : (
              ''
            )}
            <span className="user_name">
              {user.user ? user.user.email : ''}
            </span>
            <FontAwesomeIcon
              icon={faUser}
              className="user_icon"
            ></FontAwesomeIcon>
            {user?.user?.email && (
              <Toast
                className="toggle_body"
                show={showToggle}
                onClose={toggleShow}
              >
                <Toast.Body
                  onClick={() => postLogout(dispatch)}
                  className="toggle_text"
                >
                  Выход
                </Toast.Body>
              </Toast>
            )}
          </div>
        </nav>
        <Outlet />
      </div>

      <div className="background_top"></div>
      <div className="background_bottom"></div>
    </div>
  );
}

export default App;
