import test from "ava";
import "@k2oss/k2-broker-core/test-framework";
import "./index";
import axios from "axios";
import "./testsetup";

test("execute passes", async (t) => {
  let x = await axios({
    url: "https://jsonplaceholder.typicode.com/todos/198",
    method: "get",
    withCredentials: true,
  });
  t.plan(3);
  t.is(x.data.id, 198);
  t.is(x.data.userId, 10);
  t.is(x.data.title, "quis eius est sint explicabo");
});

test("Execute something in real broker", async (t) => {
  await Promise.resolve<void>(
    onexecute({
      objectName: "File",
      methodName: "getInfo",
      parameters: undefined,
      properties: undefined,
      configuration: undefined,
      schema: undefined,
    })
  );
  t.plan(1);
  t.is(typeof result.data, "string");
});
