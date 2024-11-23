import "./MainPage.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "../../redux/slices/auth";

export default function MainPage() {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return (
      <div id="parent">
        <Link to="/calendar">
          <Button className="btn btn-one btn-start shine-box shine-box1">
            Трекер калорий
          </Button>
        </Link>
        <Link to="/food-calculator">
          <Button className="btn btn-two btn-start shine-box shine-box2">
            Пищевой калькулятор
          </Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div id="parent">
        <Link to="/login">
          <Button className="btn btn-one btn-start shine-box shine-box1">
            Трекер калорий
          </Button>
        </Link>
        <Link to="/login">
          <Button className="btn btn-two btn-start shine-box shine-box2">
            Пищевой калькулятор
          </Button>
        </Link>
      </div>
    );
  }
}
