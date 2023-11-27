import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeDelete } from '../../slices/ModalSlice';
import { resetSelectedSlots, removeTutorFromTimeSlot } from '../../slices/TimeSlotSlice';
import { deselectTutor } from '../../slices/TutorSlice';
import { incrementRemaining } from '../../slices/PackageSlice';
import avtimg from '../../images/avatar.jpg'

const DeleteConfirmationModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.modal.deleteConfirmation);
  const selectedSlots = useSelector(state => state.timeSlot.selectedSlots);
  const selectedTutor = useSelector(state => state.tutors.selectedTutor);
  const selectedTimeSlot = selectedSlots && selectedSlots.length > 0 ? selectedSlots[0] : null;

  if (!isOpen) {
    return null;
  }

  const handleCancel = () => {
    dispatch(closeDelete());
  };

  const handleConfirm = () => {
    dispatch(resetSelectedSlots());
    dispatch(resetSelectedSlots());
    dispatch(deselectTutor());
    dispatch(incrementRemaining());
    dispatch(removeTutorFromTimeSlot(selectedTimeSlot.id));
    dispatch(closeDelete());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white flex flex-col rounded-[8px] shadow-lg">
        <div className="text-sBody max-w-[600px] transform pt-[0px] pb-[32px] overflow-y-auto px-[32px]">
          <div className="flex">
            <div className="col text-left mr-60 mt-8">{`${selectedTimeSlot.date} ${selectedTimeSlot.time}`}</div>
            <button type="button" className="modal-close-button p-1 mt-7" onClick={handleCancel}>
            <img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/x/black.svg" alt="Close" />
          </button>
          </div>
          <div className="flex mt-[12px] items-center">
            <div className="col col-auto">
              <div className="avatar avatar-xs boxBorder relative rounded-full">
                <img src={avtimg} className="avatar-img rounded-full" style={{ width: '30px', height: '30px' }} />
              </div>
            </div>
            <div className="col text-left pl-3">{selectedTutor.name}</div>
          </div>
          <div className="row mt-[12px]">
            <div className="col text-left">이 수업을 삭제하시겠습니까?</div>
          </div>
        </div>
        <div className="float-right ml-48 mb-6 mt-4">
          <button className="inline-block w-1/3 rounded-lg text-center mr-4 text-h4 box-border border bg-white text-purple-500 hover:bg-gray-50" onClick={handleCancel}>취소</button>
          <button className="inline-block w-1/3 rounded-lg text-center text-h4 box-border border border-purple-500 bg-purple-500 text-white hover:bg-purple-500" onClick={handleConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
