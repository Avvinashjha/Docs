## Url Shortener System Design Document
---

## **1. Requirements**

### **Functional Requirements**
1. **Shorten a URL**:
    - Users can submit a long URL and receive a shortened version.
2. **Redirect to Original URL**:
    - When users visit the short URL, they are redirected to the original long URL.
3. **Track Clicks (Optional)**:
    - Track how many times each short URL has been accessed.
4. **Expiration (Optional)**:
    - Short URLs can expire after a certain period of time.

### **Non-Functional Requirements**
1. **Scalability**:
    - Handle millions of short URLs and high traffic.
2. **Performance**:
    - Fast redirection with minimal latency.
3. **Reliability**:
    - Ensure 99.9% uptime and fault tolerance.
4. **Security**:
    - Prevent abuse (e.g., spamming or malicious URLs).

---

## **2. High-Level Design**

### **Components**
1. **Web Server**:
    - Handles incoming HTTP requests (shortening URLs and redirecting).
    - Built using Spring Boot in this case.

2. **Redis**:
    - Stores mappings between short URLs and long URLs.
    - Tracks click counts and expiration times.

3. **Database (Optional)**:
    - For persistent storage of URL mappings (if needed).

4. **Load Balancer**:
    - Distributes traffic across multiple instances of the web server.

5. **DNS**:
    - Maps the domain name (e.g., `short.url`) to the load balancer.

6. **Monitoring & Analytics**:
    - Tracks system performance, errors, and usage statistics.

---

### **Data Flow**
1. **Shorten a URL**:
    - User submits a long URL via an API endpoint.
    - The web server generates a unique short URL and stores it in Redis (`short_url -> long_url`).

2. **Redirect to Original URL**:
    - User visits the short URL (`http://short.url/abc123`).
    - The web server looks up the short URL in Redis and redirects the user to the original long URL.

3. **Track Clicks**:
    - Each time a short URL is accessed, the web server increments its click count in Redis.

---

## **3. Detailed Design**

### **1. Short URL Generation**
- Use a random string generator (e.g., first 8 characters of a UUID) to create unique short URLs.
- Example: `abc123`, `xyz789`.

Alternatively:
- Use a base62 encoding scheme to generate compact short URLs from numeric IDs (e.g., `1` → `a`, `2` → `b`, etc.).

#### **Key Considerations**
- **Collision Handling**: Ensure generated short URLs are unique. Redis's atomic operations (e.g., `SETNX`) can help with this.
- **Custom Short URLs**: Allow users to specify custom aliases (e.g., `short.url/my-custom-url`).

---

### **2. Redis Data Model**
Use Redis as the primary data store for the following:

#### **Key-Value Mapping**
- Key: `short_url` (e.g., `abc123`).
- Value: `long_url` (e.g., `https://example.com`).

Example:
```redis
SET abc123 https://example.com
```

#### **Click Count**
- Key: `stats:<short_url>` (e.g., `stats:abc123`).
- Value: Click count (incremented using `INCR`).

Example:
```redis
INCR stats:abc123
```

#### **Expiration**
- Use Redis's `EXPIRE` command to set a TTL (time-to-live) for short URLs.

Example:
```redis
EXPIRE abc123 86400  # Expire after 1 day
```

---

### **3. Scalability**

#### **Horizontal Scaling**
- Deploy multiple instances of the web server behind a load balancer.
- Use Redis Cluster for distributed storage if needed.

#### **Caching**
- Redis acts as both a database and cache, ensuring fast lookups.

#### **Rate Limiting**
- Use Redis to implement rate limiting and prevent abuse.

---

### **4. Security**

#### **Input Validation**
- Validate submitted URLs to prevent malicious inputs (e.g., phishing links).
- Example: Use libraries like `java.net.URL` to parse and validate URLs.

#### **HTTPS**
- Serve all requests over HTTPS to ensure secure communication.

#### **DDoS Protection**
- Use a Web Application Firewall (WAF) to protect against Distributed Denial of Service (DDoS) attacks.

---

## **4. APIs**

### **1. Shorten a URL**
- **Endpoint**: `POST /api/url/shorten`
- **Request**:
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "shortUrl": "http://short.url/abc123"
  }
  ```

### **2. Redirect to Original URL**
- **Endpoint**: `GET /{shortUrl}`
- **Behavior**:
    - Redirects to the original long URL.
    - Increments the click count in Redis.

### **3. Get Click Count**
- **Endpoint**: `GET /api/url/stats/{shortUrl}`
- **Response**:
  ```json
  {
    "clickCount": 123
  }
  ```

---

## **5. Deployment Architecture**

### **1. Components**
- **DNS**: Maps `short.url` to the load balancer.
- **Load Balancer**: Distributes traffic across multiple web server instances.
- **Web Servers**: Handle API requests and interact with Redis.
- **Redis**: Stores URL mappings and click counts.
- **Monitoring**: Tools like Prometheus and Grafana for performance monitoring.

### **2. Diagram**
```
User -> DNS -> Load Balancer -> Web Server -> Redis
```

---

## **6. Optional Enhancements**

### **1. Persistence**
- Store URL mappings in a relational database (e.g., MySQL) for long-term storage.
- Use Redis as a caching layer for fast lookups.

### **2. Analytics**
- Track additional metrics like geographic location, device type, and referrer for each click.

### **3. Custom Domains**
- Allow users to map their own domains to short URLs.

### **4. Expiration Policies**
- Implement flexible expiration policies (e.g., 1 day, 7 days, never).

### **5. Rate Limiting**
- Limit the number of short URLs a user can create within a specific time frame.

---

## **7. Trade-Offs**

### **Advantages of Redis**
- **Speed**: Redis provides sub-millisecond latency for key-value lookups.
- **Atomicity**: Redis ensures thread-safe operations for generating unique short URLs.
- **Scalability**: Redis supports clustering for horizontal scaling.

### **Disadvantages**
- **Memory Constraints**: Redis stores data in memory, which can become expensive for very large datasets.
- **Persistence**: While Redis supports persistence, it is primarily an in-memory store.

---