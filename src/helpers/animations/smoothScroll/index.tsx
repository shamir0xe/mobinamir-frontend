interface ScrollPramas {
  element: HTMLDivElement;
  duration?: number;
  x?: number;
  y?: number;
}

const smoothScroll = (params: ScrollPramas) => {
  let startTime: number;
  const { duration = 2000, element } = params;
  let initX: number = element.scrollLeft;
  let initY: number = element.scrollTop;
  const { x = initX, y = initY } = params;

  const scrollOnNextTick = (timestamp: number) => {
    let ratio: number = (timestamp - startTime) / duration;
    if (ratio < 1.0) {
      // console.log(`scrolling, ratio = ${ratio}`);
      element.scrollTo(
        initX + (x - initX) * ratio,
        initY + (y - initY) * ratio,
      );
      requestAnimationFrame(scrollOnNextTick);
    } else {
      // completed
    }
  };

  requestAnimationFrame((timestamp) => {
    startTime = timestamp;
    scrollOnNextTick(timestamp);
  });
};

export default smoothScroll;
