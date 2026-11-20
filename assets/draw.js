// Generates assets/shizuku.svg (永雏塔菲 eating mandarins) — run: node assets/draw.js
// Coordinates are traced from the 640x640 original.
const fs = require('fs');
const path = require('path');

const C = {
  line: '#1a1416',
  face: '#fdeff0',
  hair: '#f5bac4',
  glass: '#c0935a',
  heart: '#9be4ea',
  blush: '#f7a9b8',
  mouth: '#f08099',
  orange: '#f8a466',
  cream: '#fbe4a8',
};

const heart = (x, y, s) =>
  `<path class="heart" d="M${x} ${y + 8 * s} C${x - 12 * s} ${y}, ${x - 9 * s} ${y - 12 * s}, ${x} ${y - 5 * s} C${x + 9 * s} ${y - 12 * s}, ${x + 12 * s} ${y}, ${x} ${y + 8 * s} Z" fill="${C.heart}" stroke="none"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">
<style>
  .char { animation: bob 2.4s ease-in-out infinite; }
  .heart { transform-box: fill-box; transform-origin: center; animation: pulse 1.2s ease-in-out infinite; }
  @keyframes bob { 50% { transform: translateY(-5px); } }
  @keyframes pulse { 50% { transform: scale(1.2); } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
<defs><filter id="soft" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="7"/></filter></defs>
<g class="char" stroke="${C.line}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none">

  <!-- twin tails -->
  <path d="M66 288 C72 310 80 338 72 348 C55 356 30 366 27 385 C26 398 46 400 44 410 C38 420 10 422 4 438 C0 452 8 466 22 467 L48 467 C40 450 46 440 62 436 C86 432 104 424 112 404 C118 388 116 370 112 352 C110 338 112 330 120 322 Z" fill="${C.hair}"/>
  <path d="M520 214 C540 204 566 210 578 236 C584 252 582 270 592 282 C604 292 614 302 612 320 C610 334 600 340 604 352 C610 364 624 374 618 390 C614 398 608 402 604 404 C600 392 594 380 586 374 C574 364 586 352 578 344 C565 336 545 338 526 338 Z" fill="${C.hair}"/>
  <path d="M556 248 C566 272 572 296 590 308 M586 330 C578 340 572 350 566 352" stroke-width="4"/>

  <!-- head + body silhouette -->
  <path d="M78 200 C92 180 120 130 165 93 C200 72 270 52 335 47 C400 44 450 58 480 82 L500 110 C512 118 522 122 530 134 L562 162 L526 177 C520 210 518 260 520 300 C524 340 534 380 537 450 L470 552 L240 552 C205 540 172 520 172 490 C172 460 190 430 212 410 C226 396 232 370 230 346 C200 340 175 330 160 322 C150 312 130 300 120 322 L66 288 C80 270 96 250 100 205 Z" fill="${C.face}" stroke="none"/>

  <!-- hair cap (face shows through the bangs) -->
  <path d="M78 200 C92 180 120 130 165 93 C200 72 270 52 335 47 C400 44 450 58 480 82 L500 110 C512 118 522 122 530 134 L562 162 L526 177 C520 210 517 250 518 290 L522 338 L484 342 L478 270 L454 141 L427 184 L402 150 L380 132 L352 150 L315 208 L297 190 L228 188 L192 225 L170 160 L163 250 L160 322 L135 250 L122 194 Z" fill="${C.hair}" stroke="none"/>
  <path d="M100 205 C98 230 96 250 72 278 L66 300 L120 322 L160 322 L135 250 L122 194 Z" fill="${C.hair}" stroke="none"/>

  <!-- blush -->
  <ellipse cx="215" cy="290" rx="30" ry="20" fill="${C.blush}" stroke="none" filter="url(#soft)"/>
  <ellipse cx="452" cy="228" rx="28" ry="20" fill="${C.blush}" stroke="none" filter="url(#soft)"/>

  <!-- mouth -->
  <path d="M266 292 C300 290 345 280 372 262 C384 254 392 248 398 244 L402 284 C390 290 375 298 360 303 L300 322 C290 326 280 330 271 331 Z" fill="${C.mouth}" stroke="none"/>
  <path d="M262 294 C300 290 345 280 398 243 M264 280 L271 332 M240 342 C255 337 280 330 300 322 M358 302 C375 296 390 288 402 283 L462 219"/>

  <!-- outlines: head, hair, body -->
  <path d="M122 192 L78 200 C92 180 120 130 165 93 C200 72 270 52 335 47 C400 44 450 58 480 82 L500 110 C512 118 522 122 530 134 L562 162 L500 180"/>
  <path d="M100 205 C98 230 96 250 72 278 L66 300 M122 194 L135 250 L160 322 M170 160 L163 250 L161 320 M170 160 L192 225 L282 147"/>
  <path d="M526 177 C520 210 517 250 518 290 M505 160 C498 200 490 230 480 236 C460 248 440 260 420 270 M454 141 L476 210 L480 268 L484 342"/>
  <path d="M165 316 C190 328 215 338 240 342 M238 345 C255 352 280 362 303 372 M258 393 L305 384"/>
  <path d="M230 348 C232 370 228 390 212 410 C190 430 172 460 172 490 C172 515 200 535 238 548 M522 338 C530 370 536 410 537 450 M480 318 L485 362"/>

  <!-- bangs strands -->
  <path d="M197 182 C230 178 260 182 292 191 M267 108 L315 208 L372 118 M402 149 L454 141 L478 216 M402 154 L454 141"/>

  <!-- eyes (happy closed) -->
  <path d="M202 262 C215 238 250 222 289 258 M400 222 L432 182 M406 152 L478 216"/>

  <!-- ahoge -->
  <path d="M268 54 C268 30 280 10 298 4 C314 0 326 8 324 22 C322 32 319 40 320 50" fill="${C.hair}"/>

  <!-- sunglasses -->
  <path d="M180 92 L270 84 C278 90 280 100 274 108 C262 118 236 130 200 140 C188 134 180 118 180 92 Z" fill="${C.glass}"/>
  <path d="M336 76 L400 66 C420 68 436 76 440 88 C440 98 432 106 418 110 C395 116 368 118 346 120 C338 110 334 92 336 76 Z" fill="${C.glass}"/>
  ${heart(232, 106, 2.1)}
  ${heart(378, 92, 2.1)}
  <path d="M270 86 L336 80 M296 105 L310 103" />

  <!-- snack -->
  <path d="M297 340 C300 328 310 318 330 302 C342 300 356 302 372 308 C395 318 420 336 432 360 C445 374 462 384 472 400 C478 414 474 430 462 432 C452 432 446 424 436 418 C428 413 420 410 410 410 C390 414 370 420 345 418 C325 416 308 408 300 396 L307 377 L292 365 Z" fill="${C.orange}"/>
  <path d="M384 322 C398 320 420 334 432 346 C434 358 430 368 426 372 C410 370 398 368 392 364 C386 352 384 336 384 322 Z" fill="${C.cream}"/>
  <circle cx="349" cy="331" r="3.5" fill="${C.line}" stroke="none"/>
  <path d="M452 370 C462 368 474 370 486 382"/>

  <!-- mandarins: left, right, then middle in front -->
  <path d="M235 528 C238 505 260 485 295 472 C320 478 340 488 356 502 C352 530 352 556 352 570 C320 578 280 578 248 568 C238 558 234 545 235 528 Z" fill="${C.orange}"/>
  <path d="M296 492 L308 495"/>
  <path d="M466 476 C480 462 510 450 535 450 C555 455 572 475 576 500 C576 520 568 534 545 542 C520 548 490 550 470 550 Z" fill="${C.orange}"/>
  <path d="M510 481 L524 486"/>
  <path d="M356 500 C362 482 385 468 410 467 C435 467 455 474 462 486 C474 505 476 535 468 555 C460 575 430 595 400 602 C380 594 362 575 354 550 C350 535 350 515 356 500 Z" fill="${C.orange}"/>
  <path d="M406 490 L420 495"/>
</g>
</svg>
`;

fs.writeFileSync(path.join(__dirname, 'shizuku.svg'), svg);
console.log('wrote shizuku.svg');
