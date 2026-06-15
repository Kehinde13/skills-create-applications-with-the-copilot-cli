#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - addition: + or add
//  - subtraction: - or subtract
//  - multiplication: ×, x, * or multiply
//  - division: ÷, / or divide
//
// Usage examples:
//  node src/calculator.js add 2 3        => 5
//  node src/calculator.js 2 + 3          => 5
//  node src/calculator.js 10 / 2         => 5
//  node src/calculator.js multiply 2 4   => 8

const args = process.argv.slice(2);

function usage() {
  console.error('Usage: node src/calculator.js <op> <a> <b>\n' +
    '  or: node src/calculator.js <a> <op> <b>\n' +
    'Operations: add (+), subtract (-), multiply (*, x, ×), divide (/, ÷)');
  process.exit(1);
}

if (args.length === 0) {
  usage();
}

function toNumber(v) {
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

let op = null;
let aArg = null;
let bArg = null;

if (args.length >= 3 && ['add','subtract','multiply','divide','+','-','*','x','×','/','÷'].includes(args[0])) {
  // form: <op> <a> <b>
  op = args[0];
  aArg = args[1];
  bArg = args[2];
} else if (args.length >= 3 && ['+','-','*','x','×','/','÷'].includes(args[1])) {
  // form: <a> <op> <b>
  aArg = args[0];
  op = args[1];
  bArg = args[2];
} else if (args.length >= 3 && ['add','subtract','multiply','divide'].includes(args[1])) {
  // form: <a> <opword> <b>
  aArg = args[0];
  op = args[1];
  bArg = args[2];
} else {
  usage();
}

const a = toNumber(aArg);
const b = toNumber(bArg);
if (a === null || b === null) {
  console.error('Error: invalid number input. Received:', aArg, bArg);
  process.exit(1);
}

try {
  const result = performOperation(op.toLowerCase(), a, b);
  // Print result in a clean form (avoid scientific notation for common cases)
  if (Number.isInteger(result)) {
    console.log(result);
  } else {
    console.log(result);
  }
  process.exit(0);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
