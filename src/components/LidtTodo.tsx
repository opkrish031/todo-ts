import { Checkbox, List } from "antd";
import type { Todo } from "../Interface";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { completedTodo, deleteTodo } from "../redux/slices/todoSlice";

const LidtTodo = ({ data }: { data: Todo[] }) => {
  const dispatch = useDispatch();
  const handleDeleteTodo = (id :string ) =>{
    console.log(id);
    dispatch(deleteTodo(id));
    return;
  }

  const handleTaskCompleted = (id : string) =>{
    dispatch(completedTodo(id));
  }
  return (
    <List
      size="large"
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item className="hover:bg-gray-200 flex flex-col w-full">
          <div className="hover:bg-gray-200 flex justify-between w-full">
            <Checkbox className="font-semibold" checked={item.completed} onChange={() => handleTaskCompleted(item.id)}>{item.title}</Checkbox>
            <p className="text-gray-500 text-sm">
              {new Date(item.createdAt).toLocaleDateString()} /{" "}
              {new Date(item.createdAt).toLocaleTimeString()}
              <DeleteOutlined className="mx-2 cursor-pointer text-lg" onClick={() => handleDeleteTodo(item.id)} />
            </p>
          </div>
          <div className="w-full px-6">
            <p className="text-gray-700">{item.description}</p>
            <p className="text-gray-500 text-sm">
              {item.completed ? "Completed" : "Not completed"}
            </p>
          </div>
        </List.Item>
      )}
    />
  );
};

export default LidtTodo;
