import { RefObject, useEffect, useRef } from "react";
import classes from "./footer.module.css";
// import { updateInnerHtmlFromFile } from "helpers/utils";
import contents from "./contents";

interface FooterProps {
  active: boolean;
  page: number;
  onLoad: Function;
  reference: RefObject<HTMLDivElement>;
}

const Footer = (props: FooterProps) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // updateInnerHtmlFromFile(contents.txts.title, containerRef, "0");
    props.onLoad();
  }, []);

  const socials = () => {
    return contents.socials.map((item, index) => {
      return (
        <a
          key={`logo-${index}`}
          className={classes.LogoWrapper}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={classes.Logo}
            src={item.logo.src}
            alt={item.logo.alt}
          />
        </a>
      );
    });
  };

  return (
    <section className={classes.Section} ref={props.reference}>
      <div className={classes.Background}></div>
      <div className={classes.Container} ref={containerRef}>
        <p />
        <nav className={classes.Navigator}>{socials()}</nav>
      </div>
    </section>
  );
};

export default Footer;
