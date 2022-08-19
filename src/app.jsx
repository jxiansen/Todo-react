import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import useTodoStore from "./store";
import "./index.css";

export default () => {
  const { isShow } = useTodoStore();

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center  bg-gray-100">
      <div className="h-100 w-full flex items-center justify-center font-sans  bg-[#e8fffe7e]">
        <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <AddTodo />
          {isShow && <TodoList />}
          <Footer />
        </div>
      </div>
    </div>
  );
};
