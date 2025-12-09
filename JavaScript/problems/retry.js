/**
 * 
 */

async function retry(fn, {
    retries = 3,
    delay = 500,
    backoff = false,
    onRetry = null
} = {}){
    let attempt = 0;
    let currentDelay = delay;

    while(attempt < retries){
        try {
            return await fn(); // <-- attempt the retry
        } catch (error) {
            if(attempt === retries){
                throw error; //<-- if all retry failed finally throw error
            }
            if(onRetry){
                onRetry(error, attempt+1); // <-- perform action if any
            }
            await new Promise(res => setTimeout(res, currentDelay)); // <-- wait for a certain delay before retry
            if(backoff){
                currentDelay *= 2; // <-- increment the delay for next retry 
            }
        }
        attempt++;
    }
}

let counter = 0;

// Fake API call that fails the first 2 times
async function apiCall() {
    counter++;
    if (counter < 3) {
        throw new Error("Network error");
    }
    return "Success!";
}

retry(apiCall, {
    retries: 5,
    delay: 300,
    backoff: true,
    onRetry: (err, attempt) => {
        console.log(`Retry #${attempt} because of: ${err.message}`);
    }
}).then(console.log).catch(console.error);
