<script>
    import { elasticIn, quintOut } from 'svelte/easing';
    import { draw, fade } from 'svelte/transition';
    import { expand } from './transitions'
</script>

<svg viewBox="46.83 106.92 88.48 86.19">
    <g out:fade="{{duration: 1200}}">
      <ellipse style="fill:#00ffff;fill-opacity:0;stroke:#fffaff;stroke-width:7.332;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" in:expand="{{duration: 1200, delay: 1200, easing: quintOut}}" cx="91.070885" cy="150.01309" rx="40.574055" ry="39.429546"></ellipse>
      <g in:fade="{{duration: 500, delay: 100}}">
        <path style="fill:#00ffff;fill-opacity:0;stroke:#fffaff;stroke-width:4.323;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" in:draw="{{duration: 1100, delay: 100}}" d="M 65.519853,141.83701 A 31.589579,29.863394 0 0 1 83.92804,123.6729"></path>
      </g>
      <g in:fade="{{duration: 600, delay: 600}}">
        <path style="fill:#00ffff;fill-opacity:0;stroke:#fffaff;stroke-width:27.7115;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" in:draw="{{duration: 2000, delay: 700, easing: quintOut}}" d="M 388.23175,540.71277 217.00189,540.08122 303.16376,392.10759 Z" transform="matrix(0.17568139,0,0,0.1721789,37.937662,68.520131)"></path>
      </g>
    </g>
  </svg>

<style>
    svg {
        width: 100%;
    }
</style>