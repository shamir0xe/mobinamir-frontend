const imgPack = (src: string, alt: string) => {
  return {
    src: require("../../../assets/" + src),
    alt: alt,
  };
};

export { imgPack };
