import classes from "./MyFavMainInf.module.css";

function MyFavMainInf(props) {
  return (
    <div className={props.className}>
      <div className={classes.information}>
        <h1 className={classes.AlbumName}>我的最愛列表</h1>
        <p className={classes.detail}>{props.fulltime}</p>
      </div>
    </div>
  );
}

export default MyFavMainInf;
