Your API handles JSON perfectly. 
Then someone sends XML. 

After watching 50+ APIs crash in production, Here are the 7 edge cases that break APIs in the wild, and exactly how to catch them: 

𝟭. 𝗖𝗼𝗻𝘁𝗲𝗻𝘁-𝗧𝘆𝗽𝗲 𝗟𝗶𝗲𝘀 
𝗪𝗵𝗮𝘁 𝗯𝗿𝗲𝗮𝗸𝘀: Client sends JSON with 𝙲𝚘𝚗𝚝𝚎𝚗𝚝-𝚃𝚢𝚙𝚎: 𝚊𝚙𝚙𝚕𝚒𝚌𝚊𝚝𝚒𝚘𝚗/𝚡𝚖𝚕 
𝗧𝗵𝗲 𝗳𝗶𝘅: Validate actual payload structure, not just headers 
𝗥𝗲𝗮𝗹 𝗰𝗮𝘀𝗲: A Fortune 500 payment API trusted headers. Processed XML as JSON. $2M in failed transactions. 

𝟮. 𝗡𝘂𝗹𝗹 𝘃𝘀 𝗨𝗻𝗱𝗲𝗳𝗶𝗻𝗲𝗱 𝘃𝘀 𝗘𝗺𝗽𝘁𝘆 
𝗪𝗵𝗮𝘁 𝗯𝗿𝗲𝗮𝗸𝘀: {"𝚗𝚊𝚖𝚎": 𝚗𝚞𝚕𝚕} vs {"𝚗𝚊𝚖𝚎": ""} vs {} 
𝗧𝗵𝗲 𝗳𝗶𝘅: Explicitly handle all three states with different responses 
𝗥𝗲𝗮𝗹 𝗰𝗮𝘀𝗲: Twitter's API treated null as empty string. Broke 10,000 third-party apps. 

𝟯. 𝗨𝗻𝗶𝗰𝗼𝗱𝗲 𝗡𝗼𝗿𝗺𝗮𝗹𝗶𝘇𝗮𝘁𝗶𝗼𝗻 𝗔𝘁𝘁𝗮𝗰𝗸𝘀 
𝗪𝗵𝗮𝘁 𝗯𝗿𝗲𝗮𝗸𝘀: Ä (one character) vs Ä (A + combining diaeresis) 
𝗧𝗵𝗲 𝗳𝗶𝘅: Normalize to NFC before processing 
𝗥𝗲𝗮𝗹 𝗰𝗮𝘀𝗲: Instagram usernames. Same visual name, different bytes. Account takeover vulnerability. 

4. Boundary 𝗜𝗻𝘁𝗲𝗴𝗲𝗿 𝗩𝗮𝗹𝘂𝗲𝘀
𝗪𝗵𝗮𝘁 𝗯𝗿𝗲𝗮𝗸𝘀: 𝟸𝟷𝟺𝟽𝟺𝟾𝟹𝟼𝟺𝟽 + 𝟷 on 32-bit systems 
𝗧𝗵𝗲 𝗳𝗶𝘅: Use BigInt or validate ranges explicitly 
𝗥𝗲𝗮𝗹 𝗰𝗮𝘀𝗲: YouTube view counter. Gangnam Style broke at 2.1 billion views. 

𝟱. 𝗠𝘂𝗹𝘁𝗶𝗽𝗮𝗿𝘁 𝗕𝗼𝘂𝗻𝗱𝗮𝗿𝘆 𝗜𝗻𝗷𝗲𝗰𝘁𝗶𝗼𝗻 
𝗪𝗵𝗮𝘁 𝗯𝗿𝗲𝗮𝗸𝘀: Boundary string appears in file content 
𝗧𝗵𝗲 𝗳𝗶𝘅: Generate cryptographically random boundaries 
𝗥𝗲𝗮𝗹 𝗰𝗮𝘀𝗲: Gmail attachment parsing. Allowed email spoofing for 2 years. 

𝟲. 𝗚𝗿𝗮𝗽𝗵𝗤𝗟 𝗗𝗲𝗽𝘁𝗵 𝗕𝗼𝗺𝗯𝘀 
𝗪𝗵𝗮𝘁 𝗯𝗿𝗲𝗮𝗸𝘀: Nested queries 100 levels deep 
𝗧𝗵𝗲 𝗳𝗶𝘅: Set max depth to 7, complexity scoring 
𝗥𝗲𝗮𝗹 𝗰𝗮𝘀𝗲: GitHub's API. Single query consumed 30 seconds CPU. 

𝟳. 𝗔𝗿𝗿𝗮𝘆 𝗦𝗶𝘇𝗲 𝗘𝘅𝗽𝗹𝗼𝘀𝗶𝗼𝗻𝘀 
𝗪𝗵𝗮𝘁 𝗯𝗿𝗲𝗮𝗸𝘀: {"𝚒𝚍𝚜": [𝟷,𝟸,𝟹...𝟿𝟿𝟿𝟿𝟿𝟿]} 
𝗧𝗵𝗲 𝗳𝗶𝘅: Paginate everything over 100 items 
𝗥𝗲𝗮𝗹 𝗰𝗮𝘀𝗲: Shopify checkout. 50,000 item cart crashed payment processing. 

𝗧𝗵𝗲 𝗣𝗮𝘁𝘁𝗲𝗿𝗻: Every one of these was discovered by a user, not QA. Because QA tests what you tell them to test. Users test what you never imagined. 

The best APIs don't handle every edge case, they fail predictably when they encounter one.