import React from "react";

function Modal({ onClickToggleModal, children }) {
  return (
    <div className="fixed top-0 left-0 w-full px-4 h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full p-4 flex-col justify-center items-center ">
        {children}
        <div
          className="mt-4 bg-red-500 text-white py-4 px-2 rounded-lg flex justify-center items-center"
          onClick={onClickToggleModal}
        >
          <span className="text-center font-latoBlack"> CLOSE</span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
