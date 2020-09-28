import test from "ava";
import "@k2oss/k2-broker-core/test-framework";
import { fetch_get } from "./fetch";
import { ServiceObjectDefinitions } from "./ServiceObjects";
import "./index";

// TODO: need to find a way to read/get this value for oauth setups.
let OAuthToken = "xxx";

function mock(name: string, value: any) {
  global[name] = value;
}

let result: any = null;
mock("postResult", function (r: any) {
  result = r;
  console.log("postResult:");
  console.log(result);
});

let xhr: { [key: string]: any } = null;
class XHR {
  public onreadystatechange: () => void;
  public onerror: () => void;
  public readyState: number;
  public status: number;
  public responseText: string;
  public withCredentials: boolean;

  private recorder: { [key: string]: any };

  constructor() {
    xhr = this.recorder = {};
    this.recorder.headers = {};
  }

  open(method: string, url: string) {
    this.recorder.opened = { method, url };
  }

  setRequestHeader(key: string, value: string) {
    this.recorder.headers[key] = value;
    console.log("setRequestHeader: " + key + "=" + value);
  }

  send(payload) {
    const request = require("request");
    if (this.withCredentials) {
      this.setRequestHeader("Authorization", "Bearer " + OAuthToken);
    }

    const options = {
      method: this.recorder.opened.method,
      url: this.recorder.opened.url,
      headers: this.recorder.headers,
      body: payload,
      strictSSL: false,
    };
    console.log("URL: " + options.method + " " + options.url);
    console.log("BODY: " + options.body);
    try {
      request(options, (error, res, body) => {
        if (error) {
          console.log("error inside request:");
          console.log(error);
          this.onerror();
          return;
        }
        this.responseText = body;
        this.readyState = 4;
        this.status = res.statusCode;
        console.log("calling onreadystatechange");
        this.onreadystatechange();
        delete this.responseText;
      });
    } catch (err) {
      console.log("error ouside request " + err);
    }
  }
}

mock("XMLHttpRequest", XHR);

test("Retrieve a TODO", async (t) => {
  let x = await fetch_get("https://jsonplaceholder.typicode.com/todos/198");
  let y = JSON.parse(x);
  t.plan(3);
  t.is(y.id, 198);
  t.is(y.userId, 10);
  t.is(y.title, "quis eius est sint explicabo");
});

test("404 failure", async (t) => {
  let x = fetch_get("https://google.com/404");
  return x
    .then((result) => {
      t.fail();
    })
    .catch((err) => {
      t.pass();
      console.log(err);
    });
});

test("describe returns the hardcoded instance", async (t) => {
  let schema = null;
  mock("postSchema", function (r: any) {
    schema = r;
  });

  await Promise.resolve<void>(
    ondescribe({
      configuration: {},
    })
  );

  t.deepEqual(schema, ServiceObjectDefinitions);
  t.pass();
});

test("ServiceObject not supported", async (t) => {
  let nonexistingServiceObject = "K2rocks";
  let error = await t.throwsAsync(
    Promise.resolve<void>(
      onexecute({
        objectName: nonexistingServiceObject,
        methodName: "unused",
        parameters: {},
        properties: {},
        configuration: {},
        schema: {},
      })
    )
  );

  t.deepEqual(
    error.message,
    "The object " + nonexistingServiceObject + " is not supported."
  );
  t.pass();
});

test("File method not supported", async (t) => {
  let nonexistingMethod = "SomeMethod";
  let error = await t.throwsAsync(
    Promise.resolve<void>(
      onexecute({
        objectName: "File",
        methodName: nonexistingMethod,
        parameters: {},
        properties: {},
        configuration: {},
        schema: {},
      })
    )
  );

  t.deepEqual(
    error.message,
    "The method " + nonexistingMethod + " is not supported."
  );

  t.pass();
});

test("Execute something in real broker", async (t) => {
  await onexecute({
    objectName: "File",
    methodName: "getInfo",
    parameters: undefined,
    properties: undefined,
    configuration: undefined,
    schema: undefined,
  });

  t.plan(1);
  t.is(result.id, 192);
});
