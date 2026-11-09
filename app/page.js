"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center text-white gap-4 items-center min-h-[43vh] md:px-0 px-5 text-xs md:text-base">
        <div className="md:text-5xl text-3xl font-bold flex  justify-center items-center gap-1 md:gap-2">
          Buy me a Chai
          <span>
            <img className="invertimg" src="/tea.gif" alt="" width={88} />
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowd funding platform for creators to fund their projects.
        </p>
        <p className="text-center md:text-left">
          A place where your fans can buy you a chai. Unleash the power of your
          fans and get your projects funded.
        </p>
        <div>
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 "></div>
      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              src="/man.gif"
              alt=""
              width={88}
              className="bg-slate-400 rounded-full p-2"
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              Your fans are available for you to help you
            </p>
          </div>{" "}
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              src="/coin.gif"
              alt=""
              width={88}
              className="bg-slate-400 rounded-full p-2"
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              Your fans are available for you to help you
            </p>
          </div>{" "}
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              src="/group.gif"
              alt=""
              width={88}
              className="bg-slate-400 rounded-full p-2"
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              Your fans are available for you to help you
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 "></div>
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-14">
          Learn more about us
        </h2>
        <div className="w-[90%] md:w-[50%] h-[40vh]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/yvXZurAwZ_A?si=6dTr8RvHy9e9zXEF"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
