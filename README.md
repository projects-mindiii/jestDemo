What is test cases


A Test Case is a set of actions executed to verify a particular feature or functionality of your software application. A Test Case contains test steps, test data, precondition, postcondition developed for specific test scenarios to verify any requirement. The test case includes specific variables or conditions, using which a testing engineer can compare expected and actual results to determine whether a software product is functioning as per the requirements of the customer.
Test cases & test scenarios:

Scenario: Test scenarios are rather unclear and cover a wide range of possibilities. Testing is all about being very specific.

Test cases: For a Test Scenario: Check Login Functionality here many possible test cases are:

Test Case 1: Check results on entering valid User Id & Password
Test Case 2: Check results on entering Invalid User ID & Password
Test Case 3: Check response when a User ID is Empty.
Test Case 4: Check results on passing invalid request header
Test Case 5: Check results on passing valid request header
Test Case 6: Check results on passing invalid request params.
Test Case 7: Check results on passing valid request params and many more This is nothing but a Test Case.
What is unit testing:

Unit Testing is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness. A unit may be an individual function, method, procedure, module, or object.

In SDLC, STLC, V Model, Unit testing is the first level of testing done before integration testing. Unit testing is a WhiteBox testing technique that is usually performed by the developer.




Unit Testing Advantage:

1. Unit testing allows the programmer to refactor code at a later date, and make sure the module still works correctly (i.e. snapshot testing). The procedure is to write test cases for all functions and methods so that whenever a change causes a fault, it can be quickly identified and fixed.
2. Due to the modular nature of the unit testing, we can test parts of the project without waiting for others to be completed.
3. Unit tests help to fix bugs early in the development cycle and save costs.
4. Unit tests help with code reuse. Migrate both your code and your tests to your new project. Tweak the code until the tests run again.


Unit Testing Disadvantages:

1. Unit testing can’t be expected to catch every error in a program. It is not possible to evaluate all execution paths even in the most basic programs.
2. Unit testing by its very nature focuses on a unit of code. Hence it can’t catch integration errors or broad system level errors.


Unit Testing Best Practices:

1. Unit Test cases should be independent. In case of any enhancements or change in requirements, unit test cases should not be affected.
2. Test only one code at a time.
3. Follow clear and consistent naming conventions for your unit tests.
4. In case of a change in code in any module, ensure there is a corresponding unit Test
    Case for the module, and the module passes the tests before changing the
    implementation.
5. Bugs identified during unit testing must be fixed before proceeding to the next phase in SDLC.
6. Adopt a “test as your code” approach. The more code you write without testing, the more paths you have to check for errors.


* There is level of testing phases which is followed by software companies:
	1. Unit testing(for this phase, the developer is going to be responsible).
	2. Integration testing.
	3. System testing.
	4. Acceptance testing.


How to executing unit testing:

In order to execute Unit Tests, developers write a section of code to test a specific function in a software application. Developers can also isolate this function to test more rigorously which reveals unnecessary dependencies between the function being tested and other units so the dependencies can be eliminated. Developers generally use UnitTest framework like in our case(JEST) to develop automated test cases for unit testing.

Unit Testing is of two types:
	1.Manual
	2.Automated
JEST framework Intro:


Jest is a Javascript Testing framework built by Facebook.
It is primarily designed for React (which is also built by Facebook) based apps but could be used to write automation scenarios for any Javascript-based codebases.

Some of the features of Jest are given below:

	1. Zero configuration required.
	2. Fast: Jest tests run in parallel – this in turn greatly reduces the test execution time.
	3. Built-in code coverage: Jest supports code coverage out of the box – this is a very
                useful metric for all CI-based delivery pipelines and overall test effectiveness of a
                project.
	4. Isolated and sandboxed tests: Each Jest test runs in its own sandbox, which
                ensures no two tests can interfere or impact each other.
	5. Powerful Mocking support: Jest tests support all types of mocking – be it functional
	    mocking, timer mocking, or mocking individual API calls.
	6. Support snapshot testing: Snapshot testing is relevant from the React perspective.
               Jest supports capturing a snapshot of the react component being tested – this can
               validate with the component’s actual output. This greatly helps in validating the
               component’s behaviour.


JEST Installation:

Step 1: To use Jest in a node-based project, simply use the commands from the below
             section to install the node package for Jest

	yarn add --dev jest
	npm install --save-dev jest


Step 2: Now, we have a node project ready with Jest bindings. Let’s configure the npm/yarn
             test script to run the Jest tests i.e. when the command ‘npm test’ or 'yarn test' is
	 executed, the script should run all the Jest framework based tests.

	To do that, update the package.json file and add a script section as shown below.

	"scripts": {
	  "test": "jest"
	}

