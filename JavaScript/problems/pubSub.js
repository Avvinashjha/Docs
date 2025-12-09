/**
 * implement Publisher subscriber in javascript.
 * 
 * What is pub-sub model?
 * In Publish subscribe pattern, produces emits messages to named topics and
 * consumer (subscriber) express interest in topic and receive messages.
 * 
 * Publisher and subscriber are decoupled, publisher do not know who will receive the 
 * message, and subscribe do not know who will publish the message.
 * 
 * Core Properties to focus on:
 * 1. Decoupling - producer and consumes don't reference each other
 * 2. Many-to-Many - many publishers can have many subscribers
 * 3. Asynchronicity - message are typically delivered asynchronously, it can vary
 * 4. Topics/channels - messaged are routed by topic name 
 * 5. Subscription Management: subscriber can subscribe/unsubscribe at run time
 */


function createPubSub(){
    const topics = new Map(); // topic -> set of handlers

    function subscribe(topic, handler){
        if(!topics.has(topic)){
            topics.set(topic, new Set());
        }

        const handlers = topics.get(topic);
        handlers.add(handler);

        // return the unsubscribe function
        return ()=>{
            handlers.delete(handler);
            if(handler.size === 0){
                topics.delete(topic);
            }
        };
    }

    function once(topic, handler){
        const wrapper = async (msg) => {
            unsubscribe(); // remove before running
            await handler(msg);
        }
        const unsubscribe = subscribe(topic, wrapper);
        return unsubscribe;
    }

    async function publish(topic, message){
        if(!topics.has(topic)) return;
        const handlers = Array.from(topics.get(topic));

        // Deliver to each handler asynchronously
        await Promise.all(
            handlers.map(async (handler)=>{
                try {
                    await handler(message);
                } catch (error) {
                    console.error(`Error in handler for topic ${topic}: `, error);
                }
            })
        )
    }

    return { subscribe, once, publish};
}

const pubsub = createPubSub();

/**---- regular subscriber ----- */
const unsub1 = pubsub.subscribe("news", async (msg)=>{
    console.log("Subscriber 1 got: ", msg);
})

/**-----one time subscriber ---- */
pubsub.once("news", async (msg) => {
    console.log("Subscriber 2 got message(once): ", msg);
})

/**Publish message */

await pubsub.publish("news", "Hey AWS is hacked");
await pubsub.publish("news", "Hey I was wrong");

unsub1(); 

await pubsub.publish("news", "Azure is awesome");