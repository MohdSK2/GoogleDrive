import test from "ava";
import "@k2oss/k2-broker-core/test-framework";
import "./testsetup";
import "./index";

test("execute passes", async (t) => {
  let x = await fetch_get("https://jsonplaceholder.typicode.com/todos/192");
  let y = JSON.parse(x);
  t.plan(3);
  t.is(y.id, 198);
  t.is(y.userId, 10);
  t.is(y.title, "quis eius est sint explicabo");
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
  t.is(result.path, "blaa");
});
