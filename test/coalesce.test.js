'require strict';

const  { expect } = require('chai');
// cleanrequire = require('./cleanrequire'),
// clone    = arg => JSON.parse(JSON.stringify(arg));

describe('coalesce.js', () => {
  const { coalesce } = require('../coalesce');

  it('should be a Function', () => {
    expect(coalesce).to.be.instanceof(Function);
  });

  it('should return the first non-falsy value', () => {
    const randomNumber = Math.random();
    const res = coalesce(undefined, null, 0, '', NaN, false, randomNumber);

    expect(res).to.equal(randomNumber);
  });
});
