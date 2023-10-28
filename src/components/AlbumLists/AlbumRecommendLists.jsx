import AlbumItem from "./AlbumItem";
import Title from "../Title";
import classes from "./AlbumLists.module.css";
import { useSelector } from "react-redux";

function AlbumRecommendLists(props) {
  const albumRecommend = useSelector((state) => state.musicData.albumRecommend);
  const { midScreen, smallScreen } = useSelector((state) => state.windowSize);

  return (
    <div className={classes.album}>
      <Title className={`body-sm ${classes.title}`} title={props.title}></Title>
      {midScreen || smallScreen ? (
        <div className={classes.list}>
          {albumRecommend.map((album) => (
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
          {albumRecommend.slice(0, 4).map((album) => (
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

export default AlbumRecommendLists;
