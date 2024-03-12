import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Button, Modal, Typography } from "@polkadex/ux";

import { Icons } from "@/ui/atoms";

export const CrowdloansBanner = () => {
  const [state, setState] = useState(false);

  const onClose = () => {
    localStorage.setItem("CrowdloansMessage", "true");
    setState(false);
  };
  function onCheckState() {
    const result = localStorage.getItem("CrowdloansMessage");
    if (result !== "true") setState(true);
  }

  useEffect(() => {
    if (!state) onCheckState();
  }, [state]);

  return (
    <Fragment>
      <Modal closeOnClickOutside open={state} onOpenChange={setState}>
        <Modal.Content className="flex flex-col gap-5 max-w-[300px] bg-level-4 border-primary p-4 rounded-sm">
          <div className="w-full rounded-md bg-level-3">
            <Icons.Hand />
          </div>
          <Typography.Text>
            Contribute now to <strong> get 3 PDEX per DOT </strong>and help
            Polkadex renew its parachain lease.
          </Typography.Text>
          <div className="flex flex-col gap-3">
            <Button.Solid asChild className="font-medium">
              <Link href="https://polkadex.trade/crowdloans" target="_blank">
                Learn more
              </Link>
            </Button.Solid>
            <Button.Ghost appearance="secondary" onClick={onClose}>
              Close
            </Button.Ghost>
          </div>
        </Modal.Content>
      </Modal>
      <div
        className="flex items-center gap-2 cursor-pointer bg-info-base/30 rounded p-2  max-md:flex-1 whitespace-nowrap"
        onClick={() => setState(true)}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info-base opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-info-base" />
        </span>
        <Typography.Text size="xs">
          The Polkadex Crowdloan is back!
        </Typography.Text>
      </div>
    </Fragment>
  );
};
