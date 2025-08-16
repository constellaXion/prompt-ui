import React from "react";
import { MessageProps } from "./types";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";

const Message: React.FC<MessageProps> = ({ messageData }) => {
  const { content, role } = messageData;

  if (role === "user") {
    return (
      <div className="w-full flex justify-end">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            className="p-2 bg-accent rounded-lg w-fit min-w-[100px] max-w-lg"
          >
            <p className="text-sm">{content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (role === "assistant") {
    return (
      <div className="w-full flex justify-start">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            className="p-2 w-fit min-w-[100px] max-w-3xl"
          >
            {content ? (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => (
                    <h1 {...props}>
                      <strong>{props.children}</strong>
                    </h1>
                  ),
                  h2: ({ ...props }) => (
                    <h2 {...props}>
                      <strong>{props.children}</strong>
                    </h2>
                  ),
                  h3: ({ ...props }) => (
                    <h3 {...props}>
                      <strong>{props.children}</strong>
                    </h3>
                  ),
                  h4: ({ ...props }) => (
                    <h4 {...props}>
                      <strong>{props.children}</strong>
                    </h4>
                  ),
                  h5: ({ ...props }) => (
                    <h5 {...props}>
                      <strong>{props.children}</strong>
                    </h5>
                  ),
                  h6: ({ ...props }) => (
                    <h6 {...props}>
                      <strong>{props.children}</strong>
                    </h6>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <span className="loading loading-dots loading-md"></span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  return null;
};

export default Message;
