import Link from "next/link";

import * as S from "./styles";
import * as T from "./type";

export const FAQHeader = ({ heading, pathname }: T.Props) => {
  const pathSegments = pathname.slice(1).split("/");
  const lastCrumb = pathSegments[pathSegments.length - 1];
  pathSegments.pop();

  const getLink = (item, index) => {
    if (index === 0) return `/${item}`;
    let link = "/";
    for (let i = 0; i < index; i++) {
      link = link + `${pathSegments[i]}/`;
    }
    link = link + item;
    return link;
  };

  return (
    <S.Header noBorder>
      <S.BreadCrumbWrapper>
        {pathSegments.map((item, index) => {
          return (
            <Link href={getLink(item, index)} key={item}>
              {item}/
            </Link>
          );
        })}
        <S.LastCrumb href={getLink(lastCrumb, pathSegments.length)}>{lastCrumb}</S.LastCrumb>
      </S.BreadCrumbWrapper>
      {heading && <S.Heading>{heading}</S.Heading>}
    </S.Header>
  );
};
