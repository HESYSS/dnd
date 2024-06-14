import React from 'react';
import './BattlefieldModal.css'
import { closeModal } from '../openmodal';

const BattlefieldModal = ({ battlefieldMaps, handleBattlefieldChange,  arrayBufferToBase64 }) => {
  const handleImageClick = (map) => {
    handleBattlefieldChange(map);
    closeModal("battlefieldModal")
  };
  return (
    <div id='battlefieldModal' className="modal">
      <h2>Выберите поле боя:</h2>
      <div className="battlefield-images">
        {battlefieldMaps.map((map, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${arrayBufferToBase64(map.data)}`}
            onClick={() => handleImageClick(map)}
          />
        ))}
      </div>
    </div>
  );
};

export default BattlefieldModal;
