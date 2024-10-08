import gsap from "gsap";
/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates to the left or right enough, it will loop back to the other side
- Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
- The returned timeline will have the following methods added to it:
- next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
- current() - returns the current index (if an animation is in-progress, it reflects the final index)
- times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
*/
/**
 * @param {gsap.TweenTarget} items
 * @param {{ repeat?: any; paused?: any; speed?: any; snap?: any; paddingRight?: any; reversed?: any; }} config
 */
// @ts-ignore
export function horizontalLoop(items: gsap.TweenTarget, config: { repeat?: any; paused?: any; speed?: any; snap?: any; paddingRight?: any; reversed?: any; }) {
  items = gsap.utils.toArray(items);
  config = config || {};
  // @ts-ignore
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      // @ts-ignore
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    // @ts-ignore
    length = items.length,
    // @ts-ignore
    startX = items[0].offsetLeft,
    // @ts-ignore
    times = [],
    // @ts-ignore
    widths = [],
    // @ts-ignore
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (/** @type {any} */ v: any) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      // @ts-ignore
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        // @ts-ignore
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    // @ts-ignore
    items[length - 1].offsetLeft +
    // @ts-ignore
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    // @ts-ignore
    items[length - 1].offsetWidth *
      // @ts-ignore
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    // @ts-ignore
    item = items[i];
    // @ts-ignore
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      // @ts-ignore
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    // @ts-ignore
    tl.to(
      item,
      {
        // @ts-ignore
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            // @ts-ignore
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          // @ts-ignore
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  /**
   * @param {number} index
   * @param {gsap.TweenVars | undefined} vars
   */
  function toIndex(index: number, vars: gsap.TweenVars | undefined) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      // @ts-ignore
      time = times[newIndex];
    // @ts-ignore
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      // @ts-ignore
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      // @ts-ignore
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    // @ts-ignore
    return tl.tweenTo(time, vars);
  }
  // @ts-ignore
  tl.next = (/** @type {any} */ vars: any) => toIndex(curIndex + 1, vars);
  // @ts-ignore
  tl.previous = (/** @type {any} */ vars: any) => toIndex(curIndex - 1, vars);
  // @ts-ignore
  tl.current = () => curIndex;
  // @ts-ignore
  tl.toIndex = (/** @type {any} */ index: any, /** @type {any} */ vars: any) => toIndex(index, vars);
  // @ts-ignore
  tl.times = times;
  // @ts-ignore
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    // @ts-ignore
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}