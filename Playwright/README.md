# Playwright

## What is Playwright?

Playwright is an end-to-end testing framework that automates web browsers (Chromium, Firefox, WebKit). It simulates real user interactions with your application.

## Setup

Playwright can be setup inside the same project or you can have standalone playwright testing directory itself but setup will not change that much

1. If you already have a project setup then

    ```cm
    npm init playwright@latest
    ```

    This will install the latest version of playwright and add it to you package.json as well

2. If you are setting up a standalone project
   
   ```cm
    npm init playwright@latest
   ```

   - command will remain same but in this cas playwright will create a node.js project for you with dev dependencies of playwright

## Playwright Project structure

```cmd
├── global-setup.js
├── package-lock.json
├── package.json
├── playwright-report
│   ├── data
│   │   └── b7a634f14ea865c136ccb54b0b0efb04475ded4d.zip
│   ├── index.html
│   └── trace
│
├── playwright.config.js
├── README.md
├── test-results
│   └── flux_flow_pipeline-Flux-Fl-5e3a0-of-flows-to-change-the-flow-chromium
│       └── trace.zip
└── tests
    ├── flux_flow_pipeline.spec.js
    └── flux_home.spec.js
```

- `playwright.config.ts` - Main configuration file
- `tests/`  folder - Where your tests go
- `tests/example.spec.ts` - Example test file to learn from
- `Updated package.json` - New scripts and Playwright dependency

## How to Pass Cookies

There are several way to pass cookies

1. We can pass in each of the test context

    ```js
    test.beforeEach(async ({context})=>{
        await context.addCookies({
            name: "fluxAuth",
            value: "adfssadf",
            domain: ".reports.mn",
            path: "/"
        })
    })
    ```

2. We can pass cookies in playwright.config.js file

    ```js
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/flux.json',
      },
    },
    ```

    - Here we have defined the cookie i flux.json file and we are just adding to the browser storage state

## Write your First test

- Test file name should end with `.spec.js` it's the naming convention and playwright looks for these files while running tests.

`flux_home.spec.js`

```js
import {test, expect} from "@playwright/test"

test("has title", async ({ page }) => {

    // Navigate to your app
    await page.goto("https://flux.internal.reports.mn/");

    // wait for page to load (Here we are waiting and looking for a specific class to appear in dom)
    await page.waitForSelector(".homedashboard__wrapper", {timeout: 10000})

    // add your assertion or checks (Here we are checking if page has title as Home)
    await expect(page).toHaveTitle("Home")
 })
```

Understand the test

- `test()` - creates a test case
- `async ({page})` - Gets a browser page object
- `page.goto(url)` - Navigates to the url
- `expect(page).toHaveTitle("Home")` - checks if page has title as Home

### Running your test

Option 1: Run test in terminal

```cmd
npx playwright test
```

- Runs test fast without showing browser

Option 2: Run with UI mode

```cmd
npx playwright test --ui
```

- This opens a visual interface where you can see each test and can watch the execution step by step and debug if something fails
  
Option 3: Run in Headed Mode (See Browser)

```
npx playwright test --headed
```

- Browser window will open and you see tests running

### How to see test report

- Navigate to playwright-report/index.html

- Or you can run a command and it will serve you the same html file in browser

```cmd
npx playwright show-report
```


### Most Frequently used Commands

1. Run All Test (All Browser, Headless)

    ```cmd
    npx playwright test
    ```

2. Run a single test file
   
   ```cmd
    npx playwright test flux_home.spec.ts
   ```

3. Run multiple test files
   
    ```cmd
    npx playwright test flux_home.spec.js flux_flow_pipeline.spec.js
    ```

4. Run test matching file name pattern
   
   ```cmd
    npx playwright test flux
   ```

5. Run test by title 
   
   ```cmd
    npx playwright test -g "manage card button is visible"
   ```

6. Run test Starting a a Specific Line

    ```cmd
    npx playwright test flux_home.spec.js:16
    ```

7. Run test only on the specific Browser
   
   ```cmd
    npx playwright test --project=chromium
   ```
   
8. Run test on multiple projects
   
   ```cmd
    npx playwright test --project=chromium --project=firefox
   ```

9. Run test in Headed Mode
    
    ```cmd
    npx playwright test --headed
    ```

10. Debug all test
    
    ```cmd
    npx playwright --debug
    ```
    - This enables 
      - Headed Mode
      - Slow Motion
      - Playwright inspector

11. Debug a specific test file
    
    ```cmd
    npx playwright flux_home.spec.js --debug
    ```

    - You can add breakpoints in your test 

    ```js
    await page.pause()
    ```

12. Record trace for all test
    
    ```cmd
    npx playwright test --trace=on
    ```

13. Show trace for failed test
    
    ```cmd
    npx playwright show-trace trace.zip
    ```

14. Enable Video Recording
    
    ```cmd
    npx playwright test --video=on
    ```

15. Enable Screenshot
    
    ```cmd
    npx playwright test --screenshot=on
    ```

16. Open the html report
    
    ```cmds
    npx playwright show-report
    ```

17. Generate Report without running test
    
    ```cmd
    npx playwright show-report playwright-report
    ```

We can combine different path parameters to achieve certain behavior too.

## Different types of 