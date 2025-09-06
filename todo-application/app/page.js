"use client";

import AddItem from "@/components/AddItem";
import ListItems from "@/components/ListItem";
import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>To-Do List Firebase Firestore</h1>
      <AddItem />
      <ListItems/>
    </div>
  );
}