Step 3: Writing Tests For A Javascript Function In this step, we will create a simple
             Javascript function code for addition, subtraction, and multiplication of 2 numbers
	 and write the corresponding Jest based tests for it.

	 First, let’s see how the code for our application (or function) under test looks like.

	 #1) In the node project created in the above section, create a js file named
                  calculator.js with contents as shown below:


	const mathOperations = {
	   sum: function(a,b) {
	       return a + b;
	   },
	   
	   diff: function(a,b) {
	       return a - b;
	   },
	   product: function(a,b) {
	       return a * b
	   }
	}
	module.exports = mathOperations

	#2) Now, create a test file in the same folder for these tests, named calculator.test.js
                  – this is the convention expected by the Jest framework to look for all the files
	     that contain Jest based tests. We will also import the function under test, in order
	     to execute the code in the test.

	     This is how the file would look with just import / require declaration.

	     const mathOperations = require('./calculator');


	#3) Now, let’s write tests for different methods in the main file i.e. sum, diff, and
	      product.
      


Jest tests follow BDD style tests, with each test suite having one main describe block and can have multiple test blocks. Also, please note that the tests can have nested describe blocks as well.

 	Let’s write a test for adding 2 numbers and validate the expected results. We will be
	supplying the numbers as 1 & 2 and expecting the output as 3.

		describe("Calculator tests", () => {
		 test('adding 1 + 2 should return 3', () => {
		   expect(mathOperations.sum(1, 2)).toBe(3);
		 });
		})

	Please refer to the below points w.r.t the test above:

		a) The describe block is an outer description for the test suite i.e it represents
		    a generic container for all the tests that we are going to write for the
		    calculator in this file.

		b) Next, we have an individual test block – this represents a single test. The
		    string in quotes represents the name of the test.

		c) Refer to the code in the expect block – “expect” is nothing but an assertion.
		    The statement is calling the sum method in the function under test with
		    inputs 1 & 2 and expecting the output to be 3.

   









   We can also rewrite this in a simpler way to understand it better.

	   Please see below, now we have separated the function call and assertion
	   as 2 separate statements to make it more readable.

		describe("Calculator tests", () => {
		 test('adding 1 + 2 should return 3', () => {
		   // arrange and act
		   var result = mathOperations.sum(1,2)
		 
		   // assert
		   expect(result).toBe(3);
		 });
		})

		d) In order to run this test, simply run the command “npm test” or "yarn test" in
	the terminal or command prompt at the project location.
		

        	#4) Let’s try some failing tests.

		a) First, write a failing test and see what output we get. Let’s just change the
		    result to some incorrect value in the same test that we wrote in the last
		    section. See how the test looks like.

	    describe("Calculator tests", () => {
		 test('adding 1 + 2 should return 10', () => {
		   // arrange and act
		   var result = mathOperations.sum(1,2)
		 
		   // assert
		   expect(result).toBe(10);
		 });
	   })

		
Here we are expecting a sum of 1 and 2 to return 10 which is incorrect.
Let’s try executing this and see what we get.
		

You can see the detailed output when a test is failed i.e. what was actually returned
            and what was expected and which line caused the error in the function under test
	etc.


Jest Matchers:

Jest assertions use matchers to assert on a condition. Jest uses matchers from the expect Api. The expect API doc can be referenced here.

Let’s walk through some of the most commonly used matchers along with Jest tests.

	#1) Equality:
      These are the most commonly used matchers. They are used for checking
      equality or inequality and is mostly used for arithmetic operations.

	      Let’s see some examples below:

	      Here we have written 2 matchers using toBe and not.toBe which are
	      analogous to equals and not equals.
      
      test("equality matchers", () => {
		   expect(2*2).toBe(4);
		   expect(4-2).not.toBe(1); 
	      })

	#2) Truthiness:
      Here we will see, matchers for null, falsy, and truthy i.e. false and truth values. It’s
      important to note that anything that’s not logically true is falsy.

	      For example, number 0, null, empty string, NaN are all examples of falsy w.r.t
                 Javascript.

		test("truthy operators", () => {
		   var name="Software testing help"
		   var n = null
		   expect(n).toBeNull()
		   expect(name).not.toBeNull
		 
		   // name has a valid value
		   expect(name).toBeTruthy()
		 
		   //fail - as null is non success
		   expect(n).toBeTruthy()
		   
		   // pass - null treated as false or negative
		   expect(n).toBeFalsy()
		 
		   // 0 - treated as false
		   expect(0).toBeFalsy()
		})

	#3) Number Matchers:
      These matchers could be used for general arithmetic operations.
      For example, greaterThan, lessThan, greaterThanOrEqual, etc.

	      Check the below examples for more details

		test("numeric operators", () => {
		 
		   var num1 = 100;
		   var num2 = -20;
		   var num3 = 0;
		 
		   // greater than
		   expect(num1).toBeGreaterThan(10)
		 
		   // less than or equal
		   expect(num2).toBeLessThanOrEqual(0)
		 
		   // greater than or equal
		   expect(num3).toBeGreaterThanOrEqual(0) })

	#4) String Matchers:
      A lot of times we need strings to match a regular expression as an assertion in a
      Unit test. Jest provides matchers for strings to be matched against a regular
      expression.

	      test("string matchers",() => {
		   var string1 = "software testing help - a great resource for testers"
		 
		   // test for success match
		   expect(string1).toMatch(/test/);
		 
		   // test for failure match
		   expect(string1).not.toMatch(/abc/)
	      })
	
