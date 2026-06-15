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

// New helper functions requested
function modulo(a, b) {
  if (b === 0) throw new Error('Error: Division by zero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Error: Square root of negative number');
  return Math.sqrt(n);
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
    case 'mod':
    case '%':
      return modulo(a, b);
    case 'pow':
    case '**':
    case '^':
      return power(a, b);
    case 'sqrt':
    case '√':
      return squareRoot(a);
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

  // Unary sqrt: <op> <a>
  if (argv.length >= 2 && ['sqrt','√'].includes(argv[0])) {
    op = argv[0];
    aArg = argv[1];
    bArg = null;
    return { op, aArg, bArg };
  }

  // Form: <op> <a> <b>
  if (argv.length >= 3 && ['add','subtract','multiply','divide','mod','pow','+','-','*','x','×','/','÷','%','**','^'].includes(argv[0])) {
    op = argv[0];
    aArg = argv[1];
    bArg = argv[2];
    return { op, aArg, bArg };
  }

  // Form: <a> <op> <b>
  if (argv.length >= 3 && ['+','-','*','x','×','/','÷','%','**','^'].includes(argv[1])) {
    aArg = argv[0];
    op = argv[1];
    bArg = argv[2];
    return { op, aArg, bArg };
  }

  // Form: <a> <opword> <b>
  if (argv.length >= 3 && ['add','subtract','multiply','divide','mod','pow'].includes(argv[1])) {
    aArg = argv[0];
    op = argv[1];
    bArg = argv[2];
    return { op, aArg, bArg };
  }

  throw new Error('bad-args');
}

// Export functions for unit testing
module.exports = { toNumber, performOperation, parseArgs, modulo, power, squareRoot };

// CLI entrypoint when executed directly
if (require.main === module) {
  if (args.length === 0) {
    usage();
  }

  try {
    const { op, aArg, bArg } = parseArgs(args);

    // unary sqrt
    if (op === 'sqrt' || op === '√') {
      const a = toNumber(aArg);
      if (a === null) {
        console.error('Error: invalid number input. Received:', aArg);
        process.exit(1);
      }
      const result = performOperation(op.toLowerCase(), a, null);
      console.log(result);
      process.exit(0);
    }

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
