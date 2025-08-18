import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Board from "./components/Board";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-xl font-bold">
        Project Dashboard
        <nav className="space-x-4 float-right">
          <NavLink to="/" className="hover:underline">Board</NavLink>
        </nav>
      </header>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Board />} />
        </Routes>
      </main>
    </div>
  );
}