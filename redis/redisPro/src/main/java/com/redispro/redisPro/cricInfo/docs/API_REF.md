## Cricket data API Reference

### 1. Get List of Players

```cmd
CURL GET https://api.cricapi.com/v1/players?apikey=01e13cff-7085-4c75-a24f-126399efacfb&offset=0
```
- **Response**:
```json
{
  "apikey": "01e13cff-7085-4c75-a24f-126399efacfb",
  "data": [
    {
      "id": "4067f11d-ce53-4cef-b683-a6936ebebee0",
      "name": "Tiaan Cornelius Louw",
      "country": "England"
    },
    {
      "id": "08679729-165e-46c8-9e1d-0f1f512e4ce5",
      "name": "Warren Bell",
      "country": "South Africa"
    },
    {
      "id": "40ec1485-5e7b-42c7-aa7e-94ac4196380c",
      "name": "Kurt Botha",
      "country": "South Africa"
    },
    {
      "id": "83dbf3e6-73e6-479a-a538-2565fa1b9fcd",
      "name": "Willem Myburgh",
      "country": "South Africa"
    },
    {
      "id": "94365eee-6200-4426-b1e2-26e3298dab93",
      "name": "Carl Crowe",
      "country": "England"
    },
    {
      "id": "1d5e0486-af85-430d-bd5e-4ec6157eea4d",
      "name": "Rowan Rajah",
      "country": "South Africa"
    },
    {
      "id": "528cacd7-6851-44ea-8963-bed12a60ecb4",
      "name": "Sanjay Singh",
      "country": "India"
    },
    {
      "id": "28e1fbef-db2b-48f2-a47d-b6db51dda3c6",
      "name": "Digvesh",
      "country": "India"
    },
    {
      "id": "a3f40660-ccd6-4360-81ac-237f7fe09926",
      "name": "Madhav Tiwari",
      "country": "India"
    },
    {
      "id": "0e2b638b-e356-41bf-b986-f0f0f84bad38",
      "name": "Vignesh Puthur",
      "country": "India"
    },
    {
      "id": "849877f5-7704-4cad-b1ba-9e0b33aed35e",
      "name": "Abhinandan Singh",
      "country": "India"
    },
    {
      "id": "b830848a-0baa-4e2e-9af4-18b3dc3d5657",
      "name": "JP Izeta",
      "country": "Falkland Islands"
    },
    {
      "id": "b162a8a8-ae8c-45ec-b241-e147431db81d",
      "name": "Kalra Mohini",
      "country": "Canada"
    },
    {
      "id": "c0701224-eea0-4c9a-9ded-6240e8185457",
      "name": "Malki Madara",
      "country": "Sri Lanka"
    },
    {
      "id": "34f6d1d9-c60e-43c9-9b3a-94f2238889c7",
      "name": "Flora Devonshire",
      "country": "New Zealand"
    },
    {
      "id": "47b31074-ce6b-413e-a2ca-0de6e4a1864a",
      "name": "Mirza Fahad",
      "country": "Costa Rica"
    },
    {
      "id": "d7461210-763b-4783-96ba-31437f38ff4d",
      "name": "Ramiz Rao",
      "country": "Falkland Islands"
    },
    {
      "id": "6b05de97-bb1c-4aeb-961d-6679a7c5c40c",
      "name": "John Paveley",
      "country": "Falkland Islands"
    },
    {
      "id": "fdbafd1e-7138-4957-bb34-2a4a4974bf6f",
      "name": "Grant Cambell",
      "country": "Falkland Islands"
    },
    {
      "id": "f0771abd-ee9a-40d9-b09b-f533f7a866aa",
      "name": "Virginie Nehoume",
      "country": "France"
    },
    {
      "id": "6e1fb48a-f535-4c54-9c00-24436b15efe8",
      "name": "Nathan Robinson",
      "country": "New Zealand"
    },
    {
      "id": "c500f23c-4136-4c71-a651-67f5da0aac22",
      "name": "TC OConnor",
      "country": "New Zealand"
    },
    {
      "id": "39935ef0-a910-40e8-9589-e7b5e8b4853c",
      "name": "Irene Mutoni",
      "country": "Uganda"
    },
    {
      "id": "de5038a0-bbf7-48d7-bbbc-d027f5d620f3",
      "name": "Santhosh Shanmugam",
      "country": "Costa Rica"
    },
    {
      "id": "9205c9cd-91c2-4838-b757-d02c7580b9c6",
      "name": "Bradley Vivian Kneebone",
      "country": "New Zealand"
    }
  ],
  "status": "success",
  "info": {
    "hitsToday": 2,
    "hitsUsed": 1,
    "hitsLimit": 100,
    "credits": 0,
    "server": 18,
    "offsetRows": 0,
    "totalRows": 15733,
    "queryTime": 143.977,
    "s": 0,
    "cache": 0
  }
}
```

