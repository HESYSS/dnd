import React from 'react';
import { Link } from 'react-router-dom';

const AdventureList = ({ userIsRegistered, adventures, userId }) => {
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleDelete = async (adventureId) => {
    try {
      await fetch(`http://localhost:3000/adventures/delete/${adventureId}`, { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при удалении приключения:', error);
    }
  };

  return (
    <div className="menu-container">
      {userIsRegistered && adventures.map(adventure => (
        (adventure.isInAdventure || adventure.adventure.gmId === userId) && (
          <div className="adventure" key={adventure.adventure.id}>
            <table>
              <tbody>
                <tr>
                  <th rowSpan="3">
                    <Link to={`/adventure/${adventure.adventure.id}s${userId}`}>
                      {adventure.adventure.image && (
                        <img
                          className="advench"
                          src={`data:image/jpeg;base64,${arrayBufferToBase64(adventure.adventure.image.data)}`}
                          alt="Adventure Picture"
                        />
                      )}
                    </Link>
                  </th>
                  <th colSpan="3">
                    <Link to={`/adventure/${adventure.adventure.id}s${userId}`}>
                      {adventure.adventure.name}
                    </Link>
                  </th>
                </tr>
                <tr>
                  <th rowSpan="2">{adventure.adventure.description}</th>
                  <td>x</td>
                </tr>
                <tr>
                  <th>
                    <button onClick={() => handleDelete(adventure.adventure.id)}>
                      Delete Adventure
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        )
      ))}
    </div>
  );
};

export default AdventureList;
