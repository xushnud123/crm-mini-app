import { FC } from "react";

interface PageProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const Page: FC<PageProps> = ({ sidebar, content }) => {
  return (
    <div className="block px-5 max-w-7xl mx-auto h-screen">
      <div className="flex h-screen">
        <div className="h-screen min-w-[275px]">{sidebar}</div>
        <div className="w-full h-screen">{content}</div>
      </div>
    </div>
  );
};

export default Page;
