import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import avtimg from '../../images/avatar.jpg'
import { selectTutor } from '../../slices/TutorSlice';
import { decrementRemaining } from '../../slices/PackageSlice'
import { selectTutorForTimeSlot } from '../../slices/TimeSlotSlice';
import './TutorSelect.css'

const TutorSelect = () => {
  const dispatch = useDispatch();
  const tutors = useSelector(state => state.tutors.tutors);
  const selectedSlots = useSelector(state => state.timeSlot.selectedSlots);
  const selectedTutor = useSelector(state => state.tutors.selectedTutor);
  const selectedTimeSlot = selectedSlots && selectedSlots.length > 0 ? selectedSlots[0] : null;

  const handleTutorClick = (tutorId) => {
    dispatch(selectTutor(tutorId));
    dispatch(decrementRemaining());
    dispatch(selectTutorForTimeSlot({ timeSlotId: selectedTimeSlot.id, tutorId: tutorId }));
  }

  if (!selectedTimeSlot) {
    // 선택된 시간 슬롯이 없을 때
    return (
      <div className="flex right-0 h-full bg-white items-center justify-center border-l border-gray-200" style={{ width: '370px' }}>
        <div className="flex items-center justify-center m-6 p-4 border-2 border-gray-300 rounded-lg">
          <div className="col text-center">
            캘린더에서 원하시는 시간을 눌러
            <br />
            수업을 신청해 주세요.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex right-0 h-full bg-white border-l border-gray-200" style={{ width: '370px' }}>
      <div className="border-l-1 flex h-full w-full flex-col border-gray-200 bg-white overflow-y-auto">
        <div>
          <div className="border-b-1 flex min-h-[60px] items-center border-b border-gray-200 px-[8px]">
            <div className="text-h4">{`${selectedTimeSlot.date} ${selectedTimeSlot.time}`}</div>
          </div>

          <div className="auto-matching-section">
            {/* 링글 자동 매칭 UI */}
            <div className="relative block cursor-pointer px-[12px] py-[24px] border-b border-gray-200" data-ref="btn_automatching">
              <div className="flex m-[0px]">
                <div className="flex-none" style={{ padding: 0 }}>
                  <img src="https://d38emex6h5e12i.cloudfront.net/web/202210/ic-auto-matching.png" className="w-[72px]" />
                </div>
                <div className="flex-grow" style={{ marginLeft: '3px' }}>
                  <div className="text-[20px] font-bold">링글 자동 매칭</div>
                  <div className="text-[14px] text-gray-700">
                    예약 가능한 튜터 중, 평점이 높고 성실한 튜터와 자동으로 매칭해 드려요.
                  </div>
                </div>
                <div className="flex-none" style={{ padding: 0 }}>
                  <img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/check-circle/incomplete.svg" />
                </div>
              </div>
              <div className="row">
                <div className="mt-[14px] flex items-center">
                  <div className="text-[14px] text-gray-700">불만족 시 수업권 복구</div>
                  <img id="tooltip-refund" className="ml-[4px]" src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/question/black.svg" />
                </div>
              </div>
            </div>

            {/* 튜터 직접 선택 UI */}
            <div className="px-[8px] pt-[8px] border-b border-gray-200">
              <div className="mb-[16px] mt-[8px]">
                <div>튜터 직접 선택</div>
              </div>
            </div>
          </div>

          {/* 튜터 목록 */}
          <div className="tutor-list flex min-h-0 flex-grow flex-col overflow-y-auto max-h-60vh">
            <div className="tutor-tab-content min-h-0 flex-grow border-gray-200">
              {tutors.map(tutor => (
                <div
                  key={tutor.id}
                  className={`flex items-center hover:bg-gray-50 cursor-pointer py-[16px] px-[20px] ${selectedTutor?.id === tutor.id ? 'bg-blue-100' : ''}`}
                  onClick={() => handleTutorClick(tutor.id)}
                >
                  <div className="flex-none w-[71px] mr-[20px]">
                    <div className="w-[71px] h-[71px] overflow-hidden rounded-full">
                      <img src={avtimg} alt={`Avatar of ${tutor.name}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="text-h2 font-bold mb-2">{tutor.name}</div>
                    <div className="text-h5 text-[13px] text-gray-700 mb-1">{tutor.university}</div>
                    <div className="text-sBody text-[12px] text-gray-500 mb-1">{tutor.major}</div>
                    <div className="text-[14px] text-gray-500">
                      수락률 <span className="text-black">{tutor.acceptanceRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSelect;