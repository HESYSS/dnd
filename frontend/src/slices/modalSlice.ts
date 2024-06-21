import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  activeModal: string | null;
}

const initialState: ModalState = {
  activeModal: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) {
      state.activeModal = action.payload;
      console.log(1)
    },
    closeModal(state, action: PayloadAction<string>) {
      if (state.activeModal === action.payload) {
        state.activeModal = null;
      }
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;