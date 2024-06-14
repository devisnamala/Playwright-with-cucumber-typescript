Feature: User Login

Scenario Outline: User successful Login
  Given User is on login page
  And User enters the username as "<username>" and password as "<password>"
  When User clicks on login
  Then User successfully logs in

Examples:
    | username                | password       |
    | standard_user           | secret_sauce   |
    | problem_user            | secret_sauce   |
