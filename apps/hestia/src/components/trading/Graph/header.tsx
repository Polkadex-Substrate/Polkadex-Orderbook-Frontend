import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Button, Tabs, Typography } from "@polkadex/ux";

import { ResolutionString } from "../../../../public/static/charting_library/charting_library";

import { supported_resolutions } from "./config";

export const Header = ({
  activeResolution,
  onChangeResolution,
  onChangeFullScreen,
  onScreenshot,
}: {
  activeResolution: string;
  onChangeResolution: (e: ResolutionString) => void;
  onChangeFullScreen: () => void;
  onScreenshot: () => void;
}) => {
  return (
    <div className="flex gap-2 items-center flex-wrap justify-between border-b border-primary px-3 py-1 bg-level-0">
      <div className="flex items-center gap-3">
        <Typography.Text appearance="secondary">Time</Typography.Text>
        <ul className="flex items-center gap-2">
          {supported_resolutions.map((v) => {
            const active = v.id === activeResolution;
            return (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => onChangeResolution(v.id as ResolutionString)}
                >
                  <Typography.Text
                    size="xs"
                    appearance={active ? "primary-base" : "primary"}
                    bold={active}
                  >
                    {v.description}
                  </Typography.Text>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-2">
        <Tabs.List>
          <Tabs.Trigger value="tradingView">TradingView</Tabs.Trigger>
          <Tabs.Trigger value="originalChart" disabled>
            Original Chart
          </Tabs.Trigger>
        </Tabs.List>
        <div className="flex gap-1">
          <Button.Icon
            size="sm"
            className="p-1 text-primary"
            variant="ghost"
            onClick={onScreenshot}
          >
            <CameraIcon />
          </Button.Icon>
          <Button.Icon
            size="sm"
            className="p-1 text-primary"
            variant="ghost"
            onClick={onChangeFullScreen}
          >
            <ArrowsPointingOutIcon />
          </Button.Icon>
        </div>
      </div>
    </div>
  );
};
