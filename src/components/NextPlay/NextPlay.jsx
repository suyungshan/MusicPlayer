import Title from "../Title";
import NextPlayLists from "./NextPlayLists";
import { useSelector } from "react-redux";
import classes from "./NextPlay.module.css";

function NextPlay(props) {
  const nextPlay = useSelector((state) => state.musicData.nextPlay);

  return (
    <div className={classes.nextPlay}>
      <NextPlayLists
        list={nextPlay.list}
        a={nextPlay.a}
        album={nextPlay.album}
        singer={nextPlay.singer}
        playerRef={props.playerRef}
      ></NextPlayLists>
    </div>
  );
}

export default NextPlay;
