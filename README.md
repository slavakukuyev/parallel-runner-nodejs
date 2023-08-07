# parallel-runner-nodejs

The `ParallelRunner` is a utility class that enables concurrent execution of asynchronous tasks in Node.js. It allows developers to set a maximum number of tasks to run in parallel, ensuring optimal performance for compute-intensive operations. The tasks are executed in the order they were added, and the results are returned in the same order. If any task throws an exception, the `getResults()` method halts the execution of new tasks and waits for ongoing tasks to complete before throwing an exception. The class provides a simple and efficient solution for managing concurrent tasks and can be used to improve the performance of applications that rely on parallel processing.

```js
Started.
Results:
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
Exiting.
finished in  2.53  ms
```
