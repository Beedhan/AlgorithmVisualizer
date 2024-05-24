"use client";
import { Button } from "@/components/ui/button";
import { LinkedList } from "@/lib/algorithms/LinkedList";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const animationDuration = {
  duration: 0.8,
};
const LinkedListUI = () => {
  const [linkedList] = useState(new LinkedList());
  const [values, setValues] = useState<Number[]>([]);
  const [index, setIndex] = useState(0);
  const appendNode = (value: number) => {
    linkedList.append(value);
    setValues(linkedList.getValues());
  };
  const prependNode = (value: number) => {
    linkedList.prepend(value);
    setValues(linkedList.getValues());
  };

  const removeNode = () => {
    linkedList.remove(index);
    setValues(linkedList.getValues());
  };
  return (
    <div className="flex justify-center flex-col items-center h-screen gap-4 overflow-hidden">
      <motion.div className="flex justify-center items-center overflow-x-auto w-screen h-3/4">
        <AnimatePresence initial={false}>
          {values.map((e, index) => (
            <motion.div
              key={e.toString()}
              className="flex justify-center items-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                exit={{ opacity: 0, width: 0, height: 0 }}
                transition={animationDuration}
                className="w-16 h-16 rounded-full bg-gray-200 flex justify-center items-center"
              >
                {e.toString()}
              </motion.div>
              {index !== values.length - 1 && (
                <motion.svg
                  initial={{ width: 0 }}
                  animate={{ width: 50 }}
                  transition={animationDuration}
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M15 8L19 12M19 12L15 16M19 12H5"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    initial={{ pathLength: 0, pathOffset: 1 }}
                    animate={{ pathLength: 1, pathOffset: 0 }}
                    exit={{ pathLength: 0, pathOffset: 1 }}
                    transition={animationDuration}
                  />
                </motion.svg>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div>
        <div className="flex gap-4 my-2">
          <Button onClick={() => appendNode(Math.floor(Math.random() * 1000))}>
            Append
          </Button>
          <Button onClick={() => prependNode(Math.floor(Math.random() * 1000))}>
            Prepend
          </Button>
        </div>
        <div className="flex gap-1">
          <Input
            placeholder="Removing index"
            type="number"
            value={index}
            onChange={(e) => setIndex(parseInt(e.target.value))}
          />
          <Button onClick={removeNode}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default LinkedListUI;
