const readFile = (path: string, callback: Function) => {
  let url = require("../../../assets/" + path);
  fetch(url)
    .then((res) => res.text())
    .then((res) => callback(res));
};

export { readFile };
