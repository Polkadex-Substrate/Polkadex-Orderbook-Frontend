"use client";

import * as Portal from "@radix-ui/react-portal";
import {
  Dispatch,
  Fragment,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RiArrowUpSLine, RiBox3Fill, RiCheckLine } from "@remixicon/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Typography, Icon, Separator, Button } from "@polkadex/ux";
import { ExtStatus, useTransactionManager } from "@polkadex/react-providers";

import { Spinner } from "./spinner";

export type StatusProps = "queued" | "ongoing" | "completed" | "error";

const Status = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative overflow-hidden w-full py-4">
      <div className="flex-1 flex items-center justify-evenly gap-2 relative z-[1]">
        {children}
      </div>
      <div className="flex items-center absolute top-0 my-auto w-full h-full bottom-6">
        <Separator.Horizontal />
      </div>
    </div>
  );
};

const Title = ({
  currentStatus,
  completed,
  description,
  children,
}: PropsWithChildren<{
  currentStatus: StatusProps;
  completed?: boolean;
  description?: string;
}>) => {
  return (
    <div className="flex flex-col w-full bg-level-1">
      <div className="flex flex-col gap-3 items-center p-5">
        {completed ? (
          <RiCheckLine className="w-8 h-8 text-success-base" />
        ) : (
          <Spinner.PulseRing className="w-8 h-8" />
        )}
        <div className="flex flex-col items-center text-center">
          <Typography.Text size="xl" className="first-letter:uppercase">
            {currentStatus}
          </Typography.Text>
          {description && (
            <Typography.Text appearance="primary" size="sm">
              {description}
            </Typography.Text>
          )}
        </div>
      </div>
      <div className="flex-1 flex items-center gap-6 border-y border-primary px-5 py-4">
        {children}
      </div>
    </div>
  );
};

const Card = ({
  status,
  vertical,
  completed,
  currentStatus,
  children,
}: PropsWithChildren<{
  status: StatusProps;
  vertical?: boolean;
  completed: boolean;
  currentStatus: StatusProps;
}>) => {
  const ongoing = currentStatus === status;
  const finished = currentStatus === "completed";

  const activeAppearance = completed ? "success" : "primary";
  const IconComponent = useMemo(
    () =>
      (completed && !ongoing) || finished ? (
        <RiCheckLine className="w-4 h-4 text-success-base" />
      ) : (
        <RiBox3Fill className="w-4 h-4 text-white" />
      ),

    [completed, ongoing, finished]
  );

  return (
    <div
      className={classNames(
        "flex items-center",
        !completed && "opacity-50",
        vertical
          ? "flex-col px-4 gap-3"
          : "gap-2 py-1 px-2 rounded-full bg-level-2/80"
      )}
    >
      <Icon
        size="md"
        className={classNames(
          "flex items-center justify-center",
          vertical
            ? "bg-level-2 rounded-full border border-primary"
            : "w-auto h-auto p-0"
        )}
      >
        {ongoing && !vertical && !finished ? (
          <Spinner.PulseRing className="w-4 h-4 text-primary" />
        ) : (
          IconComponent
        )}
      </Icon>
      <Typography.Text
        appearance={ongoing && !finished ? "base" : activeAppearance}
      >
        {children}
      </Typography.Text>
    </div>
  );
};

const Maximized = ({
  onOpenChange,
  children,
  open,
}: PropsWithChildren<{
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}>) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="relative flex flex-col flex-1 justify-end">
          <motion.div
            layout="position"
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            }}
            exit={{
              y: -40,
              opacity: 0,
            }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center relative flex-col bg-level-0 border border-primary rounded-sm max-w-[400px] w-full self-center mb-8 z-[1]"
          >
            {children}
            <div className="flex items-center justify-center gap-2 w-full p-3 border-t border-primary">
              <Typography.Text appearance="primary" size="xs">
                Having Trouble?
              </Typography.Text>
              <Typography.Text appearance="info" size="xs" asChild>
                <a href="/" target="_blank">
                  Get in touch
                </a>
              </Typography.Text>
            </div>
            <Button.Solid
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenChange(false);
              }}
              size="xs"
              appearance="secondary"
              className="absolute top-3 right-3 flex gap-1 items-center"
              rounded
            >
              <Typography.Text appearance="primary" size="xs">
                Minimize
              </Typography.Text>
              <Icon>
                <RiArrowUpSLine className="w-4 h-4 text-primary" />
              </Icon>
            </Button.Solid>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-screen bg-overlay-1 absolute l-0 t-0"
            onClick={() => onOpenChange(false)}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

