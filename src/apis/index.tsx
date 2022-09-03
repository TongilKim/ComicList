import {
  ComicRankApiSuccessResponse,
  ComicRankApiFailResponse,
  ComicRankItem,
} from "../types";
import axios from "axios";

export const getDataApi = async (pageNum: number) => {
  let data = {
    hasNext: false,
    count: 0,
    data: [] as ComicRankItem[],
  };

  try {
    await axios({
      method: "GET",
      url: `./data/page_${pageNum}.json`,
    }).then((res) => {
      data = res.data as ComicRankApiSuccessResponse;
    });
  } catch (error) {
    let errorMsg = error as ComicRankApiFailResponse;
    console.log("error: ", errorMsg.error);
  }

  return data;
};
