import { useEffect } from "react";
import useTodoStore from "../store";

/**
 * 需要渲染的每一项
 * 根据接收的props(属性)渲染出子元素, props时组件对外的接口, props是只读的属性,组件内部不能修改props
 * 只能在该组件的上层组件中修改。
 */

export default () => {
  const { todos, removeTodo, toggleCompleted } = useTodoStore();

  return (
    <>
      {todos.map((todo) => {
        return (
          <div className="flex mb-4 items-center" key={todo.id}>
            <p
              className={
                todo.completed
                  ? "w-full line-through text-green-500 text-lg"
                  : "w-full text-gray-600 text-lg"
              }
            >
              {todo.content}
            </p>
            <button
              className={
                todo.completed
                  ? "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-gray  hover:bg-gray-400"
                  : "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-400 border-green-400 hover:bg-green-400"
              }
              onClick={() => {
                toggleCompleted(todo.id);
              }}
            >
              {todo.completed ? "Undone" : "Done"}
            </button>
            <button
              className="flex-no-shrink p-2 ml-2 border-2 rounded border-red-500 text-red-500 border-red hover:text-white hover:bg-red-600"
              onClick={() => {
                removeTodo(todo.id);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
};
