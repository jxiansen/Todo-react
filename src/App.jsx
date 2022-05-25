import { useState, useEffect } from "react";
import "./index.css";

function App() {
  /**
   * 定义组件内状态
   * 参数1: 存储当前状态变量的todos
   * 参数2: 修改状态的方法 setTodos
   * useState() 中传入的参数，代表状态的初始值
   * 状态的修改不能直接修改其变量,必须调用相关的修改方法
   */
  let [todos, setTodos] = useState(readFromLocalStorage());
  let [curVal, setCurVal] = useState("");
  let [isHidden, setHidden] = useState("false");

  /**
   * 修改当前值,每次输入字符的时候都修改state中的当前值
   */
  function handleInputValue(val) {
    curVal = val.target.value;
  }

  /**
   * 提交当前值到state中
   */
  function addTodoItem() {
    // 如果数组中已经有当前的目标,则不再添加
    if (curVal.length === 0) return; //过滤掉空的事项
    if (todos.map((i) => i.title).includes(curVal)) {
      return;
    }
    const newItem = {
      id: todos.length,
      title: curVal.trim(),
      completed: false,
    };
    setTodos([...todos, newItem]);
    setCurVal(""); // 提交完毕后将当前值置空
  }

  /**
   * 处理回车事件
   */
  function handleKeyPress(e) {
    if (e.keyCode === 13) addTodoItem();
  }

  /**
   * 存储到localstorage中
   */
  function storeToLocalStorage() {
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify(todos));
  }

  /**
   * 从localstorage中读取加载出来,如果localStorage中没有数据,则返回mook的数据
   */
  function readFromLocalStorage() {
    if (!localStorage.data) {
      return [
        {
          title: "看电影",
          completed: false,
        },
      ];
    }
    return JSON.parse(localStorage.data);
  }

  /**
   * 数据发生变化自动存储
   */
  useEffect(storeToLocalStorage);

  /**
   * 组件卸载前执行的操作
   */
  useEffect(() => {
    setHidden(false);
    storeToLocalStorage;
  }, []);

  /**
   * 完成所有列表的状态
   */
  function completedAllItem() {
    setTodos(
      todos.map((todo) => {
        return {
          ...todo,
          completed: true,
        };
      })
    );
  }
  return (
    <div className="h-100 w-full flex items-center justify-center font-sans  bg-[#e8fffe7e]">
      <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4 ">
          <h1 className="text-4xl font-medium text-center">ToDo List</h1>
          <div className="flex mt-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              onKeyDown={handleKeyPress.bind(this)}
              onChange={handleInputValue.bind(this)}
            />
            <button
              className="flex  p-2 border-2 rounded text-green-300 border-green-300 hover:text-white hover:bg-green-300"
              onClick={addTodoItem}
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
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="12" r="9" />{" "}
                <line x1="9" y1="12" x2="15" y2="12" />{" "}
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
              <span>Add</span>
            </button>
          </div>
        </div>
        <ul className={isHidden && "hidden"}>
          {todos.map((todo) => (
            <ListItem
              title={todo.title}
              key={todo.title}
              completed={todo.completed}
              check={() => {
                let copy = JSON.parse(JSON.stringify(todos));
                for (let i = 0; i < copy.length; i++) {
                  if (copy[i].title === todo.title) {
                    copy[i].completed = !copy[i].completed;
                  }
                }
                setTodos(copy);
              }}
              onDelete={() =>
                setTodos(todos.filter((i) => todo.title !== i.title))
              }
            />
          ))}
        </ul>
        <div>
          <span className="text">Remainder: {todos.length}</span>
          <button
            className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
            onClick={() => setHidden(!isHidden)}
          >
            {isHidden ? "Show" : "Hidden"}
          </button>
          <button
            onClick={completedAllItem}
            className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
          >
            DoneAll
          </button>
          <button
            className="border-2 border-red-500 p-2 text-red-500 ml-4"
            onClick={() => setTodos([])}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * 子组件
   * 根据接收的props(属性)渲染出子元素, props时组件对外的接口, props是只读的属性,组件内部不能修改props
   * 只能在该组件的上层组件中修改。
   */
  function ListItem(props) {
    return (
      <div className="flex mb-4 items-center" key={props.key}>
        <p
          className={
            props.completed
              ? "w-full line-through text-green-500 text-lg"
              : "w-full text-gray-600 text-lg"
          }
        >
          {props.title}
        </p>
        <button
          className={
            props.completed
              ? "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-gray  hover:bg-gray-400"
              : "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-400 border-green-400 hover:bg-green-400"
          }
          onClick={props.check}
        >
          {props.completed ? "Undone" : "Done"}
        </button>
        <button
          className="flex-no-shrink p-2 ml-2 border-2 rounded border-red-500 text-red-500 border-red hover:text-white hover:bg-red-600"
          onClick={props.onDelete}
        >
          Remove
        </button>
      </div>
    );
  }
}

function container() {
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center  bg-gray-100">
      <App />
      {console.log("Made with Mr-j QAQ ")}
    </div>
  );
}

export default container;
