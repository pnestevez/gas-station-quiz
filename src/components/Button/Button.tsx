import React from "react";
import cn from "classnames";

export type ButtonProps = {
  id?: string;
  type?: "button" | "submit" | "reset";
  children: string;
  width?: "fit" | "full";
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  theme: "default" | "error";
  variant: "primary" | "secondary" | "tertiary";
  icon?: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  iconPosition?: "left" | "right";
  loading?: boolean;
  loadingMsg?: string;
};

const Button = ({
  id,
  type,
  children,
  onClick,
  disabled,
  theme,
  variant,
  icon: IconComponent,
  iconPosition,
  loading,
  loadingMsg,
  width,
}: ButtonProps): JSX.Element => {
  const themeClasses = {
    primary: cn("text-white", {
      "bg-sky-600": theme === "default",
      "hover:bg-sky-700 active:bg-sky-800":
        theme === "default" && !disabled && !loading,
      "bg-rose-600": theme === "error",
      "hover:bg-rose-700 active:bg-rose-800":
        theme === "error" && !disabled && !loading,
    }),
    secondary: cn(`border`, {
      "border-sky-600 text-sky-600": theme === "default",
      "hover:bg-sky-700 hover:border-sky-700 active:bg-sky-800 active:border-sky-800":
        theme === "default" && !disabled && !loading,
      "border-rose-600 text-rose-600": theme === "error",
      "hover:bg-rose-700 hover:border-rose-700 active:bg-rose-800 active:border-rose-800":
        theme === "error" && !disabled && !loading,
      "hover:text-white active:text-white": !disabled && !loading,
    }),
    tertiary: cn({
      "text-sky-600": theme === "default",
      "hover:text-sky-700 active:text-sky-800":
        theme === "default" && !disabled && !loading,
      "text-rose-600": theme === "error",
      "hover:text-rose-700 active:text-rose-800":
        theme === "error" && !disabled && !loading,
    }),
  }[variant];

  return (
    <button
      {...(id && { id: `button-${id}` })}
      type={type}
      onClick={() => !disabled && !loading && onClick?.()}
      disabled={disabled || loading}
      className={cn(
        themeClasses,
        "h-10 rounded-lg flex items-center justify-center disabled:cursor-not-allowed transition-color ease-in-out duration-200",
        {
          "disabled:opacity-40": disabled,
          "w-full px-4": width === "full",
          "px-8": width === "fit" && variant !== "tertiary",
        }
      )}
    >
      {loading ? (
        <div className="w-full flex justify-center items-center gap-3">
          {loadingMsg && (
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-body-s font-regular animate-pulse">
              {loadingMsg}
            </div>
          )}

          <div className="animate-spin w-4 h-4 min-w-[16px] min-h-[16px] border-2 border-r-[transparent] rounded-full" />
        </div>
      ) : (
        <div
          className={cn("w-full flex justify-center items-center gap-3", {
            "flex-row-reverse": iconPosition === "right",
          })}
        >
          {IconComponent && (
            <IconComponent className="w-4 h-4 min-w-[16px] min-h-[16px]" />
          )}

          <span
            className={cn(
              "whitespace-nowrap overflow-hidden text-ellipsis text-body-s font-regular",
              { underline: variant === "tertiary" }
            )}
          >
            {children}
          </span>
        </div>
      )}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  theme: "default",
  variant: "primary",
  width: "full",
  iconPosition: "left",
};

export default Button;
