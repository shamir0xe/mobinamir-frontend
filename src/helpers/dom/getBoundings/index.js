const getBoundings = (reference, childMap) => {
  let children = childMap.split("-").map((value) => parseInt(value));
  if (!reference || !reference.current) return null;
  let stack = [reference.current];
  for (let child of children) {
    const component = stack.pop();
    stack.push(component.children[child]);
  }
  let res = stack.pop();
  if (!res || !res.getBoundingClientRect) return null;
  // console.log(res.getBoundingClientRect())
  return res.getBoundingClientRect();
};

export default getBoundings;
