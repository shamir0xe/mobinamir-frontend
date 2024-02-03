import { imgPack } from "helpers/imgs";

const contents = {
  imgs: {
    logo: imgPack("backgrounds/catwedding.png", "logo"),
  },
  txts: {
    items: ["کارت دعوت", "نقشه"],
  },
  socials: [
    {
      url: "https://discord.com",
      logo: imgPack("logos/socials/discord.png", "discord"),
    },
    {
      url: "https://www.twitter.com",
      logo: imgPack("logos/socials/twitter.png", "twitter"),
    },
    {
      url: "https://www.youtube.com",
      logo: imgPack("logos/socials/youtube.png", "youtube"),
    },
    {
      url: "https://www.medium.com",
      logo: imgPack("logos/socials/medium.png", "medium"),
    },
  ],
};

export default contents;
