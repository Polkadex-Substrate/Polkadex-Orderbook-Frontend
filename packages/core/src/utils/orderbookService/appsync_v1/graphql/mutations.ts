/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const register_user = /* GraphQL */ `
  mutation Register_user($input: UserActionInput!) {
    register_user(input: $input)
  }
`;
export const place_order = /* GraphQL */ `
  mutation Place_order($input: UserActionInput!) {
    place_order(input: $input)
  }
`;
export const cancel_order = /* GraphQL */ `
  mutation Cancel_order($input: UserActionInput!) {
    cancel_order(input: $input)
  }
`;
export const withdraw = /* GraphQL */ `
  mutation Withdraw($input: UserActionInput!) {
    withdraw(input: $input)
  }
`;
export const publish = /* GraphQL */ `
  mutation Publish($name: String!, $data: String!) {
    publish(name: $name, data: $data) {
      name
      data
    }
  }
`;
