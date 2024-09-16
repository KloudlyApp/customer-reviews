import { useState } from "react";

import Home from "./components/Home";
import { CRContextProvider } from "./components/context";

function App() {
  const [count, setCount] = useState(0);

  return (
    <CRContextProvider>
      <>
        <Home />
      </>
    </CRContextProvider>
  );
}

export default App;
