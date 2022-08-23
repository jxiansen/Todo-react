// 存储所有的数据,取代 localStorage
import Dexie from "dexie";

const db = new Dexie("DataBase");
db.version(2).stores({
  todos: "id, content, completed", // Primary key and indexed props
});

export default db;
