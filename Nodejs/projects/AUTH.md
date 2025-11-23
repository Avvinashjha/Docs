# 1) Basics — what is **authentication**?

**Authentication** = proving *who* a user (or client) is.

* It answers: **“Are you who you say you are?”**
* Typical factors:

  * **Something you know** — password, PIN.
  * **Something you have** — hardware token, phone, authenticator app.
  * **Something you are** — biometrics.
* In web apps, primary flow: user supplies credentials (username/email + password) → server verifies → creates a session or issues tokens.

**Core properties you need:**

* **Verifiability**: must be able to check credentials reliably.
* **Confidentiality**: credentials must not leak (use HTTPS).
* **Non-repudiation/Logging**: know when and how users authenticated.
* **Usability**: balance security with UX (e.g., user-friendly MFA).

---

# 2) What is **authorization**?

**Authorization** = deciding whether an authenticated principal can perform an action on a resource.

* It answers: **“What are you allowed to do?”**
* Happens *after* authentication.
* Common models:

  * **RBAC (Role-Based Access Control)** — permissions assigned to roles, users get roles.
  * **ABAC (Attribute-Based Access Control)** — decisions based on attributes (user, resource, environment).
  * **ACLs (Access Control Lists)** — per-resource whitelists of principals.
  * **Capability-based** — objects/tokens carrying rights.

**Key considerations:**

* Principle of Least Privilege — grant minimal required permissions.
* Separation of Duties — avoid concentration of power.
* Centralized vs distributed enforcement — middleware vs per-service checks.

---

# 3) Simple authentication system (conceptual design)

A minimal, safe system pattern for many apps:

1. **Registration**

   * Collect identifier (email/username) + password.
   * Hash & store password (never plaintext).
2. **Login**

   * Verify password against stored hashed password.
   * If valid, create an authenticated session:

     * Option A: Server-side session (session id in cookie).
     * Option B: Issue tokens (JWT / opaque tokens).
3. **Subsequent requests**

   * Client sends session cookie or token; server verifies and authorizes.
4. **Logout**

   * Invalidate server-side session or revoke token.
5. **Password reset**

   * Short-lived one-time token via email, single use, stored hashed server-side.

**Security building blocks for the simple system:**

* HTTPS for all traffic.
* Use secure cookie flags (HttpOnly, Secure, SameSite).
* Rate-limiting login attempts.
* Account lockout or progressive delays after failed attempts.
* Email verification on registration.
* Input validation and strong password policy (or guidance).

---

# 4) Role-Based Authentication System (RBAC) — in-depth

RBAC is the most common authorization pattern for apps with clear user roles.

**Components:**

* **Roles**: named groupings of permissions (e.g., `admin`, `editor`, `viewer`).
* **Permissions**: granular actions like `create:post`, `delete:user`.
* **Assignments**: users → roles (1..N).
* Optionally **role hierarchy**: `admin` inherits `editor`.

**Architecture approaches:**

* **Static RBAC**: roles and permissions stored in DB; middleware checks role membership.
* **Claims-based RBAC**: include roles in token (e.g., JWT `roles` claim) and check claims on request.
* **Policy-based RBAC**: central policy engine evaluates role + resource + action.

**Pros:**

* Easy to reason about and implement.
* Works well when roles map to job functions.

**Cons and pitfalls:**

* Roles can become too coarse or too many (role explosion).
* If roles are embedded in long-lived JWTs, role changes may not take effect until token expiry unless you implement revocation.

**Best practices:**

* Keep roles minimal and use permissions for fine-grain control.
* Enforce checks at the service/microservice boundary, not only UI.
* For dynamic role changes, prefer short-lived tokens or server-side session checks against DB/cache.

---

# 5) JWT Authentication — deep dive

JWT = JSON Web Token. Common in modern APIs for stateless auth.

**Structure (conceptually):**

* Header (algorithm)
* Payload (claims: `iss`, `sub`, `aud`, `exp`, plus custom claims)
* Signature (HMAC or RSA/ECDSA)

**Common uses:**

* Access tokens for APIs (short lived).
* Identity tokens (OIDC) for user identity.

**Why use JWT?**

* Self-contained token: carries identity and possibly roles/claims.
* Server can verify signature without DB lookup (stateless).
* Easy to pass between services.

**Important JWT concepts & trade-offs:**

* **Signature scheme**: HMAC (symmetric) vs RSA/ECDSA (asymmetric). Asymmetric allows separate signing and verification keys.
* **Expiration (`exp`)**: always set `exp`. Short lifetimes reduce risk if leaked.
* **Audience (`aud`) and issuer (`iss`)**: validate them to avoid token reuse across services.
* **No sensitive data**: do not put secrets or PII in token payload unless encrypted (JWT is not encrypted by default).
* **Revocation problem**: truly stateless JWTs cannot be revoked easily. Solutions:

  * Keep short-lived access tokens + long-lived refresh tokens stored server-side (or hashed in DB).
  * Maintain a revocation list (blacklist) or token versioning per user in DB.
  * Use rotation of refresh tokens.

