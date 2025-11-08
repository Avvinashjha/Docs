let ws;
let myId;
let currentRoom = null;

ws = new WebSocket("ws://localhost:5050");

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const box = document.getElementById("chatBox");

    if (data.type === "info") {
        box.innerHTML += `<div><em>${data.message}</em></div>`;
    }

    if (data.type === "message") {
        box.innerHTML += `<div><strong>${data.from}:</strong> ${data.text}</div>`;
    }

    box.scrollTop = box.scrollHeight;
};

function registerUser() {
    myId = document.getElementById("userId").value;
    ws.send(JSON.stringify({ type: "register", userId: myId }));
}

function joinRoom() {
    currentRoom = document.getElementById("room").value;
    ws.send(JSON.stringify({ type: "join", room: currentRoom }));
}

function sendMessage() {
    const text = document.getElementById("message").value;
    const toUser = document.getElementById("toUser").value;

    const payload = {
        type: "message",
        text,
    };

    if (toUser) {
        payload.to = toUser;       // 1-to-1 chat
    } else {
        payload.room = currentRoom; // many-to-many
    }

    ws.send(JSON.stringify(payload));
}
