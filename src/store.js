import { configureStore } from '@reduxjs/toolkit';
import packageReducer from './slices/PackageSlice'
import modalReducer from './slices/ModalSlice';
import timeSlotReducer from './slices/TimeSlotSlice'
import tutorsSliceReducer from './slices/TutorSlice';

export const store = configureStore({
  reducer: {
    package: packageReducer,
    modal: modalReducer,
    timeSlot: timeSlotReducer,
    tutors: tutorsSliceReducer
  },
});
