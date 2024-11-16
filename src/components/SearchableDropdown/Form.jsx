import { useEffect } from "react";
import React, { useState, useRef } from "react";

import Button from "@material-ui/core/Button";
import "./SearchableDropdown.css";
import * as ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";

const Form = () => {

    const child2 = useRef(); 
    const myFunction = ()=>{
        // console.log(child2.current.value)
    }
  return (
    <div>
      <input type="text" ref={child2} />
      <Button onClick={myFunction}></Button>
    </div>
  );
};

export default Form; 