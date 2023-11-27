import React from 'react';
import './TimeTable.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectTimeSlot, setHoveredSlot, resetSelectedSlots } from '../../slices/TimeSlotSlice';
import { deselectTutor } from '../../slices/TutorSlice';
import { openDelete } from '../../slices/ModalSlice';
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModal';

const TimeTable = () => {
  const today = new Date();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const selectedPackage = useSelector(state => state.package.selectedPackage);
  const dispatch = useDispatch();
  const timeSlots = useSelector((state) => state.timeSlot.timeSlots)
  const hoveredSlot = useSelector(state => state.timeSlot.hoveredSlot)
  const selectedSlots = useSelector(state => state.timeSlot.selectedSlots);
  const selectedTutor = useSelector(state => state.tutors.selectedTutor);

  const calculateNextSlotTime = (selectedTimeSlot) => {
    const [hours, minutes] = selectedTimeSlot.split(':').map(Number);

    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0); // 시, 분, 초 설정

    const nextTime = new Date(selectedTime.getTime() + 30 * 60000); // 30분(30 * 60000 밀리초) 추가
    const nextTimeSlotString = `${nextTime.getHours().toString().padStart(2, '0')}:${nextTime.getMinutes() === 0 ? '00' : '30'}`;

    return nextTimeSlotString;
  };

  const handleMouseEnter = (slot) => {
    if (slot.isAvailable) {
      let hoveredSlots = [slot.id];

      if (selectedPackage.duration === '40분') {
        const nextTimeSlotString = calculateNextSlotTime(slot.time);
        const nextSlot = timeSlots.find(s => s.date === slot.date && s.time === nextTimeSlotString);
        if (nextSlot && nextSlot.isAvailable) {
          hoveredSlots.push(nextSlot.id);
        } else {
          hoveredSlots = [];
        }
      }

      dispatch(setHoveredSlot(hoveredSlots));
    }
  };

  const handleMouseLeave = () => {
    dispatch(setHoveredSlot([]));
  }

  const handleSlotClick = (date, time, isTutorSelected) => {
    if (isTutorSelected) {
      dispatch(openDelete());
    } else {
      if (selectedPackage.remaining === 0) {
        alert("더 이상 신청할 수 없습니다.");
        return;
      }
      dispatch(resetSelectedSlots());

      dispatch(selectTimeSlot({ date, time, isSelected: true }));

      if (selectedPackage.duration === '40분') {
        const nextTimeSlotString = calculateNextSlotTime(time);
        const nextTimeSlot = timeSlots.find(slot =>
          slot.date === date && slot.time === nextTimeSlotString && slot.isAvailable
        );

        if (nextTimeSlot && nextTimeSlot.isAvailable) {
          dispatch(selectTimeSlot({ date, time: nextTimeSlotString, isSelected: true }));
        } else {
          dispatch(resetSelectedSlots());
        }
      }
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      if (hour === 4 || (hour >= 15 && hour <= 18)) {
        continue; 
      }
      slots.push(
        <div key={hour} className={`leftbar-slot ${hour === 3 || hour === 14 ? 'leftbar-slot-break' : ''}`}>
          <div className="slot-time">{hour === 0 ? '자정 0시' : (hour <= 12 ? `오전 ${hour}시` : `오후 ${hour - 12}시`)}</div>
          <div className={hour % 2 === 0 ? "slot-border-dashed" : "slot-border"}></div>
        </div>
      );
    }
    slots.push(
      <div key="last" className="last-slot">
        <div className="slot-border"></div>
      </div>
    );
    return slots;
  };

  const daySlots = weekdays.map((day, index) => {
    const currentDay = new Date(today);
    currentDay.setDate(today.getDate() + index - today.getDay());
  
    const isToday = today.toDateString() === currentDay.toDateString();
    const isWeekend = currentDay.getDay() === 0 || currentDay.getDay() === 6;
    const dayClass = isToday ? "topbar-slot today" : isWeekend ? "topbar-slot weekend" : "topbar-slot";
  
    return (
      <div className={dayClass} key={index}>
        <div className="slot-day-of-week">{day}</div>
        <div className="slot-day">{currentDay.getDate()}</div>
      </div>
    );
  });

  const groupTimeSlotsByDate = () => {
    return timeSlots.reduce((acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    }, {});
  };

  const renderGroupedTimeSlots = () => {
    const groupedSlots = groupTimeSlotsByDate();
    return Object.entries(groupedSlots).map(([date, slots], index) => (
      <div key={index} className="time-slot-column">
        {slots.map((slot, slotIndex) => {
          const isHovered = hoveredSlot.includes(slot.id);
          const isSelected = selectedSlots.some(s => s.date === slot.date && s.time === slot.time);
          const isTutorSelected = selectedTutor && selectedSlots.some(s => s.date === slot.date && s.time === slot.time);

          let textToDisplay = "";
          let additionalClass = "";
          if (isSelected) {
            if (selectedPackage.duration === '40분' && selectedSlots.length === 2) {
              if (selectedSlots[0].date === slot.date && selectedSlots[0].time === slot.time) {
                textToDisplay = "선택";
                additionalClass = "first-selected"
              } else if (selectedSlots[1].date === slot.date && selectedSlots[1].time === slot.time) {
                textToDisplay = "완료";
                additionalClass = "second-selected"
              }
            } else {
              textToDisplay = "선택완료";
            }
          }

          const slotClasses = `time-slot ${additionalClass} ${isSelected ? 'selected' : ''} 
                               ${!slot.isAvailable ? 'unavailable' : ''} 
                               ${isHovered ? 'hovered' : ''}
                               ${isTutorSelected ? 'tutor-selected' : ''}`;

          const slotElements = [
            <div
              key={slotIndex}
              className={slotClasses}

              onClick={() => slot.isAvailable && handleSlotClick(slot.date, slot.time, isTutorSelected)}
              onMouseEnter={() => handleMouseEnter(slot)}
              onMouseLeave={handleMouseLeave}
            >
              {isHovered && !isTutorSelected && <div className="time-slot-text">{`${slot.time}`}</div>}
              {isTutorSelected && <div className="time-slot-selected-text">{textToDisplay}</div>}
            </div>
          ];
          if (slot.time === "02:30" || slot.time === "13:30") {
            slotElements.push(
              <div key={`empty-1-${slotIndex}`} className="time-slot empty-slot"></div>,
              <div key={`empty-2-${slotIndex}`} className="time-slot empty-slot"></div>
            );
          }
          return slotElements;
        })}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-r border-gray-200">
      <div className="flex items-center h-16 pl-5">
        <button className="flex items-center justify-center px-3 py-1 mr-3 text-sm font-medium text-purple-500 border border-purple-500 rounded-md hover:bg-purple-50">
          오늘
        </button>
        <button className="flex items-center justify-center p-2 mr-3 bg-white border border-purple-500 rounded-md hover:bg-purple-50">
          <img alt="icon_chevron_left_primary" src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/chevron-left/primary.svg" className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center p-2 bg-white border border-purple-500 rounded-md hover:bg-purple-50">
          <img alt="icon_chevron_right_primary" src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/chevron-right/primary.svg" className="w-4 h-4" />
        </button>
        <div className="flex items-center ml-4">
          <span className="text-sm font-bold text-black">Asia/Seoul</span>
          <a className="ml-2 text-sm cursor-pointer text-gray-600">타임존 변경</a>
        </div>
      </div>
      <div className="time-table-body flex-grow">
        <div className="top-fixed-area">
          <div className="empty-slot"></div>
          <div className="day-of-week flex">
            {daySlots}
          </div>
        </div>

        <div className="scrollable-slots-area">
          <div className="time-table-left">
            <div className="left-slots">
              {generateTimeSlots()}
            </div>
          </div>
          <div className="time-table-right flex-grow">
            <div className="time-slots grid grid-cols-7">
              {renderGroupedTimeSlots()}
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal />
    </div>
  );
};

export default TimeTable;