import { useState } from "react";
import useTodoStore from "../store";
import "./../index.css";

export default function Header() {
  // 纪录当前的输入值
  const [input, setInput] = useState("");

  const { addTodo } = useTodoStore();

  // 处理按下提交和回车事件
  function handleAddTodo() {
    addTodo(input);
    setInput("");
  }

  return (
    <div className="mb-4 ">
      <h1 className="text-4xl font-medium text-center">ToDo List</h1>
      <div className="flex mt-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add Todo"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
          onChange={(e) => setInput(e.target.value.trim())}
          value={input}
        />
        <button
          className="flex p-2 border-2 rounded text-green-300 border-green-300 hover:text-white hover:bg-green-300"
          onClick={handleAddTodo}
        >
          <svg
            className="h-6 w-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="12" cy="12" r="9" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="12" y1="9" x2="12" y2="15" />
          </svg>
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
