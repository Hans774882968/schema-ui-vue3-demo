import retryable from '@/views/multiTypeDashboard/requestRetry';

jest.setTimeout(6000);

describe('src/views/multiTypeDashboard/requestRetry.ts', () => {
  it('阻塞情况下的sequence', async () => {
    const ans: number[] = [];
    const f = async () => {
      const action = async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        ans.push(20);
      };
      await retryable(action, {
        afterRequest: () => ans.push(30),
        beforeRequest: () => ans.push(10),
      });
      ans.push(40);
    };
    await f();
    expect(ans).toStrictEqual([10, 20, 30, 40]);
  });

  it('非阻塞情况下的sequence', async () => {
    const ans: number[] = [];
    const f = () => {
      const action = async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        ans.push(30);
      };
      retryable(action, {
        afterRequest: () => ans.push(40),
        beforeRequest: () => ans.push(10),
      });
      ans.push(20);
    };
    f();
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(ans).toStrictEqual([10, 20, 30, 40]);
        resolve(null);
      }, 1100);
    });
  });

  it('delay option', async () => {
    const ans: number[] = [];
    const f = async () => {
      const action = async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        ans.push(30);
      };
      const wrappedAction = await retryable(action, {
        afterRequest: () => ans.push(40),
        beforeRequest: () => ans.push(20),
        delay: true,
      });
      ans.push(10);
      await (wrappedAction && wrappedAction());
      ans.push(50);
    };
    await f();
    expect(ans).toStrictEqual([10, 20, 30, 40, 50]);
  });
});
