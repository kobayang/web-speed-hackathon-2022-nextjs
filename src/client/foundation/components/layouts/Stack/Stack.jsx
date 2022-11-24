import React from "react";

/**
 * @typedef Props
 * @property {(string | React.ComponentType<any>)=} as
 * @property {boolean=} horizontal
 * @property {number} gap
 * @property {import('csstype').Property.AlignItems=} alignItems
 * @property {import('csstype').Property.JustifyContent=} justifyContent
 * @property {import('csstype').Property.FlexWrap=} wrap
 */

export const Stack = (
  /** @type {React.PropsWithChildren<Props>} */
  { alignItems, as = "div", children, gap, horizontal, justifyContent, wrap }
) => {
  const As = as;
  return (
    <As
      style={{
        display: "flex",
        alignItems,
        gap: gap ? `${gap}px` : undefined,
        flexDirection: horizontal ? "row" : "column",
        justifyContent,
        flexWrap: wrap,
      }}
    >
      {children}
    </As>
  );
};

/**
 * @typedef ItemProps
 * @property {(string | React.ComponentType<any>)=} as
 * @property {(number | string)=} basis
 * @property {(number | string)=} grow
 * @property {(number | string)=} shrink
 */

/** @type {React.FC<ItemProps>} */
const Item = ({ as = "div", basis, children, grow, shrink }) => {
  const As = as;
  return (
    <As style={{ flexBasis: basis, flexGrow: grow, flexShrink: shrink }}>
      {children}
    </As>
  );
};
Stack.Item = Item;
