"use strict";

import ReactPlayer from "react-player";
import { useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playControlsActions } from "../store/playControls";
import { windowSizeActions } from "../store/windowSize";
import { interfaceActions } from "../store/interface";
import Controler from "./Controler";
import Volume from "./Volume";
import Navigation from "./Navigation/Navigation";
import AlbumHotLists from "./AlbumLists/AlbumHotLists";
import AlbumNewLists from "./AlbumLists/AlbumNewlist";
import AlbumRecommendLists from "./AlbumLists/AlbumRecommendLists";
import AlbumFeatureLists from "./AlbumLists/AlbumFeatureLists";
import ControlerInfor from "./ControlerInfor";
import Main from "./Main/Main";
import NextPlay from "./NextPlay/NextPlay";
import MyFavMain from "./MyFav/MyFavMain";
import MyFavPlay from "./MyFav/MyFavPlay";
import ProgressBar from "../UI/Icons/ProgressBar";
import FavoriteChoose from "../UI/Icons/FavoriteChoose";
import ControlerZoom from "../UI/Icons/ControlerZoom";
import BackZoom from "../UI/Icons/BackZoom";
import PictureBackCard from "../UI/Card/PictureBackCard";
import BuildingPage from "./BuildingPage/BuildingPage";
import { musicDataActions } from "../store/musicData";
import classes from "./MusicPlayer.module.css";

