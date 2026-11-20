// Generates assets/shizuku.svg — run: node assets/draw.js
const fs = require('fs');
const path = require('path');

const C = {
  line: '#2b2024',
  skin: '#fff6f7',
  hair: '#f6b3c3',
  hairDark: '#e98fa6',
  glass: '#caa066',
  heart: '#7fdde6',
  blush: '#f79ab0',
  mouth: '#e5627b',
  tongue: '#f8a5b4',
  orange: '#f6994f',
  orangeLight: '#ffc58f',
  cream: '#fde7a6',
};

const heart = (x, y, s) =>
  `<path class="heart" d="M${x} ${y + 6 * s} C${x - 9 * s} ${y - 1 * s}, ${x - 6 * s} ${y - 9 * s}, ${x} ${y - 4 * s} C${x + 6 * s} ${y - 9 * s}, ${x + 9 * s} ${y - 1 * s}, ${x} ${y + 6 * s} Z" fill="${C.heart}" stroke="${C.line}" stroke-width="2"/>`;

const orange = (cx, cy, r, i) => `
  <g class="orange" style="animation-delay:${i * 0.25}s">
    <path d="M${cx - r} ${cy} C${cx - r} ${cy - r * 1.05}, ${cx + r} ${cy - r * 1.05}, ${cx + r} ${cy} C${cx + r} ${cy + r * 0.95}, ${cx - r} ${cy + r * 0.95}, ${cx - r} ${cy} Z" fill="${C.orange}"/>
    <ellipse cx="${cx - r * 0.35}" cy="${cy - r * 0.35}" rx="${r * 0.28}" ry="${r * 0.16}" fill="${C.orangeLight}" transform="rotate(-25 ${cx - r * 0.35} ${cy - r * 0.35})"/>
    <path d="M${cx - 6} ${cy - r * 0.62} L${cx + 8} ${cy - r * 0.7}" stroke-width="3"/>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">
<style>
  .char { animation: bob 2.4s ease-in-out infinite; }
  .heart { transform-box: fill-box; transform-origin: center; animation: pulse 1.2s ease-in-out infinite; }
  .orange { animation: hop 1.6s ease-in-out infinite; }
  .snack { transform-box: fill-box; transform-origin: 20% 20%; animation: nom 0.8s ease-in-out infinite; }
  @keyframes bob { 50% { transform: translateY(-6px); } }
  @keyframes pulse { 50% { transform: scale(1.25); } }
  @keyframes hop { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }
  @keyframes nom { 50% { transform: rotate(-6deg); } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
<defs>
  <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="7"/>
    <feDisplacementMap in="SourceGraphic" scale="3"/>
  </filter>
  <filter id="soft"><feGaussianBlur stdDeviation="5"/></filter>
  <clipPath id="mouthClip"><path d="M288 302 Q330 314 378 298 Q374 362 332 368 Q290 364 288 302 Z"/></clipPath>
</defs>
<g filter="url(#sketch)" stroke="${C.line}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">
 <g class="char">
  <!-- twin tails (behind body) -->
  <path d="M206 150 C120 170 88 240 92 300 C94 332 62 344 52 374 C42 404 64 424 50 450 C40 472 58 492 86 482 C104 474 98 452 106 432 C118 406 102 386 118 360 C132 338 144 318 176 300 Z" fill="${C.hair}"/>
  <path d="M120 300 C110 330 90 345 82 372 M80 410 C88 430 80 450 76 470" stroke="${C.hairDark}" stroke-width="3"/>
  <path d="M458 150 C544 170 576 240 572 300 C570 332 602 344 612 374 C622 404 600 424 614 450 C624 472 606 492 578 482 C560 474 566 452 558 432 C546 406 562 386 546 360 C532 338 520 318 488 300 Z" fill="${C.hair}"/>
  <path d="M544 300 C554 330 574 345 582 372 M584 410 C576 430 584 450 588 470" stroke="${C.hairDark}" stroke-width="3"/>

  <!-- head + body -->
  <path d="M332 76 C440 74 520 150 516 270 C514 342 486 382 486 444 C486 522 474 582 400 602 L252 602 C196 590 182 530 184 452 C184 392 148 342 148 270 C148 150 228 78 332 76 Z" fill="${C.skin}"/>

  <!-- face -->
  <path d="M214 284 Q240 252 266 284 M394 284 Q420 252 446 284" stroke-width="5"/>
  <ellipse cx="216" cy="318" rx="26" ry="13" fill="${C.blush}" stroke="none" opacity="0.75" filter="url(#soft)"/>
  <ellipse cx="446" cy="318" rx="26" ry="13" fill="${C.blush}" stroke="none" opacity="0.75" filter="url(#soft)"/>
  <path d="M288 302 Q330 314 378 298 Q374 362 332 368 Q290 364 288 302 Z" fill="${C.mouth}"/>
  <ellipse cx="334" cy="372" rx="38" ry="26" fill="${C.tongue}" stroke="none" clip-path="url(#mouthClip)"/>
  <path d="M288 302 Q330 314 378 298 Q374 362 332 368 Q290 364 288 302 Z"/>

  <!-- hair cap with zigzag bangs -->
  <path d="M150 278 C148 152 230 80 332 78 C440 76 518 152 514 270 L482 196 L462 238 L432 168 L406 228 L376 160 L348 222 L322 158 L292 226 L266 166 L242 234 L216 172 L192 254 Z" fill="${C.hair}"/>
  <path d="M152 240 C166 280 170 320 180 356 C190 318 194 284 194 250 Z M512 240 C498 280 494 320 484 356 C474 318 470 284 470 250 Z" fill="${C.hair}"/>
  <path d="M220 120 C240 140 250 160 256 175 M440 120 C425 140 418 155 414 170" stroke="${C.hairDark}" stroke-width="3"/>

  <!-- ahoge -->
  <path d="M318 82 C296 44 306 12 344 20 C324 30 322 56 340 80" fill="${C.hair}"/>

  <!-- sunglasses on head -->
  <path d="M220 118 L252 112 M414 104 L448 112" stroke-width="3"/>
  <rect x="250" y="88" width="76" height="46" rx="18" fill="${C.glass}" transform="rotate(-4 288 111)"/>
  <rect x="340" y="82" width="76" height="46" rx="18" fill="${C.glass}" transform="rotate(-4 378 105)"/>
  <path d="M326 106 Q333 98 340 104" stroke-width="3"/>
  ${heart(288, 110, 1.5)}
  ${heart(378, 104, 1.5)}

  <!-- snack -->
  <g class="snack">
    <path d="M298 352 C318 306 434 336 438 428 C410 410 350 398 298 352 Z" fill="${C.orange}"/>
    <path d="M334 340 C370 336 404 360 418 396" stroke="${C.orangeLight}" stroke-width="5"/>
    <path d="M360 374 L372 352 M392 394 L404 372" stroke="${C.cream}" stroke-width="3"/>
  </g>
  <ellipse cx="304" cy="372" rx="16" ry="13" fill="${C.skin}" stroke-width="3.5"/>
  <ellipse cx="428" cy="430" rx="16" ry="13" fill="${C.skin}" stroke-width="3.5"/>

  <!-- oranges -->
  ${orange(282, 552, 58, 0)}
  ${orange(522, 538, 50, 2)}
  ${orange(412, 562, 58, 1)}
 </g>
</g>
</svg>
`;

fs.writeFileSync(path.join(__dirname, 'shizuku.svg'), svg);
console.log('wrote shizuku.svg');
