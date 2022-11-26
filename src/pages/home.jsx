import app from "@/core";
import { Button } from "antd";
import reactLogo from "../assets/react.svg";
import "./home.css";

const { Slot } = app;

function App() {
  return (
    <div style={{ padding: 20 }}>
      <div className="">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <div className="h-60 bg-sky-50 rounded-xl shadow-lg"></div>
          <div className="h-60 bg-pink-50 rounded-xl shadow-lg"></div>
          <div className="h-60 bg-fuchsia-50 rounded-xl shadow-lg"></div>
          <div className="h-60 bg-emerald-50 rounded-xl shadow-lg"></div>
        </div>
        <div className="flex h-96 gap-6 mt-6">
          <div className="flex flex-col flex-1 gap-6">
            <div className="flex-1 bg-green-50 rounded-xl shadow-lg"></div>
            <div className="flex-1 bg-yellow-50 rounded-xl shadow-lg"></div>
          </div>
          <div className="flex-1 bg-red-50 rounded-xl shadow-lg"></div>
        </div>
      </div>
      <div className="app">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-2xl text-black dark:text-white">Vite + React</h1>
        <div className="card text-black dark:text-gray-200">
          <Slot name="countSlot" />
          <p className="mt-8">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs mt-96">Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
}

export default App;
