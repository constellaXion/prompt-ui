import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
// import ChatTypeSelector from "../chat-type-selector/chat-type-selector";

const ChatHeader = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col w-full h-content bg-accent border-b border-accent-dark items-start p-2 pt-4 mb-4">
      <Image
        className="ml-2"
        src={
          resolvedTheme === "dark"
            ? "/logo_prompt_ui_dark_bg.svg"
            : "/logo_prompt_ui_light_bg.svg"
        }
        alt="logo"
        width={120}
        height={120}
      />
      {/* <ChatTypeSelector /> */}
    </div>
  );
};

export default ChatHeader;
