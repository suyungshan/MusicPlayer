import Home from "../../UI/Icons/Home";
import Favorite from "../../UI/Icons/Favorite";
import Profile from "../../UI/Icons/Profile";
import Setting from "../../UI/Icons/Setting";
import { useSelector, useDispatch } from "react-redux";
import { interfaceActions } from "../../store/interface";
import classes from "./NavigationLists.module.css";

function NavigationList() {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.interface.home);
  const fav = useSelector((state) => state.interface.fav);
  const profile = useSelector((state) => state.interface.profile);
  const setting = useSelector((state) => state.interface.setting);

  const homeHandler = () => {
    dispatch(interfaceActions.openHome());
    dispatch(interfaceActions.closeFav());
    dispatch(interfaceActions.closeMain());
    dispatch(interfaceActions.closeProfile());
    dispatch(interfaceActions.closeSetting());
  };

  const favHandler = () => {
    dispatch(interfaceActions.closeHome());
    dispatch(interfaceActions.openFav());
    dispatch(interfaceActions.closeProfile());
    dispatch(interfaceActions.closeSetting());
  };

  const profileHandler = () => {
    dispatch(interfaceActions.closeHome());
    dispatch(interfaceActions.closeFav());
    dispatch(interfaceActions.closeMain());
    dispatch(interfaceActions.closeSetting());
    dispatch(interfaceActions.openProfile());
  };

  const settingHandler = () => {
    dispatch(interfaceActions.closeHome());
    dispatch(interfaceActions.closeFav());
    dispatch(interfaceActions.closeMain());
    dispatch(interfaceActions.closeProfile());
    dispatch(interfaceActions.openSetting());
  };

  return (
    <div className={classes.lists}>
      <button className={classes.button} onClick={homeHandler}>
        <div className={classes.icon}>
          <Home using={home}></Home>
        </div>
        <p className={home ? classes.name : classes.nameUnusing}>Home</p>
      </button>
      <button className={classes.button} onClick={favHandler}>
        <div className={classes.icon}>
          <Favorite using={fav}></Favorite>
        </div>
        <p className={fav ? classes.name : classes.nameUnusing}>Favorites</p>
      </button>
      <button className={classes.button} onClick={profileHandler}>
        <div className={classes.icon}>
          <Profile using={profile}></Profile>
        </div>
        <p className={profile ? classes.name : classes.nameUnusing}>Profile</p>
      </button>
      <button className={classes.button} onClick={settingHandler}>
        <div className={classes.icon}>
          <Setting using={setting}></Setting>
        </div>
        <p className={setting ? classes.name : classes.nameUnusing}>Setting</p>
      </button>
    </div>
  );
}

export default NavigationList;
