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

*/


const arrayOfPromises_safely = [];
for (let i = 0 ; i < 5; i += 1) {
    arrayOfPromises_safely.push(new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          console.log('Promise ' + i + ' is good');
          resolve('Promise ' + i + ' - Some value');
        } else {
          console.log('Promise ' + i + ' failed');
          reject('Promise ' + i + ' - Some error');
          throw new Error("what??");
        }
    }, i * 100);
  }));
}


try {
  const safely_promiseAll = await Promise.all(arrayOfPromises_safely);
  safely_promiseAll.then(() => console.log('safely Promise.all resolved'))
  .catch(e => console.log('safely Promise.all error occured: ' + e));

  console.log('done');
} catch (error) {
  console.log("promise all failed, going for the safely code")
  const safely_promiseAllSettled = Promise.allSettled(arrayOfPromises_safely);
  console.log('safely Promise.allSettled results: ');
  console.log(safely_promiseAllSettled);
}


function resolveAfter2Seconds(x: string) {
  console.log('res ' + x);
  return new Promise((resolve) => {
    console.log('promise ' + x);
    setTimeout(() => {
      console.log("timout " + x);
      resolve(x);
    }, 2000);
  });
};

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

function rejectAfter2Seconds(x: string) {
  console.log('rej ' + x);
  return new Promise((resolve, reject) => {
    console.log('promise ' + x);
    setTimeout(() => {
      console.log("timout " + x);
      reject(x);
    }, 2000);
  });
};

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
    const promisesSettledResults = await Promise.allSettled(promises);
    //logFailedPromises(promisesSettledResults);
    console.log("catch block");

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
