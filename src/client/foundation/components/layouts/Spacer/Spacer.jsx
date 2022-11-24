import React, { useMemo } from "react";

const spacingMap = {
  m: "margin",
  mb: "marginBottom",
  ml: "marginLeft",
  mr: "marginRight",
  mt: "marginTop",

  p: "padding",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
  pt: "paddingTop",
};

/** @type {React.FC<{ [K in keyof spacingMap]?: number | string }>} */
export const Spacer = ({ children, ...rest }) => {
  const style = useMemo(() => {
    return Object.entries(spacingMap).reduce((acc, [key, cssProperty]) => {
      const value = rest[key];

      if (value != null) {
        acc[cssProperty] =
          typeof value === "number" ? `${value}px` : `${value}`;
      } else {
        acc[cssProperty] = "0px";
      }

      return acc;
    }, {});
  }, [rest]);

  return <div style={style}>{children}</div>;
};
