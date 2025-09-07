import { useState } from "react";
import db from "../utils/fireStore"
import { collection, addDoc } from "@firebase/firestore";

const AddItem = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "items"), {
        name: value,
      });
      console.log("Document written with ID: ", docRef.id);
      setValue("  ");
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new item"
        className="border p-2 rounded-lg w-full"
      />
      <button type="submit" className="text-nowrap justify-center items-center flex px-4 py-1 bg-blue-500 text-white rounded">Add Item</button>
    </form>
  );
};

export default AddItem;
