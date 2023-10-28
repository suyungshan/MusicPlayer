import AlbumItem from "./AlbumItem";
import Title from "../Title";
import classes from "./AlbumLists.module.css";
import { useSelector } from "react-redux";

function AlbumNewLists(props) {
  const albumNew = useSelector((state) => state.musicData.albumNew);
  const { midScreen, smallScreen } = useSelector((state) => state.windowSize);

  return (
    <div className={classes.album}>
      <Title className={`body-sm ${classes.title}`} title={props.title}></Title>
      {midScreen || smallScreen ? (
        <div className={classes.list}>
          {albumNew.map((album) => (
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
          {albumNew.slice(0, 4).map((album) => (
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

export default AlbumNewLists;
