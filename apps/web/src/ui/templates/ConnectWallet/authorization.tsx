import { XMarkIcon } from "@heroicons/react/24/solid";
import { ElementType, useCallback, useEffect, useState } from "react";
import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import {
  Icon,
  IconsProps,
  Interaction,
  Spinner,
  Typography,
} from "@polkadex/ux";

export const Authorization = ({
  extensionIcon,
  extensionName,
  onRedirect,
  onAction,
  onClose,
}: {
  extensionName?: string;
  extensionIcon?: string;
  loadingDescription?: string;
  loading?: boolean;
  onRedirect: () => void;
  onAction: () => Promise<boolean>;
  onClose?: () => void;
}) => {
  const [error, setError] = useState(false);
  const IconComponent = getExtensionIcon(
    extensionIcon as string
  ) as ElementType;

  const callbackFn = useCallback(async () => {
    try {
      const success = await onAction();
      console.log(">>>", success);
      if (!success) {
        setError(true);
        return;
      }

      onRedirect();
    } catch (error) {
      setError(true);
    }
  }, [onAction, onRedirect]);

  useEffect(() => {
    if (!error) callbackFn();
  }, [onRedirect, callbackFn, error]);

  const errorMessage = `Please authorize your ${extensionName} wallet extension to connect to Orderbook App`;
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-5 items-center text-center">
        {error ? (
          <>
            <div className="max-w-[13rem]">
              <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
                {extensionIcon && <IconComponent />}
                <div className="h-6 w-6 p-1 rounded-full bg-danger-base absolute bottom-0 right-0">
                  <XMarkIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Typography.Text bold size="xl">
                Wallet permission issue
              </Typography.Text>
              <Typography.Text variant="primary">
                Access not granted. Please open the extension, allow access for
                the Orderbook app, and then try again.
              </Typography.Text>
            </div>
          </>
        ) : (
          <>
            <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
              <Icon name={extensionIcon as IconsProps} />
              <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner.Loading />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Typography.Text bold size="xl">
                Waiting for authorization
              </Typography.Text>
              <Typography.Text variant="primary">
                {errorMessage}
              </Typography.Text>
            </div>
          </>
        )}
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action
          appearance="secondary"
          onClick={async () => await callbackFn()}
        >
          Try again
        </Interaction.Action>
        <Interaction.Close onClick={onClose}>
          Connect other wallet
        </Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
