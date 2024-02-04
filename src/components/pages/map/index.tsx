import React, { RefObject, useEffect, useState, useRef } from "react";
import styles from "./map.module.css";
import contents from "./contents";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { appendConditionalClass, updateInnerHtmlFromFile } from "helpers/utils";

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
  // const mapRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const locationWrapperRef = useRef<HTMLDivElement>(null);
  // const [done, setDone] = useState<boolean>(false);
  // const times = useRef<number>(0);
  // let timer: NodeJS.Timeout;
  // let map: google.maps.Map;
  // let position = { lat: 35.77686006967169, lng: 51.42416627760114 };
  //
  // const loadMap = async () => {
  //   console.log("lets load the map");
  //   const { Map } = (await google.maps.importLibrary(
  //     "maps",
  //   )) as google.maps.MapsLibrary;
  //   map = new Map(mapRef.current as HTMLDivElement, {
  //     center: position,
  //     zoom: 18,
  //   });
  // };
  //
  // const loadMarker = async () => {
  //   console.log("adding marker");
  //   const { AdvancedMarkerElement } = (await google.maps.importLibrary(
  //     "marker",
  //   )) as google.maps.MarkerLibrary;
  //   // adding marker
  //   const marker = new AdvancedMarkerElement({
  //     map: map,
  //     position: position,
  //     title: contents.txts.place,
  //   });
  // };
  //
  // const checkMap = () => {
  //   console.log("1 checking map");
  //   clearTimeout(timer);
  //   console.log(`times ${times.current}`);
  //   try {
  //     if (!done && google && google.maps && google.maps.Map && mapRef.current) {
  //       if (times.current < 5) {
  //         loadMap();
  //         setDone(true);
  //         times.current += 1;
  //       }
  //       // return;
  //     }
  //   } catch (e) {
  //     setDone(false);
  //     times.current = 0;
  //     console.log(`error occured: ${e}`);
  //     // timer = setTimeout(() => checkMap(), 500);
  //     // return;
  //   }
  //   // if (!done) {
  //   if (times.current < 5) {
  //     timer = setTimeout(() => checkMap(), 500);
  //   } else {
  //     // dont load the marker
  //     // loadMarker();
  //   }
  //   // }
  // };

  useEffect(() => {
    props.onLoad();
    // timer = setTimeout(() => checkMap(), 500);
    // console.log("reloading again");
    updateInnerHtmlFromFile(
      contents.txts.weddingWaitingRoom,
      paragraphRef,
      "0",
    );
    updateInnerHtmlFromFile(
      contents.txts.weddingLocationInvitation,
      locationWrapperRef,
      "0",
    );

    // enableGoogleMaps();
    // console.log(`apiKey = ${apiKey}`);
  }, []);

  return (
    // <APIProvider apiKey={apiKey}>
    <section className={styles.Section} ref={props.reference}>
      <div className={styles.Background}></div>
      <div className={styles.Container}>
        <div className={styles.LocationWrapper} ref={locationWrapperRef}>
          <p />
          <p>
            <a
              className={styles.LocationImage}
              href="https://maps.app.goo.gl/BjEiroR8Ns8N3YqL8"
            >
              <FontAwesomeIcon icon={faMapMarker} colorProfile={"red"} />
            </a>
          </p>
        </div>
        <div className={styles.MapWrapper}>
          <iframe
            className={styles.Map}
            title="Mobinamir Wedding"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252.68065187332317!2d51.424350015672914!3d35.776768860024106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0758f4e29c8b%3A0xac149df39a9db970!2sBarncafe!5e0!3m2!1sen!2s!4v1707006764636!5m2!1sen!2s"
            width={"100%"}
            height={"100%"}
            allowFullScreen={true}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
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
