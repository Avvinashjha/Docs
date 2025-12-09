# URL Shortener

## System Design 

- [Resource 1](https://www.designgurus.io/blog/url-shortening)
- [Resource 2](https://www.hellointerview.com/learn/system-design/problem-breakdowns/bitly)

## Basic Design

We have to design a URL Shortener and what will it do.

For a given url it will give a new url to user which will be shorter and using that url user can access the main url.

How will we do that?

So the basic solution is that we will keep a mapping of real_url and a unique_key and we will return the new short url as 

- "https://www.designgurus.io/blog/url-shortening" -> unique_key(123423)
- "http://localhost:5050/123423"

When user will try to hit `http://localhost:5050/123423`  then we will check in our db for that key and for that key the actual url is `https://www.designgurus.io/blog/url-shortening` so we will redirect user to that url.

This is the basic idea.

## How will be Generate the unique key?

### Approach 1: We can rely on random() function

Using a random number generator to create a random unique numbers. And in case of large no of generation it does not have that amount of entropy so it can generate same number multiple times.

### Approach 2: We should use hash function

So, Hash function like SHA-256 to generate a fixed size hash code. Pure has functions are deterministic meaning for same actual_url it can generate same key, to avoid that we can pass secret salt. Hash function also provides high degree of entropy.

After generating the hash code then we can encode it using base62 encoding scheme and take just 6 or 8 characters as our code.

**Why Base62?** it's compact representation of numbers that uses 62 characters (a-z, A-Z, 0-9). The reason it's base62 and not common base 64 is because we don't want `+` `-` in out code since they are reserved for url encoding.

```text
client ---> hash function ---> database

1. Client will post the actual url
2. Generate sort url and save it to db
3. return the sort url to client
```

### Approach 3: Unique Counter with base62 encoding

One way to guarantee that we don;t have collision is to simply increment the counter  for each new url. We can then take the output of the counter and encode it ti base62 encoding to ensure it's a compacted representation.

We can use Redis  as it's single threaded and supports atomic operations. Being single threaded means redis process one command at a time, eliminating race conditions. Its INCR command is atomic, meaning increment operation is guaranteed to execute completely without interference from other operations. This is crucial because we need absolute certainty that each url gets a unique number, with no duplicates or gap.

## What will be the redirection status code

There are two main types of HTTP redirects that we could use for this purpose

### 1. 301 (Permanent Redirect)

This indicates that the url you used is permanently move to the actual url so next time when you use the sort url it may not go to you backend to look for key instead browser will cache it and immediately redirect you to actual url.

```bash
HTTP/1.1 301 Moved Permanently
Location: http://www.original-long-url.com
```

### 302 (Temporary Redirect)

This suggests that the resources is temporarily located to a different URL, Browser does not cache this response and hence all request will go through your server.

```bash
HTTP/1.1 303 Found
Location: http://www.original-long-url.com
```

In both case, client will not have any issue following the actual url so which should we use?

For a URL shortener service, a 302 is often preferred:

- It gives us more control over redirection process, allowing us to update or expire link as needed
- Prevent browser caching, so that we can perform logics in our server based on request url
- It allow us to have consistent statistics for each url

## Database Design

Database design depends on the requirements so if we go simple and scalable approach in that case 

We will need two tables

1. url_mapping_table

   ```sql
    CREATE TABLE url_mapping_table(
        hash_id VARCHAR(8) Primary key,
        actual_url VARCHAR(500),
        expiration_date datetime,
        creating_date datetime
    )
   ```

2. users

   ```sql
    user_id int primary key,
    name varchar,
    email varchar,
    lastLogin datetime
   ```

## H
