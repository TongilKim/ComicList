import "./Filter.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setContinuesItemFilter,
  setCompletedItemFilter,
  setFreeEpisodeItemFitler,
} from "../../store";

import React from "react";

function FilterItems() {
  const dispatch = useAppDispatch();
  const {
    isContinuesFilterActive,
    isCompletedFilterActive,
    isFreeEpisodeFilterActive,
  } = useAppSelector((state) => state.comicRank);

  return (
    <div className="filterContainer">
      <div
        className="filterOption"
        onClick={() => {
          if (isCompletedFilterActive) {
            alert(' "완결" 필터가 활성화 되어 있습니다.');
          } else {
            dispatch(setContinuesItemFilter(!isContinuesFilterActive));
          }
        }}
        style={isContinuesFilterActive ? { borderColor: "red" } : {}}
      >
        연재 중
      </div>
      <div
        className="filterOption"
        onClick={() => {
          if (isContinuesFilterActive) {
            alert(' "연재 중" 필터가 활성화 되어 있습니다. ');
          } else {
            dispatch(setCompletedItemFilter(!isCompletedFilterActive));
          }
        }}
        style={isCompletedFilterActive ? { borderColor: "red" } : {}}
      >
        완결
      </div>
      <div
        className="filterOption"
        onClick={() => {
          dispatch(setFreeEpisodeItemFitler(!isFreeEpisodeFilterActive));
        }}
        style={isFreeEpisodeFilterActive ? { borderColor: "red" } : {}}
      >
        무료회차 3개
      </div>
    </div>
  );
}

export default React.memo(FilterItems);
