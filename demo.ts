/*
// ------------- Promise.all ------------


const arrayOfPromises_all = [];
for (let i = 0 ; i <= 5; i += 1) {
    arrayOfPromises_all.push(new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          console.log('Promise ' + i + ' is good');
          resolve('Promise ' + i + ' - Some value');
        } else {
          console.log('Promise ' + i + ' failed');
          reject('Promise ' + i + ' - Some error');
        }
    }, i * 1000);
  }));
}

console.log('Promise.all - starting');
const promiseAll = Promise.all(arrayOfPromises_all);
promiseAll.then(() => console.log('Promise.all - all promises are resolved'))
          .catch(e => console.log('Promise.all - one of the promises rejected, error occured: ' + e));
console.log('Promise.all execution flow continues - not waiting for the tasks results');
// ------------------------------------------------------
// result: 
// all tasks (promises) are executed in parallel
// if all went well    -> we go to .then() when they complete
// if one is rejecting -> we go to .catch() immediately after it rejected
// execution flow continues
// ------------------------------------------------------


// ------------- Promise.allSettled ------------

const arrayOfPromises_allSetteled = [];
for (let i = 0 ; i <= 5; i += 1) {
    arrayOfPromises_allSetteled.push(new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
         console.log('Promise ' + i + ' is good');
          resolve('Promise ' + i + ' - Some value');
         } else {
          console.warn('Promise ' + i + ' failed');
          reject('Promise ' + i + ' - Some error');
         }
    }, i * 1000);
  }));
}

console.log('Promise.allSettled - starting');
const promiseAllSettled = Promise.allSettled(arrayOfPromises_allSetteled)
promiseAllSettled.then(response => {
  console.log('Promise.allSettled then block: ');
  console.log(response);
  })
  .catch(e => { // never happens cause allSettled is not short-circuiting once a promise is
  console.log('Promise.allSettled catch block: ');
  console.log(e);
  });
console.log('Promise.allSettled execution flow continues - not waiting for the tasks results');

// ------------------------------------------------------
// result: 
// all tasks (promises) are executed in parallel
// after all tasks are completed    -> we go to .then()
// ------------------------------------------------------

---------- draft ------------

const arrayOfPromises_safely = [];
for (let i = 0 ; i < 5; i += 1) {
    arrayOfPromises_safely.push(new Promise((resolve, reject) => {
      setTimeout(() => {
        if (i != 2) {
          console.log('Promise ' + i + ' is good');
          resolve('Promise ' + i + ' - Some value');
        } else {
          console.log('Promise ' + i + ' failed');
          reject('Promise ' + i + ' - Some error');
          throw new Error("what??");
        }
    }, i * 1000);
  }));
}


try {
  console.log('Safely Promise.all - starting');
  const safelyPromiseAll = await Promise.all(arrayOfPromises_safely);
  safelyPromiseAll.then(() => console.log('Safely Promise.all - all promises are resolved'))
          .catch(e => console.log('Safely Promise.all - one of the promises rejected, error occured: ' + e));
  console.log('Safely Promise.all execution flow continues after all promises have completed');
  console.log('safely Promise.all results:');
  console.log(safelyPromiseAll);
} catch (error) {
  console.log("promise all failed, going for the safely catch block")
  const safely_promiseAllSettled = Promise.allSettled(arrayOfPromises_safely);
  console.log('safely Promise.allSettled results:');
  console.log(safely_promiseAllSettled);
}

---------- end draft ----------------
*/

const resolveAfter2Seconds = async (x: string) => {
  console.log('res ' + x);
  return new Promise((resolve) => {
    console.log('promise ' + x);
    setTimeout(() => {
      console.log("timout " + x);
      resolve(x);
    }, 2000);
  });
};

const rejectAfter2Seconds = async (x: string) : Promise<string> => {
  console.log('rej ' + x);
  return new Promise((resolve, reject) => {
    console.log('promise ' + x);
    setTimeout(() => {
      console.log("timout " + x);
      reject(x);
    }, 2000);
  });
};

const safelyPromiseAll = async () => {
  
    console.log('Safely Promise.all - starting');
    const a =  resolveAfter2Seconds("a");
    const b =  rejectAfter2Seconds("b");
    const promises = [a, b];
  try {
    const safelyPromiseAllResult = await Promise.all(promises);
    console.log('Safely Promise.all execution flow continues after all promises have completed');
    console.log('safely Promise.all results:');
    console.log(safelyPromiseAllResult);
  } catch (error) {
    console.log("promise all failed, going for the safely catch block")
    const safely_promiseAllSettled = Promise.allSettled(promises);
    console.log('safely Promise.allSettled results:');
    console.log(safely_promiseAllSettled);
  }
}

safelyPromiseAll();
console.log("after safelyPromiseAll");

/*
const foo = async function () { 
  console.log("foo start"); 
  const a =  resolveAfter2Seconds("1");
  const b =  resolveAfter2Seconds("2");
  console.log("foo end");
};

console.log('---------- foo -----------');
foo().then((v) => {
  console.log("foo() then: " + v);  
});

const foo_await = async function () { 
  console.log("foo_await start"); 
  const a = await resolveAfter2Seconds("3");
  console.log("done waiting");
  const b = await resolveAfter2Seconds("4");
  console.log("foo_await end");
};

console.log('--------- foo await ------------');
foo_await().then((v) => {
  console.log("foo_await() then: " + v);  
});



const foo_reject_await = async function () { 
  console.log("foo_reject_await start"); 
  const a = await rejectAfter2Seconds("5");
  const b = await resolveAfter2Seconds("6");
  console.log("foo_reject_await end");
};
console.log('--------- foo reject await ------------');
foo_reject_await().then((v) => {
  console.log("foo_reject_await() then: " + v);  
}).catch((e) => {console.log("foo_reject_await() catch: " + e);});


const completeAllSafely = async function <T>(promises: Promise<T>[]): Promise<T[]>  {
  try {
    return await Promise.all(promises);
  } catch (error) {
    console.log("await Promise.all - catch block");
    const promisesSettledResults = await Promise.allSettled(promises);
    

    throw error;
  }
};

const promises = [];

for (let i = 100 ; i < 105; i += 1) {
    promises.push(new Promise((resolve, reject) => {
      setTimeout(() => {
        if (i != 103) {
          console.log('Promise ' + i + ' is good');
          resolve('Promise ' + i + ' - Some value');
        } else {
          console.log('Promise ' + i + ' failed');
          reject('Promise ' + i + ' - Some error');
        }
    }, i * 1000);
  }));
}


console.log('--------- promise_await ------------');
completeAllSafely(promises).then((v) => {
  console.log("foo_reject_await() then: " + v);  
}).catch((e) => {console.log("foo_reject_await() catch: " + e);});





*/
