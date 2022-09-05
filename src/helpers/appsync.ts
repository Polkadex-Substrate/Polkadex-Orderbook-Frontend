import { API } from "aws-amplify";

export const sendQueryToAppSync = async (query: string, variables: any) => {
  const res = await API.graphql({
    query,
    variables,
  });
  return res;
};

export const sendMutationToAppSync = async (mutation: string, variables: any) => {
  const res = await API.graphql({
    query: mutation,
    variables,
  });
  return res;
};
