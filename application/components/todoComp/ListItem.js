"use client";

import { useState, useEffect } from "react";
import db from "../../utils/fireStore";
import { collection, onSnapshot } from "@firebase/firestore";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";
import AddItem from "./AddItem";

const ListItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-fit">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">To-Do List</h2>
      <AddItem />
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-50 border rounded-lg px-2   py-2 hover:shadow-md transition"
          >
            <p className="text-gray-800">{item.name}</p>
            <div className="flex px-2 gap-2 ml-auto">
              <UpdateItem id={item.id} currentName={item.name} />
              <DeleteItem id={item.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
