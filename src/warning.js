export default function warning (message) {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message)
    }
    /* eslint-enable no-console */
    try {
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message)
    /* eslint-disable no-empty */
    } catch (e) { }
    /* eslint-enable no-empty */
  }
}
