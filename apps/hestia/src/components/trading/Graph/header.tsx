import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Tabs } from "@polkadex/ux";

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
    <div className="flex gap-2 items-center flex-wrap justify-between border-b border-primary px-3 py-2 bg-level-0">
      <div className="flex items-center gap-3">
        <span className="text-primary">Time</span>
        <ul className="flex items-center gap-2">
          {supported_resolutions.map((v) => {
            const active = v.id === activeResolution;
            return (
              <li
                className={classNames(
                  active
                    ? "text-primary-base"
                    : "text-primary hover:text-secondary duration-300 transition-colors",
                  "font-semibold text-sm"
                )}
                key={v.id}
              >
                <button
                  onClick={() => onChangeResolution(v.id as ResolutionString)}
                >
                  {v.description}
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
        <div className="flex gap-2">
          <button
            onClick={onScreenshot}
            className="hover:bg-level-3 duration-300 transition-colors group"
          >
            <CameraIcon className="w-5 h-5 text-secondary group-hover:text-primary-base duration-300 transition-colors" />
          </button>
          <button
            onClick={onChangeFullScreen}
            className="hover:bg-level-3 duration-300 transition-colors group"
          >
            <ArrowsPointingOutIcon className="w-5 h-5 text-secondary group-hover:text-primary-base duration-300 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};
