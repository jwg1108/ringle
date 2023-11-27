import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  twentyPackage: {
    duration: '20분',
    totalSessions: 1,
    remaining: 1,
    leftdays: 30,
    text: '1회 패키지(20분)'
  },
  fourtyPackage: {
    duration: '40분',
    totalSessions: 1,
    remaining: 1,
    leftdays: 365,
    text: '1회 패키지'
  },
  selectedPackage: {
    duration: '20분',
    totalSessions: 1,
    remaining: 1,
    leftdays: 30,
    text: '1회 패키지(20분)'
  }
};

export const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    selectPackage: (state, action) => {
      state.selectedPackage = action.payload === '20분' ? state.twentyPackage : state.fourtyPackage;
    },
    decrementRemaining: (state) => {
      if (state.selectedPackage.remaining > 0) {
        state.selectedPackage.remaining -= 1;
        if (state.selectedPackage.duration === '20분') {
          state.twentyPackage.remaining -= 1;
        } else {
          state.fourtyPackage.remaining -= 1;
        }
      }
    },
    incrementRemaining: (state) => {
      if (state.selectedPackage.remaining < state.selectedPackage.totalSessions) {
        state.selectedPackage.remaining += 1;
        if (state.selectedPackage.duration === '20분') {
          state.twentyPackage.remaining += 1;
        } else {
          state.fourtyPackage.remaining += 1;
        }
      }
    }
  },
});

export const { selectPackage, decrementRemaining, incrementRemaining } = packageSlice.actions;

export default packageSlice.reducer;
