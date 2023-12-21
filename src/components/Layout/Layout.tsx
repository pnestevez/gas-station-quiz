import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => (
  <div className="w-full max-w-xl min-h-screen mx-auto px-4 sm:px-6 pb-4 sm:pb-6 pt-14 sm:pt-16 bg-white flex flex-col">
    {children}
  </div>
);

export default Layout;
