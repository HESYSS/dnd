import React from 'react';
import { closeModal, openModal } from '../openmodal';
import respondToFriendRequest from './friendRequests';
import FormSender from '../FormSender';

const Modals = ({ userId, userIsRegistered, monsters, friends, friendRequests, handleLogin }) => {
  return (
    <>
      {!userId || !userIsRegistered ? (
        <>
          <div id="loginModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => closeModal('loginModal')}>&times;</span>
              <h2>Вход</h2>
              <FormSender path={`http://localhost:3000/entrance`} reloadPage={false} handleLogin={handleLogin} resp={true}>
                <label htmlFor="username">Имя пользователя</label>
                <input type="text" id="loginUsername" name="username" />
                <label htmlFor="password">Пароль</label>
                <input type="password" id="loginPassword" name="password" />
                <button type="submit">Войти</button>
              </FormSender>
            </div>
          </div>

          <div id="registerModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => closeModal('registerModal')}>&times;</span>
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
      ) : (
        <>
          <div id="createModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => closeModal('createModal')}>&times;</span>
              <h2>Создание приключения</h2>
              <FormSender path={`http://localhost:3000/adventures/create/${userId}`} reloadPage={true} resp={false}>
                <label htmlFor="adventureName">Название приключения</label>
                <input type="text" id="adventureName" name="adventureName" required />
                <label htmlFor="adventureDescription">Описание приключения</label>
                <textarea id="adventureDescription" name="adventureDescription" rows="4" required></textarea>
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

          {userIsRegistered && (
            <div id="friendModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => closeModal('friendModal')}>&times;</span>
                <h2>Отправить запрос в друзья</h2>
                <FormSender path={`http://localhost:3000/friend-requests/send`} reloadPage={true} resp={false}>
                  <label htmlFor="receiverId">Введите ID пользователя</label>
                  <input type="text" name="receiverId" />
                  <label htmlFor="senderId">Ваш ID</label>
                  <input type="text" name="senderId" value={userId} readOnly id="senderNameInput" />
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
          )}
        </>
      )}
    </>
  );
};

export default Modals;
