export type Props = {
  isActive?: boolean;
  isLoading?: boolean;
  onChange: () => void;
  onClose: () => void;
  recentSearches?: recentSearch[];
};

export type recentSearch = {
  value: string;
  tokenId?: string;
};
