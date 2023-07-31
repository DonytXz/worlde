import React from "react";
import Image from "next/image";

const Digit = (props: any) => {
  const handleKeyBoardDigit = () => {
    if (props.digit == "delete") {
      props.set(props.digit);
      props.digitCounter.setCounter(props.digitCounter.counter - 1);
      props.deleteCounter.setDeleteCounter(
        props.deleteCounter.deleteCounter + 1
      );
    } else {
      props.set(props.digit);
      props.digitCounter.setCounter(props.digitCounter.counter + 1);
    }
  };

  return (
    <>
      {props.digit == "enter" || props.digit == "delete" ? (
        <button
          onClick={handleKeyBoardDigit}
          className={`${
            props.theme == "dark"
              ? "bg-app-gray-digit text-gray"
              : "bg-gray text-balck"
          }  w-[_71.8px] h-[_51px] rounded-md uppercase font-semibold text-xsamall`}
        >
          {props.digit == "delete" ? (
            <div className="flex justify-center items-center">
              {props.theme == "dark" ? (
                <Image
                  src="/inc_remove_white.svg"
                  alt="Vercel Logo"
                  width={22.3}
                  height={16}
                  priority
                />
              ) : (
                <Image
                  src="/inc_remove.svg"
                  alt="Vercel Logo"
                  width={22.3}
                  height={16}
                  priority
                />
              )}
            </div>
          ) : (
            <div
              className={`${
                props.theme == "dark" ? " text-white" : " text-balck"
              }`}
            >
              {props.digit}
            </div>
          )}
        </button>
      ) : (
        <button
          onClick={handleKeyBoardDigit}
          className={`${
            props.theme == "dark"
              ? "bg-app-gray-digit text-white"
              : "bg-gray text-balck"
          } w-[_44.5px] h-[_51px] rounded-md uppercase font-semibold text-small`}
        >
          {props.digit}
        </button>
      )}
    </>
  );
};

export default Digit;
