const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: number | undefined;

  return (...args: Parameters<T>) => {
    if (typeof window === 'undefined') {
      return;
    }
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
};

export default debounce;
