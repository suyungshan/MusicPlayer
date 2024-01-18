import AlbumPicture from "../AlbumPicture";
import classes from "./BuildingPage.module.css";

function BuildingPage(props) {
  return (
    <div>
      <AlbumPicture
        className={props.pictureBuilding}
        picture={"/public/img/building.png"}
      ></AlbumPicture>
      <p className={classes.update}>工程師加速開發中!敬請期待~</p>
    </div>
  );
}

export default BuildingPage;
