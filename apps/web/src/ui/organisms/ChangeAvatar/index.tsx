import { BigHead } from "@bigheads/core";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useProfile } from "@orderbook/core/providers/user/profile";

import * as S from "./styles";
import { randomAvatars } from "./randomAvatars";

type Props = {
  onClose: () => void;
};
export const ChangeAvatar = ({ onClose = undefined }: Props) => {
  const profileState = useProfile();
  const currentAvatar = Number(profileState.userProfile?.avatar);

  const [state, setState] = useState(currentAvatar);
  const handleChange = (id: number) => setState(id);
  const handleSubmit = () => {
    profileState.onUserSetAvatar(state.toString());
    onClose();
  };

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`changeAvatar.${key}`);

  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <S.Content>
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>
        <RandomAvatars currentAvatar={state} handleSelect={handleChange} />
      </S.Content>
      <S.Footer>
        <S.Button type="button" onClick={onClose}>
          {t("cancel")}
        </S.Button>
        <S.Button
          disabled={state === currentAvatar}
          type="button"
          onClick={handleSubmit}
        >
          {t("save")}
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
            <S.Card
              isActive={currentAvatar === id}
              key={id}
              onClick={() => handleSelect(id)}
            >
              <BigHead {...v.data} />
            </S.Card>
          );
        })}
      </S.Container>
    ),
    [currentAvatar, handleSelect],
  );
};
