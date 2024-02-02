import React, { ReactNode } from 'react';
import 'assets/styles/index.css';

type ComponentProps = {
  children: ReactNode;
};

const Styling: React.FC<ComponentProps> = ({ children }) => <>{children}</>;

export default Styling;
