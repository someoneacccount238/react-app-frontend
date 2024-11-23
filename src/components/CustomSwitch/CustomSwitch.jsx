import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./CustomSwitch.css";

import { Toggle } from "rsuite";
import CheckIcon from "@rsuite/icons/Check";
import CloseIcon from "@rsuite/icons/Close";
import { LangContext } from "../../App";
import i18next from "i18next";

export default function CustomSwitch() {
  const [check, setCheck] = useState(false);
  const [firstTimeSeen, setFirstTimeSeen] = useState(false);

  const handleOnChange = () => {
    setCheck(!check);
    setFirstTimeSeen(true);
    console.log(check);
  };

  //gets language from localstorage and sets toggle
  useEffect(() => {
    var x = localStorage.getItem("LANGUAGE");
    if (x) i18next.changeLanguage(x);

    if (x == "en")
      if (firstTimeSeen == false) {
        document.getElementById("checkbox").checked = true;
        // console.log(document.getElementById("checkbox").checked);
      }
    if (x == "ru") {
      document.getElementById("checkbox").checked = false;
    }

    if (firstTimeSeen == true) {
      if (check) {
        var lang = "en";
        window.localStorage.setItem("LANGUAGE", lang);
      } else {
        var lang = "ru";
        window.localStorage.setItem("LANGUAGE", lang);
      }
    }
  }, [check]);

  //looks on toggle and sets localstorage

  return (
    <div className="container6">
      <input
        id="checkbox"
        type="checkbox"
        className="toggle-1"
        onChange={handleOnChange}
      />
    </div>
  );
}