**Token storage on client:**

* Avoid storing tokens in localStorage (vulnerable to XSS).
* Recommended: store access tokens in memory and refresh tokens in Secure, HttpOnly cookies; or keep both in HttpOnly cookies.
* When using cookies, defend against CSRF (SameSite cookie attribute or CSRF tokens).

**Refresh tokens:**

* Long-lived, used to obtain new short-lived access tokens.
* Should be stored securely (HttpOnly cookie or secure store).
* Implement rotation (issue a new refresh token when used and invalidate the old one) to prevent replay.
* Store refresh tokens hashed in DB for revocation.

**JWT pitfalls and mitigations:**

* **Long-lived JWTs**: If leaked, attacker can act until expiry. Use short `exp`.
* **No revocation**: pair with refresh tokens + revocation storage.
* **Algorithm confusion attacks**: always validate `alg` and enforce expected algorithms; use vetted libraries that reject `none`.

---

# 6) Session-based (server-side) vs Token-based (stateless JWT) — tradeoffs

**Session-based:**

* Server stores session state (memory/Redis/DB).
* Client has session id cookie.
* Easy to revoke (delete session).
* Good for web apps (traditional).
* Requires storage & scale considerations (sticky sessions or shared session store).

**Token-based (JWT):**

* Stateless verification (no DB read) if purely signed token.
* Great for APIs and microservices.
* Revocation and token rotation complexity.
* Smaller setup for distributed systems if symmetric keys shared or asymmetric verification used.

**Which to choose?**

* Use **sessions** if you need easy revocation and primarily web app.
* Use **JWTs** for APIs and microservices, but implement best practices (short expiration, refresh tokens, revocation).

---

# 7) Supporting packages commonly used in Node.js auth

(These are **libraries** you’ll typically use; pick based on needs and security.)

### Password hashing / KDFs

