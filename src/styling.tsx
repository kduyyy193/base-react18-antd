import React, { ReactNode } from "react";
import "assets/styles/index.less";

type ComponentProps = {
  children: ReactNode;
};

const Styling: React.FC<ComponentProps> = ({ children }) => <>{children}</>;

export default Styling;
