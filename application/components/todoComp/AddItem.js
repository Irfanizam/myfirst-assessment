import { useState } from "react";
import db from "../../utils/fireStore";
import { collection, addDoc } from "@firebase/firestore";

const AddItem = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!value.trim()) return;

    try {
      await addDoc(collection(db, "items"), { name: value });
      setValue("");
    } catch (error) {
      console.log("Error adding document:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 hover:scale-105 hover:shadow-md transition"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
