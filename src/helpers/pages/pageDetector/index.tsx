import range from "helpers/arrays/range";
import { RefObject } from "react";

interface PageDetectorParams {
  mainPage: RefObject<HTMLElement>;
  pageRefs: RefObject<HTMLElement>[];
  callback?: Function;
}

enum OffsetTypes {
  TOP,
  BOTTOM,
  HEIGHT,
}

const pageDetector = (params: PageDetectorParams) => {
  const { mainPage, pageRefs, callback = () => {} } = params;
  const pageOffsets = getOffsets(pageRefs);
  let offset = null;
  const onScroll = () => {
    const component = mainPage.current;
    if (component) {
      offset = component.scrollTop;
      let pagePrim = 1e-12;
      for (let i of range(pageRefs.length)) {
        if (offset * 2 > pageOffsets[i] + pageOffsets[i - 1]) {
          pagePrim =
            (2 * offset - pageOffsets[i] - pageOffsets[i - 1]) /
            (pageOffsets[i + 1] - pageOffsets[i - 1]);
          pagePrim += i;
        }
      }
      // console.log(pageOffsets);
      // console.log(pagePrim);
      pagePrim = Math.max(0, Math.floor(pagePrim) - 1);
      callback(pagePrim, offset);
    }
  };
  const setup = () => {
    if (mainPage.current) mainPage.current.addEventListener("scroll", onScroll);
  };
  const closure = () => {
    if (mainPage.current)
      mainPage.current.removeEventListener("scroll", onScroll);
  };
  closure();
  setup();
  return closure;
};

const getProperty = (
  ref: RefObject<HTMLElement>,
  type: OffsetTypes,
): number => {
  let obj = ref.current;
  if (obj) {
    switch (type) {
      case OffsetTypes.TOP:
        return obj.offsetTop;
      case OffsetTypes.HEIGHT:
        return obj.offsetHeight;
      default:
        return 0;
    }
  }
  return 0;
};

const getOffsets = (pageRefs: RefObject<HTMLElement>[]) => {
  const getOffset = (
    idx: number,
    type: OffsetTypes | null = OffsetTypes.TOP,
  ): number => {
    if (idx < 0) return 0;
    if (idx >= pageRefs.length || !pageRefs[idx] || !pageRefs[idx].current)
      return getOffset(idx - 1, OffsetTypes.BOTTOM);
    let ret = getProperty(pageRefs[idx], OffsetTypes.TOP);
    if (type === OffsetTypes.BOTTOM)
      ret += getProperty(pageRefs[idx], OffsetTypes.HEIGHT);
    return Math.floor(ret);
  };
  let res: number[] = [];
  res.push(getOffset(-1));
  for (let i in pageRefs) {
    res.push(getOffset(parseInt(i)));
  }
  res.push(getOffset(pageRefs.length));
  return res;
};

export default pageDetector;
