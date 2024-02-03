import { imgPack } from "helpers/imgs";

const contents = {
  imgs: {
    redButton: imgPack("logos/button.png", "button"),
    intro: imgPack("backgrounds/intro.webp", "intro"),
    flowers: {
      upleft: imgPack("backgrounds/flower-upleft.webp", "flower-upleft"),
      downright: imgPack(
        "backgrounds/flower-downright.webp",
        "flower-downright",
      ),
    },
    backgrounds: {
      main: imgPack("backgrounds/background.webp", "landing"),
      staticLeaves: imgPack(
        "backgrounds/landing/leaves.first.jpg",
        "leaves-static",
      ),
      staticRiver: imgPack(
        "backgrounds/landing/river.first.jpg",
        "river-static",
      ),
      staticLantern: imgPack(
        "backgrounds/landing/lantern.first.jpg",
        "lantern-static",
      ),
    },
  },
  txts: {
    title: "txts/title.htm",
    poet: "txts/poet.htm",
    schedule: {
      date: "txts/schedule/date.htm",
      time: "txts/schedule/time.htm",
      location: "txts/schedule/location.htm",
    },
  },
  motions: {
    lantern: imgPack("motions/lantern.gif", "lantern"),
    river: imgPack("motions/river.gif", "river"),
    leaves: imgPack("motions/leaves.gif", "leaves"),
    redButton: imgPack("motions/redButton.gif", "button"),
  },
};

export default contents;
