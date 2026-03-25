import { DownCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input as AntInput } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlice";
import { Bounce, toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";

const Input = () => {
  const [text, setText] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch();
  const handleAdd = (e: any) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(
        addTodo({
          id: `${Math.floor(Math.random() * 90000) + 10000}`,
          title: text,
          description: description,
          completed: false,
          editedTodoOrNot: false,
          createdAt: new Date().toISOString(),
        }),
      );
      toast.success("Task added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("todo can't be Empty");
    }
    setText("");
    setDescription("");
  };

  return (
    <>
      <form
        className="w-full flex items-start gap-3 mb-5"
        onSubmit={(e) => handleAdd(e)}
      >
        <div className="w-full flex flex-col gap-3">
          <AntInput
            placeholder="Enter todo title..."
            value={text}
            onChange={(e: any) => setText(e.target.value)}
            className="bg-slate-700 text-slate-200 placeholder-slate-300! border-none rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none "
            style={{
              backgroundColor: "#334155", 
              color: "#e2e8f0",
              
            }}
          />

          <Form.Item className="mb-0">
            <TextArea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description..."
              className="bg-slate-700 text-slate-200 placeholder-slate-300! border-none rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none resize-none"
              style={{
                backgroundColor: "#334155", 
                color: "#e2e8f0",
              }}
            />
          </Form.Item>
        </div>

        <Button
          htmlType="submit"
          icon={<DownCircleOutlined />}
          className="bg-sky-500 hover:bg-sky-600 text-white border-none rounded-md px-4 py-2 h-full flex items-center justify-center transition-all duration-200"
        >
          Add
        </Button>
      </form>
    </>
  );
};

export default Input;
