import Image from "next/image";
import React from "react";

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
              <Image
                src="/inc_quetionMark.svg"
                alt="Vercel Logo"
                width={27}
                height={27}
                priority
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
              <Image
                src="/inc_chart.svg"
                alt="Vercel Logo"
                width={39.5}
                height={36}
                priority
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
                    <Image
                      src="/orangeDot.svg"
                      alt="Vercel Logo"
                      width={21}
                      height={23.3}
                      priority
                    />
                    <div className="z-10 absolute w-full h-full  flex items-center">
                      <div className="m-auto">
                        <Image
                          src="/orangeDot2.svg"
                          alt="Vercel Logo"
                          width={17.4}
                          height={19.3}
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <Image
                    src="/inc_themeSwitch.svg"
                    alt="Vercel Logo"
                    width={60}
                    height={30}
                    priority
                  />
                </>
              ) : (
                <>
                  <div className="h-full absolute left-1 my-auto flex items-center">
                    <Image
                      src="/grayDot.svg"
                      alt="Vercel Logo"
                      width={21}
                      height={23.3}
                      priority
                    />
                  </div>
                  <Image
                    src="/inc_themeSwitch_dark.svg"
                    alt="Vercel Logo"
                    width={60}
                    height={30}
                    priority
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
