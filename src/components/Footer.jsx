/**
 * 底部栏子组件
 */
import useTodoStore from "../store";

export default () => {
  const { todos, completedAll, removeAll, setShow, isShow } = useTodoStore();
  return (
    <div>
      <span className="text">Remainder: {todos.length}</span>
      <button
        className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
        onClick={() => setShow((v) => !v)}
      >
        {isShow ? "Hidden" : "Show"}
      </button>
      <button
        onClick={completedAll}
        className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
      >
        DoneAll
      </button>
      <button
        className="border-2 border-red-500 p-2 text-red-500 ml-4"
        onClick={removeAll}
      >
        Reset
      </button>
    </div>
  );
};
