// 1. Return index of the first non-repeating character

function firstNonRepeatingChar(s){
    let set = new Set();
    for(let i = 0; i < s.length; i++){
        if(set.has(s[i])){
            set.delete(s[i]);
        }else{
            set.add(s[i]);
        }
    }

    return s.indexOf(set.keys().next().value);
}

// console.log(firstNonRepeatingChar("leetcode"));

// 2. length of the longest substring without repeating characters

function longestSubstringWithoutRepeatingCharacter(s) {
    let left = 0;
    let length = 0;
    let map = new Map();

    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i]) && map.get(s[i]) >= left) {
            left = map.get(s[i]) + 1;
        }
        map.set(s[i], i);
        length = Math.max(length, i - left + 1);
    }

    return length;
}


// console.log(longestSubstringWithoutRepeatingCharacter("abcabcbb"));


// Word Ladder Problem

function wordLadderLength (beginWord, endWord, wordList){
    // Put word list in a set so that read is fast
    const wordSet = new Set(wordList);

    // If word set does not have the word then we will return 0
    if(!wordSet.has(endWord)) return 0;

    // so now we have to match the pattern
    const patternMap = {};
    const L = beginWord.length;

    // Build the pattern map
    for(let word of wordSet){
        for(let i = 0; i<L; i++){
            const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
            if(!patternMap[pattern]) patternMap[pattern] = [];
            patternMap[pattern].push(word); 
        }
    }

    // Now apply BFS on the patten 
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);

    while(queue.length > 0){
        const [word, level] = queue.shift();

        for(let  i = 0; i < L; i++){
            const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
            if(!patternMap[pattern]) continue;

            for(let nextWord of patternMap[pattern]){
                if(nextWord === endWord) return level + 1;

                if(!visited.has(nextWord)){
                    visited.add(nextWord);
                    queue.push([nextWord, level + 1]);
                }
            }

            // Clear the list to avoid redundant checks
            patternMap[pattern] = [];
        }
    }
    return 0;
}

console.log(wordLadderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]));
