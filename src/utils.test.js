/* eslint-env mocha */
import { expect } from 'chai';
import { detectSums } from './utils';

describe('Detect sums', () => {

  it('should return indication message that the input is empty', () => {
    const result = detectSums([]);
    expect(result).to.equal("Input is empty");
  });

  it('should return indication message that the input includes not a number', () => {
    const result = detectSums(['1', 'a', '2']);
    expect(result).to.equal("Input includes not a number");
  });
  
});
