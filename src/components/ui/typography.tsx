import { ReactNode } from "react";

type Variants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "large"
  | "small"
  | "muted"
  | "super";

interface TypographyProps {
  variant: Variants;
  children: ReactNode;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export const Typography = ({
  variant,
  children,
  alignment,
  className,
}: TypographyProps) => {
  const overrideClasses = alignment
    ? `${"text-" + alignment} ${className}`
    : className;

  switch (variant) {
    case "h1":
      return (
        <h1
          className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`scroll-m-20 text-2xl font-semibold tracking-tight ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={`scroll-m-20 text-xl font-semibold tracking-tight ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </h4>
      );
    case "p":
      return (
        <p
          className={`leading-7 [&:not(:first-child)]:mt-6 ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </p>
      );
    case "blockquote":
      return (
        <blockquote
          className={`mt-6 border-l-2 pl-6 italic ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </blockquote>
      );
    case "large":
      return (
        <div
          className={`text-2xl font-semibold ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </div>
      );
    case "small":
      return (
        <small
          className={`text-sm leading-none font-medium ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </small>
      );
    case "muted":
      return (
        <p
          className={`text-muted-foreground text-sm ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </p>
      );
    case "super":
      return (
        <h1
          className={`scroll-m-20 text-7xl font-extrabold tracking-tight text-balance ${
            overrideClasses ? overrideClasses : ""
          }`}
        >
          {children}
        </h1>
      );
    default:
      console.warn(`Unknown Typography variant: ${variant}`);
      return <span>{children}</span>;
  }
};
