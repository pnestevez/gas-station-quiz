import React, { ReactNode } from "react";
import cn from "classnames";

export type TextBodyProps = {
  id?: string;
  children?: ReactNode | string;
  size: "s" | "m";
  weight: "regular" | "medium" | "bold";
  className?: string;
  variant: "p" | "span" | "strong" | "em" | "b";
};

const TextBody = ({
  id,
  children,
  size,
  weight,
  className,
  variant,
}: TextBodyProps): JSX.Element => {
  const sizeClass = {
    s: "text-body-s",
    m: "text-body-m",
  }[size];

  const weightClass = {
    regular: "font-regular",
    medium: "font-medium",
    bold: "font-bold",
  }[weight];

  const getProps = () => ({
    ...(id && { id: `text-body-${id}` }),
    className: cn(className, sizeClass, weightClass),
    children,
  });

  const variants = {
    p: <p {...getProps()} />,
    span: <span {...getProps()} />,
    strong: <strong {...getProps()} />,
    em: <em {...getProps()} />,
    b: <b {...getProps()} />,
  };

  return variants[variant] || null;
};

TextBody.defaultProps = {
  weight: "regular",
  variant: "p",
};

export default TextBody;
