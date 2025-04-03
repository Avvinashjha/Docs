import redis

# Connect to Redis (default host=localhost, port=6379)
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Set a key-value pair
r.set('mykey', 'Hello, Redis in Docker!')

# Get the value of the key
value = r.get('mykey')
print(f"Value of 'mykey': {value}")

# Increment a counter
r.incr('counter')
print(f"Counter value: {r.get('counter')}")

# Work with a list
r.lpush('mylist', 'item1')
r.lpush('mylist', 'item2')
items = r.lrange('mylist', 0, -1)
print(f"Items in 'mylist': {items}")