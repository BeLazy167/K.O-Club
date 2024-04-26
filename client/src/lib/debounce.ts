export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T, // The callback function to be debounced
  delay: number, // The delay in milliseconds before invoking the callback
) {
  let timer: ReturnType<typeof setTimeout>; // Variable to store the timer ID

  return (...args: Parameters<T>) => { // Return a debounced version of the callback function
    const p = new Promise<ReturnType<T> | Error>((resolve, reject) => { // Create a promise to handle the callback execution
      clearTimeout(timer); // Clear any existing timer

      timer = setTimeout(() => { // Set a new timer
        try {
          const output = callback(...args); // Invoke the callback function with the provided arguments
          resolve(output); // Resolve the promise with the output of the callback
        } catch (err) {
          if (err instanceof Error) {
            reject(err); // Reject the promise with the error if it is an instance of Error
          } else {
            reject(new Error(`An error has occurred: ${String(err)}`)); // Reject the promise with a new Error if the error is not an instance of Error
          }
        }
      }, delay);
    });

    return p; // Return the promise
  };
}
