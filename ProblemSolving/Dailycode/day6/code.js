function isValidParenthesis(s){
    if(s.length === 0) return true;
    const openingBracket = ["(", "{", "["];
    const closingBracket = [")", "}", "]"];
    let stack = [];
    for(ch of s){
        if(stack.length === 0){
            if(closingBracket.includes(ch)){
                return false;
            }
            stack.push(ch);
        }else if(openingBracket.includes(ch)){
            stack.push(ch);
        }else {
            const lastChar = stack.pop();
            if((lastChar === "(" && ch === ")") || (lastChar === "{" && ch === "}") || (lastChar === "[" && ch === "]")){
                continue;
            }else{
                return false;
            }
        }
    }

    return stack.length === 0;
}

// console.log(isValidParenthesis("("));

// Group of anagrams
function groupAnagrams(words) {
    const map = new Map();

    for (const word of words) {
        const key = word.split('').sort().join('');

        if (!map.has(key)) {
            map.set(key, []);
        }

        map.get(key).push(word);
    }

    return Array.from(map.values());
}


// console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))

// Minimum window substring

function minimumWindowSubstring(s, t){
    if(t.length > s.length) return "";

    const need = new Map();
    const have = new Map();

    for(const ch of t){
        need.set(ch, (need.get(ch) || 0)  +1);
    }

    let required = need.size;
    let formed = 0;

    let left = 0; 
    let minLen = Infinity;
    let minStart = 0;

    for(let right = 0; right < s.length; right++){
        const ch = s[right];
        have.set(ch, (have.get(ch) || 0) + 1);

        if(need.has(ch) && have.get(ch) === need.get(ch)){
            formed++;
        }

        while(formed === required){
            if(right - left + 1 < minLen){
                minLen = right - left + 1;
                minLen = left;
            }

            const leftChar = s[left];
            have.set(leftChar, have.get(leftChar) -1);
            if(need.has(leftChar) && have.get(leftChar) < need.get(leftChar)){
                formed--;
            }

            left++;
        }
    }
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}