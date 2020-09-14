// TODO: need to find a way to read/get this value for oauth setups.
let OAuthToken = "xxx";

function mock(name: string, value: any) {
  global[name] = value;
}

let schema = null;
mock("postSchema", function (result: any) {
  schema = result;
  console.log("postSchema:");
  console.log(schema);
});

let result: any = null;
function pr(r: any) {
  result = r;
  console.log("postResult:");
  console.log(result);
}

mock("postResult", pr);

let xhr: { [key: string]: any } = null;
class XHR {
  public onreadystatechange: () => void;
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
    let promise = new Promise((resolve, reject) => {
      try {
        request(options, (error, res, body) => {
          if (error) {
            console.error("error inside request:" + error);
            return;
          }
          this.responseText = body;
          this.readyState = 4;
          this.status = 200;
          this.onreadystatechange();
          resolve();
          delete this.responseText;
        });
      } catch (err) {
        console.log("error ouside request " + err);
        reject();
      }
    }).catch((errr) => {
      console.log("Promise error:" + errr);
    });
  }
}

mock("XMLHttpRequest", XHR);
