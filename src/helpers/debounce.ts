export default function debounce(func: any, wait = 400, immediate?: any) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export function onDelayClick(callback, delay = 400) {
  let timeoutId;

  return function onClick() {
    // Clear previous timeout, if it exists
    clearTimeout(timeoutId);

    // Set a new timeout for the specified delay
    timeoutId = setTimeout(function () {
      // Call the callback function here
      callback();
    }, delay);
  };
}
