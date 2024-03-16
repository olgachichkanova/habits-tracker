import React from "react";
import "./App.css";
import { ProgressTab } from "../ProgressTab/ProgressTab";
import { Header } from "../Header/Header";
import { HabitList } from "../HabitList/HabitList";

function App() {
  return (
    <div className="container" style={{ padding: 20 }}>
      <ProgressTab />
      <Header />
      <HabitList />
    </div>
  );
}

export default App;
