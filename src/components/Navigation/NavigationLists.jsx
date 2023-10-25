import HomeNavigation from "../../UI/Icons/HomeNavigation";
import FavoriteNavigation from "../../UI/Icons/FavoriteNavigation";
import ProfileNavigation from "../../UI/Icons/ProfileNavigation";
import SettingNavigation from "../../UI/Icons/SettingNavigation";
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
          <HomeNavigation using={home}></HomeNavigation>
        </div>
        <p className={home ? `${classes.name}` : `${classes.nameUnusing}`}>
          Home
        </p>
      </button>
      <button className={classes.button} onClick={favHandler}>
        <div className={classes.icon}>
          <FavoriteNavigation using={fav}></FavoriteNavigation>
        </div>
        <p className={fav ? classes.name : classes.nameUnusing}>Favorites</p>
      </button>
      <button className={classes.button} onClick={profileHandler}>
        <div className={classes.icon}>
          <ProfileNavigation using={profile}></ProfileNavigation>
        </div>
        <p className={profile ? classes.name : classes.nameUnusing}>Profile</p>
      </button>
      <button className={classes.button} onClick={settingHandler}>
        <div className={classes.icon}>
          <SettingNavigation using={setting}></SettingNavigation>
        </div>
        <p className={setting ? classes.name : classes.nameUnusing}>Setting</p>
      </button>
    </div>
  );
}

export default NavigationList;
