/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const place_order = /* GraphQL */ `
  mutation Place_order($input: UserActionInput!) {
    place_order(input: $input) {
      u
      cid
      id
      t
      m
      s
      ot
      st
      p
      q
      afp
      fq
      fee
    }
  }
`;
export const cancel_order = /* GraphQL */ `
  mutation Cancel_order($input: UserActionInput!) {
    cancel_order(input: $input) {
      u
      cid
      id
      t
      m
      s
      ot
      st
      p
      q
      afp
      fq
      fee
    }
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
