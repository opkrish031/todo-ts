import { Checkbox, Form, Modal } from "antd";
import type { Todo } from "../Interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  completedTodo,
  deleteTodo,
  updateTodo,
} from "../redux/slices/todoSlice";
import { useState } from "react";
import Search from "antd/es/transfer/search";
import TextArea from "antd/es/input/TextArea";

const ListTodo = ({ data }: { data: Todo[] }) => {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState<string>("");
  const [editTodoDesc, setEditTodoDesc] = useState<string>("");
  const [openResponsive, setOpenResponsive] = useState<boolean>(false);

  const dispatch = useDispatch();
  const handleDeleteTodo = (id: string) => {
    console.log(id);
    dispatch(deleteTodo(id));
    return;
  };

  const handleTaskCompleted = (id: string) => {
    dispatch(completedTodo(id));
  };
  const handleEditTodo = (item: Todo) => {
    setEditTodoId(item.id);
    setEditTodoTitle(item.title);
    setEditTodoDesc(item.description);
    setOpenResponsive(true);
  };

  const saveUpdatedData = () => {
    if (!editTodoId) return;
    dispatch(
      updateTodo({
        id: editTodoId,
        title: editTodoTitle,
        description: editTodoDesc,
        completed: false,
        editedTodoOrNot: true,
        createdAt: new Date().toISOString(),
      }),
    );
    console.log("form submitted");
  };

  // .sort(
  //           (a, b) =>
  //             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  //         )
  return (
    <>
      <div className="flex-1 overflow-y-auto over">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data
            .sort((a, b) => {
              if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
              }
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((item) => (
              <div
                key={item.id}
                className="bg-slate-800 text-slate-200 p-4 rounded-lg shadow hover:bg-slate-700 transition"
              >
                <div className="flex justify-between items-start">
                  <Checkbox
                    checked={item.completed}
                    onChange={() => handleTaskCompleted(item.id)}
                        className="flex items-start w-full"

                  >
                    <p className={`block w-full break-all  ${item.completed ? "line-through" : ""} text-lg font-semibold text-slate-200`}>
                      {item.title}
                    </p>
                  </Checkbox>

                  <div className="flex gap-2 items-center">
                    <DeleteOutlined
                      className="cursor-pointer text-lg"
                      onClick={() => handleDeleteTodo(item.id)}
                    />
                    {!item.completed && (
                      <EditOutlined
                        className="cursor-pointer text-lg"
                        onClick={() => handleEditTodo(item)}
                      />
                    )}
                  </div>
                </div>

                <p className={`mt-2 ${item.completed ? "line-through" : ""} wrap-break-word`}>
                  {item.description}
                </p>

                <div className="text-sm text-slate-400 mt-3 flex justify-between">
                  <span>{item.completed ? "Completed" : "Not completed"}</span>
                  <span>{item.editedTodoOrNot ? "Edited" : ""}</span>
                </div>

                <div className="text-xs text-slate-500 mt-2">
                  {new Date(item.createdAt).toLocaleDateString()} /{" "}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal
        title="Modal responsive width"
        centered
        open={openResponsive}
        onOk={() => {
          saveUpdatedData();
          setOpenResponsive(false);
        }}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <form action="" onSubmit={saveUpdatedData}>
          <div className="w-full flex flex-col gap-4">
            <Search
              placeholder="input search text"
              value={editTodoTitle}
              onChange={(e) => setEditTodoTitle(e.target.value)}
            />
            <Form.Item>
              <TextArea
                rows={3}
                value={editTodoDesc}
                onChange={(e) => setEditTodoDesc(e.target.value)}
              />
            </Form.Item>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ListTodo;
