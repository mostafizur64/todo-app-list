import React from "react";
import { Provider } from "react-redux";
import { Layout, Typography } from "antd";
import store from "./store";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Provider store={store}>
      <Layout >
        <Header className="text">
          <Title style={{ color: "white", }}>
            Todo List App
          </Title>
        </Header>
        <Content style={{ padding: "50px" }}>
          <TaskForm />
          <TaskList />
        </Content>
      </Layout>
    </Provider>
  ); 
}

export default App;
