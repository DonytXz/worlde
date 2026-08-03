import React from "react";

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

const Header = (props: any) => {
  return (
    <>
      <div className="flex justify-center">
        <div
          className={`flex relative ${
            props.theme == "light"
              ? "bg-ligth-gray"
              : "bg-app-darkers-gray-less"
          }  w-[_638px] h-[_84px] rounded-lg px-6 py-4 justify-between content-center items-center`}
        >
          <div className="flex absolute">
            <button
              onClick={() => props.handleModal.tutorial.set(true)}
              className="my-auto"
            >
              <img
                src={asset("inc_quetionMark.svg")}
                alt="How to play"
                width={27}
                height={27}
              />
            </button>
          </div>
          <div className="my-auto grow flex justify-center">
            <h1
              className={`font-bold text-big tracking-widest ${
                props.theme == "light"
                  ? "bg-app-darkers-gray-less"
                  : "text-gray"
              }`}
            >
              WORDLE
            </h1>
          </div>
          <div className="flex content-center absolute right-0 px-6 py-4">
            <button onClick={() => props.handleModal.stats.set(true)}>
              <img
                src={asset("inc_chart.svg")}
                alt="Game statistics"
                width={39.5}
                height={36}
              />
            </button>
            <div
              onClick={() => {
                props.handleModal.tutorial.set(false);
                props.setTheme(props.theme == "light" ? "dark" : "light");
              }}
              className="relative flex flex-row"
            >
              {props.theme == "light" ? (
                <>
                  <div className="h-full absolute right-1 my-auto flex items-center">
                    <img
                      src={asset("orangeDot.svg")}
                      alt=""
                      width={21}
                      height={23.3}
                    />
                    <div className="z-10 absolute w-full h-full  flex items-center">
                      <div className="m-auto">
                        <img
                          src={asset("orangeDot2.svg")}
                          alt=""
                          width={17.4}
                          height={19.3}
                        />
                      </div>
                    </div>
                  </div>
                  <img
                    src={asset("inc_themeSwitch.svg")}
                    alt="Use dark theme"
                    width={60}
                    height={30}
                  />
                </>
              ) : (
                <>
                  <div className="h-full absolute left-1 my-auto flex items-center">
                    <img
                      src={asset("grayDot.svg")}
                      alt=""
                      width={21}
                      height={23.3}
                    />
                  </div>
                  <img
                    src={asset("inc_themeSwitch_dark.svg")}
                    alt="Use light theme"
                    width={60}
                    height={30}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
