import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deleteConfirmation: false,
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: state => {
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
    openDelete: state => {
      state.deleteConfirmation = true;
    },
    closeDelete: state => {
      state.deleteConfirmation = false;
    }
  },
});

export const { openModal, closeModal, openDelete, closeDelete } = modalSlice.actions;

export default modalSlice.reducer;
