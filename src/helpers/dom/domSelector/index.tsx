import { RefObject } from "react";
const domSelector = (reference: RefObject<HTMLElement>, childMap: string) => {
  let children: number[] = childMap
    .split("-")
    .map((value: string) => parseInt(value));
  if (!reference || !reference.current) return null;
  let stack: (HTMLElement | null)[] = [reference.current];
  // console.log('children array' + children);
  for (let child of children) {
    const component = stack.pop();
    // console.log(component)
    if (component instanceof HTMLElement) {
      const childNode = component.childNodes[child];
      if (childNode instanceof HTMLElement) {
        stack.push(childNode);
      } else {
        return null;
      }
    } else {
      return null;
    }
    // console.log(component.childNodes[child])
  }
  return stack.pop();
};

export default domSelector;
