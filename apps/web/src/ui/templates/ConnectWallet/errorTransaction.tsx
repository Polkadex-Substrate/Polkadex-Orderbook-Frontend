import { XMarkIcon } from "@heroicons/react/24/solid";
import { Interaction, Typography } from "@polkadex/ux";

export const ErrorTransaction = ({
  onAction,
  message,
  title = "Oops..",
}: {
  onAction: () => void;
  message: string;
  title?: string;
}) => {
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-5 items-center text-center">
        <div className=" h-16 w-16 rounded-full bg-danger-base p-3 shadow-baseShadow">
          <XMarkIcon />
        </div>
        <div className="flex flex-col gap-1">
          <Typography.Text bold size="xl">
            {title}
          </Typography.Text>
          <Typography.Paragraph variant="primary">
            {message}
          </Typography.Paragraph>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action appearance="secondary" onClick={onAction}>
          Close
        </Interaction.Action>
      </Interaction.Footer>
    </Interaction>
  );
};
