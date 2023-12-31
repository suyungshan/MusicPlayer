import Title from "../Title";
import NavigationLists from "./NavigationLists";
import { useSelector } from "react-redux";
import classes from "./Navigation.module.css";

function Navigation() {
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);

  return (
    <div className={classes.navigation}>
      {smallScreen ? null : (
        <div className={classes.title}>
          <Title className={classes.name} title={"Yung"}></Title>
          <Title className={classes.music} title={"MUSIC"}></Title>
        </div>
      )}
      <NavigationLists></NavigationLists>
    </div>
  );
}

export default Navigation;
