import React, { useEffect, useRef, useState } from "react";
import styles from "./app.module.css";
import Topbar from "components/pages/topbar";
import Landing from "components/pages/landing";
import barCfg from "configs/topbar";
import Gap from "components/pages/gap";
import Footer from "components/pages/footer";
import Map from "components/pages/map";
import pageDetector from "helpers/pages/pageDetector";
import smoothScroll from "helpers/animations/smoothScroll";

const App: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [resized, setResized] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<number>(0);
  const windowState = useRef<number>(0);
  const mainDiv = useRef<HTMLDivElement>(null);
  const pageRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const increaseState = () => {
    windowState.current += 1;
    setLoadingState(windowState.current);
  };

  const handleResize = () => {
    setResized(true);
    setTimeout(() => {
      setResized(false);
    }, 500);
  };

  const handleClick = (e: MouseEvent) => {
    if (e.y <= barCfg.height) {
      return;
    }
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 500);
  };

  useEffect(() => {
    const onResize = () => {
      handleResize();
    };

    const onClicked = (e: MouseEvent) => {
      handleClick(e);
    };

    onResize();

    window.addEventListener("resize", onResize);
    window.addEventListener("click", onClicked);
    // const script = document.createElement("script");
    // script.src =
    //   "https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@v6.6/mapsJavaScriptAPI.js";
    // script.defer = true;
    // script.async = true;
    // document.body.appendChild(script);
    // console.log("script loaded");

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClicked);
      // document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const closure = pageDetector({
      mainPage: mainDiv,
      pageRefs: pageRefs,
      callback: (page: number) => {
        setPage(page);;
      },
    });

    return () => {
      closure();
    };
  }, []);

  const scrollPage = (index: number) => {
    const div = pageRefs[index].current;
    if (mainDiv.current && div && typeof div.offsetTop === "number") {
      smoothScroll({
        y: div.offsetTop - barCfg.height,
        duration: 1500,
        element: mainDiv.current,
      });
    }
  };

  return (
    <div className={styles.Canvas}>
      <div className={styles.Container} ref={mainDiv}>
        <Topbar page={page} setPage={scrollPage} clicked={clicked} />
        <Landing
          active={page === 0}
          resized={resized}
          page={page}
          reference={pageRefs[0]}
          onLoad={increaseState}
        />
        <Gap />
        <Map
          active={page === 1}
          resized={resized}
          page={page}
          reference={pageRefs[1]}
          onLoad={increaseState}
        />
      </div>
    </div>
  );
};

export default App;
