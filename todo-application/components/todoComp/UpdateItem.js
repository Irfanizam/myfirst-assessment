"use client";

import { useState } from "react";
import db from "../../utils/fireStore";
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
    <>
      {isEditing ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-lg w-120 flex flex-col gap-3"
          >
            <h2 className="text-lg font-bold">Update Item</h2>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 hover:scale-105 hover:shadow-md transition"
              >
                Save
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-gray-400 text-white rounded cursor-pointer hover:bg-gray-600 hover:scale-105 hover:shadow-md transition"
                onClick={() => {
                  setValue(currentName);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600 hover:scale-105 hover:shadow-md transition"
        >
          Edit
        </button>
      )}
    </>
  );
};

export default UpdateItem;
