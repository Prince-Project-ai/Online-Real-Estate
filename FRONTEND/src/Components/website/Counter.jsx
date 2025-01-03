import React from "react";
import { useDispatch } from "react-redux";
import Count from "./Count";

const Counter = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <Count />
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </>
  );
};

export default Counter;
