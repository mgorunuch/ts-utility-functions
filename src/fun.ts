export function noopFun(...ars: any[]): void {return}
export function noopAsyncFun(...ars: any[]): Promise<void> {return Promise.resolve()}

export const fun = {
  noop: noopFun,
  noopAsync: noopAsyncFun,
}
