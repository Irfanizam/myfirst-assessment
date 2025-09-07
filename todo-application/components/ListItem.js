"use client";

import { useState, useEffect } from "react";
import db from "../utils/fireStore";
import { collection, onSnapshot } from "@firebase/firestore";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";

// implementing onSnapshot for realtime database query
const ListItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-left">List of Items</h2>
      <ul className="flex flex-col border-t p-4">
        {items.map((item, index) => (
          <li key={item.id} className={`p-2 flex ${index % 2 !== 0 ? "bg-gray-100" : ""}`}>
            <p className="w-sm">{item.name}</p>
            <div className="grid grid-cols-2 gap-2">
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
