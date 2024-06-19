# Automated Web Testing with TypeScript, Playwright, and Cucumber
![Static Badge](https://img.shields.io/badge/TypeScript-logo?style=for-the-badge&logo=typescript&logoColor=white&labelColor=rgb(49%2C%20120%2C%20198)&color=rgb(22%2C%2027%2C%2034))
![Static Badge](https://img.shields.io/badge/Playwright-logo?style=for-the-badge&logo=playwright&logoColor=rgb(214%2C%2083%2C%2072)&labelColor=rgb(46%2C%20173%2C%2051)&color=rgb(22%2C%2027%2C%2034))
![Static Badge](https://img.shields.io/badge/Cucumber-logo?style=for-the-badge&logo=cucumber&logoColor=black&labelColor=rgb(35%2C%20217%2C%20108)&color=rgb(22%2C%2027%2C%2034))

sample test automation framework developed using Playwright with Cucumber.

## Testing Features 🧪

This suite of tests is specifically designed to validate and test features on the swaglabs(https://www.saucedemo.com/v1/) and formy(https://formy-project.herokuapp.com/form) website. You'll find feature files under the `tests/features` directory related to signup, login and adding products to the cart.


## Table of Contents 📑
- [Requirements](#requirements)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Test Execution](#test-execution)
- [Contact](#contact)

### <a id="requirements">Requirements 📋</a>

- Node.js 21.2.0
- @cucumber/cucumber: ^10.8.0
- @playwright/test: ^1.44.1
- @types/jsonpath: ^0.2.4
- @types/node: ^20.14.2
- cucumber-html-reporter: ^7.1.1
- ts-node: ^10.9.2
- ajv: ^8.16.0
- dotenv: ^16.4.5
- fs-extra: ^11.2.0
- jsonpath: ^1.1.1
- jsonpath-plus: ^9.0.0
- multiple-cucumber-html-reporter: ^3.6.2
- tsc: ^2.0.4
- winston: ^3.13.0

## <a id="folder-structure">Folder Structure 📂</a>

- **cucumber.json:** Configuration or generated output by Cucumber.
- **package-lock.json:** Specific details about exact dependency versions for the project.
- **package.json:** Project configuration file for Node.js.

### Directory "src"

- **api:** Directory containing API-related functionality.
  - **resources:** Subdirectory containing JSON files or other resources used within the API layer.

- **utils:** Directory containing utility functions and constants.
  - **RestRequest.ts:** Functions for making HTTP requests (GET, POST, PUT, DELETE).
  - **RESTResponse.ts:** Manages and processes responses received from RESTful API requests made within the application.
  - **RoutesReq.ts:** Defines and manages routes and endpoints used within the application's API layer.
  - **RequestHeader.ts:** Utility functions related to HTTP request headers used in API interactions.

- **hooks:** Directory with files related to hooks for tests.
  - **fixture.ts:** File with pre-defined test configurations.
  - **hooks.ts:** File with custom hooks for tests.

### Directory "helpers"

- **Filereader.ts:** Functions for reading various file formats such as JSON, CSV, or text files.
- **uiActions.ts:** Contains utility functions or classes for performing UI-related actions within the application.
- **AssertionUtils.ts:** Provides utility functions and methods for performing assertions and validations within API tests or actions.

### Directory "pages" Directory containing Page Object Model classes.

### Directory "tests"

- **features:** Subdirectory containing specification files in Gherkin format.
- **steps:** Directory containing files with steps for the specifications.

### Directory "utils"

- **browsers.ts:** Class responsible for managing different browser instances using Playwright.
- **cleanup.ts:** Contains utility functions or scripts for cleaning up resources or performing cleanup tasks.
- **log.ts:** Defines the options for logger configuration.
- **init.ts:** Initializes necessary directories and handles errors using `fs-extra` for file system operations.
- **report.ts:** Generates and formats reports, typically related to test execution results or application metrics.

- **.env:** Configuration file used to store environment variables for application.

### Directory "test-results"

- **screenshots:** Directory for storing screenshots and attach them to a cucumber HTML report.
- **logs:** Directory for storing logs related to test executions or application events.
- **reports:** Directory specifically for storing generated reports from test automation or execution.
- **recordings:** Directory dedicated to storing recorded sessions or interactions, often used in UI or performance testing.
- **traces:** Directory containing debug or trace logs.


## <a id="installation">Installation 🛠️</a>

1. Clone this repository:

    ```bash
    git clone https://github.com/carlosvagnoni/typescript_playwright_cucumber.git
    cd typescript_playwright_cucumber
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## <a id="configuration">Configuration ⚙️</a>

- Make sure you have a browser installed and configured in the script (Chrome, Firefox, or Safari).
- You can configure the fixture.ts file to adjust parameters such as the base URL(url) and browser.

## <a id="test-execution">Test Execution ▶️</a>

Run all the tests:

```bash
npm run test
```

Open report:

```bash
start "" "test-results\reports\cucumber_report.html"
```

**NOTE:**

- Set up the respective environment variables beforehand.
- On Windows environments, you can directly execute the `run.bat` file.

## <a id="contact">Contact 📧</a>

If you have any questions or suggestions, feel free to contact me through my social media accounts.

Thank you for your interest in this project!
