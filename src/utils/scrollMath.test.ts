import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScrollPercentage } from './scrollMath';

test('calculateScrollPercentage returns 0 at top of document', () => {
  assert.equal(calculateScrollPercentage(0, 3000, 1000), 0);
});

test('calculateScrollPercentage returns 50 at midway', () => {
  assert.equal(calculateScrollPercentage(1000, 3000, 1000), 50);
});

test('calculateScrollPercentage returns 100 at bottom of document', () => {
  assert.equal(calculateScrollPercentage(2000, 3000, 1000), 100);
});

test('calculateScrollPercentage handles edge case where scrollHeight <= clientHeight', () => {
  assert.equal(calculateScrollPercentage(0, 800, 1000), 0);
});

test('calculateScrollPercentage clamps overshoot to 100', () => {
  assert.equal(calculateScrollPercentage(2500, 3000, 1000), 100);
});
