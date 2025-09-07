"use client";

import AddItem from "@/components/AddItem";
import ListItems from "@/components/ListItem";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h1 className="text-xl font-semibold">To-Do List Firebase Firestore</h1>
        <AddItem />
        <ListItems />
      </div>
    </div>
  );
}
