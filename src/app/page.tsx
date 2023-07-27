import Board from "@/components/Board/Board";
import Header from "@/components/Header";
import Keyboard from "@/components/Keyboard/Keyboard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col px-10 py-20">
        <div className="pb-16">
          <Header />
        </div>
        <div className="pb-16">
          <Board />
        </div>
        <Keyboard />
      </div>
    </main>
  )
}
