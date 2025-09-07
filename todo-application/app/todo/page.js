"use client";

import ListItems from "@/components/todoComp/ListItem";

export default function ToDo() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <ListItems />
      </div>
    </div>
  );
}
