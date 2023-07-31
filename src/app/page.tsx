// "use client";
// import { createContext, useEffect, useState } from "react";
import Wordle from "./pages/Wordle";
import { makeWordsArray } from "@/lib/Words";

export default async function Home() {
  const words: any =  await makeWordsArray();
  const date = Date.now();
  return (
    <>
      <main className="min-h-full h-full max-w-screen no-scrollbar overflow-x-hidden">
        <Wordle date={date} words={words} />
      </main>
    </>
  );
}
