import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import BattlefieldModal from './BattlefieldModal';
import './styles/AdventurePage.css';
import { openModal } from '../../slices/modalSlice';
import { AppDispatch } from '../../store/store'; 

interface BattlefieldMap {
  data: ArrayBuffer;
}

interface Adventure {
  adventure: {
    battlefieldMaps: BattlefieldMap[];
  };
}

const AdventurePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedBattlefield, setSelectedBattlefield] = useState<BattlefieldMap | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const response = await fetch(`http://localhost:3000/adventures/${id}`);
        const data: Adventure = await response.json();
        setAdventure(data);
        if (data.adventure.battlefieldMaps && data.adventure.battlefieldMaps.length > 0) {
          setSelectedBattlefield(data.adventure.battlefieldMaps[0]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке приключения:', error);
      }
    };

    fetchAdventure();
  }, [id]);

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleBattlefieldChange = (selectedMap: BattlefieldMap) => {
    setSelectedBattlefield(selectedMap);
  };

  const chooseBattleMap = () => {
    handleOpenModal('battlefieldModal');
    setSidebarVisible(!sidebarVisible);
  };

  const handleOpenModal = (modalId: string) => {
    dispatch(openModal(modalId));
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleGridVisibility = () => {
    setShowGrid(!showGrid);
  };

  return (
    <div>
      <div className="container">
        <button className="open-sidebar-button" onClick={toggleSidebar}>Открыть панель </button>
      </div>
      {sidebarVisible && (
        <div className="sidebar open">
          <button className="close" onClick={toggleSidebar}>x</button>
          <div>
            <button onClick={chooseBattleMap}>
              Выбрать поле боя
            </button>
            <button onClick={toggleGridVisibility}>
              {showGrid ? 'Скрыть сетку' : 'Показать сетку'}
            </button>
          </div>
        </div>
      )}
      
      {adventure ? (
        <div className="image-container" id="image-container">
          {selectedBattlefield && (
            <img
              src={`data:image/jpeg;base64,${arrayBufferToBase64(selectedBattlefield.data)}`}
              id="zoom-image"
              alt="Battlefield Map"
            />
          )}
          {showGrid && <div className="grid-overlay"></div>}
        </div>
      ) : (
        <LoadingSpinner />
      )}
      
      <BattlefieldModal
        battlefieldMaps={adventure?.adventure?.battlefieldMaps || []}
        handleBattlefieldChange={handleBattlefieldChange}
        arrayBufferToBase64={arrayBufferToBase64}
      />
      <div id="elementsContainer"></div>
    </div>
  );
};

export default AdventurePage;
