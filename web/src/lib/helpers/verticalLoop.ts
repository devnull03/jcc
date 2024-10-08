import gsap from "gsap";

/*
This helper function makes a group of elements animate along the y-axis in a seamless, responsive loop.

Features:
 - Uses yPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates up or down enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, enterAnimation, leaveAnimation, and paddingBottom.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
   - elements - an Array of the elements that are being controlled by the timeline
 */

/**
 * @param {gsap.TweenTarget} items
 * @param {{ onChange?: any; repeat?: any; paused?: any; center?: any; speed?: any; snap?: any; paddingBottom?: any; reversed?: any; draggable?: any; enterAnimation?: any; leaveAnimation?: any; }} config
 */
// @ts-ignore
function verticalLoop(items, config) {
	let timeline;
	items = gsap.utils.toArray(items);
	config = config || {};
	gsap.context(() => {
		/**
		 * @type {any[]}
		 */
		/**
		 * @type {number[]}
		 */
		/**
		 * @type {number[]}
		 */
		/**
		 * @type {any[]}
		 */
		/**
		 * @type {number}
		 */
		/**
		 * @type {(arg0: number) => gsap.Position | undefined}
		 */
		/**
		 * @type {string | object | null}
		 */
		let onChange = config.onChange,
			lastIndex = 0,
			tl = gsap.timeline({
				// @ts-ignore
				repeat: config.repeat, onUpdate: onChange && function () {
					let i = tl.closestIndex()
					if (lastIndex !== i) {
						lastIndex = i;
						// @ts-ignore
						onChange(items[i], i);
					}
				// @ts-ignore
				}, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
			}),
			// @ts-ignore
			length = items.length,
			// @ts-ignore
			startY = items[0].offsetTop,
			// @ts-ignore
			times = [],
			// @ts-ignore
			heights = [],
			// @ts-ignore
			spaceBefore = [],
			// @ts-ignore
			yPercents = [],
			curIndex = 0,
			center = config.center,
			clone = (/** @type {{ [x: string]: any; }} */ obj: { [x: string]: any; }) => {
				let result = {}, p;
				for (p in obj) {
					// @ts-ignore
					result[p] = obj[p];
				}
				return result;
			},
			pixelsPerSecond = (config.speed || 1) * 100,
			snap = config.snap === false ? (/** @type {any} */ v: any) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
			timeOffset = 0,
			// @ts-ignore
			container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
			// @ts-ignore
			totalHeight,
			// @ts-ignore
			getTotalHeight = () => items[length - 1].offsetTop + yPercents[length - 1] / 100 * heights[length - 1] - startY + spaceBefore[0] + items[length - 1].offsetHeight * gsap.getProperty(items[length - 1], "scaleY") + (parseFloat(config.paddingBottom) || 0),
			populateHeights = () => {
				let b1 = container.getBoundingClientRect(), b2;
				// @ts-ignore
				startY = items[0].offsetTop;
				// @ts-ignore
				items.forEach((/** @type {gsap.TweenTarget} */ el, /** @type {string | number} */ i) => {
					// @ts-ignore
					heights[i] = parseFloat(gsap.getProperty(el, "height", "px"));
					// @ts-ignore
					yPercents[i] = snap(parseFloat(gsap.getProperty(el, "y", "px")) / heights[i] * 100 + gsap.getProperty(el, "yPercent"));
					// @ts-ignore
					b2 = el.getBoundingClientRect();
					// @ts-ignore
					spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top);
					b1 = b2;
				});
				gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
					// @ts-ignore
					yPercent: i => yPercents[i]
				});
				totalHeight = getTotalHeight();
			},
			// @ts-ignore
			timeWrap,
			populateOffsets = () => {
				// @ts-ignore
				timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalHeight : 0;
				// @ts-ignore
				center && times.forEach((t, i) => {
					// @ts-ignore
					times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * heights[i] / 2 / totalHeight - timeOffset);
				});
			},
			getClosest = (/** @type {string | any[]} */ values: string | any[], /** @type {number} */ value: number, /** @type {number} */ wrap: number) => {
				let i = values.length,
					closest = 1e10,
					index = 0, d;
				while (i--) {
					d = Math.abs(values[i] - value);
					if (d > wrap / 2) {
						d = wrap - d;
					}
					if (d < closest) {
						closest = d;
						index = i;
					}
				}
				return index;
			},
			populateTimeline = () => {
				let i, item, curY, distanceToStart, distanceToLoop;
				tl.clear();
				for (i = 0; i < length; i++) {
					// @ts-ignore
					item = items[i];
					// @ts-ignore
					curY = yPercents[i] / 100 * heights[i];
					// @ts-ignore
					distanceToStart = item.offsetTop + curY - startY + spaceBefore[0];
					// @ts-ignore
					distanceToLoop = distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
					// @ts-ignore
					tl.to(item, { yPercent: snap((curY - distanceToLoop) / heights[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
						// @ts-ignore
						.fromTo(item, { yPercent: snap((curY - distanceToLoop + totalHeight) / heights[i] * 100) }, { yPercent: yPercents[i], duration: (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
						.add("label" + i, distanceToStart / pixelsPerSecond);
					times[i] = distanceToStart / pixelsPerSecond;
				}
				timeWrap = gsap.utils.wrap(0, tl.duration());
			},
			customAnimations = () => {
				let { enterAnimation, leaveAnimation } = config,
					// @ts-ignore
					eachDuration = tl.duration() / items.length;
				// @ts-ignore
				items.forEach((/** @type {any} */ item, /** @type {string | number} */ i) => {
					let anim = enterAnimation && enterAnimation(item, eachDuration, i),
						// @ts-ignore
						isAtEnd = anim && (tl.duration() - timeWrap(times[i] - Math.min(eachDuration, anim.duration())) < eachDuration - 0.05);
					// @ts-ignore
					anim && tl.add(anim, isAtEnd ? 0 : timeWrap(times[i] - anim.duration()));
					anim = leaveAnimation && leaveAnimation(item, eachDuration, i);
					// @ts-ignore
					isAtEnd = times[i] === tl.duration();
					anim && anim.duration() > eachDuration && anim.duration(eachDuration);
					// @ts-ignore
					anim && tl.add(anim, isAtEnd ? 0 : times[i]);
				});
			},
			refresh = (/** @type {boolean | undefined} */ deep: boolean | undefined) => {
				let progress = tl.progress();
				tl.progress(0, true);
				populateHeights();
				deep && populateTimeline();
				populateOffsets();
				customAnimations();
				// @ts-ignore
				deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
			},
			onResize = () => refresh(true),
			// @ts-ignore
			proxy;
		gsap.set(items, { y: 0 });
		populateHeights();
		populateTimeline();
		populateOffsets();
		customAnimations();
		window.addEventListener("resize", onResize);
		/**
		 * @param {number} index
		 * @param {gsap.TweenVars | undefined} vars
		 */
		function toIndex(index: number, vars: gsap.TweenVars | undefined) {
			// @ts-ignore
			vars = clone(vars);
			(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
			let newIndex = gsap.utils.wrap(0, length, index),
				// @ts-ignore
				time = times[newIndex];
			if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
				time += tl.duration() * (index > curIndex ? 1 : -1);
			}
			if (vars.revolutions) {
				time += tl.duration() * Math.round(vars.revolutions);
				delete vars.revolutions;
			}
			if (time < 0 || time > tl.duration()) {
				// @ts-ignore
				vars.modifiers = { time: timeWrap };
			}
			curIndex = newIndex;
			vars.overwrite = true;
			// @ts-ignore
			gsap.killTweensOf(proxy);
			return tl.tweenTo(time, vars);
		}
		tl.elements = items;
		tl.next = (/** @type {any} */ vars: any) => toIndex(curIndex + 1, vars);
		tl.previous = (/** @type {any} */ vars: any) => toIndex(curIndex - 1, vars);
		tl.current = () => curIndex;
		tl.toIndex = (/** @type {any} */ index: any, /** @type {any} */ vars: any) => toIndex(index, vars);
		tl.closestIndex = (/** @type {any} */ setCurrent: any) => {
			// @ts-ignore
			let index = getClosest(times, tl.time(), tl.duration());
			setCurrent && (curIndex = index);
			return index;
		};
		// @ts-ignore
		tl.times = times;
		tl.progress(1, true).progress(0, true); // pre-render for performance
		if (config.reversed) {
			// @ts-ignore
			tl.vars.onReverseComplete();
			tl.reverse();
		}
		if (config.draggable && typeof (Draggable) === "function") {
			proxy = document.createElement("div")
			/**
			 * @type {number}
			 */
			/**
			 * @type {number}
			 */
			/**
			 * @type {Draggable}
			 */
			// @ts-ignore
			let wrap = gsap.utils.wrap(0, 1),
				// @ts-ignore
				ratio, startProgress, draggable, dragSnap,
				// @ts-ignore
				align = () => tl.progress(wrap(startProgress + (draggable.startY - draggable.y) * ratio)),
				syncIndex = () => tl.closestIndex(true);
			typeof (InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://gsap.com/pricing");
			draggable = Draggable.create(proxy, {
				// @ts-ignore
				trigger: items[0].parentNode,
				type: "y",
				onPressInit() {
					gsap.killTweensOf(tl);
					startProgress = tl.progress();
					// @ts-ignore
					refresh();
					// @ts-ignore
					ratio = 1 / totalHeight;
					// @ts-ignore
					gsap.set(proxy, { y: startProgress / -ratio })
				},
				// @ts-ignore
				onDrag: align,
				// @ts-ignore
				onThrowUpdate: align,
				inertia: true,
				snap: value => {
					// @ts-ignore
					let time = -(value * ratio) * tl.duration(),
						// @ts-ignore
						wrappedTime = timeWrap(time),
						// @ts-ignore
						snapTime = times[getClosest(times, wrappedTime, tl.duration())],
						dif = snapTime - wrappedTime;
					Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
					// @ts-ignore
					return (time + dif) / tl.duration() / -ratio;
				},
				onRelease: syncIndex,
				onThrowComplete: syncIndex
			})[0];
			tl.draggable = draggable;
		}
		tl.closestIndex(true);
		// @ts-ignore
		onChange && onChange(items[curIndex], curIndex);
		timeline = tl;
		return () => window.removeEventListener("resize", onResize); // cleanup
	});
	return timeline;
}