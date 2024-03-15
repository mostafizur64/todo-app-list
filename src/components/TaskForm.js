import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addTask } from '../taskReducer';

const { Option } = Select;

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState(null);
  const dispatch = useDispatch();

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = value => {
    setPriority(value);
  };

  const handleDateChange = date => {
    setDueDate(date);
  };

  const handleSubmit = () => {
    const newTask = {
      id: uuidv4(),
      title,
      priority,
      dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
      completed: false,
    };
    dispatch(addTask(newTask));
    setTitle('');
    setPriority('low');
    setDueDate(null);
  };

  return (
    <Form layout="inline" onFinish={handleSubmit} className="task-form">
      <Form.Item>
        <Input value={title} onChange={handleTitleChange} placeholder="Enter task" style={{ width: '200px' }} />
      </Form.Item>
      <Form.Item>
        <Select value={priority} onChange={handlePriorityChange} style={{ width: '200px' }}>
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <DatePicker value={dueDate} onChange={handleDateChange} style={{ width: '200px' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add Task</Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
