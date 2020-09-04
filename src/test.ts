import test from "ava";
import "@k2oss/k2-broker-core";
import "@k2oss/k2-broker-core/test-framework";

//TODO: How to import the fetch.js file, or use the fetch-polyfill directly.

function mock(name: string, value: any) {
  global[name] = value;
}

test("execute passes", async (t) => {
  let x = await fetch("https://jsonplaceholder.typicode.com/todos/");
  t.plan(3);
  t.is(x, "a");

  t.pass();
});
