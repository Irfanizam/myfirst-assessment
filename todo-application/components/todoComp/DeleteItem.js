import db from "../../utils/fireStore";
import { doc, deleteDoc } from "@firebase/firestore";

const DeleteItem = ({ id }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "items", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 hover:scale-105 hover:shadow-md transition"
    >
      Delete
    </button>
  );
};

export default DeleteItem;
