import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';
import './styles/BattlefieldModal.css';
import { RootState } from '../../store/store';

interface BattlefieldMap {
  data: ArrayBuffer;
}

interface BattlefieldModalProps {
  battlefieldMaps: BattlefieldMap[];
  handleBattlefieldChange: (map: BattlefieldMap) => void;
  arrayBufferToBase64: (buffer: ArrayBuffer) => string;
}

const BattlefieldModal: React.FC<BattlefieldModalProps> = ({
  battlefieldMaps,
  handleBattlefieldChange,
  arrayBufferToBase64,
}) => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state: RootState) => state.modal.activeModal);

  const handleImageClick = (map: BattlefieldMap) => {
    handleBattlefieldChange(map);
    dispatch(closeModal('battlefieldModal')); 
  };

  return (
    <div id='battlefieldModal' className={`modal ${activeModal === 'battlefieldModal' ? 'active' : ''}`}>
      <h2 className="battlefielTitle">Выберите поле боя:</h2>
      <div className="battlefield-images">
        {battlefieldMaps.map((map, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${arrayBufferToBase64(map.data)}`}
            onClick={() => handleImageClick(map)}
            alt={`Battlefield ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BattlefieldModal;
