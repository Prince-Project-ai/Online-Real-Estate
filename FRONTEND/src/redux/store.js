import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore(
  {
    reducer: {
      // herer we can add all the reducres.
    }
  }
)


// why we made a reducer object because that contain many functionality


// we can use from that slices folder ok nice you are understand very well let's coding 

// what is slices 
  // reducers mean features.
// each slice can be considered as a reducer. It is a function that takes the current state and an action, and returns a new state. It is a pure function, meaning it does not modify the current state, but returns a new state object. The Redux Toolkit provides a createSlice function that generates a slice for you. It takes an initial state, an object of reducer functions, and a slice name as arguments, and returns a slice object.