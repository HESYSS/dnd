import React from 'react';
import { closeModal, openModal } from '../openmodal';

const UserIcon = ({ userIsRegistered, handleLogout }) => {
  return (
    <div className="user-icon" id="userIcon">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0MOrg9aNZWA9duWyX-JxJo7Tth5nuIsPVlA&s"
        alt="User Icon"
      />
      <div className="dropdown" id="dropdownMenu">
        {!userIsRegistered ? (
          <>
            <a onClick={() => openModal('loginModal')} id="loginLink">Войти</a>
            <a onClick={() => openModal('registerModal')} id="registerLink">Зарегистрироваться</a>
          </>
        ) : (
          <>
            <a onClick={() => openModal('friendModal')} id="friendLink">Друзья</a>
            <a onClick={handleLogout}>Выйти</a>
            <a onClick={() => openModal('deleteAccountModal')} id="deleteAccountLink">Удалить</a>
          </>
        )}
      </div>
    </div>
  );
};

export default UserIcon;
