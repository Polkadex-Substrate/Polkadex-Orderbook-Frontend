export type Props = {
  percentage: string;
  percentageNum: number;
  isActive: boolean;
  handleOnClick: ( value: {percentage: string; percentageNum: number }) => void;
}
