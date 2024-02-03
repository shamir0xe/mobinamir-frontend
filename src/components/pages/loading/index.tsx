import classes from "./loading.module.css";
import contents from "./contents";
import { useEffect } from "react";
import { useState } from "react";
import cfg from "configs/loading";

interface LoadingScreenProps {
  loadingState: number;
}

const LoadingSreen = (props: LoadingScreenProps) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const onLoad = () => {
    setPageLoaded(true);
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  useEffect(() => {
    console.log(`another page has been loaded: ${props.loadingState}`);
    setPercentage(Math.min(100, (props.loadingState / cfg.totalPages) * 100));
    if (props.loadingState >= cfg.totalPages) {
      setCompleted(true);
    }
  }, [props.loadingState]);

  return pageLoaded && completed ? (
    <div className={classes.None} />
  ) : (
    <section className={classes.Container}>
      <img
        src={contents.imgs.background.src}
        alt={contents.imgs.background.alt}
      />
      <p>Loading {`${percentage}%`}...</p>
    </section>
  );
};

export default LoadingSreen;
