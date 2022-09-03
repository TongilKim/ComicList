import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComicRankApiSuccessResponse, ComicRankItem } from "../types";

const initialState: Partial<
  ComicRankApiSuccessResponse & {
    isContinuesFilterActive: boolean;
    isCompletedFilterActive: boolean;
    isFreeEpisodeFilterActive: boolean;
  }
> = {
  hasNext: false,
  count: 0,
  data: [],
  isContinuesFilterActive: false,
  isCompletedFilterActive: false,
  isFreeEpisodeFilterActive: false,
};

const comicRankSlice = createSlice({
  name: "comicRank",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<ComicRankApiSuccessResponse | null>) {
      state.count = action.payload?.count as number;
      state.data = action.payload?.data as ComicRankItem[];
      state.hasNext = action.payload?.hasNext as boolean;
    },
    setContinuesItemFilter(state, action: PayloadAction<boolean>) {
      state.isContinuesFilterActive = action.payload;
    },
    setCompletedItemFilter(state, action: PayloadAction<boolean>) {
      state.isCompletedFilterActive = action.payload;
    },
    setFreeEpisodeItemFitler(state, action: PayloadAction<boolean>) {
      state.isFreeEpisodeFilterActive = action.payload;
    },
  },
});

export const {
  setData,
  setContinuesItemFilter,
  setCompletedItemFilter,
  setFreeEpisodeItemFitler,
} = comicRankSlice.actions;

export const store = configureStore({
  reducer: {
    comicRank: comicRankSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
