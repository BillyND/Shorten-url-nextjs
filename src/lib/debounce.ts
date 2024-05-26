interface TimerDebounce {
  [key: string]: NodeJS.Timeout;
}

const timerDebounce: TimerDebounce = {};

export const debounce = (func: (...args: any[]) => any, time: number) => {
  return (...args: any[]) => {
    clearTimeout(timerDebounce[func.name]);

    const delayedFunction = () => {
      delete timerDebounce[func.name];
      return func(...args);
    };

    timerDebounce[func.name] = time
      ? setTimeout(delayedFunction, time)
      : delayedFunction();
  };
};
