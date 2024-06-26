import { Information } from "./Information";
import { Form } from "./form";
import { Participants } from "./participants";
import { Stats } from "./stats";

export const Overview = () => {
  return (
    <div className="flex-1 flex">
      <div className="flex-1 flex flex-col border-r border-primary">
        <Stats />
        <div className="flex-1 flex">
          <Information />
          <Form />
        </div>
      </div>
      <Participants />
    </div>
  );
};
