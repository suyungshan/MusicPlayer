import classes from "./MyFavMainInf.module.css";

function MyFavMainInf(props) {
  return (
    <div className={props.className}>
      <div className={classes.information}>
        <p className={classes.AlbumName}>我的最愛列表</p>
        <p className={classes.detail}>{props.fulltime}</p>
      </div>
    </div>
  );
}

export default MyFavMainInf;
