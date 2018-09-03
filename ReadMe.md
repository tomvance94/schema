# Schema Technical Assessment

The following document outlines how the task was achieved and how to run the project.

---- 

### Steps to Run:

1. `npm run build`: This script will build the TypeScript to runnable Javascript
2. `npm run start`: This will start up the project, and will run the `src/examples.ts` file.
3. `npm run test`: This will run the associated unit tests.

----

The project was built using TypeScript, this allows us to be more explicit about
how the OfflineDatabase class should be used the the type of parameters is will expect.

### examples.ts

The examples file has a number of uses of the OfflineDatabase class to show it in action. This can be run as show above, or edited to test further use cases.