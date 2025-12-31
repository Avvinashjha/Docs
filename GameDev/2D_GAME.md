# JS Game Dev

## Phase 0: Prerequisites (Must-have)

Before Canvas/SVG, make sure you’re comfortable with:

### JavaScript fundamentals

* Variables, functions, loops
* Arrays & objects
* Arrow functions
* `requestAnimationFrame`
* Events (keyboard, mouse, touch)
* ES modules (`import / export`)

👉 If you’re weak here, **pause and fix JS first**, or Canvas will feel painful.

---

## Phase 1: Graphics Basics (Canvas vs SVG)

### Learn the difference first

| Canvas                | SVG                    |
| --------------------- | ---------------------- |
| Pixel-based           | Vector-based           |
| Best for games        | Best for UI, diagrams  |
| Very fast rendering   | Easier interaction     |
| You redraw everything | Browser handles redraw |

**Rule of thumb:**
👉 **Use Canvas for games**, SVG for menus, HUDs, editors.

---

## Phase 2: HTML Canvas Fundamentals

### Core concepts

Learn these **in order**:

1. Canvas setup

```html
<canvas id="game" width="800" height="600"></canvas>
```

2. Drawing primitives

* `fillRect`, `strokeRect`
* `beginPath`, `arc`, `lineTo`
* Colors & gradients

3. Coordinate system

* Origin `(0,0)`
* Screen vs world coordinates

4. Clearing & redrawing

```js
ctx.clearRect(0, 0, canvas.width, canvas.height)
```

5. Animation loop

```js
function loop() {
  update()
  render()
  requestAnimationFrame(loop)
}
```

🎯 **Mini projects**

* Bouncing ball
* Drawing app
* Moving square with keyboard

---

## Phase 3: Game Loop & Timing

### Game loop essentials

* Fixed vs variable timestep
* Delta time (`dt`)
* Separating logic and rendering

```js
let last = 0
function loop(time) {
  const dt = (time - last) / 1000
  last = time
  update(dt)
  render()
  requestAnimationFrame(loop)
}
```

🎯 **Mini projects**

* Smooth movement
* Frame-independent speed

---

## Phase 4: Input Handling

### Keyboard & mouse

* `keydown`, `keyup`
* Input state (not events-only)
* Mouse position relative to canvas

```js
keys[e.key] = true
```

🎯 **Mini projects**

* Top-down movement
* Mouse-aimed shooting

---

## Phase 5: Sprites & Animation

### Sprite fundamentals

* Loading images
* Sprite sheets
* Frame-based animation
* Flipping & scaling

```js
ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
```

🎯 **Mini projects**

* Animated character
* Walking / idle animations

---

## Phase 6: Collision Detection (Critical)

### Learn these types

1. AABB (rectangle-rectangle)
2. Circle collision
3. Point collision
4. Tilemap collision

```js
a.x < b.x + b.w &&
a.x + a.w > b.x &&
a.y < b.y + b.h &&
a.y + a.h > b.y
```

🎯 **Mini projects**

* Platformer collisions
* Bullet-enemy collision

---

## Phase 7: Camera & World Systems

### Concepts

* World vs screen space
* Camera offset
* Following player
* Parallax scrolling

🎯 **Mini projects**

* Scrolling map
* Camera shake effect

---

## Phase 8: Game Architecture (Very Important)

### Structure your code

* Entities / components
* Scene management
* Object pooling
* State machines

Example structure:

```
src/
 ├─ engine/
 ├─ entities/
 ├─ scenes/
 ├─ input/
 └─ main.js
```

🎯 **Mini projects**

* Pause menu
* Multiple levels
* Scene transitions

---

## Phase 9: SVG (Secondary but Useful)

### SVG essentials

* Paths, shapes
* ViewBox
* CSS styling
* Animations
* Mouse interactions

### Use SVG for:

* Menus
* HUD
* Level editors
* Icons

🎯 **Mini projects**

* SVG-based game menu
* Map editor using SVG

---

## Phase 10: Performance & Polish

### Learn optimization

* Offscreen canvas
* Dirty rectangles
* Image batching
* Reducing draw calls

### Polish features

* Screen shake
* Particles
* Sound effects
* Fullscreen & scaling

---

## Phase 11: Build Complete Games

### Recommended progression

1. Pong
2. Breakout
3. Snake
4. Top-down shooter
5. Platformer
6. Mini roguelike

---

## Optional: Libraries (After Fundamentals)

**Only after you understand raw Canvas**

* Phaser.js (most popular)
* Kontra.js (lightweight)
* PixiJS (rendering-focused)

👉 Libraries make sense *after* fundamentals.

---

## Learning Resources

### Docs

* MDN Canvas API
* MDN SVG Guide

### YouTube

* “Chris Courses” (Canvas games)
* “Frank’s Laboratory”
* “Coding Math”

### Practice

* itch.io game jams
* CodePen Canvas challenges

---

## Estimated Timeline

* Basics: 2–3 weeks
* Core game skills: 1–2 months
* First real game: ~3 months
* Confident dev: ~6 months

---

## Next Step (Actionable)

If you want, I can:

* Create a **30-day daily plan**
* Design a **first game project step-by-step**
* Help you **set up a simple game engine skeleton**
* Recommend **best beginner game ideas**

