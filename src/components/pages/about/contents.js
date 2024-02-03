import { imgPack } from "src/helpers/imgs";

const contents = {
  imgs: {
    background: imgPack("backgrounds/about.webp", "about-bg"),
  },
  txts: {
    about: {
      title: "txts/about/title.htm",
      body: "txts/about/body.htm",
    },
    team: {
      title: "txts/team/title.htm",
      body: "txts/team/body.htm",
    },
  },
  team: [
    {
      title: "txts/cards/titles/0.htm",
      body: "txts/cards/bodys/0.htm",
      img: imgPack("pfps/cards/0.png", "0"),
    },
    {
      title: "txts/cards/titles/1.htm",
      body: "txts/cards/bodys/1.htm",
      img: imgPack("pfps/cards/1.png", "1"),
    },
    {
      title: "txts/cards/titles/2.htm",
      body: "txts/cards/bodys/2.htm",
      img: imgPack("pfps/cards/2.png", "2"),
    },
    {
      title: "txts/cards/titles/3.htm",
      body: "txts/cards/bodys/3.htm",
      img: imgPack("pfps/cards/3.png", "3"),
    },
    {
      title: "txts/cards/titles/4.htm",
      body: "txts/cards/bodys/4.htm",
      img: imgPack("pfps/cards/4.png", "4"),
    },
  ],
};

export default contents;
