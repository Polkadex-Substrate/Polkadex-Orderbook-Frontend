import { useMenuSection } from "@react-aria/menu";
import React from "react";

import { Item as ItemComponent } from "./item";
import * as S from "./styles";
import * as T from "./types";

export const Section = ({ state, item }: T.SectionProps) => {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    "aria-label": item["aria-label"],
  });

  return (
    <>
      {item.key !== state.collection.getFirstKey() && <S.Divider />}
      <S.Section {...itemProps}>
        {item.rendered && (
          <S.SectionTitle {...headingProps}>{item.rendered}</S.SectionTitle>
        )}
        <S.SectionContainer {...groupProps}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {[...item.childNodes].map((value) => (
            <ItemComponent key={value.key} item={value} state={state} />
          ))}
        </S.SectionContainer>
      </S.Section>
    </>
  );
};
