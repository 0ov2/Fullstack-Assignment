/* eslint-env mocha */
import { expect } from 'chai';
import { detectSums } from './utils';

describe('Detect sums', () => {

  it('should return indication message that the input includes not a number', () => {
    expect(detectSums('1a2')).to.be.a('string').that.equals('Input includes not a number');
  });

  it('should return no sums found message', () => {
    expect(detectSums('12')).to.be.a('string').that.equals('No sums found');
    expect(detectSums('302')).to.be.a('string').that.equals('No sums found');
  });

  it('should return correct sums', () => {
    var result = detectSums('12345');
    expect(result).to.be.a('array');
    expect(result[0]).to.eql({pA:0,pB:1,sum:2});
    expect(result[1]).to.eql({pA:0,pB:2,sum:3});
    expect(result[2]).to.eql({pA:1,pB:2,sum:4});
    expect(result[3]).to.eql({pA:0,pB:3,sum:4});
  });
  
  it('should handle dublicate numbers correctly', () => {
    var result = detectSums('22334');
    expect(result).to.be.a('array');
    expect(result[0]).to.eql({pA:0,pB:1,sum:4});
  });
  
});
