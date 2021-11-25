module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create Saga",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your saga name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/modules/user/{{camelCase name}}/index.tsx",
        templateFile: "templates/saga/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/modules/user/{{camelCase name}}/reducer.tsx",
        templateFile: "templates/saga/reducer.ts.hbs",
      },
      {
        type: "add",
        path: "../src/modules/user/{{camelCase name}}/selectors.tsx",
        templateFile: "templates/saga/selectors.ts.hbs",
      },
      {
        type: "add",
        path: "../src/modules/user/{{camelCase name}}/constants.tsx",
        templateFile: "templates/saga/constants.ts.hbs",
      },
      {
        type: "add",
        path: "../src/modules/user/{{camelCase name}}/actions.tsx",
        templateFile: "templates/saga/actions.ts.hbs",
      },
      {
        type: "add",
        path: "../src/modules/user/{{camelCase name}}/sagas/index.tsx",
        templateFile: "templates/saga/sagas/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/modules/user/{{camelCase name}}/sagas/{{camelCase name}}Saga.tsx",
        templateFile: "templates/saga/sagas/saga.ts.hbs",
      },
    ],
  });
};
