"use client";

import { useTransactionManager } from "@polkadex/react-providers";
import { ProgressBar } from "@polkadex/ux";
import { Fragment } from "react";

const messages = {
  queued: "In the process queue, awaiting processing",
  ongoing: "Currently in progress, awaiting confirmation.",
  completed: "Successfully processed and finalized.",
  error: "Failed due to an encountered error.",
};

export const Progress = () => {
  const { txStatus } = useTransactionManager();

  return txStatus.map((e) => (
    <ProgressBar key={e.hash} data={e} closeDelay={5000}>
      <Fragment>
        <ProgressBar.Maximized>
          <ProgressBar.Title messages={messages} />
          <ProgressBar.Status>
            <ProgressBar.Card vertical status="queued">
              Dispatched
            </ProgressBar.Card>
            <ProgressBar.Card vertical status="ongoing">
              InBlock
            </ProgressBar.Card>
            <ProgressBar.Card vertical status="completed">
              Completed
            </ProgressBar.Card>
          </ProgressBar.Status>
        </ProgressBar.Maximized>
        <ProgressBar.Minimized>
          <ProgressBar.Card status="queued">Dispatched</ProgressBar.Card>
          <ProgressBar.Card status="ongoing">InBlock</ProgressBar.Card>
          <ProgressBar.Card status="completed">Completed</ProgressBar.Card>
        </ProgressBar.Minimized>
      </Fragment>
    </ProgressBar>
  ));
};