### 2. Get Player by Search

```cmd
https://api.cricapi.com/v1/players?apikey=01e13cff-7085-4c75-a24f-126399efacfb&offset=0&search=
``` 

- **Response**:
```json
{
  "apikey": "01e13cff-7085-4c75-a24f-126399efacfb",
  "data": [
    {
      "id": "4067f11d-ce53-4cef-b683-a6936ebebee0",
      "name": "Tiaan Cornelius Louw",
      "country": "England"
    },
    {
      "id": "08679729-165e-46c8-9e1d-0f1f512e4ce5",
      "name": "Warren Bell",
      "country": "South Africa"
    },
    {
      "id": "40ec1485-5e7b-42c7-aa7e-94ac4196380c",
      "name": "Kurt Botha",
      "country": "South Africa"
    },
    {
      "id": "83dbf3e6-73e6-479a-a538-2565fa1b9fcd",
      "name": "Willem Myburgh",
      "country": "South Africa"
    },
    {
      "id": "94365eee-6200-4426-b1e2-26e3298dab93",
      "name": "Carl Crowe",
      "country": "England"
    },
    {
      "id": "1d5e0486-af85-430d-bd5e-4ec6157eea4d",
      "name": "Rowan Rajah",
      "country": "South Africa"
    },
    {
      "id": "528cacd7-6851-44ea-8963-bed12a60ecb4",
      "name": "Sanjay Singh",
      "country": "India"
    },
    {
      "id": "28e1fbef-db2b-48f2-a47d-b6db51dda3c6",
      "name": "Digvesh",
      "country": "India"
    },
    {
      "id": "a3f40660-ccd6-4360-81ac-237f7fe09926",
      "name": "Madhav Tiwari",
      "country": "India"
    },
    {
      "id": "0e2b638b-e356-41bf-b986-f0f0f84bad38",
      "name": "Vignesh Puthur",
      "country": "India"
    },
    {
      "id": "849877f5-7704-4cad-b1ba-9e0b33aed35e",
      "name": "Abhinandan Singh",
      "country": "India"
    },
    {
      "id": "b830848a-0baa-4e2e-9af4-18b3dc3d5657",
      "name": "JP Izeta",
      "country": "Falkland Islands"
    },
    {
      "id": "b162a8a8-ae8c-45ec-b241-e147431db81d",
      "name": "Kalra Mohini",
      "country": "Canada"
    },
    {
      "id": "c0701224-eea0-4c9a-9ded-6240e8185457",
      "name": "Malki Madara",
      "country": "Sri Lanka"
    },
    {
      "id": "34f6d1d9-c60e-43c9-9b3a-94f2238889c7",
      "name": "Flora Devonshire",
      "country": "New Zealand"
    },
    {
      "id": "47b31074-ce6b-413e-a2ca-0de6e4a1864a",
      "name": "Mirza Fahad",
      "country": "Costa Rica"
    },
    {
      "id": "d7461210-763b-4783-96ba-31437f38ff4d",
      "name": "Ramiz Rao",
      "country": "Falkland Islands"
    },
    {
      "id": "6b05de97-bb1c-4aeb-961d-6679a7c5c40c",
      "name": "John Paveley",
      "country": "Falkland Islands"
    },
    {
      "id": "fdbafd1e-7138-4957-bb34-2a4a4974bf6f",
      "name": "Grant Cambell",
      "country": "Falkland Islands"
    },
    {
      "id": "f0771abd-ee9a-40d9-b09b-f533f7a866aa",
      "name": "Virginie Nehoume",
      "country": "France"
    },
    {
      "id": "6e1fb48a-f535-4c54-9c00-24436b15efe8",
      "name": "Nathan Robinson",
      "country": "New Zealand"
    },
    {
      "id": "c500f23c-4136-4c71-a651-67f5da0aac22",
      "name": "TC OConnor",
      "country": "New Zealand"
    },
    {
      "id": "39935ef0-a910-40e8-9589-e7b5e8b4853c",
      "name": "Irene Mutoni",
      "country": "Uganda"
    },
    {
      "id": "de5038a0-bbf7-48d7-bbbc-d027f5d620f3",
      "name": "Santhosh Shanmugam",
      "country": "Costa Rica"
    },
    {
      "id": "9205c9cd-91c2-4838-b757-d02c7580b9c6",
      "name": "Bradley Vivian Kneebone",
      "country": "New Zealand"
    }
  ],
  "status": "success",
  "info": {
    "hitsToday": 3,
    "hitsUsed": 1,
    "hitsLimit": 100,
    "credits": 0,
    "server": 14,
    "offsetRows": 0,
    "totalRows": 15733,
    "queryTime": 80.709,
    "s": 0,
    "cache": 0
  }
}
```
### 3. Get Player Info

