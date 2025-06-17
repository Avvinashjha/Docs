# Redis 

`REmote Dictionary Server` `open-source` `database` `cache` `message broker` `high performance` `flexiblity` 

Redis is an open source, in-memory data structure store, that is widely used as database, cache and message broker. It is known for its high performance, flexiblity, and support for various data structures (string, hashes, list and more)

### Key Features of Redis

- **In Memory Storage**
    - Redis store data in memory(fast r/w operation)
    - ideal for low latancy access of data 

- Persitance
    - Redis is in memory store but it also provides option to persit the data to disk
    - It supports two main persitance mechanism
        - **RDB (Redis Databse File):** Periodic snapshot of databse
        - **AOF (Append Only File):** Logs every write operation, allowing redis to rebuild the dataset on restart


- Data Structure

    Redis support variety of data structures

    - String
    - Hashes
    - List
    - Sets
    - Sorted Sets
    - Bitmaps
    - HyperLogLogs
    - Geospatial indexes

- Atomic Operations: 

    Redis Operations are atomic, meaning they are executed in a thread safe manner, ensures consistancy

- Pub/Sub Messaging
    - Redis Provides a publish/subscribe messaging system, allowing real time communication between different components of an applicaton

- Lua Scripting
    - Redis support Lua Scripting, enabling users to execute complex operation on server side avoiding different client server trips

- High Availablity
     - Redis Provides replication (master-slave) and Redis Sentinel for monitoring 
     - Supports Horizontal Scaling and partitioning of data across multiple nodes

- Transactions
    - Redis allows grouping multiple commands into single Transaction, ensuring they are executed sequentially and atomically.

- Extensibility
    - Redis module allow  developers to extend Redis functionality by adding custom commands and Features

## Common Use Case of Redis

- Caching
    - Frequently used as caching layer to store Frequently accessed data reducing database load and improves performance

- Seession store
    - It can be used to store Session data in web applicaton, enabling fast retrieval and updates

- Real Time Analytics
    - Redis speed and support for sorted sets make it ideal for real time Analytics and leaderboards

- Message broker
    - Redis Pub/Sub and List based blocking operation make it a light weight message broker for decoupling applicaton components

- Rate Limiting 
    - Redis can be used to implement rate limititng mechanism to control the number of requests a user can make withing a specific time frame.

- Geospatial Indexing
    - Redis supports geospatial queries, making it useful for location-based applications

- Job Queues
    - Redis can be used to implement job queues for managing background tasks in distributed system

## Advantage of Redis
- Speed 
- Simplicity
- Versatility
- Community and Ecosystem

## Limitations of Redis
- Memory Contraints
    - Redis store data in memory, it's capacity is limited by RAM
    - Redis cluster can help to mitigate this Limitation

- Persitance Overhead
    - Persitance is supported in redis and it can introduce some Overhead and potential performance trade-offs

- Complexity at Scale
    - Manging Redis cluster and ensuring high Availablity can becoe complex in large scale deployments.

In summary, Redis is a powerful, high-performance tool that excels in scenarios requiring fast data access and manipulation. Its versatility and ease of use have made it a popular choice for modern applications, particularly in areas like caching, real-time analytics, and messaging.


Must Read:
- https://medium.com/rtkal/distributed-cache-design-348cbe334df1
- https://medium.com/p/c74eb702540b#ef1f