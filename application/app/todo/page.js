import { getTodos } from "@/utils/todoUtils";
import TodoList from "@/components/todoComp/TodoList";

export default async function TodoPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const lastVisible = searchParams.lastVisible || null;
  
  const { 
    todos, 
    totalCount, 
    totalPages, 
    currentPage, 
    hasNextPage, 
    lastVisible: newLastVisible 
  } = await getTodos(page, lastVisible);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
        <TodoList 
          initialTodos={todos} 
          totalCount={totalCount}
          totalPages={totalPages}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          lastVisible={newLastVisible}
        />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
