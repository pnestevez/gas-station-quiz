import React, { useState, useMemo, useRef, useEffect } from "react";
import cn from "classnames";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useOutsideClick } from "../../hooks";

export type InputProps<T> = {
  id?: string;
  name: string;
  type: "password" | "text";
  label?: string;
  placeholder?: string;
  value?: T;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasChanged: boolean;
  hasError?: boolean;
  icon?: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  onIconClick?: () => boolean | void;
  stopIconClickPropagation?: boolean;
  hasMsg?: boolean;
  capsLockMsg?: string;
  assistiveMsg?: string;
  errorMsg?: string;
  disabled?: boolean;
  autoComplete?: "off";
  isClearable?: boolean;
  onClear?: () => void;
};

function Input<T extends React.InputHTMLAttributes<HTMLInputElement>["value"]>({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onFocus,
  onChange,
  onBlur,
  hasChanged,
  hasError,
  capsLockMsg,
  assistiveMsg,
  errorMsg,
  icon,
  onIconClick,
  stopIconClickPropagation,
  disabled,
  autoComplete,
  hasMsg,
  isClearable,
  onClear,
  onKeyDown,
  onKeyUp,
}: InputProps<T>): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const isPassword = useMemo(() => type === "password", [type]);
  const [_type, setType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const failed = useMemo(() => hasChanged && hasError, [hasChanged, hasError]);

  const Icon = useMemo(() => {
    if (isPassword)
      return {
        password: EyeSlashIcon,
        text: EyeIcon,
      }[_type];

    if (icon && failed) return ExclamationCircleIcon;

    return icon;
  }, [isPassword, _type, icon, failed]);

  const _onIconClick = useMemo(
    () =>
      isPassword
        ? () => {
            setType((_type) => (_type === "password" ? "text" : type));
            return onIconClick?.();
          }
        : onIconClick,
    [isPassword, type, onIconClick]
  );

  const message = useMemo(() => {
    if (isPassword && capsLock && capsLockMsg) return capsLockMsg;

    if (failed && errorMsg) return errorMsg;

    return assistiveMsg;
  }, [isPassword, capsLock, capsLockMsg, failed, errorMsg, assistiveMsg]);

  const wrapperRef = useRef(null);
  useOutsideClick({
    ref: wrapperRef,
    onClickOutside: () => setIsFocused(false),
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.onfocus = function () {
        setIsFocused(true);
      };
    }
  }, [ref]);

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        className={cn(
          "w-full px-2 whitespace-nowrap overflow-hidden text-ellipsis  text-detail-s",
          {
            "text-gray-900": !disabled,
            "text-gray-400 cursor-not-allowed": disabled,
          }
        )}
        htmlFor={name}
        onClick={() => !disabled && ref.current?.focus()}
      >
        {label}
      </label>

      <div
        className={cn(
          "w-full px-4 border rounded-lg cursor-text flex items-center gap-4 group transition-color ease-in-out duration-200",
          {
            "bg-white": !disabled,
            "bg-gray-200 border-gray-200 cursor-not-allowed": disabled,
            outline: isFocused,
            "hover:outline": !isFocused && !disabled,
            "!border-gray-400 hover:border-gray-900 hover:outline-gray-900":
              !isFocused && !disabled && !failed,
            "border-sky-600 outline-sky-600": isFocused && !failed,
            "!border-rose-600": failed,
            "outline-rose-600": failed && isFocused,
            "hover:outline-rose-600": failed && !isFocused,
          }
        )}
        ref={wrapperRef}
      >
        <input
          {...(id && { id: `input-${id}` })}
          ref={ref}
          name={name}
          type={_type}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={(e) => {
            if (isPassword) setCapsLock(e.getModifierState("CapsLock"));
            onKeyDown?.(e);
          }}
          onKeyUp={(e) => {
            if (isPassword) setCapsLock(e.getModifierState("CapsLock"));
            onKeyUp?.(e);
          }}
          onFocus={(e) => {
            onFocus?.(e);
          }}
          onBlur={(e) => {
            if (isPassword) setCapsLock(false);
            onBlur?.(e);
          }}
          disabled={disabled}
          className={cn(
            "placeholder-gray-400 text-body-s outline-none appearance-none h-10 grow",
            {
              "text-gray-950": !disabled,
              "text-gray-400 cursor-not-allowed": disabled,
            }
          )}
          style={{ background: "none", width: "100%" }}
        />

        {!!value && isClearable && !disabled && (
          <button
            type="button"
            className={cn(
              "w-6 h-6 min-h-[24px] min-w-[24px] flex justify-center items-center rounded-full cursor-pointer transition-color ease-in-out duration-200",
              {
                "invisible group-hover:visible": !isFocused,
                "bg-gray-200": !isFocused && !failed,
                "bg-sky-200": isFocused && !failed,
                "bg-rose-200": failed,
              }
            )}
            onClick={() => {
              onClear?.();
              isFocused && ref.current?.focus();
            }}
          >
            <XMarkIcon
              className={cn(
                "h-4 w-4 transition-color ease-in-out duration-200",
                {
                  "text-gray-950": !isFocused && !failed,
                  "text-sky-600": isFocused && !failed,
                  "text-rose-600": failed,
                }
              )}
            />
          </button>
        )}

        {!!Icon && (
          <Icon
            className={cn(
              "h-6 w-6 min-w-[24px] transition-color ease-in-out duration-200",
              {
                "cursor-not-allowed text-gray-400": disabled,
                "cursor-pointer": !!_onIconClick && !disabled,
                "text-gray-950": !disabled && !isFocused && !failed,
                "text-sky-600": !disabled && isFocused && !failed,
                "text-rose-600": !disabled && failed,
              }
            )}
            onClick={() => {
              if (disabled) return;
              _onIconClick?.();

              if (stopIconClickPropagation) {
                setIsFocused(false);
              } else {
                setIsFocused(true);
                ref.current?.focus();
              }
            }}
          />
        )}
      </div>

      {hasMsg && (
        <div
          className={cn(
            "min-h-[14px] px-2 text-detail-xs transition-color ease-in-out duration-150",
            {
              "text-gray-400": disabled,
              "text-gray-950": !disabled,
              "text-rose-600": !disabled && failed && errorMsg,
            }
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
}

Input.defaultProps = {
  hasMsg: true,
  autoComplete: "off",
};

export default Input;
