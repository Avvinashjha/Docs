/**
 * Create an Event emitter
 *
 * What is Event emitter?
 *
 * An event emitter is a programming pattern where:
 * - you emit named events
 * - Other part of your code listen for those events and react
 *
 * when it is useful?
 *
 * - Responding to user actions
 * - handling async operations
 * - building modular operations
 * - implementing pub/sub pattern.
 */

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(...args));
    }
  }

  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener !== listenerToRemove
    );
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

const emitter = new EventEmitter();

function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

// Subscribe
emitter.on("greet", sayHello);

// Emit
emitter.emit("greet", "Alice"); // Hello, Alice!

// Unsubscribe
emitter.off("greet", sayHello);

// Emit again (no output)
emitter.emit("greet", "Bob");

emitter.once('start', () => console.log('This runs only once!'));
emitter.emit('start');
emitter.emit('start'); // won't run again
