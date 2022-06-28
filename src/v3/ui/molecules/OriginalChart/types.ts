export type Props = {
  // Close price, required field
  close: number;
  // Highest price, required field
  high: number;
  // Lowest price, required field
  low: number;
  // Open price, required fields
  open: number;
  // Timestamp, millisecond, required fields
  timestamp: number;
  // volume, optional field
  volume?: number;
  // Turnover, a non-required field, if you need to display the technical indicators 'EMV' and 'AVP', you need to fill this field with data.
  turnover?: number;
};