```cmd
https://api.cricapi.com/v1/players_info?apikey=01e13cff-7085-4c75-a24f-126399efacfb&id=4067f11d-ce53-4cef-b683-a6936ebebee0
```

- **Response**:
```json
{
  "apikey": "01e13cff-7085-4c75-a24f-126399efacfb",
  "data": {
    "id": "4067f11d-ce53-4cef-b683-a6936ebebee0",
    "name": "Tiaan Cornelius Louw",
    "dateOfBirth": "2006-04-16T00:00:00",
    "role": "Bowler",
    "battingStyle": "Right Handed Bat",
    "placeOfBirth": "High Wycombe, Buckinghamshire",
    "country": "England",
    "playerImg": "https://h.cricapi.com/img/icon512.png",
    "stats": [
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " m ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " inn ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " runs ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " bf ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " hs ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " avg ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " sr ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " no ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " 4s ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " 6s ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " 50 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " 100 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "test",
        "stat": " 200 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " m ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " inn ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " runs ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " bf ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " hs ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " avg ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " sr ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " no ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " 4s ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " 6s ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " 50 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " 100 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "odi",
        "stat": " 200 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " m ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " inn ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " runs ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " bf ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " hs ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " avg ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " sr ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " no ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " 4s ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " 6s ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " 50 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " 100 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "t20",
        "stat": " 200 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " m ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " inn ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " runs ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " bf ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " hs ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " avg ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " sr ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " no ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " 4s ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " 6s ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " 50 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " 100 ",
        "value": " 0 "
      },
      {
        "fn": "batting",
        "matchtype": "ipl",
        "stat": " 200 ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " m ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " inn ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " b ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " runs ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " wkts ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " avg ",
        "value": " 0.0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " econ ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " sr ",
        "value": " 0.0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " bbi ",
        "value": " -/- "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " bbm ",
        "value": " -/- "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " 5w ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "test",
        "stat": " 10w ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " m ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " inn ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " b ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " runs ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " wkts ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " avg ",
        "value": " 0.0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " econ ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " sr ",
        "value": " 0.0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " bbi ",
        "value": " -/- "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " bbm ",
        "value": " -/- "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " 5w ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "odi",
        "stat": " 10w ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " m ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " inn ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " b ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " runs ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " wkts ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " avg ",
        "value": " 0.0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " econ ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " sr ",
        "value": " 0.0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " bbi ",
        "value": " -/- "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " bbm ",
        "value": " -/- "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " 5w ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "t20",
        "stat": " 10w ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " m ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " inn ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " b ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " runs ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " wkts ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " avg ",
        "value": " 0.0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " econ ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " sr ",
        "value": " 0.0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " bbi ",
        "value": " -/- "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " bbm ",
        "value": " -/- "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " 5w ",
        "value": " 0 "
      },
      {
        "fn": "bowling",
        "matchtype": "ipl",
        "stat": " 10w ",
        "value": " 0 "
      }
    ]
  },
  "status": "success",
  "info": {
    "hitsToday": 5,
    "hitsUsed": 1,
    "hitsLimit": 100,
    "credits": 0,
    "server": 7,
    "queryTime": 19.6175,
    "s": 0,
    "cache": 0
  }
}
```