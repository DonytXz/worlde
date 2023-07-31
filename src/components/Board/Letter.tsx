import React from "react";

const Letter = (props: any) => {
  return (
    <>
      <div
        className={` rounded-md text-center w-[_75px] h-[_75px] flex items-center justify-center mx-auto
         ${props.status == "good" ? "bg-app-green" : ""}
         ${props.status == "warn" ? "bg-app-yellow" : ""}
         ${props.status == "none" ? "bg-dark-gray" : ""}
         ${
           props.isTutorial && !props.status
             ? props.theme == "dark"
               ? "bg-app-darkers-gray"
               : "bg-white border-2 border-black"
             : ""
         }
         ${!props.status && !props.isTutorial ? "bg-gray-normal" : ""} 
         `}
      >
        {props.letter ? (
          <p className="uppercase text-medium font-bold">{props.letter}</p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Letter;
