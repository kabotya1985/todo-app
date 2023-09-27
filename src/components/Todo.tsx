import { useState } from "react";
import List from "./List";
import Form from "./Form";
import { text } from "node:stream/consumers";

type Todo = {
  readonly id: number;
  value: string;
  task: string;
  checked: boolean;
  removed: boolean;
};
type Filter = "all" | "checked" | "unchecked" | "removed";

export const Todo = () => {
  const [text, setText] = useState("");
  const [main, setMain] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  // 入力値をtextステートに
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleMain = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMain(e.target.value);
  };
  // 初回投稿制御
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      task: main,
      id: new Date().getTime() + Math.floor(Math.random() * 1000),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setText("");
    setMain("");
  };

  // タイトル編集制御
  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: value };
        }
        return todo;
      });

      return newTodos;
    });
  };
  //

  //　チェックボックス制御
  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: checked };
        }
        return todo;
      });
      return newTodos;
    });
  };
  //

  //削除制御
  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, removed: removed };
        }
        return todo;
      });
      return newTodos;
    });
  };
  //

  //ゴミ箱を空に
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  //フィルタ制御
  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });
  //
  return (
    <div>
      {/* フィルタリング */}

      <select defaultValue="all" onChange={(e) => handleSort(e.target.value as Filter)}>
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === "removed" ? (
        <button onClick={handleEmpty}>ごみ箱を空にする</button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type="text" value={text} onChange={(e) => handleChange(e)} />
          <input type="text" value={main} onChange={(e) => handleMain(e)} />
          <input type="submit" value="追加" onSubmit={handleSubmit} />
        </form>
      )}
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input type="checkbox" disabled={todo.removed} checked={todo.checked} onChange={() => handleCheck(todo.id, !todo.checked)} />
              <input type="text" disabled={todo.checked || todo.removed} value={todo.value} onChange={(e) => handleEdit(todo.id, e.target.value)} />
              <input type="text" disabled={todo.checked || todo.removed} value={todo.task} onChange={(e) => console.log(todo.task)} />
              <button onClick={() => handleRemove(todo.id, !todo.removed)}>{todo.removed ? "復元" : "削除"}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