Jest Hooks – Setup:

Jest framework also provides hooks for setup and cleanup methods. These hook methods are executed before and after each test in the test suite or before and after the testSuite execution.

Totally there are 4 hooks that are available to use.

beforeEach and afterEach: These hooks are executed before and after each test in the test suite.

beforeAll and afterAll: These hooks are executed just once for each test suite. i.e. if a test suite has 10 tests, then these hooks will just be executed once for every test execution.

Let’s see an example: We will add these hooks to the same test example of adding 2 numbers.

We will set the inputs in beforeEach hook for illustration. The test file would look with test hooks as shown below.

	describe("Calculator tests", () => {
	  var input1 = 0
	  var input2 = 0
	 
	 beforeAll(() => {
	   console.log("beforeAll called");
	 });
	 
	 afterAll(() => {
	   console.log("afterAll called");
	 });
	  beforeEach(() => {
	   console.log("beforeEach called");
	   input1 = 1;
	   input2 = 2;
	 });
	  afterEach(() => {
	   console.log("afterEach called");
	 });
	 
	 test('adding 1 + 2 should return 3', () => {
	   // arrange and act
	   var result = mathOperations.sum(input1,input2)
	 
	   // assert
	   expect(result).toBe(3);
	 });
	})










Create JEST html test report:

#1) The command line reports are good but not very readable. There are libraries/modules available to generate HTML based test reports for Jest tests. It can be achieved as shown below.

Step 1:

	Add node package for jest-html-reporter using the below command.
	Using Npm : npm install --save-dev jest-html-reporter.
	Using Yarn: yarn add jest-html-reporter --dev.


	
Step 2:
Now add Jest configuration for the reporter in the package.json file of the node
            project.
	
	"jest": {
	   "reporters": [
	     "default",
	     [
	       "./node_modules/jest-html-reporter",
	       {
	         "pageTitle": "Test Report"
	       }
	     ]
	   ]
	}

          Once configured now, execute the tests using the “npm test” command.
         If the setup is successful you should be able to see an Html based report getting
         created in the project directory.



#2) Creating Code coverage report: Code coverage is one of the most important metrics
      from a unit testing perspective. It essentially measures what percentage of
      statements/branches are covered for the application under test.

      Jest provides out of the box support for code coverage. In order to get the Jest coverage
      report, Jest configuration needs to be added in the package.json file.

      Add the configuration as shown below:

	"jest": {
	     "collectCoverage":true
	}

      Once this configuration is done, try running the test using the command “npm test”, and
      you can see the code coverage details just below the test execution results as shown
      below.





Configure path for html test / html coverage report:

To configure the path for html test report and html coverage report you need to define the report path in JEST configuration.
In order to update the JEST configuration you need to just open package.json file and copy-paste the given code below and please make sure you update the coverageDirectory, outputPath value with your path, where you want to place generated report files.

"jest": {
    "testEnvironment": "node",
    "collectCoverage": true,
    "coverageDirectory": "./src/__test__/reports/coverage",
    "reporters": [
      "default",
      [
        "./node_modules/jest-html-reporter",
        {
          "pageTitle": "Test Report",
          "outputPath": "./src/__test__/reports/test-report/test-report.html"
        }
      ]
    ]
}

After update JEST configuration your package.json will look like:

Write test cases for API(end-points):

In order to write the test cases for the end-points we need to require a library called SuperTest.

SuperTest is a Node testing library for HTTP calls. It extends the superagent testing library and allows you to make requests like GET, POST, PUT, and DELETE.

SuperTest provides a request object you can use to make HTTP requests.

const request = require("supertest")
request(app).get('/v1/product/get-all').end(function(err, res) {
 if (err) throw err;
 console.log(res.body.message);
});

Here, you pass the base URL of the API to the request object and then chain the HTTP method with the rest of the URL. The end() method calls the API server and the callback function handles its response.

Once you get the response from the API, you can use Jest to validate it.

Step 1: Install SuperTest using given command below:

 Yarn: yarn add supertest --dev
 NPM:  npm install --save-dev supertest
		 

Step 2: Let's write the cases for the endpoints:
 When testing API endpoints, you won’t be calling a function but sending a request
 using SuperTest or another HTTP client library.

	 Returning to the GET endpoint, create a new file called api.test.js. This is where you
	 will write all the endpoint tests. Naming the test file with a .test infix ensures that Jest
	 recognizes it as a test file.

		 In api.test.js, import supertest and set the base URL like so:

		 const request = require("supertest")
		 const baseURL = "http://localhost:3000"

		 Next, create the first test in the describe block:

		 describe("GET /todos", () => {
			    
			    const newTodo = {
				id: crypto.randomUUID(),
				item: "Drink water",
				completed: false,
			     }

			    beforeAll(async () => {
			            // set up the todo
			  	await request(baseURL).post("/todo").send(newTodo);
			    })

			   afterAll(async () => {
				await request(baseURL).delete(`/todo/${newTodo.id}`)
			   })
					
			  it("should return 200", async () => {
				const response = await request(baseURL).get("/todos");
				expect(response.statusCode).toBe(200);
				expect(response.body.error).toBe(null);
			  });
					
			it("should return todos", async () => {
				const response = await request(baseURL).get("/todos");
				expect(response.body.data.length >= 1).toBe(true);
			});


		});


Before running the tests, you will need to define setup and teardown functions. These functions will populate the todo array with an item before the test and delete the dummy data after each test.

The code that runs before all the tests is in the beforeAll() function. The code that runs after all the tests is in the afterAll() function.

In this example, you are simply hitting the POST and DELETE endpoints for each. In a real application, you would probably connect to a mock database containing the test data.

In this test, you first made a request to the GET /todos endpoint and compared the response sent back to the expected results. This test suite will pass if the response has an HTTP status code of 200, the data is not empty, and the error message is null.

How we can manage states from one test file to another ?

In order to manage states between multiple test files like api access-token or other header data that may be required while requesting an api so to persist that kind of state(data) we require a local-storage to manage states.

In our current test structure we are using the node-localstorage package to manage local-storage.

Please refer this link to know how to install and use node-localstorage: http://bit.ly/3ls16s3
Test Sequencer:

By default test cases executes in parallel manner by JEST framework, but in some scenarios we want to execute test cases in non-parallel manner in this kind of situation we have to use jest-sequencer package, which is preinstalled with JEST framework we don't have to install separately.

To create and run test-sequencer follow the given steps:

Step 1: Create a file in your project directory with any name you wish with extension (.js) ex:
	 testSequencer.js and require/import @jest/test-sequencer, it should look like given
	 below:

const Sequencer = require('@jest/test-sequencer').default;

Step 2: Copy the given test-sequencer code as given below:
		 
	class TestSequencer extends Sequencer {
	    	sort(tests) {
			        const orderPath = [
			        			      'path/file1.test.js',
			        			      'path/file2.test.js',
			        			      'path/file3.test.js',
			        		                  'path/file4.test.js',
			        			      'path/file5.test.js'
			                          	];

			     return tests.sort((testA, testB) => {
			            const indexA = orderPath.indexOf(testA.path);
			            const indexB = orderPath.indexOf(testB.path);
			            if (indexA === indexB) return 0; // do not swap when tests both
				not specified in order.
			            if (indexA === -1) return 1;
			            if (indexB === -1) return -1;
			            
			        	return indexA < indexB ? -1 : 1;
			        })
			  }
	}
module.exports = TestSequencer;

Please update the orderPath array as per your actual test file path, that you want to manage the sequence of execution.

Step 3: To run this test-sequencer please run the given command below:

	 yarn jest --testSequencer="<path of your test-sequencer file>" --runInBand
Snapshot Testing:

There are many types of software testing. Among these, one of the unique types of testing methods is Snapshot testing.

Snapshot tests assert that the current output is the same as the output before.

The main difference between snapshot testing and functional/unit tests is, snapshot tests never assert the correct behaviour of the application functionality but does an output comparison instead.

To take a snapshot we have to use a predefined function toMatchSnapshot() or in order to update the snapshot we have to run test with a flag –updateSnapshot like given below:

yarn test –updateSnapshot

To know more about snapshot testing please refer to this link: http://bit.ly/3Z4TGc9




If you need a code reference for the test cases you can refer the given git repository:


http://bit.ly/3JEch90
