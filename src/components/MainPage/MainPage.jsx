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
import { useTranslation } from "react-i18next";

export default function MainPage() {
  const [t, i18n] = useTranslation("global");

  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return (
      <div id="parent">
        <Link to="/calendar">
          <Button className="btn btn-one btn-start shine-box shine-box1">
            {t("nav.calorie_tracker")} 
          </Button>
        </Link>
        <Link to="/food-calculator">
          <Button className="btn btn-two btn-start shine-box shine-box2">
            {t("nav.food_calculator")}
          </Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div id="parent">
        <Link to="/login">
          <Button className="btn btn-one btn-start shine-box shine-box1">
          {t("nav.calorie_tracker")} 
          </Button>
        </Link>
        <Link to="/login">
          <Button className="btn btn-two btn-start shine-box shine-box2">
          {t("nav.food_calculator")}
          </Button>
        </Link>
      </div>
    );
  }
}
