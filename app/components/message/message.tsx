import React from "react";
import { MessageProps } from "./types";
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
              <p className="text-sm">{content}</p>
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
