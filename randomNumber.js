const MIN_RANDOM_NUMBER = -100;
const MAX_RANDOM_NUMBER = 100;

const MIN_DELAY = 0;
const MAX_DELAY = 10000;

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function subscribe(cb) {
  let timeoutID;

  function pushRandomNumber() {
    const delay = Math.round(getRandomNumber(MIN_DELAY, MAX_DELAY));

    timeoutID = setTimeout(function () {
      cb(getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER));

      pushRandomNumber();
    }, delay);
  }

  function unsubscribe() {
    clearTimeout(timeoutID);
  };

  pushRandomNumber();

  return unsubscribe;
}

exports.subscribe = subscribe;
