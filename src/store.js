import { createGlobalStore } from "hox";
import { useEffect, useState } from "react";

function useTodo() {
  // 所有的 todos 数组
  const [todos, setTodos] = useState([]);
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    if (localStorage.data) {
      const todos = JSON.parse(localStorage.data);
      setTodos(todos);
    }
    console.log("Code By Mr-j👀");
    console.log("Welcome to Star 'https://github.com/jxiansen/Todo-react'");
  }, []);

  /* 
    每次 todos 变动重新存入 localStorage 中
  */
  useEffect(() => {
    localStorage.data = JSON.stringify(todos);
  }, [todos]);

  /* 
    增加新选项
  */
  function addTodo(content) {
    if (!content.length) return;
    setTodos(
      todos.concat([
        {
          id: Math.random().toString(),
          content,
          completed: false,
        },
      ])
    );
  }

  /* 
    删除选项
  */
  function removeTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  /* 
    删除所有选项
  */
  function removeAll() {
    setTodos([]);
  }

  /* 
    完成当前选项
  */
  function toggleCompleted(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  }

  /* 
    完成所有选项
  */
  function completedAll() {
    setTodos((todos) => todos.map((i) => ({ ...i, completed: true })));
  }

  return {
    todos,
    addTodo,
    removeTodo,
    completedAll,
    removeAll,
    isShow,
    setShow,
    toggleCompleted,
  };
}

/* 将任意的定制 hook 经过 createStore 包装后就变成了持久化,函数返回两个数组第一个是状态第二个是状态的容器 */
const [useTodoStore] = createGlobalStore(useTodo);
export default useTodoStore;
