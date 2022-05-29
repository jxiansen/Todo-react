/**
 * 类组件写法
 */
import { Component } from "react";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.readFromLocalStorage(),
      curVal: "",
      isHidden: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setHidden = this.setHidden.bind(this);
    this.completedAllItem = this.completedAllItem.bind(this);
    this.clearAllItem = this.clearAllItem.bind(this);
  }

  /**
   * 组件刚开始挂载监听按键触发
   */
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  /**
   * 组件卸载时候清除事件监听器
   */
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  /**
   * 组件更新的时候更新localStorage中的数据
   */
  componentDidUpdate() {
    localStorage.setItem("data", JSON.stringify(this.state.todos));
  }

  /**
   * 处理键盘按下事件
   */
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.addTodoItem(); // enter 事件
    }
  }

  /**
   * 修改当前值,每次输入字符的时候都修改state中的 curVal
   */
  handleInputValue(event) {
    this.setState({ curVal: event.target.value });
  }

  /**
   * 提交当前值到state中
   */
  addTodoItem() {
    // 如果数组中已经有当前的目标,则不再添加
    if (this.state.curVal.length === 0) return; //过滤掉空字符的事项
    if (this.state.todos.map((i) => i.title).includes(this.state.curVal)) {
      return;
    }
    const newItem = {
      title: this.state.curVal.trim(),
      completed: false,
    };
    this.setState({ todos: [...this.state.todos, newItem] });
    this.setState({ curVal: "" }); // 提交完毕后将当前值置空
  }

  /**
   * 从localstorage中读取加载出来,如果localStorage中没有数据,则返回mook的数据
   */
  readFromLocalStorage() {
    try {
      const data = JSON.parse(localStorage.data);
      return data;
    } catch (err) {
      return [{ title: "看电影", completed: false }];
    }
  }

  /**
   * 隐藏全部的item
   */

  setHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  /**
   * 完成所有的item
   */
  completedAllItem() {
    this.setState({
      todos: this.state.todos.map((i) => {
        return {
          ...i,
          completed: true,
        };
      }),
    });
  }

  /**
   * 删除所有的todoitem
   */

  clearAllItem() {
    this.setState({ todos: [] });
  }

  render() {
    return (
      <div className="h-100 w-full flex items-center justify-center font-sans  bg-[#e8fffe7e]">
        <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <Header
            handleInputValue={this.handleInputValue}
            handleKeyPress={this.handleKeyPress}
            addTodoItem={this.addTodoItem}
            value={this.state.curVal}
          />
          <ul className={this.state.isHidden && "hidden"}>
            {/**hidden是tailwind里面的属性 */}
            {this.state.todos.map((todo) => (
              <ListItem
                title={todo.title}
                key={todo.title}
                completed={todo.completed}
                changeCompleted={() => {
                  let arr = this.state.todos;
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i].title === todo.title) {
                      arr[i].completed = !arr[i].completed;
                    }
                  }
                  this.setState({ todos: arr });
                }}
                onDelete={() =>
                  this.setState({
                    todos: this.state.todos.filter(
                      (i) => todo.title !== i.title
                    ),
                  })
                }
              />
            ))}
          </ul>
          <Footer
            Remainder={this.state.todos.length}
            setHidden={this.setHidden}
            isHidden={this.state.isHidden}
            completedAllItem={this.completedAllItem}
            clearAllItem={this.clearAllItem}
          />
        </div>
      </div>
    );
  }
}

/**
 * 头部子组件
 */

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mb-4 ">
        <h1 className="text-4xl font-medium text-center">ToDo List</h1>
        <div className="flex mt-4">
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add Todo"
            onKeyDown={this.props.handleKeyPress}
            onChange={this.props.handleInputValue}
            value={this.props.value}
          />
          <button
            className="flex  p-2 border-2 rounded text-green-300 border-green-300 hover:text-white hover:bg-green-300"
            onClick={this.props.addTodoItem}
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
    );
  }
}

/**
 * 列表项目子组件
 */

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex mb-4 items-center" key={this.props.key}>
        <p
          className={
            this.props.completed
              ? "w-full line-through text-green-500 text-lg"
              : "w-full text-gray-600 text-lg"
          }
        >
          {this.props.title}
        </p>
        <button
          className={
            this.props.completed
              ? "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-gray  hover:bg-gray-400"
              : "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-400 border-green-400 hover:bg-green-400"
          }
          onClick={this.props.changeCompleted}
        >
          {this.props.completed ? "Undone" : "Done"}
        </button>
        <button
          className="flex-no-shrink p-2 ml-2 border-2 rounded border-red-500 text-red-500 border-red hover:text-white hover:bg-red-600"
          onClick={this.props.onDelete}
        >
          Remove
        </button>
      </div>
    );
  }
}

/**
 * 底部子组件
 */

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span className="text">Remainder: {this.props.Remainder}</span>
        <button
          className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
          onClick={this.props.setHidden}
        >
          {this.props.isHidden ? "Show" : "Hidden"}
        </button>
        <button
          onClick={this.props.completedAllItem}
          className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
        >
          DoneAll
        </button>
        <button
          className="border-2 border-red-500 p-2 text-red-500 ml-4"
          onClick={this.props.clearAllItem}
        >
          Reset
        </button>
      </div>
    );
  }
}

class container extends Component {
  render() {
    return (
      <div className="h-screen overflow-hidden flex items-center justify-center  bg-gray-100">
        <App />
        {console.log("Made with Mr-j QAQ ")}
      </div>
    );
  }
}

export default container;
