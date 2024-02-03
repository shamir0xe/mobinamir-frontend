import React, { RefObject, useEffect, useState, useRef } from "react";
import styles from "./landing.module.css";
import contents from "./contents";
import { appendConditionalClass, updateInnerHtmlFromFile } from "helpers/utils";

interface LandingProps {
  onLoad: Function;
  reference: RefObject<HTMLDivElement>;
  active?: boolean;
  page?: number;
  resized?: boolean;
}

const Landing = (props: LandingProps) => {
  const [clicked, setClicked] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const poetRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.onLoad();
  }, []);

  useEffect(() => {
    updateInnerHtmlFromFile(contents.txts.title, titleRef, "0");
    updateInnerHtmlFromFile(contents.txts.poet, poetRef, "0");
    updateInnerHtmlFromFile(contents.txts.schedule.date, scheduleRef, "0");
    updateInnerHtmlFromFile(contents.txts.schedule.time, scheduleRef, "1");
    updateInnerHtmlFromFile(contents.txts.schedule.location, locationRef, "0");
  }, [props.resized]);

  const startMotion = () => {
    if (clicked) return;
    console.log("motion started");
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 5000);
  };

  return (
    <section className={styles.Section} ref={props.reference}>
      <div className={styles.Background}>
        <img
          src={contents.imgs.backgrounds.main.src}
          alt={contents.imgs.backgrounds.main.alt}
        />
        <div className={styles.FlowerTop}>
          <img
            src={contents.imgs.flowers.upleft.src}
            alt={contents.imgs.flowers.upleft.alt}
          />
        </div>
        <div className={styles.FlowerBot}>
          <img
            src={contents.imgs.flowers.downright.src}
            alt={contents.imgs.flowers.downright.alt}
          />
        </div>
      </div>
      <div className={styles.Container}>
        <div
          className={appendConditionalClass(true, styles.Text, styles.Title)}
          ref={titleRef}
        >
          <p />
        </div>
        <div
          className={appendConditionalClass(true, styles.Text, styles.Poet)}
          ref={poetRef}
        >
          <p />
        </div>
        <div
          className={appendConditionalClass(true, styles.Text, styles.Schedule)}
          ref={scheduleRef}
        >
          <p />
          <p />
        </div>
        <div
          className={appendConditionalClass(true, styles.Text, styles.Location)}
          ref={locationRef}
        >
          <p />
        </div>
      </div>
    </section>
  );
};

export default Landing;
