import React, {useState} from "react"
import { CustomDropdown, CustomIcon, CustomLogo, CustomThemeSwitch } from "src/components/";
import * as S from "./styles";
import {
  LanguageNameProps,
  NavProps,
  Props,
} from "./types";
import { changeLanguage, selectUserLoggedIn, selectUserInfo, changeUserDataFetch, selectCurrentLanguage } from "src/modules"
import { useReduxSelector } from "src/hooks";
import { useDispatch } from "react-redux";
import { languages } from 'src/api/config';

export const CustomNavigation = ({ activateNotification }: Props) => { 
  const user = useReduxSelector(selectUserInfo)
  const isLoggedIn = useReduxSelector(selectUserLoggedIn)
  const lang = useReduxSelector(selectCurrentLanguage)

  const dispatch = useDispatch()
  const handleChangeLanguage = (language: string) => {
    if (isLoggedIn) {
        const data = user.data && JSON.parse(user.data);

        if (data && data.language && data.language !== language) {
            const payload = {
                ...user,
                data: JSON.stringify({
                    ...data,
                    language,
                }),
            };

            dispatch(changeUserDataFetch({ user: payload }));
        }
    }
    dispatch(changeLanguage(language));
}; 
  return (
  <S.Wrapper>
    <S.Header>
      <S.Container>
        <S.Box>
          <CustomLogo size="Medium" />
        </S.Box>
      </S.Container>
      <S.Container>
        <S.Box>
          <NavItem text="Exchange" active icon="Exchange" href="/" />
        </S.Box>
        <S.Box>
          <NavItem text="Swap" soon icon="Swap" href="/" />
        </S.Box>
        <S.Box>
          <NavItem text="P2P" soon icon="DoubleExchange" href="/" />
        </S.Box>
      </S.Container>
      <S.Container>
        <S.Box>
          <NavItem text="IDO Platform" soon icon="IDO" href="/" />
        </S.Box>
      </S.Container>
      <S.Container>
        <S.Box>
          <NavItem text="Support" soon icon="Help" href="/" />
        </S.Box>
        <S.Box>
          <NavItem text="Affiliates" soon icon="Help" href="/" />
        </S.Box>
      </S.Container>
      <S.Container>
        <S.Box>
          <CustomThemeSwitch />
        </S.Box>
      </S.Container>
    </S.Header>
    <S.Footer>
      {/* <S.FooterNotifications>
        <button type="button" onClick={activateNotification}>
          <CustomIcon icon="Notifications" background="transparent" />
        </button>
      </S.FooterNotifications> */}
      <S.FooterLanguage>
        <CustomDropdown direction="right" isOpacity title={<CustomIcon icon="Language" />}>
          <LanguageContent changeLanguage={handleChangeLanguage} currentLanguage={lang}/>
        </CustomDropdown>
      </S.FooterLanguage>
    </S.Footer>
  </S.Wrapper>
);}

const NavItem = ({
  active = false,
  soon = false,
  icon,
  text,
  ...props
}: NavProps) => (
  <S.NavWrapper active={active} icon={icon} soon={soon} {...props}>
    <S.NavContainer>
      {soon && <span>Soon</span>}
      <CustomIcon icon={icon} isActive={active} />
    </S.NavContainer>
    <p>{text}</p>
  </S.NavWrapper>
);

const LanguageContent = ({changeLanguage, currentLanguage}) => (
  <S.LanguageWrapper>
    <S.LanguageContainer>
      <S.LanguageTitle>Language</S.LanguageTitle>
      <S.LanguageContent>
        {!!languages && languages.map((item, index)=> <LanguageName active={currentLanguage && currentLanguage === item} key={index} onClick={() => changeLanguage(item)} flag={item.toUpperCase()} />  ) }
      </S.LanguageContent>
    </S.LanguageContainer>
  </S.LanguageWrapper>
);

const LanguageName = ({
  flag = "En",
  onClick,
  active = false
}: LanguageNameProps) => (
  <S.LanguageNameWrapper
    onClick={onClick}
    active={active}
  >
    <CustomIcon icon={flag} background="none" />
    <span> {flag}/{flag === 'EN' ? 'English' : 'Russian'} </span>
  </S.LanguageNameWrapper>
);
