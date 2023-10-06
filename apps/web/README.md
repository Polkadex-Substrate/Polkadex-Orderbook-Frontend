## Getting Started

First, run the development server:

```bash
yarn workspace @orderbook/frontend dev 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to update schema
 - first delete the .graphqlconfig.yml file
 - replace schema.json with the latest exported schema from appsync
 - `amplify add codegen --apiId cnu3rmnhxrdlta3hjomaj26z2m` the --apiId should be of the production appsync api used.
 - in the cli select: javascript -> react -> typescript -> rest all default values
