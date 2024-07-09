# Portfolio

[Code of main function](./src/main.ts)

[Code of process function](./src/processMergedInputs.ts)

[End-to-end test for main function](./tests/main.test.ts)

## Installation and Running

### Prerequisites

- nodejs >= **v22**
- [pnpm](https://pnpm.io/)

### Running

To run main function:

```sh
pnpm calc
```

The program out is located at `outputs/result.json`

### Testing

To run jest tests:

```sh
pnpm test
```

e2e test result location: `outputs/result1.json`

The tests use a slightly altered input set. I have added a sell input transaction to enable the checking of realized P&L.

[input_txs1](./inputs/input_txs1.json)

[input_floor_prices1](./inputs/input_floor_prices1.json)
