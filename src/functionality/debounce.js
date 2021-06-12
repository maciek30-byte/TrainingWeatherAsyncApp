export const debounce = (functionToDebounce, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      functionToDebounce(...args);
    }, delay);
  };
};
