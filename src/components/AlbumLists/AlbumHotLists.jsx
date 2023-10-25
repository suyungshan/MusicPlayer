import AlbumItem from "./AlbumItem";
import Title from "../Title";
import classes from "./AlbumLists.module.css";
import { useSelector } from "react-redux";

function AlbumHotLists(props) {
  const albumHot = useSelector((state) => state.musicData.albumHot);
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const midScreen = useSelector((state) => state.windowSize.midScreen);

  return (
    <div className={classes.album}>
      <Title className={`body-sm ${classes.title}`} title={props.title}></Title>
      {midScreen || smallScreen ? (
        <div className={classes.list}>
          {albumHot.map((album) => (
            <AlbumItem
              key={album.id}
              id={album.id}
              a={album.a}
              album={album.album}
              singer={album.singer}
              list={album.list}
              fulltime={album.fulltime}
            />
          ))}
        </div>
      ) : (
        <div className={classes.list}>
          {albumHot.slice(0, 4).map((album) => (
            <AlbumItem
              key={album.id}
              id={album.id}
              a={album.a}
              album={album.album}
              singer={album.singer}
              list={album.list}
              fulltime={album.fulltime}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AlbumHotLists;
