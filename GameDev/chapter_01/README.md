
# HTML Canvas – Core Concepts 

## 1. What Canvas Really Is (Mental Model)

Understand **before coding**:

* Canvas = **bitmap drawing surface**
* Immediate mode rendering (no scene graph)
* Canvas does **not remember objects**
* You redraw the entire frame every time
* Difference between:

  * Canvas element
  * Drawing context (`2d`)

👉 Goal: Understand *why* Canvas is used for games.


## 2. Canvas Element & Context

Topics:

* `<canvas>` element attributes (`width`, `height`)
* CSS size vs actual resolution
* Device Pixel Ratio (DPR)
* Getting the 2D context
* Context state stack (`save()` / `restore()`)

Key idea:

> The canvas is just pixels — the context is the painter.


## 3. Coordinate System & Space

Extremely important for games.

Topics:

* Origin `(0,0)`
* X/Y direction
* Canvas coordinate space vs screen space
* Logical size vs physical pixels
* Scaling for different resolutions

Exercises:

* Draw a grid
* Visualize coordinates with text


## 4. Drawing Primitives

Learn every primitive **deeply**:

### Shapes

* Rectangles (`fillRect`, `strokeRect`, `clearRect`)
* Paths (`beginPath`, `closePath`)
* Lines (`moveTo`, `lineTo`)
* Circles & arcs (`arc`)

### Styles

* `fillStyle`
* `strokeStyle`
* `lineWidth`
* Line caps & joins

Key idea:

> Everything complex is built from these primitives.

---

## 5. Paths & State

Paths confuse beginners—master them early.

Topics:

* Path lifecycle
* Multiple paths vs single path
* When to use `beginPath`
* Filling vs stroking
* Path reuse pitfalls

Exercises:

* Draw shapes using only paths
* Layer multiple shapes correctly

---

## 6. Transformations (Very Important)

This unlocks rotation, scaling, camera movement.

Topics:

* `translate`
* `rotate`
* `scale`
* Transformation order
* Resetting transforms
* Using `save()` / `restore()`

Mental model:

> You move the **world**, not the object.

Exercises:

* Rotate a rectangle around its center
* Scale from origin vs center

---

## 7. Clearing & Redrawing

This is where Canvas becomes “game-like”.

Topics:

* `clearRect`
* Full redraw vs partial redraw
* Background clearing strategies
* Double buffering concept

Key idea:

> Every frame is a fresh painting.

---

## 8. Text Rendering

Often overlooked, still essential.

Topics:

* `fillText`, `strokeText`
* Fonts
* Alignment (`textAlign`, `textBaseline`)
* Measuring text (`measureText`)

Use cases:

* Score
* Debug info
* HUD

---

## 9. Images & Asset Loading

Critical for real games.

Topics:

* Loading images
* Handling async loading
* Drawing images
* Scaling images
* Image smoothing

Later:

* Sprite sheets
* Cropping images (`drawImage` 9-arg version)

---

## 10. Animation Fundamentals

This is where Canvas meets time.

Topics:

* `requestAnimationFrame`
* Frame rate vs refresh rate
* Delta time (`dt`)
* Update vs render separation

Mental model:

> Logic moves things; render shows them.

---

## 11. Input & Interaction

Canvas doesn’t handle input itself.

Topics:

* Keyboard input
* Mouse input
* Canvas-relative mouse position
* Touch input basics
* Input state vs input events

Exercises:

* Move an object with keys
* Aim with mouse

---

## 12. Collision & Geometry Basics

Canvas doesn’t give physics — *you build it*.

Topics:

* Bounding boxes
* Circles vs rectangles
* Distance formula
* Point-in-rectangle
* Visualizing collision areas

---

## 13. Layers & Drawing Order

Important for visual correctness.

Topics:

* Painter’s algorithm
* Z-order
* Manual layering
* Using multiple canvases (advanced)

---

## 14. Performance Fundamentals

Canvas is fast — until it isn’t.

Topics:

* Reducing draw calls
* Avoiding unnecessary state changes
* Offscreen canvas
* Image caching
* When *not* to redraw

---

## 15. Debugging Canvas

Learn to see what’s wrong.

Topics:

* Visual debugging
* Drawing hitboxes
* FPS counter
* Logging coordinates
* Understanding common rendering bugs

---

## 16. Canvas Limitations (Know This)

Important for decision-making.

Topics:

* No retained mode
* No built-in events per object
* Accessibility limitations
* Why SVG/DOM sometimes better

---

# How to Study These Topics (Recommended Method)

For **each topic**:

1. Read MDN
2. Write a **tiny demo**
3. Break it on purpose
4. Fix it
5. Explain it in your own words

👉 If you can *teach* it, you understand it.

---

# What Comes Next

Once you finish this list, the **next layer** is:

* Game loop architecture
* Entity systems
* Cameras & worlds
* Tilemaps
* Particles & effects

---

## Next Step (Your Choice)

I can:

* Turn this into a **day-by-day learning plan**
* Create **exercises for each topic**
* Walk you through **one topic at a time**, starting with Canvas setup & coordinates
* Build a **Canvas fundamentals playground template**

Tell me how you want to proceed, and we’ll go step by step 🚀
