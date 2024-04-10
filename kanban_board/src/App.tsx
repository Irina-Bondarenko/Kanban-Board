import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import InputComponent from "./components/InputComponent";
import BreadCrumbs from "./components/BreadCrumbs";
import Tasks from "./components/Tasks";

function App() {
  return (
    <ChakraProvider>
      <InputComponent />
      <BreadCrumbs />
      <Tasks />
    </ChakraProvider>
  );
}

export default App;
