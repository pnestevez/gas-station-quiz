import React, { ReactNode } from "react";
import cn from "classnames";

export type TitleProps = {
  id?: string;
  children: ReactNode | string;
  variant: "h1" | "h2";
  weight?: "regular" | "medium" | "bold";
  alignment?: "left" | "right" | "center";
  className?: string;
};

const Title = ({
  id,
  children,
  variant,
  weight,
  alignment,
  className,
}: TitleProps): JSX.Element => {
  const weightClass = {
    regular: "font-regular",
    medium: "font-medium",
    bold: "font-bold",
  }[weight as string];

  const alignmentClass = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  }[alignment as string];

  const getClassname = (textClass: string) =>
    cn(weightClass, alignmentClass, textClass, className);

  const getProps = (textClass: string) => {
    return {
      ...(id && { id: `title-${id}` }),
      className: getClassname(textClass),
      children,
    };
  };

  const variants = {
    h1: <h1 {...getProps("text-h1-mobile md:text-h1-desktop")} />,
    h2: <h2 {...getProps("text-h2-mobile md:text-h2-desktop")} />,
    h3: <h2 {...getProps("text-h3-mobile md:text-h3-desktop")} />,
  };

  return variants[variant] || null;
};

Title.defaultProps = {
  weight: "bold",
  alignment: "left",
};

export default Title;
