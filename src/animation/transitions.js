import { cubicOut, fly } from 'svelte/easing';

export function expand(node, params) {
	const {
		delay = 0,
		duration = 400,
		easing = cubicOut
	} = params;

	const w = parseFloat(getComputedStyle(node).strokeWidth);

	return {
		delay,
		duration,
		easing,
		css: t => `opacity: ${t}; stroke-width: ${t * w}`
	};
}

export function reverseFly(node, params) {
	const {
		delay = 0,
		duration = 400,
		easing = cubicOut,
		startX = 0,
		startY = 0
	} = params
	
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	node.style.transform = "${transform} translate(${startX}px, ${startY}px);";

	return {
		delay,
		duration,
		easing,
		css: t => `transform: ${transform} translate(${startX - startX * t}px, ${startY - startY * t}px)`
	};
}