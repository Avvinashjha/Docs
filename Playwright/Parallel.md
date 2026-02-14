# Parallel Test Execution Guide

## Overview

Playwright runs tests in parallel by default using multiple worker processes. Each worker is a separate Node.js process that runs tests independently.

## Current Configuration

```javascript
// playwright.config.js
fullyParallel: true,  // All tests run in parallel
workers: process.env.CI ? 1 : undefined,  // CI: sequential, Local: auto
```

## How It Works

```
┌─────────────────────────────────────────────────────┐
│  Test Suite (4 test files)                          │
│  ├── flux_home.spec.js                              │
│  ├── create_flow.spec.js                            │
│  ├── flow_sanity.spec.js                            │
│  └── flux_change_flow.spec.js                       │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────────┐
        │  Playwright Test Runner      │
        │  (workers: 4)                │
        └─────────────────────────────┘
                      │
        ┌─────────────┴─────────────┬─────────────┬─────────────┐
        ▼                           ▼             ▼             ▼
   ┌─────────┐               ┌─────────┐   ┌─────────┐   ┌─────────┐
   │Worker 1 │               │Worker 2 │   │Worker 3 │   │Worker 4 │
   │ flux_   │               │ create_ │   │ flow_   │   │ flux_   │
   │ home    │               │ flow    │   │ sanity  │   │ change  │
   └─────────┘               └─────────┘   └─────────┘   └─────────┘
```

## Configuration Options

### 1. **In playwright.config.js**

```javascript
export default defineConfig({
  // Option 1: Auto (default) - Uses half of CPU cores
  workers: undefined,
  
  // Option 2: Fixed number
  workers: 4,
  
  // Option 3: Percentage of CPU cores
  workers: '50%',
  
  // Option 4: Environment variable
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS) : undefined,
  
  // Option 5: Different for CI vs local
  workers: process.env.CI ? 1 : 4,
  
  // Parallel mode
  fullyParallel: true,  // All tests in parallel
  // fullyParallel: false, // Tests within same file run sequentially
});
```

### 2. **Via Command Line** (Overrides config)

```bash
# Use 4 workers
npx playwright test --workers=4

# Use 1 worker (sequential)
npx playwright test --workers=1

# Use 100% of CPU cores
npx playwright test --workers=100%

# Use 50% of CPU cores
npx playwright test --workers=50%

# Use max workers (all CPU cores)
npx playwright test --workers=100%
```

### 3. **Via npm Scripts**

```bash
# Normal parallel (uses config)
npm run test:local

# Force 4 workers
npm run test:parallel

# Sequential execution (1 worker)
npm run test:sequential

# Max parallel (all CPUs)
npm run test:max-parallel
```

## Examples

### Example 1: Run with specific workers

```bash
# Local with 2 workers
ENV=local npx playwright test --workers=2

# Staging with 1 worker (sequential)
ENV=staging npx playwright test --workers=1
```

### Example 2: Run specific test file in parallel

```bash
# Run only flow tests with 4 workers
ENV=local npx playwright test flow_sanity.spec.js --workers=4
```

### Example 3: Environment-based workers

```bash
# Set workers via environment variable
WORKERS=6 npm run test:local
```

## Parallel Strategies

### Strategy 1: Maximum Speed (Local Development)

```javascript
workers: '100%',  // Use all CPU cores
fullyParallel: true,
```

```bash
npm run test:max-parallel
```

**Pros**: Fastest execution  
**Cons**: High CPU usage, harder to debug

### Strategy 2: Balanced (Recommended)

```javascript
workers: undefined,  // Auto (50% of CPUs)
fullyParallel: true,
```

```bash
npm run test:local
```

**Pros**: Good speed, system remains responsive  
**Cons**: None

### Strategy 3: Sequential (Debugging)

```javascript
workers: 1,
fullyParallel: false,
```

```bash
npm run test:sequential
```

**Pros**: Easy to debug, clear output  
**Cons**: Slowest execution

### Strategy 4: CI/CD Optimized

```javascript
workers: process.env.CI ? 1 : undefined,
fullyParallel: true,
retries: process.env.CI ? 2 : 0,
```

