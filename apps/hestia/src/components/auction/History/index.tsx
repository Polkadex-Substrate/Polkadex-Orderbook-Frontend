import { Overview } from "./overview";
import { Table } from "./table";

export const History = () => {
  return (
    <div className="flex flex-1">
      <Overview />
      <Table />
    </div>
  );
};
