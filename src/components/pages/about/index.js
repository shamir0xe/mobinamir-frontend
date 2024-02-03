import React, { useEffect, useRef } from "react";
import classes from "./about.module.css";
import contents from "./contents";
import {
  appendConditionalClass,
  updateInnerHtmlFromFile,
} from "src/helpers/utils";
import cfg from "src/configs/about";
import topbarCfg from "src/configs/topbar";
import getBoundings from "src/helpers/dom/getBoundings/index";
import range from "src/helpers/arrays/range/index";

const About = (props) => {
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  const cardsRef = useRef(null);
  const backgroundRef = useRef(null);

  const checkHeight = (idx) => {
    if (!cardsRef) return false;
    if (!cardsRef.current) return false;
    // if (!mobileView()) return false;
    return getBoundings(cardsRef, `${idx}`).top <= topbarCfg.height;
  };

  const mobileView = () => {
    return window.innerWidth < topbarCfg.mobileViewWidth;
  };

  const checkEnded = (idx) => {
    if (!cardsRef) return false;
    if (!cardsRef.current) return false;
    const boundings = getBoundings(cardsRef, `${idx}`);
    return (
      boundings.top + boundings.height <
      window.innerWidth * cfg.secondDivPercentage * cfg.imgWidthPercentage +
        topbarCfg.height
    );
  };

  const cards = () => {
    return contents.team.map((person, index) => {
      return (
        <div className={classes.Card} key={`card-${index}`}>
          <div className={classes.CardTextWrapper}>
            <p />
            <p />
          </div>
          <div
            className={appendConditionalClass(
              checkHeight(index),
              checkEnded(index) ? classes.StickBottom : classes.StickTop,
              classes.CardImageWrapper,
            )}
          >
            <img src={person.img.src} alt={person.img.alt} />
          </div>
        </div>
      );
    });
  };

  const modifier = () => {
    if (window.innerWidth < 300) return 0.55;
    if (window.innerWidth < 380) return 0.58;
    if (window.innerWidth < 470) return 0.6;
    if (window.innerWidth < 700) return 0.62;
    return 0.66;
  };

  useEffect(() => {
    const setHeight = () => {
      backgroundRef.current.style.height = `${
        getBoundings(props.reference, "1").height * modifier()
      }px`;
      // console.log('Hooray!')
    };
    let timeout = setTimeout(setHeight, 500);
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(setHeight, 500);
    };

    // fetching data: {texts and cards}
    updateInnerHtmlFromFile(
      contents.txts.about.title,
      aboutRef,
      "0",
      resetTimeout,
    );
    updateInnerHtmlFromFile(
      contents.txts.about.body,
      aboutRef,
      "1",
      resetTimeout,
    );
    updateInnerHtmlFromFile(
      contents.txts.team.title,
      teamRef,
      "0",
      resetTimeout,
    );
    updateInnerHtmlFromFile(
      contents.txts.team.body,
      teamRef,
      "1",
      resetTimeout,
    );
    for (let i in contents.team) {
      updateInnerHtmlFromFile(
        contents.team[i].title,
        cardsRef,
        `${i}-0-0`,
        resetTimeout,
      );
      updateInnerHtmlFromFile(
        contents.team[i].body,
        cardsRef,
        `${i}-0-1`,
        resetTimeout,
      );
    }
    props.onLoad();
    return clearTimeout(timeout);
  }, [props.resized]);

  const backgrounds = () => {
    return range(10).map((idx) => (
      <img
        key={`bg-${idx}`}
        src={contents.imgs.background.src}
        alt={contents.imgs.background.alt}
        className={classes.BackgroundImg}
      />
    ));
  };

  return (
    <section className={classes.Section} ref={props.reference}>
      <div className={classes.Background} ref={backgroundRef}>
        {/* {backgrounds()} */}
      </div>

      <div className={classes.Container}>
        <div className={classes.Text} ref={aboutRef}>
          <p />
          <p />
        </div>
        <div className={classes.Text} ref={teamRef}>
          <p />
          <p />
        </div>
        <div className={classes.CardsHolder} ref={cardsRef}>
          {cards()}
        </div>
      </div>
    </section>
  );
};

export default About;