**Pros**: Reliable in CI, fast locally  
**Cons**: Slower in CI

## Per-File Control

You can control parallelization per test file:

### Parallel Tests (Default)

```javascript
// tests/flux_home.spec.js
test.describe("Flux Home", () => {
  test("test 1", async ({ page }) => { /* ... */ });
  test("test 2", async ({ page }) => { /* ... */ });
  test("test 3", async ({ page }) => { /* ... */ });
});
// All 3 tests can run in parallel
```

### Sequential Tests (Serial)

```javascript
// tests/flow_sanity.spec.js
test.describe.serial("Flow Sanity Tests", () => {  // ← .serial
  test("test 1", async ({ page }) => { /* ... */ });
  test("test 2", async ({ page }) => { /* ... */ });
  test("test 3", async ({ page }) => { /* ... */ });
});
// Tests run one after another (order matters)
```

### Configure Parallelization

```javascript
// Run this describe block in serial
test.describe.configure({ mode: 'serial' });

// Run this describe block in parallel
test.describe.configure({ mode: 'parallel' });
```

## Performance Comparison

| Workers | 10 Tests | Time (approx) | CPU Usage |
|---------|----------|---------------|-----------|
| 1       | 10 tests | 10 min        | Low       |
| 2       | 10 tests | 5 min         | Medium    |
| 4       | 10 tests | 2.5 min       | High      |
| 8       | 10 tests | 1.5 min       | Very High |

*Assumes each test takes ~1 minute*

## Best Practices

### 1. **Local Development**
```bash
# Use default parallel for fast feedback
npm run test:local

# Use sequential when debugging
npm run test:sequential
```

### 2. **CI/CD**
```javascript
workers: process.env.CI ? 1 : undefined,
retries: process.env.CI ? 2 : 0,
```

### 3. **Avoid Test Dependencies**
```javascript
// ❌ Bad - Tests depend on each other
test("create user", async ({ page }) => {
  // Creates user
});
test("edit user", async ({ page }) => {
  // Expects user from previous test
});

// ✅ Good - Independent tests
test("create and edit user", async ({ page }) => {
  // Create user
  // Edit user
  // All in one test
});
```

### 4. **Use test.describe.serial() for Dependent Tests**
```javascript
test.describe.serial("User Flow", () => {
  test("1. create account", async ({ page }) => { /* ... */ });
  test("2. verify email", async ({ page }) => { /* ... */ });
  test("3. setup profile", async ({ page }) => { /* ... */ });
});
```

## Troubleshooting

### Issue: Tests fail in parallel but pass sequentially

**Cause**: Tests have shared state or dependencies

**Solution**:
```bash
# Run sequentially to verify
npm run test:sequential

# Fix test isolation
# - Use unique test data
# - Clean up after tests
# - Avoid shared resources
```

### Issue: High CPU usage

**Cause**: Too many workers

**Solution**:
```bash
# Reduce workers
ENV=local npx playwright test --workers=2
```

### Issue: Tests timeout in parallel

**Cause**: Resource contention

**Solution**:
```javascript
// Increase timeout
timeout: 90000,  // 90 seconds

// Or reduce workers
workers: 2,
```

## Advanced: Sharding

For very large test suites, you can split tests across multiple machines:

```bash
# Machine 1: Run first half
npx playwright test --shard=1/2

# Machine 2: Run second half
npx playwright test --shard=2/2
```

## Summary

| Setting | Value | When to Use |
|---------|-------|-------------|
| `workers: undefined` | Auto (50% CPU) | Default, balanced |
| `workers: 1` | Sequential | Debugging, CI |
| `workers: 4` | Fixed 4 workers | Consistent speed |
| `workers: '100%'` | Max parallel | Fastest, local only |
| `fullyParallel: true` | All parallel | Independent tests |
| `fullyParallel: false` | File sequential | Some dependencies |

## Quick Commands

```bash
# Auto parallel (recommended)
npm run test:local

# 4 workers
npm run test:parallel

# Sequential (debugging)
npm run test:sequential

# Max speed
npm run test:max-parallel

# Custom workers
ENV=local npx playwright test --workers=3
```
