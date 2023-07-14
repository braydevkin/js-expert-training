const { createSandbox } = require("sinon");
const assert = require("assert");
const Fibonacci = require("./fibonacci");
const sinon = createSandbox();

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    for (const sequence of fibonacci.execute(3)) {
    }
    const expectedCount = 4;
    assert.strictEqual(spy.callCount, expectedCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const results = [...fibonacci.execute(5)];
    const expectedCount = 6;
    assert.strictEqual(spy.callCount, expectedCount);
    const { args } = spy.getCall(2);
    const expectedParams = [3, 1, 2];
    assert.deepStrictEqual(args, expectedParams);

    const expectedResults = [0, 1, 1, 2, 3];
    assert.deepStrictEqual(results, expectedResults);
  }
})();
