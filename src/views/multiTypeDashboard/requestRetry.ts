type RetryOption = {
  errorMsg?: string,
  customErrorHandler?: (e: unknown) => unknown
  delay?: boolean,
  beforeRequest?: () => unknown,
  afterRequest?: () => unknown
};

async function innerRetryable(tryCount: number, action: () => unknown, options: Required<RetryOption>) {
  const {
    errorMsg, customErrorHandler, beforeRequest, afterRequest,
  } = options;
  if (tryCount >= 3) {
    return;
  }
  try {
    if (!tryCount) {
      await beforeRequest();
    }
    await action();
  } catch (error) {
    if (!customErrorHandler) {
      console.error(errorMsg, error);
    } else {
      await customErrorHandler(error);
    }
    await innerRetryable(tryCount + 1, action, options);
  } finally {
    if (!tryCount) {
      afterRequest();
    }
  }
}

export default async function retryable(action: () => unknown, options: RetryOption = {
  afterRequest: () => {}, beforeRequest: () => {}, delay: false, errorMsg: '',
}) {
  const {
    errorMsg, customErrorHandler, delay, beforeRequest, afterRequest,
  } = options;
  const parsedOptions = {
    afterRequest: afterRequest || (() => {}),
    beforeRequest: beforeRequest || (() => {}),
    customErrorHandler: customErrorHandler || (() => {}),
    delay: delay || false,
    errorMsg: errorMsg || '',
  };
  if (delay) return () => innerRetryable(0, action, parsedOptions);
  return innerRetryable(0, action, parsedOptions);
}
