import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../images/logo_purple.svg'

function TopBar({ onPackageSelect }) {
  const selectedPackage = useSelector(state => state.package.selectedPackage);
  const selectedTutor = useSelector(state => state.tutors.selectedTutor);
  const selectedSlots = useSelector(state => state.timeSlot.selectedSlots);
  const isBothSelected = selectedTutor && selectedSlots.length > 0;

  return (
    <div className="flex items-center border-b border-gray-200 bg-gray-50 pl-6 h-16">
      <div className="flex items-center space-x-3">
        <a href="#" className="flex items-center text-purple-500">
          <img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/chevron-left/primary.svg" alt="Back" className="h-5 w-5" />
          <span>나가기</span>
        </a>
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <a href="/ko/student/portal/lessons/schedule-enter" className="text-lg font-bold text-gray-700">수업 예약</a>
        <div className="text-sm text-gray-700">STEP 1. 튜터 및 시간 선택</div>
      </div>

      <div className="flex items-center mx-6">
        <a href="#" className="flex items-center justify-between border border-gray-300 bg-white px-4 py-2 rounded-md w-80" onClick={onPackageSelect}>
          <div className={`text-sm font-medium ${selectedPackage.duration === '20분' ? 'text-blue-500 bg-blue-50' : 'text-green-500 bg-green-50'} px-2 py-1 rounded`}>
            {selectedPackage.duration}
          </div>
          {selectedPackage.text} <span className="text-sm text-gray-700">({selectedPackage.remaining}회 남음)</span>
        </a>
      </div>

      <div className="flex items-center ml-auto space-x-3 mr-4">
        <div className="text-sm font-normal text-gray-700">
          예약 신청한 수업 <span className="font-medium text-purple-500">{selectedPackage.totalSessions - selectedPackage.remaining}</span>
        </div>
        <button className={`border border-gray-200 px-4 py-2 rounded-md text-sm mx-4 w-52 ${isBothSelected ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-300'
          }`}>
          다음
        </button>
      </div>
    </div>
  );
}

export default TopBar;

