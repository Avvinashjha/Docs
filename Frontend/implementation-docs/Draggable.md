# Core Drag-Drop Concept

A drag and drop interaction typically has 4 phase:

```
Mouse Down / Touch Start 
    |
Drag Start
    |
Dragging
    |
Drop Ends
```

## Important Drag Events

1. Drag start
   
Triggers when users begins dragging.

```js
function handleDragStart(event){
    console.log("Started dragging");
}
```

Common task:

- save the dragged item ID
- Add visual style
- Create a Drag Preview

Example:

```js
setDraggedItem(Item.id);
```

2. Drag Move

Fires continuously while dragging.

```js
function handleDragMove(event){
    console.log(event.clientX, event.clientY);
}
```

Used for:
- Following Mouse
- Collision Detection
- Showing Drop Indicator

3. Drag Over

Occurs when the dragged item moves over a valid drop zone.

```js
function handleDragOver(event){
    event.preventDefault();
}
```

Without `preventDefault()`, dropping is usually disabled.

4. Drop

User releases the mouse.

```js
function handleDrop(event){
    console.log("Dropped");
}
```

Used for:
- Reordering lists
- Moving cards
- Updating database

5. Drag Ends

Always fires when dragging finishes.

```js
function handleDragEnd(){
    clearDraggedItem();
}
```

Cleanup:
- Remove highlight
- Remove drag Preview
- Reset state

## Visual Elements During Dragging

Most drag systems show three visual layers:

- Drag Source
- Drag Overlay
- Drop Marker

## What is the Drag Overlay?

A drag overlay (sometimes called as drag preview or Ghost element) follows the cursor.

Example:

```
Mouse →
         ┌──────────┐
         │ Task 123 │
         └──────────┘
```

Usually