"use client";

import { useState } from "react";
import db from "../utils/fireStore";
import { doc, updateDoc } from "@firebase/firestore";

const UpdateItem = ({ id, currentName }) => {
  const [value, setValue] = useState(currentName);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const itemRef = doc(db, "items", id);
      await updateDoc(itemRef, { name: value });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="flex">
      {isEditing ? (
        <form
          onSubmit={handleUpdate}
          className="flex items-center absolute w-screen h-screen top-0 left-0 bg-gray-900/70 p-4 flex flex-col items-center justify-center gap-2"
        >
          <div className="bg-white p-2 rounded-lg flex flex-col text-left gap-2">
            <h2 className="text-xl font-semibold">
                Update Item
            </h2>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border px-3 py-1 rounded mr-2 w-sm"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="px-2 py-1 bg-gray-400 text-white rounded ml-1"
                onClick={() => {
                  setValue(currentName);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="justify-center flex w-full px-2 py-1 bg-orange-500 text-white rounded"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default UpdateItem;
