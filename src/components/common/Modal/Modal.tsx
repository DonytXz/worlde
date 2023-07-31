import React from "react";

const Modal = (props: any) => {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen overflow-auto inset-0 z-50 flex justify-center items-center">
        <div className="h-full overflow-y-scroll no-scrollbar">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Modal;
