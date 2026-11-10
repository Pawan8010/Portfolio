import test from 'node:test';
import assert from 'node:assert/strict';
import { simulateHybridRagQuery, PRESET_QUERIES } from './ragSimulator';

test('simulateHybridRagQuery accurately retrieves turbine guidelines for turbine query', () => {
  const result = simulateHybridRagQuery(PRESET_QUERIES[0]);
  assert.ok(result.retrievedChunks.length > 0, 'Should return retrieved chunks');
  assert.equal(result.retrievedChunks[0].sourceDoc, 'ISO-10816-Industrial-Turbines.pdf');
  assert.ok(result.topAnswer.includes('ISO-10816'), 'Answer should cite ISO-10816');
  assert.ok(result.citations.length >= 1, 'Should include citations');
  assert.ok(result.graphEntitiesMatched.length > 0, 'Should include graph entities');
});

test('simulateHybridRagQuery provides citations with high confidence', () => {
  const result = simulateHybridRagQuery('hydraulic solenoid valve emergency protocol');
  assert.equal(result.retrievedChunks[0].sourceDoc, 'Hydraulic-System-Safety-Manual.docx');
  assert.ok(result.citations[0].confidence > 50, 'Confidence score should exceed 50%');
});

test('simulateHybridRagQuery handles edge case with custom text', () => {
  const result = simulateHybridRagQuery('STM32 CAN-bus joint optical encoder');
  assert.ok(result.topAnswer.includes('STM32'), 'Should retrieve STM32 related doc chunk');
  assert.ok(result.latencyMs > 0, 'Latency should be calculated');
});
