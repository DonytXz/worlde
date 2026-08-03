import React from "react";

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

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
                <img
                  src={asset("inc_remove_white.svg")}
                  alt="Delete letter"
                  width={22.3}
                  height={16}
                />
              ) : (
                <img
                  src={asset("inc_remove.svg")}
                  alt="Delete letter"
                  width={22.3}
                  height={16}
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
