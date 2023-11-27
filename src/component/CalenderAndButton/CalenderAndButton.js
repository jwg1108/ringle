import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'

const CalendarAndButton = () => {
  const today = new Date();
  const startOfWeek = new Date();
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const modifiers = {
    today: today,
    highlighted: {
      from: startOfWeek,
      to: endOfWeek,
    },
  };

  const modifiersStyles = {
    today: {
      fontWeight: 'bold',
    },
    highlighted: {
      backgroundColor: '#d8e6f3',
    },
  }

  return (
    <div className="spaces-space-inner">
      <div className="spaces-space">
        <div className="spaces-space-inner">
          <div className="relative h-full w-full">
            <div className="h-[110px]"></div>
            <div className="flex justify-center">
              <DayPicker
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
              />
            </div>
          </div>
          <div className="relative bottom-0 left-0 w-full bg-white">
            <div className="mb-12 pt-4 text-center">
              <div className="mb-3 text-xs text-gray-300">신청 방식 변경</div>
              <a className="inline-block cursor-pointer bg-white text-black border border-gray-300 hover:bg-gray-50">
                <div className="text-h4 leading-snug px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline mr-2" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"></path>
                  </svg>
                  튜터 먼저 선택
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarAndButton;