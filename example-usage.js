/**
 * Example usage of the Joke Generator module
 * 
 * This file demonstrates how to use the joke generator functions
 * in your own applications.
 */

const {
  getRandomJoke,
  getProgrammingJoke,
  getJokeFromNinja
} = require('./index');

/**
 * Example 1: Get a single random joke
 */
async function example1() {
  console.log('Example 1: Single Random Joke\n');
  try {
    const joke = await getRandomJoke();
    console.log(joke);
  } catch (error) {
    console.error('Failed:', error.message);
  }
  console.log('\n---\n');
}

/**
 * Example 2: Get multiple jokes in sequence
 */
async function example2() {
  console.log('Example 2: Multiple Jokes in Sequence\n');
  try {
    for (let i = 1; i <= 3; i++) {
      console.log(`Joke ${i}:`);
      const joke = await getRandomJoke();
      console.log(joke);
      console.log();
    }
  } catch (error) {
    console.error('Failed:', error.message);
  }
  console.log('---\n');
}

/**
 * Example 3: Get jokes in parallel using Promise.all
 */
async function example3() {
  console.log('Example 3: Parallel Joke Fetching\n');
  try {
    const [randomJoke, progJoke, ninjaJoke] = await Promise.all([
      getRandomJoke(),
      getProgrammingJoke(),
      getJokeFromNinja()
    ]);

    console.log('Random Joke:');
    console.log(randomJoke);
    console.log('\nProgramming Joke:');
    console.log(progJoke);
    console.log('\nNinja Joke:');
    console.log(ninjaJoke);
  } catch (error) {
    console.error('Failed:', error.message);
  }
  console.log('\n---\n');
}

/**
 * Example 4: Error handling with retry logic
 */
async function example4() {
  console.log('Example 4: Error Handling with Retry\n');
  
  const fetchWithRetry = async (fn, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        console.log(`Attempt ${attempt} failed: ${error.message}`);
        if (attempt === maxRetries) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      }
    }
  };

  try {
    const joke = await fetchWithRetry(() => getRandomJoke());
    console.log('Successfully fetched joke:');
    console.log(joke);
  } catch (error) {
    console.error('All retries failed:', error.message);
  }
  console.log('\n---\n');
}

/**
 * Main function to run all examples
 */
async function runAllExamples() {
  console.log('🎭 Joke Generator - Usage Examples\n');
  console.log('====================================\n');

  await example1();
  await example2();
  await example3();
  await example4();

  console.log('✅ All examples completed!');
}

// Run all examples
runAllExamples().catch(error => {
  console.error('Error running examples:', error);
  process.exit(1);
});
