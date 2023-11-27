import './App.css';
import React, { useState, useEffect } from 'react';
import Modal from './component/Modal/Modal';
import TopBar from './component/TopBar/TopBar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { openModal, closeModal } from './slices/ModalSlice';
import CalendarAndButton from './component/CalenderAndButton/CalenderAndButton';
import TimeTable from './component/TimeTable/TimeTable';
import TutorSelect from './component/TutorSelect/TutorSelect';

function App() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    dispatch(openModal());
  }, [dispatch]);

  const handleOpenModal = () => {
    dispatch(openModal());
  }

  const handleCloseModal = () => {
    dispatch(closeModal());
  }

  return (
    <Provider store={store}>
      <div className="App">
        <TopBar onPackageSelect={handleOpenModal}/>
        <div className="schedule-section">
          <div className="CalenderAndButton"><CalendarAndButton /></div>
          <div className="TimeTable"><TimeTable /></div>
          <div className="TutorSelect"><TutorSelect /></div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </Provider>
  );
}

export default App;
