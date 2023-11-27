import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPackage } from '../../slices/PackageSlice';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { twentyPackage, fourtyPackage } = useSelector((state) => state.package);

  const handleSelect = (packageSize) => {
    dispatch(selectPackage(packageSize));
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content bg-white shadow-lg rounded-lg flex flex-col">
        <div className="modal-header px-8 pt-8 pb-4 flex items-end justify-between">
          <h1 className="text-2xl font-bold">수업권 선택</h1>
          <button type="button" className="modal-close-button p-1" onClick={onClose}>
            <img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/x/black.svg" alt="Close" />
          </button>
        </div>
        <div className="modal-body p-8 overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
          <div role="radiogroup">
            {/* 20분 패키지 */}
            <div className="modal-option mb-4 p-4 border border-purple-500 bg-gray-100 rounded-lg cursor-pointer" onClick={() => handleSelect('20분')}>
              <div className="flex items-center">
                <div className="mr-3 flex items-center justify-center bg-blue-50 text-blue-500 rounded-full h-10 w-10">
                  <span>20분</span>
                </div>
                <div className="flex-grow">
                  <div className="text-lg mb-1">{twentyPackage.text}</div>
                  <div className="text-sm text-gray-500">수강 기간: {twentyPackage.leftdays}일 남음</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">미사용 수업권</div>
                  <div className="text-lg text-purple-500">{twentyPackage.remaining}</div>
                </div>
              </div>
            </div>
            {/* 40분 패키지 */}
            <div className="modal-option mb-4 p-4 border border-gray-200 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => handleSelect('40분')}>
              <div className="flex items-center">
                <div className="mr-3 flex items-center justify-center bg-green-50 text-green-500 rounded-full h-10 w-10">
                  <span>40분</span>
                </div>
                <div className="flex-grow">
                  <div className="text-lg mb-1">{fourtyPackage.text}</div>
                  <div className="text-sm text-gray-500">수강 기간: {fourtyPackage.leftdays}일 남음</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">미사용 수업권</div>
                  <div className="text-lg text-purple-500">{fourtyPackage.remaining}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};

export default Modal;
