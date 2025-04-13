# How to setup Jest in Vanila Js Project

### 1. Initialize the Node Project

```
npm init -y
```

### 2. Install Jest as Dev Dependency
-  The Jest testing framework.
```
npm install --save-dev jest
```

### 3. Install `babel` dependencies
when Jest tries to parse modern JavaScript syntax (e.g., ES6+ features like import/export, optional chaining, etc.) or other non-standard syntax (e.g., JSX) but doesn't have the necessary configuration to handle it. By default, Jest expects CommonJS syntax (require/module.exports) and does not automatically support ES Modules (import/export) or other advanced features. 

To resolve this issue, you need to configure Jest to use Babel  to transpile your code into a format that Jest can understand. 

```
npm install --save-dev @babel/core @babel/preset-env babel-jest
```

### 4. Create a Babel configuration file in root of your project
This configuration tells Babel to use the @babel/preset-env preset, which transforms modern JavaScript syntax into a version compatible with Jest.
`babel.config.js`
```
module.exports = {
  presets: ['@babel/preset-env'],
};
```

### 5. Create Jest Configuration File
`jest.config.js`
```json
module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest', // Use Babel to transform JavaScript files
  },
  testEnvironment: 'jsdom', // Use jsdom for DOM-related tests (optional)
};
```

### 6. Update Scripts in `package.json`
```json
"scripts": {
  "test": "jest"
}
```

## For Typescript
- Do the above and on top of that
### 1. Install Typescript Babel Preset
```
npm install --save-dev @babel/preset-typescript
```

### 2. Update your `babel.config.js`
```
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

## For React/JSX

### 1. Install the React Babel preset:
```
npm install --save-dev @babel/preset-react
```

### 2. Update your `babel.config.js`
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
