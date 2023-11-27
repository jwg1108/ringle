import { createSlice } from '@reduxjs/toolkit';

const initialTutors = [
    { id: 1, name: 'John Smith', university: 'Harvard University', major: 'Computer Science', acceptanceRate: 90 },
    { id: 2, name: 'Emily Johnson', university: 'University of Cambridge', major: 'Mathematics', acceptanceRate: 85 },
    { id: 3, name: 'Michael Brown', university: 'Stanford University', major: 'Physics', acceptanceRate: 95 },
    { id: 4, name: 'Sarah Davis', university: 'Massachusetts Institute of Technology', major: 'Chemical Engineering', acceptanceRate: 80 },
    { id: 5, name: 'William Wilson', university: 'University of Oxford', major: 'Biology', acceptanceRate: 88 }
  ];  

const initialState = {
  tutors: initialTutors,
  selectedTutor: null,
};

export const tutorsSlice = createSlice({
  name: 'tutors',
  initialState,
  reducers: {
    selectTutor: (state, action) => {
      state.selectedTutor = state.tutors.find(tutor => tutor.id === action.payload);
    },
    deselectTutor: (state) => {
      state.selectedTutor = null;
    }
  }
});

export const { selectTutor, deselectTutor } = tutorsSlice.actions;
export default tutorsSlice.reducer;
