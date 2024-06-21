import React from 'react';
import { useDispatch} from 'react-redux';
import { openModal } from '../slices/modalSlice';
import './styles/UserIcon.css'


interface UserIconProps {
  userIsRegistered: boolean;
  handleLogout: () => void;
}

const UserIcon: React.FC<UserIconProps> = ({ userIsRegistered, handleLogout }) => {
  const dispatch = useDispatch();


  const handleOpenModal = (modalId: string) => {
    dispatch(openModal(modalId));
  };

  return (
    <nav className="navbar">
          <div className="logo">Мой Сайт</div>
      <div className="user-icon" id="userIcon">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0MOrg9aNZWA9duWyX-JxJo7Tth5nuIsPVlA&s"
          alt="User Icon"
        />
        <div className="dropdown" id="dropdownMenu">
          {!userIsRegistered ? (
            <>
              <a onClick={() => handleOpenModal('loginModal')} id="loginLink">Войти</a>
              <a onClick={() => handleOpenModal('registerModal')} id="registerLink">Зарегистрироваться</a>
            </>
          ) : (
            <>
              <a onClick={() => handleOpenModal('friendModal')} id="friendLink">Друзья</a>
              <a onClick={handleLogout}>Выйти</a>
              <a onClick={() => handleOpenModal('deleteAccountModal')} id="deleteAccountLink">Удалить</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserIcon;
