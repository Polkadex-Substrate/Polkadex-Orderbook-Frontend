export const serializeBigInt = (data: Record<string, unknown>) => {
  return JSON.parse(
    JSON.stringify(data, (_key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};
