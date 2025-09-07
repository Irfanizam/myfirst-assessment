import db from "../utils/fireStore";
import { doc, deleteDoc } from "@firebase/firestore";

const DeleteItem = ({ id }) => {
  const handleDelete = async () => {
    const itemRef = doc(db, "items", id);
    try {
      await deleteDoc(itemRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="justify-center flex w-full px-2 py-1 bg-red-400 text-white rounded"
    >
      Delete
    </button>
  );
};

export default DeleteItem;
