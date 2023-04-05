export const isAssetPDEX = (assetId: string | null | undefined | number): boolean =>
  assetId === "-1" ||
  assetId === null ||
  assetId === -1 ||
  assetId === "POLKADEX" ||
  assetId === "PDEX" ||
  assetId === "polkadex";
