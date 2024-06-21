import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { loginSuccess, logout, setLoading } from './actions/authActions';
import UserIcon from './components/UserIcon';
import AdventureList from './pages/mainpage/AdventureList';
import AdventurePage from './pages/adventurepage/AdventurePage';
import Modals from './components/Modals';
import LoadingSpinner from './components/LoadingSpinner';
import { closeModal, openModal } from './slices/modalSlice';
import './styles/App.css';
import { AuthState } from './types';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userId, userIsRegistered, adventures, loading, friends, friendRequests } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      handleLogin(parseInt(storedUserId, 10)); 
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleLogin = (id: number) => {
    dispatch(setLoading(true));
    fetch(`http://localhost:3000/login/${id}`)
      .then(response => response.json())
      .then((data: AuthState) => {
        dispatch(loginSuccess(data));
        dispatch(setLoading(false));
        dispatch(closeModal('loginModal'));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
      });
  };

  const handleOpenModal = (modalId: string) => {
    dispatch(openModal(modalId));
  };

  const handleLogout = () => {
    localStorage.removeItem('id');
    dispatch(logout());
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div>
        <UserIcon userIsRegistered={userIsRegistered} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={!userIsRegistered ? (
              <div className="app-container">
                <h1>Пожалуйста, войдите или зарегистрируйтесь, чтобы увидеть контент.</h1>
                <button className="login-button" onClick={() => handleOpenModal('loginModal')}>Войти</button>
                <button className="register-button" onClick={() => handleOpenModal('loginModal')}>Зарегистрироваться</button>
                <Modals
                  handleLogin={handleLogin}
                  userIsRegistered={userIsRegistered} 
                  userId={userId}
                  friends={friends}  
                  friendRequests={friendRequests}
                />
              </div>
            ) : (
              <Navigate to="/" />
            )}
          />
          <Route
            path="/"
            element={userIsRegistered ? (
              <div>
                <h1>Добро Пожаловать</h1>
                <div className="control">
                  <button onClick={() => handleOpenModal('createModal')}>Создать</button>
                  <input type="text" id="searchInput" placeholder="Введите запрос" />
                  <button onClick={() => {}}>Поиск</button>
                </div>
                <AdventureList
                  userIsRegistered={userIsRegistered}
                  adventures={adventures}
                  userId={userId}
                />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route path="/adventure/:id" element={<AdventurePage />} />
        </Routes>
        <Modals 
          handleLogin={handleLogin}
          userIsRegistered={userIsRegistered} 
          userId={userId}
          friends={friends}  
          friendRequests={friendRequests}
        />
      </div>
    </Router>
  );
};

export default App;
