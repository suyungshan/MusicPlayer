import MyFavPlayLists from "./MyFavPlayLists";
import classes from "./MyFavPlay.module.css";

function MyFavPlay(props) {
  return (
    <div className={classes.nextPlayFav}>
      <MyFavPlayLists playerRef={props.playerRef}></MyFavPlayLists>
    </div>
  );
}

export default MyFavPlay;
