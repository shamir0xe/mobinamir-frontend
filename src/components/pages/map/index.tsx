import React, { RefObject, useEffect, useState, useRef } from "react";
import styles from "./map.module.css";
import contents from "./contents";
import { appendConditionalClass, updateInnerHtmlFromFile } from "helpers/utils";
// import { APIProvider, Map as MAP } from "@vis.gl/react-google-maps";

interface MapProps {
  onLoad: Function;
  reference: RefObject<HTMLDivElement>;
  active?: boolean;
  page?: number;
  resized?: boolean;
}

const Map = (props: MapProps) => {
  const [clicked, setClicked] = useState(false);
  // let apiKey: string = process.env
  // .REACT_APP_PUBLIC_GOOGLE_MAP_API_KEY as string;
  // let map: google.maps.Map;
  const mapRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState<boolean>(false);
  const times = useRef<number>(0);
  let timer: NodeJS.Timeout;
  let map: google.maps.Map;
  let position = { lat: 35.77686006967169, lng: 51.42416627760114 };

  const loadMap = async () => {
    console.log("lets load the map");
    const { Map } = (await google.maps.importLibrary(
      "maps",
    )) as google.maps.MapsLibrary;
    map = new Map(mapRef.current as HTMLDivElement, {
      center: position,
      zoom: 18,
    });
  };

  const loadMarker = async () => {
    console.log("adding marker");
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker",
    )) as google.maps.MarkerLibrary;
    // adding marker
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: contents.txts.place,
    });
  };

  const checkMap = () => {
    console.log("1 checking map");
    clearTimeout(timer);
    console.log(`times ${times.current}`);
    try {
      if (!done && google && google.maps && google.maps.Map && mapRef.current) {
        if (times.current < 5) {
          loadMap();
          setDone(true);
          times.current += 1;
        }
        // return;
      }
    } catch (e) {
      setDone(false);
      times.current = 0;
      console.log(`error occured: ${e}`);
      // timer = setTimeout(() => checkMap(), 500);
      // return;
    }
    // if (!done) {
    if (times.current < 5) {
      timer = setTimeout(() => checkMap(), 500);
    } else {
      // dont load the marker
      // loadMarker();
    }
    // }
  };

  useEffect(() => {
    props.onLoad();
    timer = setTimeout(() => checkMap(), 500);
    console.log("reloading again");
    updateInnerHtmlFromFile(
      contents.txts.weddingWaitingRoom,
      paragraphRef,
      "0",
    );
    // enableGoogleMaps();
    // console.log(`apiKey = ${apiKey}`);
  }, []);

  const startMotion = () => {
    if (clicked) return;
    console.log("motion started");
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 5000);
  };

  return (
    // <APIProvider apiKey={apiKey}>
    <section className={styles.Section} ref={props.reference}>
      <div className={styles.Background}></div>
      <div className={styles.Container}>
        <div className={styles.Map} ref={mapRef} />
        <div className={styles.CatsWrapper}>
          <img src={contents.imgs.cats.src} alt={contents.imgs.cats.alt} />
        </div>
        <div className={styles.ParagraphWrapper} ref={paragraphRef}>
          <p />
        </div>
      </div>
    </section>
    // </APIProvider>
  );
};

export default Map;
