import NextPlayItem from "./NextPlayItem";
import classes from "./NextPlayLists.module.css";

function NextPlayLists(props) {
  return (
    <div className={classes.content}>
      {props.list.map((album) => (
        <NextPlayItem
          key={album.number}
          a={props.a}
          album={props.album}
          singer={props.singer}
          number={album.number}
          song={album.song}
          time={album.time}
          url={album.url}
          playerRef={props.playerRef}
        ></NextPlayItem>
      ))}
    </div>
  );
}
export default NextPlayLists;
