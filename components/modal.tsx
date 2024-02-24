import React from "react";

function Modal({ onClickToggleModal, children }) {
  return (
    <div className="fixed top-0 left-2 w-full px-8 h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 flex-col justify-center items-center ">
        {children}
        <div
          className="mt-4 bg-red-500 text-white py-3 px-4 rounded-lg flex justify-center items-center"
          onClick={onClickToggleModal}
        >
          <span className="text-center"> Close</span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