const Minimized = ({
  onOpenChange,
  open,
  children,
}: PropsWithChildren<{
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}>) => {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          layout="preserve-aspect"
          role="button"
          onClick={() => onOpenChange(true)}
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.5,
            },
          }}
          exit={{
            y: -40,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="rounded-full py-2 px-3 bg-level-0 border border-primary w-fit self-center mb-5"
        >
          <div className="relative overflow-hidden">
            <div className="flex-1 flex items-center justify-evenly gap-2 relative z-[1]">
              {children}
            </div>
            <div className="flex items-center absolute top-0 my-auto w-full h-full bottom-0">
              <Separator.Horizontal />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ProgressBar = {
  Maximized,
  Minimized,
  Card,
  Title,
};

export const Progress = () => {
  const [state, setState] = useState(false);
  const { txStatus: transaction } = useTransactionManager();
  const [txStatus, setTxStatus] = useState<ExtStatus[]>([]);

  useEffect(() => {
    setTxStatus((prev) => {
      const existingStatus = new Set(prev.map(({ status }) => status));
      const uniqueTransactions = transaction.filter(
        ({ status }) => !existingStatus.has(status)
      );
      return [...prev, ...uniqueTransactions];
    });
  }, [transaction]);

  const show = useMemo(() => !!txStatus?.length, [txStatus]);

  const queuedActive = useMemo(
    () => !!txStatus?.find((e) => e.status === "queued"),
    [txStatus]
  );
  const onGoingActive = useMemo(
    () => !!txStatus?.find((e) => e.status === "ongoing"),
    [txStatus]
  );
  const completedActive = useMemo(
    () => !!txStatus?.find((e) => e.status === "completed"),
    [txStatus]
  );

  const currentStatus = useMemo(
    () => txStatus[txStatus.length - 1]?.status as StatusProps,
    [txStatus]
  );

  useEffect(() => {
    if (txStatus?.length >= 3) setTimeout(() => setTxStatus([]), 5000);
  }, [txStatus.length]);

  const message = {
    queued: "In the process queue, awaiting processing",
    ongoing: "Currently in progress, awaiting confirmation.",
    completed: "Successfully processed and finalized.",
    error: "Failed due to an encountered error.",
  };

  return (
    <Portal.Root asChild>
      <AnimatePresence>
        {show && (
          <div
            className={classNames(
              "fixed z-[100] flex flex-col justify-end pointer-events-auto",
              state ? "w-screen h-screen" : "bottom-5 left-0 right-0 mx-auto"
            )}
          >
            <ProgressBar.Maximized open={state} onOpenChange={setState}>
              <Fragment>
                <Title
                  currentStatus={currentStatus as StatusProps}
                  completed={completedActive}
                  description={
                    currentStatus ? message[currentStatus] : undefined
                  }
                >
                  <div className="flex flex-col gap-1">
                    <Typography.Text>450201</Typography.Text>
                    <Typography.Text appearance="primary" size="xs">
                      Current block
                    </Typography.Text>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Typography.Text>450205</Typography.Text>
                    <Typography.Text appearance="primary" size="xs">
                      Goal block
                    </Typography.Text>
                  </div>
                </Title>
                <Status>
                  <ProgressBar.Card
                    vertical
                    status="queued"
                    currentStatus={currentStatus as StatusProps}
                    completed={queuedActive}
                  >
                    Dispatched
                  </ProgressBar.Card>
                  <ProgressBar.Card
                    vertical
                    status="ongoing"
                    currentStatus={currentStatus as StatusProps}
                    completed={onGoingActive}
                  >
                    InBlock
                  </ProgressBar.Card>
                  <ProgressBar.Card
                    vertical
                    status="completed"
                    currentStatus={currentStatus as StatusProps}
                    completed={completedActive}
                  >
                    Completed
                  </ProgressBar.Card>
                </Status>
              </Fragment>
            </ProgressBar.Maximized>
            <ProgressBar.Minimized open={state} onOpenChange={setState}>
              <ProgressBar.Card
                status="queued"
                currentStatus={currentStatus as StatusProps}
                completed={queuedActive}
              >
                Dispatched
              </ProgressBar.Card>
              <ProgressBar.Card
                status="ongoing"
                currentStatus={currentStatus as StatusProps}
                completed={onGoingActive}
              >
                InBlock
              </ProgressBar.Card>
              <ProgressBar.Card
                status="completed"
                currentStatus={currentStatus as StatusProps}
                completed={completedActive}
              >
                Completed
              </ProgressBar.Card>
            </ProgressBar.Minimized>
          </div>
        )}
      </AnimatePresence>
    </Portal.Root>
  );
};
