import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserIcon from './UserIcon';
import AdventureList from './AdventureList';
import AdventurePage from '../adventurepage/AdventurePage';
import Modals from './Modals';
import LoadingSpinner from '../LoadingSpinner'; 
import { closeModal, openModal } from '../openmodal';
import './App.css';

const App = () => {
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [adventures, setAdventures] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (userId) {
      handleLogin(userId);
    } else {
      setLoading(false); 
    }
  }, [userId]);

  const handleLogin = (id) => {
    setLoading(true); 
    fetch(`http://localhost:3000/entrances/${id}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('id', id);
        setUserId(data.userId);
        setUserIsRegistered(data.userIsRegistered);
        setAdventures(data.adventures);
        setMonsters(data.monsters);
        setFriends(data.friends);
        setFriendRequests(data.friendRequests);
        setLoading(false); 
        closeModal('loginModal');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('id');
    setUserId(null);
    setUserIsRegistered(false);
    setAdventures([]);
    setMonsters([]);
    setFriends([]);
    setFriendRequests([]);
  };

  if (loading) {
    return <LoadingSpinner />; 
  }

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="logo">Мой Сайт</div>
          <UserIcon userIsRegistered={userIsRegistered} handleLogout={handleLogout} />
        </nav>
        <Routes>
          <Route
            path="/login"
            element={!userIsRegistered ? (
              <div className="app-container">
                <h1>Please log in or register to see the content.</h1>
                <button className="login-button" onClick={() => openModal('loginModal')}>Log In</button>
                <button className="register-button" onClick={() => openModal('registerModal')}>Register</button>
                <Modals userId={userId} userIsRegistered={userIsRegistered} handleLogin={handleLogin} />
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
                  <button onClick={() => openModal('createModal')}>Создать</button>
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
          userId={userId}
          userIsRegistered={userIsRegistered}
          monsters={monsters}
          friends={friends}
          friendRequests={friendRequests}
          handleLogin={handleLogin}
        />
      </div>
    </Router>
  );
};

export default App;
