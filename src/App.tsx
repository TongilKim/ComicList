import { Fragment, useEffect, useState, useCallback, useRef } from "react";
import { getDataApi } from "./apis";
import "./App.css";
import FilterItems from "./components/Filter/FilterItems";
import Item from "./components/Item/Item";
import Title from "./components/Title/Title";
import { setData } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ComicRankApiSuccessResponse, ComicRankItem } from "./types";

function App() {
  // LOCAL STATE
  const [pageNum, setPageNum] = useState(1);
  const [scrollBtnVisible, setScrollBtnVisible] = useState(false);
  const observer: any = useRef();

  // STORE STATE
  const dispatch = useAppDispatch();
  const {
    data,
    isContinuesFilterActive,
    isCompletedFilterActive,
    isFreeEpisodeFilterActive,
  } = useAppSelector((state) => state.comicRank);

  const lastItemElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNum((prevPageNum) =>
          prevPageNum < 5 ? prevPageNum + 1 : prevPageNum
        );
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, []);

  const initData = useCallback(async () => {
    getDataApi(pageNum).then((res: ComicRankApiSuccessResponse) => {
      let newData: ComicRankApiSuccessResponse = {
        hasNext: res?.hasNext,
        count: res?.count,
        data: data?.concat(res.data) as ComicRankItem[],
      };
      dispatch(setData(newData));
    });
  }, [pageNum]);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setScrollBtnVisible(true);
    } else if (scrolled <= 300) {
      setScrollBtnVisible(false);
    }
  };

  const onClickScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    initData();
  }, [
    pageNum,
    isContinuesFilterActive,
    isCompletedFilterActive,
    isFreeEpisodeFilterActive,
  ]);

  window.addEventListener("scroll", toggleVisible);

  return (
    <Fragment>
      <div className="app">
        <Title title="로맨스" />
        <FilterItems />
        <Fragment>
          {data?.map((comicInfo, idx) => {
            if (data.length === idx + 1) {
              return (
                <Item
                  lastElementRef={lastItemElementRef}
                  key={idx}
                  comicInfo={comicInfo}
                />
              );
            } else {
              return <Item key={idx} comicInfo={comicInfo} />;
            }
          })}
        </Fragment>
      </div>
      {scrollBtnVisible ? (
        <div className="scrollBtn" onClick={onClickScrollToTop}>
          ▲
        </div>
      ) : null}
    </Fragment>
  );
}

export default App;
