import { AvatarProps, BigHead } from "@bigheads/core";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import { randomAvatars } from "./randomAvatars";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { selectDefaultAvatarId, userSetAvatar } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

type Props = {
  onClose: () => void;
};
export const ChangeAvatar = ({ onClose = undefined }: Props) => {
  const dispatch = useDispatch();
  const currentAvatar = useReduxSelector(selectDefaultAvatarId);

  const [state, setState] = useState(currentAvatar);
  const handleChange = (id: number) => setState(id);
  const handleSubmit = () => {
    dispatch(userSetAvatar(state.toString()));
    onClose();
  };
  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <S.Content>
        <h2>Select your Avatar</h2>
        <p>Select an avatar to use as your profile picture</p>
        <RandomAvatars currentAvatar={state} handleSelect={handleChange} />
      </S.Content>
      <S.Footer>
        <S.Button type="button" onClick={onClose}>
          Cancel
        </S.Button>
        <S.Button disabled={state === currentAvatar} type="button" onClick={handleSubmit}>
          Save
        </S.Button>
      </S.Footer>
    </S.Main>
  );
};

type RandomAvatarProps = {
  currentAvatar: number;
  handleSelect: (v: number) => void;
};
const RandomAvatars = ({ currentAvatar, handleSelect }: RandomAvatarProps) => {
  return useMemo(
    () => (
      <S.Container>
        {randomAvatars.map(({ id, ...v }) => {
          return (
            <S.Card isActive={currentAvatar === id} key={id} onClick={() => handleSelect(id)}>
              <BigHead {...(v as AvatarProps)} />
            </S.Card>
          );
        })}
      </S.Container>
    ),
    [currentAvatar, handleSelect]
  );
};