function MusicPlayer() {
  //Redux toolkit
  //播放器
  const playPause = useSelector((state) => state.playControls.playPause);
  const mute = useSelector((state) => state.playControls.mute);
  const played = useSelector((state) => state.playControls.played);
  const volume = useSelector((state) => state.playControls.volume);
  const loop = useSelector((state) => state.playControls.loop);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const allLoop = useSelector((state) => state.playControls.allLoop);
  const random = useSelector((state) => state.playControls.random);
  const favPlay = useSelector((state) => state.playControls.favPlay);
  const controlerInfor = useSelector((state) => state.musicData.controlerInfor);
  const favData = controlerInfor[videoIndex === 0 ? videoIndex : videoIndex];

  //視窗大小控制
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const midScreen = useSelector((state) => state.windowSize.midScreen);

  //介面控制
  const home = useSelector((state) => state.interface.home);
  const fav = useSelector((state) => state.interface.fav);
  const main = useSelector((state) => state.interface.main);
  const control = useSelector((state) => state.interface.control);
  const profile = useSelector((state) => state.interface.profile);
  const setting = useSelector((state) => state.interface.setting);

  //歌曲資料
  const musicPlay = useSelector((state) => state.musicData.musicPlay);
  const favList = useSelector((state) => state.musicData.favList);
  const dispatch = useDispatch();

  console.log(favList);

  useEffect(() => {
    const ScreenChange = () => {
      if (window.innerWidth > 1200) {
        dispatch(windowSizeActions.closeMidScreen());
        dispatch(windowSizeActions.closeSmallScreen());
      }

      if (window.innerWidth <= 1200) {
        dispatch(windowSizeActions.openMidScreen());
        dispatch(windowSizeActions.closeSmallScreen());
      }

      if (window.innerWidth <= 768) {
        dispatch(windowSizeActions.closeMidScreen());
        dispatch(windowSizeActions.openSmallScreen());
      }
    };
    //初始執行一次
    ScreenChange();
    // 添加事件監聽器
    window.addEventListener("resize", ScreenChange);
  }, [window.innerWidth]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const playerRef = useRef(null);

  const onProgress = (progress) => {
    const playedSeconds = progress.playedSeconds;
    const formattedTime = formatTime(playedSeconds);
    const totalTime = playerRef.current.getDuration(); // 獲取總時長
    const remainingTime = totalTime - playerRef.current.getCurrentTime(); // 總時長減去目前播放時間
    const formattedRemainingTime = formatTime(remainingTime);
    dispatch(playControlsActions.adjustRemainSecond(formattedRemainingTime));
    dispatch(playControlsActions.adjustplaySecond(formattedTime));
    dispatch(playControlsActions.adjustPlayed(progress.played));
  };

  const onSeek = (seekTime) => {
    const totalDuration = playerRef.current.getDuration();
    const targetTime = seekTime * totalDuration;
    playerRef.current.seekTo(targetTime, "seconds");
  };

  const onNextVideo = () => {
    if (favPlay && favList !== musicPlay) {
      dispatch(musicDataActions.updateMusicPlay(favList));
      dispatch(playControlsActions.adjustVideoIndex(videoIndex + 1));
      dispatch(musicDataActions.updateControlerInfor(favList));
      dispatch(playControlsActions.play());
    }

    if (allLoop && !random) {
      const nextIndex = (videoIndex + 1) % musicPlay.length;
      dispatch(playControlsActions.adjustVideoIndex(nextIndex));
      dispatch(playControlsActions.resetPlayed());
      dispatch(
        playControlsActions.adjustActiveNextPlay(musicPlay[nextIndex].song)
      );
      dispatch(playControlsActions.play());
    } else if (allLoop && random) {
      randomVideo();
    } else if (!allLoop && random && videoIndex === musicPlay.length - 1) {
      return;
    } else if (random && videoIndex === musicPlay.length - 1) {
      return;
    } else if (random) {
      randomVideo();
    } else if (
      videoIndex === musicPlay.length - 1 ||
      (favPlay && videoIndex === musicPlay.length - 1)
    ) {
      return;
    } else {
      dispatch(playControlsActions.adjustVideoIndex(videoIndex + 1));
      dispatch(playControlsActions.resetPlayed());
      dispatch(
        playControlsActions.adjustActiveNextPlay(musicPlay[videoIndex + 1].song)
      );
      dispatch(playControlsActions.play());
    }
  };

  const randomVideo = () => {
    if (random === true) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * musicPlay.length);
      } while (randomIndex === videoIndex);
      dispatch(playControlsActions.adjustVideoIndex(randomIndex));
      dispatch(
        playControlsActions.adjustActiveNextPlay(musicPlay[randomIndex].song)
      );
      dispatch(playControlsActions.play);
    } else {
      return;
    }
  };

  const closeMainHandler = () => {
    dispatch(interfaceActions.closeMain());
  };

  return (
    <div
      className={
        control
          ? classes.centerControl
          : profile || setting
          ? classes.centerUnFinish
          : (smallScreen && fav) || (midScreen && fav)
          ? classes.centerFav
          : (midScreen && main) || (smallScreen && main)
          ? classes.centerMain
          : classes.center
      }
    >
      <div className={classes.musicPlayer}>
        <ReactPlayer
          ref={playerRef}
          url={musicPlay.length > 0 ? musicPlay[videoIndex].url : []}
          controls={false}
          width={720}
          height={480}
          playing={playPause}
          muted={mute}
          volume={volume}
          loop={loop}
          onProgress={onProgress}
          onEnded={() => {
            onNextVideo();
            {
              videoIndex === (fav ? musicPlay.length - 1 : musicPlay.length - 1)
                ? dispatch(playControlsActions.pause())
                : null;
            }
          }}
        ></ReactPlayer>
      </div>
      {control ? null : <Navigation></Navigation>}
      {!smallScreen && !midScreen && fav && !home && !profile && !setting ? (
        <Fragment>
          {control ? (
            <PictureBackCard
              back={classes.back}
              pictureBack={classes.pictureBack}
              contentBack={classes.contentBack}
            >
              <div className={classes.contentControl}>
                <ControlerZoom></ControlerZoom>
                <p className={classes.album}>
                  {Object.prototype.toString.call(controlerInfor) ===
                  "[object Array]"
                    ? favData.album
                    : controlerInfor.album}
                </p>
                <div className={classes.musicControl}>
                  <ControlerInfor></ControlerInfor>
                  <Controler
                    onNextVideo={onNextVideo}
                    onSeek={onSeek}
                  ></Controler>
                  <Volume></Volume>
                </div>
              </div>
            </PictureBackCard>
          ) : (
            <div className={classes.fav}>
              <div className={classes.favBody}>
                <MyFavMain></MyFavMain>
                <MyFavPlay playerRef={playerRef}></MyFavPlay>
              </div>
            </div>
          )}
        </Fragment>
      ) : !smallScreen && !midScreen && !fav && home && !profile && !setting ? (
        <Fragment>
          {control ? (
            <PictureBackCard
              back={classes.back}
              pictureBack={classes.pictureBack}
              contentBack={classes.contentBack}
            >
              <div className={classes.contentControl}>
                <ControlerZoom></ControlerZoom>
                <p className={classes.album}>
                  {Object.prototype.toString.call(controlerInfor) ===
                  "[object Array]"
                    ? favData.album
                    : controlerInfor.album}
                </p>
                <div className={classes.musicControl}>
                  <ControlerInfor></ControlerInfor>
                  <Controler
                    onNextVideo={onNextVideo}
                    onSeek={onSeek}
                  ></Controler>
                  <Volume></Volume>
                </div>
              </div>
            </PictureBackCard>
          ) : (
            <div className={classes.display}>
              <div className={classes.mainPlay}>
                <Main></Main>
                <NextPlay playerRef={playerRef}></NextPlay>
              </div>
              <div className={classes.albumList}>
                <AlbumHotLists title={"熱門排行"}></AlbumHotLists>
                <AlbumNewLists title={"最新專輯"}></AlbumNewLists>
                <AlbumRecommendLists title={"為您推薦"}></AlbumRecommendLists>
                <AlbumFeatureLists title={"藝人精選"}></AlbumFeatureLists>
              </div>
            </div>
          )}
        </Fragment>
      ) : !smallScreen &&
        !midScreen &&
        !fav &&
        !home &&
        (profile || setting) ? (
        <div className={classes.unFinish}>
          <BuildingPage></BuildingPage>
        </div>
      ) : midScreen && !smallScreen && fav && !home && !profile && !setting ? (
        <Fragment>
          {control ? (
            <PictureBackCard
              back={classes.back}
              pictureBack={classes.pictureBack}
              contentBack={classes.contentBack}
            >
              <div className={classes.contentControl}>
                <ControlerZoom></ControlerZoom>
                <p className={classes.album}>
                  {Object.prototype.toString.call(controlerInfor) ===
                  "[object Array]"
                    ? favData.album
                    : controlerInfor.album}
                </p>
                <div className={classes.musicControl}>
                  <ControlerInfor></ControlerInfor>
                  <Controler
                    onNextVideo={onNextVideo}
                    onSeek={onSeek}
                  ></Controler>
                  <Volume></Volume>
                </div>
              </div>
            </PictureBackCard>
          ) : (
            <div className={classes.fav}>
              <div className={classes.favBody}>
                <MyFavMain></MyFavMain>
                <MyFavPlay playerRef={playerRef}></MyFavPlay>
              </div>
            </div>
          )}
        </Fragment>
      ) : midScreen && !smallScreen && !fav && home && !profile && !setting ? (
        <Fragment>
          {control ? (
            <PictureBackCard
              back={classes.back}
              pictureBack={classes.pictureBack}
              contentBack={classes.contentBack}
            >
              <div className={classes.contentControl}>
                <ControlerZoom></ControlerZoom>
                <p className={classes.album}>
                  {Object.prototype.toString.call(controlerInfor) ===
                  "[object Array]"
                    ? favData.album
                    : controlerInfor.album}
                </p>
                <div className={classes.musicControl}>
                  <ControlerInfor></ControlerInfor>
                  <Controler
                    onNextVideo={onNextVideo}
                    onSeek={onSeek}
                  ></Controler>
                  <Volume></Volume>
                </div>
              </div>
            </PictureBackCard>
          ) : (
            <div className={classes.display}>
              {main ? (
                <div className={classes.mainPlay}>
                  <BackZoom zoom={closeMainHandler}></BackZoom>
                  <div className={classes.main}>
                    <Main></Main>
                    <NextPlay playerRef={playerRef}></NextPlay>
                  </div>
                </div>
              ) : (
                <div className={classes.albumList}>
                  <AlbumHotLists title={"熱門排行"}></AlbumHotLists>
                  <AlbumNewLists title={"最新專輯"}></AlbumNewLists>
                  <AlbumRecommendLists title={"為您推薦"}></AlbumRecommendLists>
                  <AlbumFeatureLists title={"藝人精選"}></AlbumFeatureLists>
                </div>
              )}
            </div>
          )}
        </Fragment>
      ) : midScreen && !smallScreen && !fav && !home && (profile || setting) ? (
        <Fragment>
          {control ? (
            <PictureBackCard
              back={classes.back}
              pictureBack={classes.pictureBack}
              contentBack={classes.contentBack}
            >
              <div className={classes.contentControl}>
                <ControlerZoom></ControlerZoom>
                <p className={classes.album}>
                  {Object.prototype.toString.call(controlerInfor) ===
                  "[object Array]"
                    ? favData.album
                    : controlerInfor.album}
                </p>
                <div className={classes.musicControl}>
                  <ControlerInfor></ControlerInfor>
                  <Controler
                    onNextVideo={onNextVideo}
                    onSeek={onSeek}
                  ></Controler>
                  <Volume></Volume>
                </div>
              </div>
            </PictureBackCard>
          ) : (
            <div className={classes.unFinish}>
              <BuildingPage></BuildingPage>
            </div>
          )}
        </Fragment>
      ) : !midScreen && smallScreen && fav && !home && !profile && !setting ? (
        <Fragment>
          {control ? (
            <PictureBackCard
              back={classes.back}
              pictureBack={classes.pictureBack}
              contentBack={classes.contentBack}
            >
              <div className={classes.contentControl}>
                <ControlerZoom></ControlerZoom>
                <p className={classes.album}>
                  {Object.prototype.toString.call(controlerInfor) ===
                  "[object Array]"
                    ? favData.album
                    : controlerInfor.album}
                </p>
                <div className={classes.musicControl}>
                  <ControlerInfor></ControlerInfor>
                  <Controler
                    onNextVideo={onNextVideo}
                    onSeek={onSeek}
                  ></Controler>
                  <Volume></Volume>
                </div>
              </div>
            </PictureBackCard>
          ) : (
            <div className={classes.fav}>
              <div className={classes.favBody}>
                <MyFavMain></MyFavMain>
                <MyFavPlay playerRef={playerRef}></MyFavPlay>
              </div>
            </div>
          )}
        </Fragment>
      ) : !midScreen && smallScreen && !fav && home && !profile && !setting ? (
        <Fragment>
          {control ? (
            <PictureBackCard
              back={classes.back}
              pictureBack={classes.pictureBack}
              contentBack={classes.contentBack}
            >
              <div className={classes.contentControl}>
                <ControlerZoom></ControlerZoom>
                <p className={classes.album}>
                  {Object.prototype.toString.call(controlerInfor) ===
                  "[object Array]"
                    ? favData.album
                    : controlerInfor.album}
                </p>
                <div className={classes.musicControl}>
                  <ControlerInfor></ControlerInfor>
                  <Controler
                    onNextVideo={onNextVideo}
                    onSeek={onSeek}
                  ></Controler>
                  <Volume></Volume>
                </div>
              </div>
            </PictureBackCard>
          ) : (
            <div className={classes.display}>
              {main ? (
                <div className={classes.mainPlay}>
                  <BackZoom zoom={closeMainHandler}></BackZoom>
                  <div className={classes.main}>
                    <Main></Main>
                    <NextPlay playerRef={playerRef}></NextPlay>
                  </div>
                </div>
              ) : (
                <div className={classes.albumList}>
                  <AlbumHotLists title={"熱門排行"}></AlbumHotLists>
                  <AlbumNewLists title={"最新專輯"}></AlbumNewLists>
                  <AlbumRecommendLists title={"為您推薦"}></AlbumRecommendLists>
                  <AlbumFeatureLists title={"藝人精選"}></AlbumFeatureLists>
                </div>
              )}
            </div>
          )}
        </Fragment>
      ) : !midScreen && smallScreen && !fav && !home && (profile || setting) ? (
        <Fragment>
          {control ? (
            <PictureBackCard
              back={classes.back}
              pictureBack={classes.pictureBack}
              contentBack={classes.contentBack}
            >
              <div className={classes.contentControl}>
                <ControlerZoom></ControlerZoom>
                <p className={classes.album}>
                  {Object.prototype.toString.call(controlerInfor) ===
                  "[object Array]"
                    ? favData.album
                    : controlerInfor.album}
                </p>
                <div className={classes.musicControl}>
                  <ControlerInfor></ControlerInfor>
                  <Controler
                    onNextVideo={onNextVideo}
                    onSeek={onSeek}
                  ></Controler>
                  <Volume></Volume>
                </div>
              </div>
            </PictureBackCard>
          ) : (
            <div className={classes.unFinish}>
              <BuildingPage
                pictureBuilding={classes.pictureBuilding}
              ></BuildingPage>
            </div>
          )}
        </Fragment>
      ) : (
        <div className={classes.display}>
          <div className={classes.mainPlay}>
            <Main></Main>
            <NextPlay playerRef={playerRef}></NextPlay>
          </div>
          <div className={classes.albumList}>
            <AlbumHotLists title={"熱門排行"}></AlbumHotLists>
            <AlbumNewLists title={"最新專輯"}></AlbumNewLists>
            <AlbumRecommendLists title={"為您推薦"}></AlbumRecommendLists>
            <AlbumFeatureLists title={"藝人精選"}></AlbumFeatureLists>
          </div>
        </div>
      )}
      {control ? null : (
        <div className={classes.fixedControlBar}>
          {smallScreen ? (
            <Fragment>
              <div className={classes.controlInfor}>
                <ControlerInfor></ControlerInfor>
                <Controler
                  onNextVideo={onNextVideo}
                  onSeek={onSeek}
                ></Controler>
              </div>
              <div className={classes.progress}>
                <ProgressBar onSeek={onSeek} played={played}></ProgressBar>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <ControlerInfor></ControlerInfor>
              <Controler onNextVideo={onNextVideo} onSeek={onSeek}></Controler>
              <Volume></Volume>
            </Fragment>
          )}
        </div>
      )}
      {control ? null : smallScreen ? <Navigation></Navigation> : null}
    </div>
  );
}

export default MusicPlayer;
