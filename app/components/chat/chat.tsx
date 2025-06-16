"use client";
import React, { useEffect, useState } from "react";
import ChatHeader from "../chat-header/chat-header";
import { IoSend } from "react-icons/io5";
import Message from "../message/message";
import { MessageType } from "../message/types";

const Chat: React.FC = () => {
  const [message, setMessage] = useState<MessageType>({
    content: "",
    role: "user",
    sessionId: "",
  });
  const [messages, setMessages] = useState<MessageType[]>([]);
  const CLI_SERVER = process.env.NEXT_PUBLIC_CLI_SERVER;

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role == "assistant" &&
      messages[messages.length - 1].content == ""
    ) {
      getAssistantResponse(messages[messages.length - 2].content);
    }
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  const getAssistantResponse = async (prompt: string) => {
    const response = await fetch(`${CLI_SERVER}/prompt`, {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const data = await response.json();
    const assistantMessage: MessageType = {
      content: data.response,
      role: "assistant",
      sessionId: "",
    };
    const newMessages = [...messages];
    newMessages[newMessages.length - 1] = assistantMessage;
    setMessages(newMessages);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = message.content.trim();
    if (text.length === 0) {
      return;
    }
    e.preventDefault();
    const assistantResponse: MessageType = {
      content: "",
      role: "assistant",
      sessionId: "",
    };
    setMessages([...messages, message, assistantResponse]);
    // reset message
    setMessage({
      content: "",
      role: "user",
      sessionId: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({
      content: e.target.value,
      role: "user",
      sessionId: "",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value.trim();
    if (e.key === "Enter" && !e.shiftKey && text.length > 0) {
      e.preventDefault();
      handleSubmit(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-end items-center">
      <ChatHeader />
      {messages.length === 0 && (
        <div className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-start">
          <div className="text-2xl font-semibold">Test your model</div>
          <div className="text-2xl text-zinc-400">Input a prompt below</div>
        </div>
      )}
      <div className="flex justify-end mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 h-full w-full md:max-w-3xl overflow-scroll">
        {messages.length > 0 && (
          <div className="flex flex-col gap-2 w-full">
            {messages.map((message, index) => (
              <Message key={index} messageData={message} />
            ))}
          </div>
        )}
      </div>
      <form className="flex mx-auto p-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <div className="relative w-full">
          <textarea
            rows={1}
            className=" flex w-full border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700"
            placeholder="Send a message..."
            value={message.content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="absolute bottom-2 right-2 p-2 w-fit flex flex-row justify-end bg-[#464851] rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
          >
            <IoSend className="text-white" size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
