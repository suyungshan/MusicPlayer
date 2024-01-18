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
import ControlerZoom from "../UI/Icons/ControlerZoom";
import BackZoom from "../UI/Icons/BackZoom";
import PictureBackCard from "../UI/Card/PictureBackCard";
import BuildingPage from "./BuildingPage/BuildingPage";
import { musicDataActions } from "../store/musicData";
import { useWindowSize } from "rooks";
import classes from "./MusicPlayer.module.css";

function MusicPlayer() {
  const {
    playPause,
    mute,
    played,
    volume,
    loop,
    videoIndex,
    allLoop,
    random,
    favPlay,
  } = useSelector((state) => state.playControls);
  const { musicPlay, favList, controlerInfor } = useSelector(
    (state) => state.musicData
  );
  const { home, fav, main, control, profile, setting } = useSelector(
    (state) => state.interface
  );
  const { midScreen, smallScreen } = useSelector((state) => state.windowSize);
  const favData = controlerInfor[videoIndex === 0 ? videoIndex : videoIndex];
  const dispatch = useDispatch();
  const { innerWidth } = useWindowSize();

  useEffect(() => {
    const { openMidScreen, closeMidScreen, openSmallScreen, closeSmallScreen } =
      windowSizeActions;

    const ScreenChange = () => {
      if (innerWidth > 1200) {
        dispatch(closeMidScreen());
        dispatch(closeSmallScreen());
      }

      if (innerWidth <= 1200) {
        dispatch(openMidScreen());
        dispatch(closeSmallScreen());
      }

      if (innerWidth <= 768) {
        dispatch(closeMidScreen());
        dispatch(openSmallScreen());
      }
    };
    ScreenChange();
  }, [innerWidth]);

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
    const { adjustRemainSecond, adjustplaySecond, adjustPlayed } =
      playControlsActions;
    dispatch(adjustRemainSecond(formattedRemainingTime));
    dispatch(adjustplaySecond(formattedTime));
    dispatch(adjustPlayed(progress.played));
  };

  const onSeek = (seekTime) => {
    const totalDuration = playerRef.current.getDuration();
    const targetTime = seekTime * totalDuration;
    playerRef.current.seekTo(targetTime, "seconds");
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

  const onNextVideo = () => {
    const { updateMusicPlay, updateControlerInfor } = musicDataActions;
    const { adjustVideoIndex, play } = playControlsActions;

    if (favPlay && favList !== musicPlay) {
      dispatch(updateMusicPlay(favList));
      dispatch(updateControlerInfor(favList));
      dispatch(adjustVideoIndex(videoIndex + 1));
      dispatch(play());
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
                <div className={classes.musicControl}>
                  <p className={classes.album}>
                    {Object.prototype.toString.call(controlerInfor) ===
                    "[object Array]"
                      ? favData.album
                      : controlerInfor.album}
                  </p>
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
