import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { closeModal } from '../slices/modalSlice';
import respondToFriendRequest from '../services/friendRequests';
import FormSender from '../services/FormSender';
import { Friend, FriendRequest } from '../types';
import './styles/Modals.css'

interface ModalsProps {
  handleLogin: (id: number) => void;
  userIsRegistered: boolean;
  userId: number | null;
  friends: Friend[];
  friendRequests: FriendRequest[];
}

const Modals: React.FC<ModalsProps> = ({ handleLogin, userIsRegistered, userId, friends, friendRequests }) => {
  const dispatch = useDispatch();
  const { monsters } = useSelector((state: RootState) => state.user);
  const activeModal = useSelector((state: RootState) => state.modal.activeModal);

  const handleCloseModal = (modalId: string) => {
    dispatch(closeModal(modalId));
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('modal')) {
      dispatch(closeModal(activeModal!));
    }
  };

  useEffect(() => {
    if (activeModal) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [activeModal]);

  return (
    <>
      {(!userId || !userIsRegistered) && (
        <>
          <div id="loginModal" className={`modal ${activeModal === 'loginModal' ? 'active' : ''}`}>
            <div className="modal-content">
              <span className="closemodal" onClick={() => handleCloseModal('loginModal')}>&times;</span>
              <h2>Вход</h2>
              <FormSender path={`http://localhost:3000/logins`} reloadPage={false} handleLogin={handleLogin} resp={true}>
                <label htmlFor="username">Имя пользователя</label>
                <input type="text" id="loginUsername" name="username" />
                <label htmlFor="password">Пароль</label>
                <input type="password" id="loginPassword" name="password" />
                <button type="submit">Войти</button>
              </FormSender>
            </div>
          </div>

          <div id="registerModal" className={`modal ${activeModal === 'registerModal' ? 'active' : ''}`}>
            <div className="modal-content">
              <span className="closemodal" onClick={() => handleCloseModal('registerModal')}>&times;</span>
              <h2>Регистрация</h2>
              <FormSender path={`http://localhost:3000/registration`} reloadPage={false} handleLogin={handleLogin} resp={true}>
                <label htmlFor="username">Имя пользователя</label>
                <input type="text" id="registerUsername" name="username" />
                <label htmlFor="password">Пароль</label>
                <input type="password" id="registerPassword" name="password" />
                <button type="submit">Зарегистрироваться</button>
              </FormSender>
            </div>
          </div>
        </>
      )}

      {userIsRegistered && (
        <>
          <div id="createModal" className={`modal ${activeModal === 'createModal' ? 'active' : ''}`}>
            <div className="modal-content">
              <span className="closemodal" onClick={() => handleCloseModal('createModal')}>&times;</span>
              <h2>Создание приключения</h2>
              <FormSender path={`http://localhost:3000/adventures/create/${userId}`} reloadPage={true} resp={false}>
                <label htmlFor="adventureName">Название приключения</label>
                <input type="text" id="adventureName" name="adventureName" required />
                <label htmlFor="adventureDescription">Описание приключения</label>
                <textarea id="adventureDescription" name="adventureDescription" required></textarea>
                <label htmlFor="adventureImage">Картинка приключения</label>
                <input type="file" id="adventureImage" name="adventureImage" accept=".jpg, .jpeg, .png" />
                <label htmlFor="battlefieldMaps">Карты поля битвы</label>
                <input type="file" id="battlefieldMaps" name="battlefieldMaps" accept=".jpg, .jpeg, .png" multiple />
                <div id="selectedImages"></div>
                <label htmlFor="adventureMonsters">Монстры приключения</label>
                <select id="adventureMonsters" name="adventureMonsters" multiple>
                  {monsters.map(monster => (
                    <option value={monster.id} key={monster.id}>{monster.name}</option>
                  ))}
                </select>
                <label htmlFor="customMonsters">Добавить своих монстров</label>
                <input type="file" id="customMonsters" name="customMonsters" accept=".json" />
                <label htmlFor="adventureFriends">Друзья для приключения</label>
                <select id="adventureFriends" name="adventureFriends[]" multiple>
                  {friends.map(friend => (
                    <option value={friend.friend.id} key={friend.friend.id}>{friend.friend.username}</option>
                  ))}
                </select>
                <button type="submit">Создать</button>
              </FormSender>
            </div>
          </div>

          <div id="friendModal" className={`modal ${activeModal === 'friendModal' ? 'active' : ''}`}>
            <div className="modal-content">
              <span className="closemodal" onClick={() => handleCloseModal('friendModal')}>&times;</span>
              <h2>Отправить запрос в друзья</h2>
              <FormSender path={`http://localhost:3000/friend-requests/send`} reloadPage={true} resp={false}>
                <label htmlFor="receiverId">Введите ID пользователя</label>
                <input type="text" name="receiverId" />
                <label htmlFor="senderId">Ваш ID</label>
                <input type="text" name="senderId" value={userId?.toString() ?? ''} readOnly id="senderNameInput" />
                <button type="submit">Отправить</button>
              </FormSender>

              <h2>Друзья и Запросы в друзья</h2>
              <h3>Ваши друзья</h3>
              {friends.map(friend => (
                <div className="friend" key={friend.friend.id}>
                  <form action={`/friendship/remove/${userId}`} method="post">
                    <input type="hidden" name="friendId" value={friend.friend.id} />
                    <div className="dropdown-trigger">
                      <label htmlFor="dropdownMenu">{friend.friend.username}</label>
                      <div className="dropdown" id="dropdownMenu">
                        <button type="submit" className="remove-btn">Удалить</button>
                      </div>
                    </div>
                  </form>
                </div>
              ))}

              <h3>Запросы в друзья</h3>
              {friendRequests.map(request => (
                <div className="friend-request" key={request.id}>
                  <p>{request.sender.username} хочет добавить вас в друзья</p>
                  <button onClick={() => respondToFriendRequest(request.id, 'accepted')}>Принять</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modals;
