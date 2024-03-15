import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Checkbox, Button, Select, Modal, Form, Input } from "antd";
import { completeTask, deleteTask, editTask } from "../taskReducer";

const { Option } = Select;

const TaskList = () => {
  const [filter, setFilter] = useState("all");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const tasks = useSelector((state) => {
    if (filter === "all") {
      return state.tasks.tasks;
    }
    return state.tasks.tasks.filter((task) => task.priority === filter);
  });
  const dispatch = useDispatch();

  const handleComplete = (taskId) => {
    dispatch(completeTask(taskId));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (task) => {
    setEditedTask(task);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditedTask(null);
  };

  const handleEditModalOk = () => {
    dispatch(editTask({ id: editedTask.id, updatedTask: editedTask }));
    setEditModalVisible(false);
    setEditedTask(null);
  };

  const handleEditInputChange = (e, field) => {
    setEditedTask({
      ...editedTask,
      [field]: e.target.value,
    });
  };

  const handlePriorityChange = (value) => {
    setEditedTask({
      ...editedTask,
      priority: value,
    });
  };

  const handleFilterChange = (value) => {
    setFilter(value); 
  };

  return (
    <div className="task-list-container">
      <Select
        defaultValue="all"
        onChange={handleFilterChange}
        style={{ marginBottom: "20px", width: "200px" }}
      >
        <Option value="all">All</Option>
        <Option value="low">Low Priority</Option>
        <Option value="medium">Medium Priority</Option>
        <Option value="high">High Priority</Option>
      </Select>
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            className="task-item"
            actions={[
              <Checkbox
                key="complete"
                checked={task.completed}
                onChange={() => handleComplete(task.id)}
              />,
              <Button key="edit" onClick={() => handleEdit(task)}>
                Edit
              </Button>,
              <Button key="delete" danger onClick={() => handleDelete(task.id)}>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta title={task.title} description={task.priority} />
          </List.Item>
        )}
      />
      <Modal
        title="Edit Task"
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form>
          <Form.Item label="Task">
            <Input
              value={editedTask ? editedTask.title : ""}
              onChange={(e) => handleEditInputChange(e, "title")}
            />
          </Form.Item>
          <Form.Item label="Priority">
            <Select
              defaultValue={editedTask ? editedTask.priority : "low"}
              onChange={handlePriorityChange}
              style={{ width: "100%" }}
            >
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskList;
