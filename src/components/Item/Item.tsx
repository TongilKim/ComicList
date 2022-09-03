import React from "react";
import { Fragment } from "react";
import { ComicRankItem, Period, Artist } from "../../types";
import { useAppSelector } from "../../store/hooks";
import "./Item.css";

type TProps = {
  comicInfo: ComicRankItem;
  lastElementRef?: (node: HTMLDivElement) => void;
};
function Item(props: TProps) {
  const { comicInfo, lastElementRef } = props;
  const {
    isContinuesFilterActive,
    isCompletedFilterActive,
    isFreeEpisodeFilterActive,
  } = useAppSelector((state) => state.comicRank);
  let renderStatus = true;

  // 연재 중 FILTER ON ACTIVE
  if (isContinuesFilterActive) {
    if (comicInfo.contentsState === "completed") {
      renderStatus = false;
    } else {
      if (isFreeEpisodeFilterActive) {
        if (comicInfo.freedEpisodeSize < 3) {
          renderStatus = false;
        } else {
          renderStatus = true;
        }
      } else {
        renderStatus = true;
      }
    }
  }

  // 완결 FILTER ON ACTIVE
  if (isCompletedFilterActive) {
    if (comicInfo.contentsState === "scheduled") {
      renderStatus = false;
    } else {
      if (isFreeEpisodeFilterActive) {
        if (comicInfo.freedEpisodeSize < 3) {
          renderStatus = false;
        } else {
          renderStatus = true;
        }
      } else {
        renderStatus = true;
      }
    }
  }

  // 무료회차 3개 FILTER ON ACTIVE
  if (isFreeEpisodeFilterActive) {
    if (comicInfo.freedEpisodeSize < 3) {
      renderStatus = false;
    } else {
      if (isContinuesFilterActive) {
        if (comicInfo.contentsState === "completed") {
          renderStatus = false;
        } else {
          renderStatus = true;
        }
      }
      if (isCompletedFilterActive) {
        if (comicInfo.contentsState === "scheduled") {
          renderStatus = false;
        } else {
          renderStatus = true;
        }
      }
    }
  }
  const compareRank = (prev: number, current: number) => {
    let rankStatus = <i>-</i>;
    if (prev > current) {
      rankStatus = <i style={{ color: "red" }}>{`▲ ${prev - current}`}</i>;
    }
    if (prev < current) {
      rankStatus = <i style={{ color: "blue" }}>{`▼ ${current - prev}`}</i>;
    }
    return rankStatus;
  };

  const convertDate = (date: Period) => {
    let convertedDate = "";
    switch (date) {
      case "MON":
        convertedDate = "월요일";
        break;
      case "TUE":
        convertedDate = "화요일";
        break;
      case "WED":
        convertedDate = "수요일";
        break;
      case "THU":
        convertedDate = "목요일";
        break;
      case "FRI":
        convertedDate = "금요일";
        break;
      case "SAT":
        convertedDate = "토요일";
        break;
      case "SUN":
        convertedDate = "일요일";
        break;
    }

    return convertedDate;
  };

  const validateIfAuthor = (artist: Artist) => {
    return artist.role === "writer" ||
      artist.role === "painter" ||
      artist.role === "scripter"
      ? artist.name
      : "";
  };

  return renderStatus ? (
    <div className="itemContainer" ref={lastElementRef}>
      <div className="thumbnailImg">
        <img src={comicInfo.thumbnailSrc || ""} alt="thumnail" />
      </div>

      <div className="rankContainer">
        <div className="rankNumber">{comicInfo.currentRank}</div>
        <div className="rankStatus">
          {compareRank(comicInfo.previousRank, comicInfo.currentRank)}
        </div>
      </div>

      <div className="aboutItem">
        <div className="title">{comicInfo.title}</div>
        <div>
          {comicInfo.artists.length > 1
            ? comicInfo.artists.map((artist, idx) => {
                return comicInfo.artists.length - 1 !== idx
                  ? validateIfAuthor(artist) !== ""
                    ? `${idx === 0 ? "" : ", "}` + validateIfAuthor(artist)
                    : ""
                  : validateIfAuthor(artist);
              })
            : validateIfAuthor(comicInfo.artists[0])}
        </div>
        <div>{comicInfo.freedEpisodeSize}화 무료</div>
        <div>
          {comicInfo.contentsState === "completed" ? (
            "완결"
          ) : (
            <Fragment>
              매주
              {comicInfo.schedule.periods.length > 1
                ? comicInfo.schedule.periods.map((period, idx) => {
                    return comicInfo.schedule.periods.length - 1 === idx
                      ? ` ${convertDate(period)} `
                      : ` ${convertDate(period)}, `;
                  })
                : ` ${convertDate(comicInfo.schedule.periods[0])} `}
              연재
            </Fragment>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      <div ref={lastElementRef}></div>
    </>
  );
}

export default React.memo(Item);
