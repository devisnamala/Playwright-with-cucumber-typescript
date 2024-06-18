@SmokeTest
Feature: API Testing with Playwright and Cucumber

Background: 
 Given the API request context is initialized
  @Get
  Scenario: Verify users endpoint returns valid response
    When the user checks the users endpoint
    Then the users endpoint should return a valid response and verify particular user

  @Post
  Scenario: Create a new user
    Given the API request context is initialized
   When the user creates a new user with the following details
    | name  | John   |
    | job  | Leader|
    Then the create user endpoint should return a valid response

  @put
  Scenario: Update Existing user
   When the user updates the user with ID 2 with the following details
   Then the update user endpoint should return a valid response
  
  @patch
   Scenario: Partially update an existing user
    When the user partially updates the user with ID 2 with the following details
      | name | Jane    |
      | job | Developer |
    Then the patch user endpoint should return a valid response
