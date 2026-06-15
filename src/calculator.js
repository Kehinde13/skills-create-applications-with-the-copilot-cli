#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - addition: + or add
//  - subtraction: - or subtract
//  - multiplication: ×, x, * or multiply
//  - division: ÷, / or divide
//
// This file exposes helper functions for unit testing and also acts as a CLI
// when executed directly (node src/calculator.js ...).

const args = process.argv.slice(2);

function usage() {
  console.error('Usage: node src/calculator.js <op> <a> <b>\n' +
    '  or: node src/calculator.js <a> <op> <b>\n' +
    'Operations: add (+), subtract (-), multiply (*, x, ×), divide (/, ÷)');
  process.exit(1);
}

function toNumber(v) {
  // Treat empty or whitespace-only strings as invalid input
  if (v === undefined || v === null) return null;
  if (String(v).trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function performOperation(op, a, b) {
  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'subtract':
    case '-':
      return a - b;
    case 'multiply':
    case '*':
    case 'x':
    case '×':
      return a * b;
    case 'divide':
    case '/':
    case '÷':
      if (b === 0) {
        throw new Error('Error: Division by zero');
      }
      return a / b;
    default:
      throw new Error('Unsupported operation: ' + op);
  }
}

function parseArgs(argv) {
  // returns {op, aArg, bArg} or throws
  if (!argv || argv.length === 0) {
    throw new Error('no-args');
  }

  let op = null;
  let aArg = null;
  let bArg = null;

  if (argv.length >= 3 && ['add','subtract','multiply','divide','+','-','*','x','×','/','÷'].includes(argv[0])) {
    // form: <op> <a> <b>
    op = argv[0];
    aArg = argv[1];
    bArg = argv[2];
  } else if (argv.length >= 3 && ['+','-','*','x','×','/','÷'].includes(argv[1])) {
    // form: <a> <op> <b>
    aArg = argv[0];
    op = argv[1];
    bArg = argv[2];
  } else if (argv.length >= 3 && ['add','subtract','multiply','divide'].includes(argv[1])) {
    // form: <a> <opword> <b>
    aArg = argv[0];
    op = argv[1];
    bArg = argv[2];
  } else {
    throw new Error('bad-args');
  }

  return { op, aArg, bArg };
}

// Export functions for unit testing
module.exports = { toNumber, performOperation, parseArgs };

// CLI entrypoint when executed directly
if (require.main === module) {
  if (args.length === 0) {
    usage();
  }

  try {
    const { op, aArg, bArg } = parseArgs(args);
    const a = toNumber(aArg);
    const b = toNumber(bArg);
    if (a === null || b === null) {
      console.error('Error: invalid number input. Received:', aArg, bArg);
      process.exit(1);
    }

    const result = performOperation(op.toLowerCase(), a, b);
    console.log(result);
    process.exit(0);
  } catch (err) {
    if (err && (err.message === 'no-args' || err.message === 'bad-args')) {
      usage();
    }
    console.error(err.message || err);
    process.exit(1);
  }
}
