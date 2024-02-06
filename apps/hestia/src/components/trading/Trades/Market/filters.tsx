import { StarIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import React, { ChangeEvent } from "react";
import { Input } from "@polkadex/ux";

export const Filters = ({
  onSearch,
  searchField,
  onChangeFavorite,
  activeFavorite,
}: {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  searchField: string;
  onChangeFavorite: () => void;
  activeFavorite: boolean;
}) => {
  return (
    <div className="flex p-2 justify-between items-center pr-2 bg-level-1">
      <Input.Search
        placeholder="Search market.."
        value={searchField}
        onChange={onSearch}
      />
      <button onClick={onChangeFavorite}>
        <StarIcon
          className={classNames(
            activeFavorite ? "text-primary-base" : "text-primary-disabled",
            "w-4 h-4"
          )}
        />
      </button>
    </div>
  );
};
