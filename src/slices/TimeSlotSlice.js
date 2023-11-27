import { createSlice } from '@reduxjs/toolkit';
import { TimeSlot } from '../models/TimeSlot';

const formatTime = (hour) => {
  const hours = Math.floor(hour);
  const minutes = hour % 1 === 0 ? '00' : '30';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

const createTimeSlotsForDay = (date) => {
  const slots = [];
  const now = new Date();

  const timeRanges = [
    { start: 0, end: 2.5 },
    { start: 5, end: 13.5 },
    { start: 19, end: 23.5 }
  ];

  timeRanges.forEach(range => {
    for (let hour = range.start; hour <= range.end; hour += 0.5) {
      const timeString = formatTime(hour);
      const slotDateTime = new Date(`${date}T${timeString}`);

      const isAvailable = slotDateTime.getTime() > now.getTime() + 24 * 60 * 60 * 1000;

      const slotId = `${date}T${timeString}`;
      slots.push(new TimeSlot(slotId, date, timeString, isAvailable, false));
    }
  });

  return slots;
};

const getSundayOfCurrentWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day+1; 
  
    return new Date(today.setDate(diff));
  };

const createInitialTimeSlots = () => {
  const slots = [];
  const startOfWeek = getSundayOfCurrentWeek();

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    slots.push(...createTimeSlotsForDay(dateString));
  }

  return slots;
};

const initialState = {
  timeSlots: createInitialTimeSlots(),
  selectedSlots: [],
  hoveredSlot: [],
};

export const timeSlotsSlice = createSlice({
  name: 'timeSlots',
  initialState,
  reducers: {
    setHoveredSlot: (state, action) => {
      state.hoveredSlot = action.payload;
    },
    selectTimeSlot: (state, action) => {
      if (action.payload.isSelected) {
        state.selectedSlots.push({ date: action.payload.date, time: action.payload.time });
      }
    
      state.timeSlots = state.timeSlots.map(slot =>
        slot.date === action.payload.date && slot.time === action.payload.time
          ? { ...slot, isSelected: action.payload.isSelected }
          : slot
      );
    },
    resetSelectedSlots: (state) => {
      state.selectedSlots = [];
      state.timeSlots.forEach(slot => slot.isSelected = false);
    },
    selectTutorForTimeSlot: (state, action) => {
      const { timeSlotId, tutor } = action.payload;
      state.timeSlots = state.timeSlots.map(slot =>
        slot.id === timeSlotId ? { ...slot, tutor: tutor } : slot
      );
    },
    removeTutorFromTimeSlot: (state, action) => {
      const timeSlotId = action.payload;
      state.timeSlots = state.timeSlots.map(slot =>
        slot.id === timeSlotId ? { ...slot, tutor: null } : slot
      );
    },
  },
});

export const { selectTimeSlot, setHoveredSlot, resetSelectedSlots, selectTutorForTimeSlot, removeTutorFromTimeSlot } = timeSlotsSlice.actions;
export default timeSlotsSlice.reducer;
