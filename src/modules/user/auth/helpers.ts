export const getMainAddrFromUserByProxyAccountRes = (s: string) => {
  /*
    eg of "s" := "{main_account=proxy-esoaqNF2F77yp1q5PxUdghRiCNnbHHLVkhmqh7E6pBoBMX4Jx, item_type=eso5pshyDhzejRpiVmq7qwCnFZGXxDZY28XSbMVpbC9Junpaw}"
    here, item_type is the main_account address.
  */
  const n = s.length;
  // slice "{ }" values from the ends
  s = s.slice(2, n - 1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, b] = s.split(",");
  const main_addr = b.split("=")[1];
  return main_addr;
};
