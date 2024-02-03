import React, { useEffect, useState } from "react";
import styles from "./topbar.module.css";
import contents from "./contents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { appendConditionalClass } from "helpers/utils";

interface TopbarProps {
  page: number;
  clicked: boolean;
  setPage: Function;
}

const Topbar = (props: TopbarProps) => {
  const [burger, setBurger] = useState(0);
  const [items, setItems] = useState([
    ...Array(contents.txts.items.length).keys(),
  ]);

  const appendBurger = (...inputClasses: string[]) => {
    return appendConditionalClass(
      burger === 1,
      styles.Responsive,
      ...inputClasses,
    );
  };

  const burgerToggle = () => {
    setBurger(1 - burger);
  };

  const burgerPress = (pressedIndex: number) => {
    console.log(`pressed the #${pressedIndex} from the list`);
    props.setPage(pressedIndex);
    setBurger(0);
  };

  useEffect(() => {
    if (props.page >= items.length) return;
    setItems([props.page, ...items.filter((value) => value !== props.page)]);
  }, [props.page]);

  useEffect(() => {
    if (props.clicked) {
      setBurger(0);
    }
  }, [props.clicked]);

  const elements = () => {
    return items.map((value, index) => {
      return (
        <button
          key={`btn-${index}`}
          className={appendBurger(styles.Items)}
          onClick={() => burgerPress(value)}
        >
          {contents.txts.items[value]}
        </button>
      );
    });
  };

  return (
    <header className={styles.Header}>
      <div className={styles.OpacityBackground} />
      <div className={styles.BlurBackground} />
      <div className={appendBurger(styles.Container)}>
        <img
          src={contents.imgs.logo.src}
          alt={contents.imgs.logo.alt}
          className={appendBurger(styles.Image)}
        />
        <nav className={appendBurger(styles.Navigator)}>
          <button
            className={appendBurger(styles.Items, styles.BurgerIcon)}
            onClick={burgerToggle}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {elements()}
        </nav>
      </div>
    </header>
  );
};

export default Topbar;
