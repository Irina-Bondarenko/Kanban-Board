import InputComponent from "../components/InputComponent";
import Tasks from "../components/Tasks";

const MainPage = () => {
  return (
    <div data-testid="main-page">
      <InputComponent data-testid="input-component" />
      <Tasks data-testid="tasks-component" />
    </div>
  );
};

export default MainPage;
