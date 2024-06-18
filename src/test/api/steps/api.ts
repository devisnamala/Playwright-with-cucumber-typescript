  import { Given, Then, When } from "@cucumber/cucumber";
  import RESTRequest from "../../../api/utils/RestRequest";
  import { fixture } from "../../../hooks/pageFixture";
  import RequestHeader from "../../../api/utils/RequestHeader";
  import AssertionUtils from "../../../api/actions/AssertionUtils";
  import { readJsonFromFile } from "../../../helpers/Filereader";
  import { RoutesReq as routes } from "../../../api/utils/RoutesReq";
  let restRequest:RESTRequest;
  function getHeader() {
    return new RequestHeader().set("content-type",  "application/json")
        .set("accept", "application/json")
        .get();
  }

  Given('the API request context is initialized', async function () {
    restRequest= new RESTRequest(fixture.page);
  });

  //get
  When('the user checks the users endpoint', async function () {
    const requestHeader = new RequestHeader().set('Content-Type', 'application/json');
    await restRequest.get(this.attach, routes.list_users , getHeader(), "get request to list users");
  });
  Then('the users endpoint should return a valid response and verify particular user', async function () {
    console.log("response is 200");
  });

  //post
  When('the user creates a new user with the following details', async function (dataTable) {
    const data = dataTable.rowsHash();
    const jsonPayload = JSON.stringify(data);
    const response= await restRequest.post(this.attach, routes.create, getHeader(),jsonPayload, "post request to create user");
    this.response = response;
  });
  Then('the create user endpoint should return a valid response', async function () {
  AssertionUtils.verifyStatusCode(this.response, 201);
  AssertionUtils.assertJsonValue(this.response, "name", "John");
  });

  //put
  When('the user updates the user with ID {int} with the following details', async function (int) {
    const userData = readJsonFromFile("src/API/resources/post.json");
    const Data= JSON.stringify(userData);
    const response= await restRequest.put(this.attach, routes.Update, getHeader(), Data, "Updating user with put request");
    this.response = response;
    });

  Then('the update user endpoint should return a valid response', async function () {
    AssertionUtils.verifyStatusCode(this.response, 200);
    AssertionUtils.assertJsonValue(this.response, "name", "morpheus");
    });

    //patch
    When('the user partially updates the user with ID {int} with the following details', async function (int, dataTable) {
      const data = dataTable.rowsHash();
      const jsonPayload = JSON.stringify(data);
      const response= await restRequest.patch(this.attach, routes.Update,getHeader(), jsonPayload, "patch request to update");
      this.response = response;
      });
    Then('the patch user endpoint should return a valid response', async function () {
      AssertionUtils.verifyStatusCode(this.response, 200);
      AssertionUtils.assertJsonValue(this.response, "name", "Jane");
      });
    