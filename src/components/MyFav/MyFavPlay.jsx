import MyFavPlayLists from "./MyFavPlayLists";
import { useSelector } from "react-redux";

import classes from "./MyFavPlay.module.css";
import { Fragment } from "react";

function MyFavPlay(props) {
  const favList = useSelector((state) => state.musicData.favList);
  return (
    <Fragment>
      {favList.length === 0 ? (
        <div className={classes.nextPlayFavP}>
          <p className={classes.p}>快將喜歡的音樂，加入我的最愛列表吧！</p>{" "}
        </div>
      ) : (
        <div className={classes.nextPlayFav}>
          <MyFavPlayLists playerRef={props.playerRef}></MyFavPlayLists>
        </div>
      )}
    </Fragment>
  );
}

export default MyFavPlay;
