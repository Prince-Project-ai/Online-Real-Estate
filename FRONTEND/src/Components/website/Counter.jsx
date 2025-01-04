import React from "react";
import { useMessage } from "../../Contexts/MessageContext";

const Counter = () => {
  const { showToast } = useMessage();
  return (
    <>
      <button onClick={() => showToast("Hello World", "success")}>success</button>
      <button onClick={() => showToast("Hello World", "error")}>error</button>
    </>
  );
};

export default React.memo(Counter);
