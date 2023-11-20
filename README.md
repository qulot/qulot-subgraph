# qulot-subgraph

## Description

TheGraph exposes a GraphQL endpoint to query the events and entities within the Binance Smart Chain, Polygon.

## Dependencies

- [Graph CLI](https://github.com/graphprotocol/graph-cli)
  - Required to generate and build local GraphQL dependencies.

```shell
yarn global add @graphprotocol/graph-cli
```

## Usage

## Deployment

For any of the subgraph: `blocks` as `[subgraph]`

1. Run the `yarn codegen` command to prepare the TypeScript sources for the GraphQL (generated/\*).

2. Run the `yarn build` command to build the subgraph, and check compilation errors before deploying.

3. Run `graph auth --studio '<DEPLOY KEY>'`

4. Deploy via `graph deploy --studio <SUBGRAPH_SLUG> -l v0.0.1`.
