interface TransitionArrayParams {
  initArr: number[];
  destArr: number[];
  duration?: number;
  updateFn?: Function;
  closureFn?: Function;
}

const smoothTransitionArray = (params: TransitionArrayParams) => {
  let startTime: DOMHighResTimeStamp = 0;
  let {
    initArr,
    destArr,
    duration = 2000,
    updateFn = () => {},
    closureFn = () => {},
  } = params;

  // console.log(`init: ${initArr} dest: ${destArr}`);

  const updateOnNextTick = (timestamp: DOMHighResTimeStamp) => {
    let ratio = (timestamp - startTime) / duration;
    if (ratio >= 1) ratio = 1;
    let array = initArr.map((value, index) => {
      return value + ratio * (destArr[index] - value);
    });
    // console.log(`array: ${array} -- initarray: ${initArr}`)
    updateFn(array);
    if (ratio < 1 - 1e-9) {
      // still on it
      requestAnimationFrame(updateOnNextTick);
    } else {
      closureFn();
    }
  };

  requestAnimationFrame((timestamp: DOMHighResTimeStamp) => {
    startTime = timestamp;
    updateOnNextTick(timestamp);
  });
};

export default smoothTransitionArray;
