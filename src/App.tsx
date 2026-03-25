import { Bounce, ToastContainer } from "react-toastify";
import Input from "./components/Input";
import LidtTodo from "./components/ListTodo";
import { useSelector } from "react-redux";
import type { Todo } from "./Interface";
import Search from "antd/es/transfer/search";
import { useState } from "react";
import useDebounce from "./custom hooks/Debouncing";
// import { todo } from "node:test";

const App = () => {
  const [searchedText, setSearchedText] = useState<string>("");
  const todoData = useSelector((state: any) => state.todos.todos);
  const debounce = useDebounce(searchedText, 500);

  const searchedData = todoData.filter((item: Todo) =>
    item.title.toLowerCase().includes(debounce.toLowerCase()),
  );
  console.log("searched data", searchedData);

  console.log(todoData);
  // const todoSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

  //   console.log(e.target.value);
  // };

  // const toDo = [
  //   {
  //     id: "1",
  //     title: "Learn React",
  //     completed: false,
  //     createdAt: new Date().toISOString(),
  //   },
  //   {
  //     id: "2",
  //     title: "Learn TypeScript",
  //     completed: false,
  //     createdAt: new Date().toISOString(),
  //   },
  // ];
  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-black">
        <div className="bg-black mx-auto w-1/2 h-[5%] flex items-center">
          <Search
            placeholder="Enter todo title to search"
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
          />
        </div>
        <div className="max-w-screen  h-[95%]  bg-gray-600">
          <div className=" bg-slate-900 py-5 px-3 h-full flex flex-col">
            <Input />
            <LidtTodo data={searchedData.map((item: Todo) => item)} />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
