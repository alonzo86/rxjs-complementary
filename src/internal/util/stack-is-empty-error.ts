// tslint:disable-next-line:no-empty-interface
export interface StackIsEmptyError extends Error {}

export type StackIsEmptyErrorCtor = new() => StackIsEmptyError;

const StackIsEmptyErrorImpl = (() => {
    // tslint:disable-next-line:no-shadowed-variable
  function StackIsEmptyErrorImpl(this: Error) {
    Error.call(this);
    this.message = 'stack is empty';
    this.name = 'StackIsEmptyError';
    return this;
  }

  StackIsEmptyErrorImpl.prototype = Object.create(Error.prototype);

  return StackIsEmptyErrorImpl;
})();

/**
 * An error thrown when the stack is empty
 *
 * @class StackIsEmptyError
 */
export const StackIsEmptyError: StackIsEmptyErrorCtor = StackIsEmptyErrorImpl as any;
