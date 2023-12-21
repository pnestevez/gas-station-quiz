import React, { FC } from "react";
import cn from "classnames";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import TextBody from "../TextBody";

export type AlertProps = {
  id?: string;
  title: string;
  subtitle?: string;
  iconSize: "md" | "sm";
  onClick?: () => void;
};
const Alert: FC<AlertProps> = ({
  id,
  title,
  subtitle,
  iconSize: _iconSize,
  onClick,
}): JSX.Element => {
  const { iconSize, iconBgSize, py } = {
    sm: {
      iconSize: "w-5 h-5",
      iconBgSize: "w-8 h-8 min-w-[32px] min-h-[32px]",
      py: "py-2",
    },
    md: {
      iconSize: "w-6 h-6",
      iconBgSize: "w-10 h-10 min-w-[48px] min-h-[48px]",
      py: "py-3",
    },
  }[_iconSize];

  return (
    <div
      {...(id && {
        id: `alert-${id}`,
        ["data-test-id"]: `alert-${id}`,
      })}
      className={cn(
        py,
        "w-full px-3 rounded-lg bg-rose-200 shadow-default flex items-center gap-3",
        {
          "cursor-pointer": onClick,
        }
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "rounded-lg flex items-center justify-center bg-rose-700 bg-opacity-20",
          iconBgSize
        )}
      >
        <ExclamationCircleIcon className={cn("text-rose-800", iconSize)} />
      </div>

      {(title || subtitle) && (
        <div className="flex flex-col gap-1">
          {title && (
            <TextBody size="s" weight="medium" className={"text-rose-800"}>
              {title}
            </TextBody>
          )}

          {subtitle && (
            <TextBody size="s" weight="regular" className="text-gray-950">
              {subtitle}
            </TextBody>
          )}
        </div>
      )}
    </div>
  );
};

Alert.defaultProps = {
  iconSize: "md",
};

export default Alert;
