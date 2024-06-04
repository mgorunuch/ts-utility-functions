import { parser } from 'ts-parsers';

export const str = {
  is: parser.str.is,
  isStartWith: (prefix: string) => (inp: string): inp is string => {
    if (inp.length < prefix.length) return false;

    for (let i = 0; i < prefix.length; i++) {
      if (inp[i] !== prefix[i]) return false;
    }

    return true;
  },
};
