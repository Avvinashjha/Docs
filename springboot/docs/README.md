# Spring Boot Road Map

## Level 0 - Prerequisites

### Core Java

- OOP (Inheritance, Polymorphism, Abstraction, Encapsulation)
- Interface and Abstract classes
- Collections
- Exception Handling

### Java 8+

- Streams
- Lambdas

### Basic HTTP and REST

- Request / Response
- Rest Methodology

### Build tools

- Maven / Gradle

## Level 1 - Spring Core (Foundation)

### 1. Inversion of control (IoC)✅

- What is IoC?
- Traditional way vs Spring Way
- IoC Container

### 2. Dependency Injection (DI)✅

- Constructor Injection (Why mostly used?)
- Setter Injection
- Fields Injection ( why to avoid in production?)

### 3. Beans ✅

- What is a Bean?
- Bean Lifecycle
- Bean Scope
  - Singleton
  - Prototype
  - Request / Session

### 4. Configuration Styles ✅

- XML (just conceptually)
- Java-based Configuration
- Annotation-based configuration

### 5. Core Annotations ✅

- @Component
- @Service
- @Repository
- @Controller
- @Autowired
- @Qualifier
- @Primary

## Level 2 - Spring Boot Basics

### 1. What is Spring Boot? ✅

- Problem it solves
- Auto-configuration

### 2. Project Setup ✅

- Spring initializer
- Project Structure

### 3. Configuration ✅

- application.properties / application.yml
- Profiles (dev / prod)

### 4. Starter Dependencies ✅

- spring-boot-starter-web
- spring-boot-starter-data-jpa
- spring-boot-starter-security

### 5. Auto Configuration ✅

- How it works internally?
- Conditional beans

## Level 3 - Building Rest APIs

### 1. Spring MVC ✅
- Dispatcher flow
- Role of Dispatcher Servlet

### 2. Controllers ✅
- @RestController
- @RequestMapping
- @GetMapping, @PostMapping, etc

### 3. Request Handling ✅
- @PathVariable
- @RequestParam
- @RequestBody

### 4. Response Handling ✅
- ResponseEntity
- Status Codes

### 5. Validation ✅

- @Valid
- Hibernate Validator

### 6. Exception Handling ✅

- @ControllerAdvice
- @ExceptionHandler

## Level 4 - Database Layer (JPA + Hibernate)

### 1. JPA Basics ✅

- What is JPA
- ORM concept

### 2. Entities ✅

- @Entity
- @Table
- @Id
- @GeneratedValue

### 3. Relationships ✅

- One-to-One
- One-to-Many
- Many-to-One
- Many-to-Many
- Circular Referencing

### 4. Repositories ✅
- JpaRepository
- Custom queries

### 5. Query Types ✅

- Derived queries
- @Query (JPQL)
- Native Queries

### 6. Transactions

- @Transactional

## Level 5 - Advanced Spring Boot

### 1. Profiles and Config
- Environment-based configs
- External config

### 2. Caching

- @Cacheable

### 3. Scheduling

- @Scheduled

### 4. Async Processing

- @Async

## Level 6 - Spring Security (Core)

### 1. Basics

- Authentication vs Authorization

### 2. Security Flow

- Filter Chain
- Security Context

### 3. Configuration (Modern)

- SecurityFilterChain (Spring security 6+)

### 4. Password encoding
- BCrypt

## Level 7 - JWT and Authentication

### 1. JWT Basics

- Structure
  - Header
  - Payload
  - Signature

### 2. Implement JWT Auth

- Login API
- Token generation
- Token Validation

### 3. Filters

- Custom JWT Filters
- OncePerRequestFilter

### 4. Stateless Authentication

- No sessions

## Level 8 - SSO and OAuth2

### 1. OAuth2 Basics

- Roles
  - Resource Owner
  - Client
  - Authorization Server

### 2. Login With google / github

- OAuth2 Login

### 3. SSO Concept

- Centralized authentication

## Level 9 - Middleware & Filters

### 1. Filters

- Servlet filters
- Use Cases
  - Logging
  - Authentication

### 2. Interceptor

- HandleInterceptor

### 3. Difference

- Filter vs Interceptor

## Level 10 - Testing

### 1. Unit Testing

- Junit
- Mockito

### 2. Integration Testing

- @SpringBootTest

### 3. Mock MVC

