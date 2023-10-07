import MyFavPlayItem from "./MyFavPlayItem";
import { useSelector } from "react-redux";
import classes from "./MyFavPlayLists.module.css";

function MyFavPlayLists(props) {
  const favList = useSelector((state) => state.musicData.favList);

  return (
    <div className={classes.content}>
      {favList.map((album, index) => (
        <MyFavPlayItem
          key={index + 1}
          a={album.a}
          album={album.album}
          singer={album.singer}
          number={index + 1}
          song={album.song}
          time={album.time}
          url={album.url}
          playerRef={props.playerRef}
        ></MyFavPlayItem>
      ))}
    </div>
  );
}
export default MyFavPlayLists;
