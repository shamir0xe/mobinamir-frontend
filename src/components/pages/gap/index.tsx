import { useEffect } from "react";
import classes from "./gap.module.css";
import { useRef } from "react";

interface GapProps {
  height?: number;
}

const Gap = (props: GapProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.height && mainRef.current)
      mainRef.current.style.height = `${props.height}vh`;
  }, [props.height]);
  return (
    <div className={classes.Section} ref={mainRef}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Gap;