* **bcrypt / bcryptjs** — widely used, well-tested, CPU-bound. Common default.
* **argon2** — modern winner of the Password Hashing Competition; more memory-hard, often recommended for new systems.
* **scrypt** — another memory-hard algorithm.
* **crypto.pbkdf2** (Node's built-in) — PBKDF2 for KDF if you prefer built-in.

**Notes:**

* Use a reasonable work factor (bcrypt rounds / argon2 parameters).
* Use a **unique salt** per password (these libs do it for you).
* Consider additional server-side **pepper** (server-wide secret) for extra protection.

### Tokens / JWTs

* **jsonwebtoken** — widely used for signing/verification (HMAC/RSA).
* **jose** — modern, spec-compliant JOSE/JWT implementation; more features for JWKS, JWE, JWS.
* **openid-client** — for OpenID Connect clients.

### Session and cookies

* **express-session** — session middleware.
* **connect-redis**, **connect-mongo**, etc. — session stores for production (don’t use in-memory store in prod).
* **cookie-parser** — parse cookies (for older apps; not strictly necessary for signed cookies).
* **cookies** — alternative cookie library.

### Authentication frameworks

* **Passport.js** — modular strategies (local, JWT, OAuth, OpenID). Good for traditional app or many auth strategies. Note: passport has some architectural quirks; still widely used.
* **grant** / **Bell** / other OAuth helpers for external providers.
* **@auth0/express-openid-connect** — if using Auth0 services.

### Security hardening

* **helmet** — sets secure HTTP headers (HSTS, X-Frame-Options, etc.).
* **csurf** — CSRF protection (when using cookies for auth).
* **express-rate-limit** or **rate-limiter-flexible** — throttle requests (esp. login endpoints).
* **bcryptjs** — pure JS bcrypt (fallback).
* **bcrypt** (native bindings) — faster but needs native build.

### Data stores & caching

* **redis** — session store, token blacklist, rate-limiting, refresh token storage.
* DB of choice (Postgres, MongoDB) for user records, password hashes, refresh tokens metadata.

---

# 8) Password handling — best practices

* Always hash passwords with **bcrypt/argon2/scrypt**.
* Use per-password **salts** (the libs do this).
* Use strong cost/work factors and plan to increase them over time.
* Consider **pepper** (server-wide secret appended to password before hashing) stored in an environment variable/secrets manager.
* Never log passwords.
* On password reset: send a short-lived signed token; store its digest/hash if needed; make it single-use.
* Enforce minimum complexity and/or use password strength meter and common-password blacklist.
* Consider offering and encouraging **MFA**.

---

# 9) Multi-Factor Authentication (MFA)

* Types: SMS OTP, TOTP (authenticator apps like Google Authenticator), hardware keys (WebAuthn / FIDO2), push-based.
* **TOTP** is recommended vs SMS (SMS susceptible to SIM swap).
* Implement enrollment flows, backup codes, and recovery flows (with secure verification).
* Consider using WebAuthn for phishing-resistant authentication.

---

# 10) Third-party auth / SSO / OAuth2 / OpenID Connect

* **OAuth2** is an authorization delegation protocol; **OIDC** is an identity layer on top of OAuth2.
* Common flows:

  * **Authorization Code (with PKCE)** — recommended for web and native apps.
  * **Client Credentials** — machine-to-machine.
  * **Device Code** — devices without browsers.
* Use **OIDC** when you need to authenticate users via identity providers (Google, Microsoft, Auth0).
* Be careful with scopes and mapping external identities to local user records.

---

# 11) Token lifecycle & revocation strategies

* **Short-lived access tokens** (e.g., minutes).
* **Refresh tokens** to obtain new access tokens — stored securely, revocable.
* **Rotation**: issue a new refresh token upon use and invalidate the previous one.
* **Revocation list** (blacklist) stored in Redis: check on token acceptance (trades statelessness for revocation).
* **Token versioning**: store a `tokenVersion` counter in user profile and include it in token; on logout or password reset increment counter to invalidate old tokens.
* **Hybrid**: short JWT + server-side session id for revocation.

---

# 12) Cookie security & CSRF

* When using cookies:

  * `HttpOnly` → prevents JS access (mitigates XSS stealing cookie).
  * `Secure` → only send over HTTPS.
  * `SameSite=Lax` or `Strict` → minimize CSRF.
* CSRF protection:

  * If cookies are used for auth, enable CSRF tokens (Synchronizer token pattern) or use SameSite cookies.
  * For APIs intended for cross-origin use, prefer token-based auth in headers (Authorization: Bearer).
* CORS: configure allowed origins and credentials carefully. Avoid `Access-Control-Allow-Origin: *` with credentials.

---

# 13) Threats & mitigations (practical checklist)

* **Credential stuffing / brute force**

  * Rate-limit login, use CAPTCHAs for unusual flows, monitor failures.
* **XSS (steal tokens)**

  * Sanitize/escape outputs, CSP headers, HttpOnly cookies.
* **CSRF**

  * CSRF tokens or SameSite cookies.
* **Replay attacks**

  * Use nonces, short token lifetimes, and refresh rotation.
* **Token leakage**

  * Short expiry, refresh tokens protected, rotate keys.
* **Man-in-the-middle**

  * Enforce HTTPS + HSTS.
* **Database compromise**

  * Hash + salt + pepper; limit access, use secrets manager.
* **Privilege escalation**

  * Validate roles/permissions server-side for every sensitive endpoint.

---

# 14) Key management & signing

* If using symmetric keys (HMAC): protect them; rotate periodically.
* If using asymmetric (RSA/ECDSA): keep private key secure, expose public key for verification (e.g., JWKS for distributed services).
* Rotate signing keys with overlap windows (old tokens still verifiable during rollout).
* Use a proper secrets manager (AWS KMS/Secrets Manager, HashiCorp Vault, etc.) in production.

---

# 15) Observability & incident response

* Log auth events (login successes/failures, password resets, token refreshes) with context — but **never** log passwords or full tokens.
* Monitor unusual login patterns and alert on anomalies.
* Provide admin tools to revoke sessions and tokens.
* Rate-limit sensitive operations and add alerts for spikes.

---

# 16) Real-world architecture patterns (examples)

* **Monolith web app**: server-side sessions + Redis store + CSRF tokens. Simple, revocable, secure.
* **SPA + API**: short-lived access JWT in memory + refresh token in HttpOnly cookie with refresh endpoint that rotates tokens. Protect refresh endpoint with same-origin checks and device/session metadata.
* **Microservices**: use JWT access tokens signed by an auth service. Validate `aud`, `iss` in each microservice. For revocation, use short tokens or a central introspection endpoint.
* **External IdP (Auth0, Okta)**: outsource identity complexity; integrate through OIDC; map external claims to internal roles cautiously.

---

# 17) Practical checklist / recommendations (TL;DR)

* Always use **HTTPS**.
* Hash passwords with **argon2** (preferred) or **bcrypt**; use proper work factors.
* Use **short-lived access tokens** + **rotating refresh tokens** stored securely.
* Prefer **HttpOnly + Secure** cookies for tokens when possible; mitigate CSRF.
* Enforce **rate-limiting** on auth endpoints.
* Add **MFA** for sensitive accounts.
* Use **helmet**, **csurf**, and input validation.
* Log auth events and provide revocation controls.
* For OAuth/OpenID flows, prefer **Authorization Code + PKCE**.
* Use vetted libraries (jsonwebtoken/jose + passport or direct middleware) — avoid writing crypto primitives yourself.
* Implement **token revocation** strategy before going to production.

---

# 18) Common pitfalls to avoid

* Embedding sensitive PII or secrets into JWT payloads.
* Long-lived JWTs without revocation.
* Storing tokens in localStorage (XSS risk).
* Relying only on client-side checks for authorization.
* Using default in-memory session store in production.
* Poor password hashing parameters (too low cost).
