import { ReactNode } from "react";
import { Typography } from "./typography";

interface ContentHeaderProps {
  children: ReactNode;
}

export const ContentHeader = ({ children }: ContentHeaderProps) => {
  return (
    <div className="text-right relative right-2 w-full mb-5">
      <Typography variant="super">
        <span className="text-accent">{"<"}</span>
        {children}
        <span className="text-accent">{"/>"}</span>
      </Typography>
    </div>
  );
};
