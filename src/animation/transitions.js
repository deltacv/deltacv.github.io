import { cubicOut } from 'svelte/easing';

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

	return {
		delay,
		duration,
		easing,
		css: t => `
			${startX == "vcenter" ? "left: 50vw;" : ""}
			${startY == "vcenter" ? "top: 50vh;" : ""}

			transform: ${transform} translate(${startX == "vcenter" ? `-50%` : `${startX - startX * t}px`}, ${"vcenter" ? `-50%` : `${startX - startX * t}px`});
		`
	};
}