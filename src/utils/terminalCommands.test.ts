import test from 'node:test';
import assert from 'node:assert/strict';
import { executeTerminalCommand } from './terminalCommands';

test('executeTerminalCommand handles help command', () => {
  const result = executeTerminalCommand('help');
  assert.equal(result.type, 'help');
  assert.match(result.content, /PAWAN RAJPUT WORKSTATION CLI/);
  assert.match(result.content, /whoami/);
});

test('executeTerminalCommand handles whoami command', () => {
  const result = executeTerminalCommand('whoami');
  assert.equal(result.type, 'success');
  assert.match(result.content, /Pawan Rajput/);
  assert.match(result.content, /RIT Sangli/);
});

test('executeTerminalCommand handles cat bio.txt with scroll action', () => {
  const result = executeTerminalCommand('cat bio.txt');
  assert.equal(result.action, 'scroll_to');
  assert.equal(result.actionTarget, 'about');
  assert.match(result.content, /ABOUT PAWAN RAJPUT/);
});

test('executeTerminalCommand handles ls projects', () => {
  const result = executeTerminalCommand('ls projects');
  assert.equal(result.action, 'scroll_to');
  assert.equal(result.actionTarget, 'projects');
  assert.match(result.content, /LivestockAI/);
});

test('executeTerminalCommand handles project detail lookup', () => {
  const result = executeTerminalCommand('project livestock-ai');
  assert.equal(result.type, 'success');
  assert.equal(result.action, 'open_modal');
  assert.equal(result.actionTarget, 'livestock-ai');
  assert.match(result.content, /MobileNetV2/);
});

test('executeTerminalCommand handles rag query simulation', () => {
  const result = executeTerminalCommand('rag hydraulic pressure threshold');
  assert.equal(result.type, 'rag');
  assert.ok(result.structured);
  assert.equal(result.action, 'scroll_to');
  assert.equal(result.actionTarget, 'rag-demo');
  assert.match(result.content, /OPSBRAIN HYBRID RAG ENGINE/);
});

test('executeTerminalCommand handles theme switching', () => {
  const result = executeTerminalCommand('theme matrix');
  assert.equal(result.type, 'success');
  assert.equal(result.action, 'change_theme');
  assert.equal(result.actionTarget, 'matrix');
});

test('executeTerminalCommand handles unknown command error', () => {
  const result = executeTerminalCommand('nonexistentcmd');
  assert.equal(result.type, 'error');
  assert.match(result.content, /Command not found/);
});
