import React from 'react';
import { Link } from 'react-router-dom';
import { Adventure } from '../../types';
import './styles/AdventureList.css'

interface Props {
  userIsRegistered: boolean;
  adventures: {
    isInAdventure: number[];
    adventure: Adventure;
  }[];
  userId: number | null;
}

const AdventureList: React.FC<Props> = ({ userIsRegistered, adventures, userId }) => {
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleDelete = async (adventureId: number) => {
    try {
      await fetch(`http://localhost:3000/adventures/delete/${adventureId}`, { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при удалении приключения:', error);
    }
  };

  return (
    <div className="menu-container">
      {userIsRegistered && adventures.map(({ isInAdventure, adventure }) => {
        const isAdventureIncluded = isInAdventure.includes(adventure.id) || adventure.gmId === userId || isInAdventure.includes(userId!);

        return isAdventureIncluded && (
          <div className="adventure" key={adventure.id}>
            <table>
              <tbody>
                <tr>
                  <th rowSpan={3}>
                    <Link to={`/adventure/${adventure.id}s${userId}`}>
                      {adventure.image && (
                        <img
                          className="advench"
                          src={`data:image/jpeg;base64,${arrayBufferToBase64(adventure.image.data)}`}
                          alt="Adventure Picture"
                        />
                      )}
                    </Link>
                  </th>
                  <th colSpan={3}>
                    <Link to={`/adventure/${adventure.id}s${userId}`}>
                      {adventure.name}
                    </Link>
                  </th>
                </tr>
                <tr>
                  <th rowSpan={2}>{adventure.description}</th>
                  <td>x</td>
                </tr>
                <tr>
                  <th>
                    <button onClick={() => handleDelete(adventure.id)}>
                      Delete Adventure
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default AdventureList;
