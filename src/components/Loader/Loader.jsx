import CustomSwitch from "../CustomSwitch/CustomSwitch.jsx";
import "./Loader.css"
export default function Loader() {
  // <div class="loader"></div>;
  return (
    <div className="container10">
      <img src={require("../images/loader1.gif")} className="loader" />{" "}
    </div>
  );
}
