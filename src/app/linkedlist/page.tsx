"use client";
import { Button } from "@/components/ui/button";
import { LinkedList } from "@/lib/algorithms/LinkedList";
import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  transform,
  useAnimation,
} from "framer-motion";
import { Input } from "@/components/ui/input";

const animationDuration = {
  duration: 0.8,
};
const mapValueToSpringVelocity = transform([50, 0], [50, 50]);
const LinkedListUI = () => {
  const [linkedList] = useState(new LinkedList());
  const [values, setValues] = useState<Number[]>([]);
  const [listLength, setListLength] = useState(0);
  const [index, setIndex] = useState(0);
  const controls = useAnimation();
  const appendNode = (value: number) => {
    linkedList.append(value);
    setValues(linkedList.getValues());
    setListLength(linkedList.length);
  };
  const prependNode = (value: number) => {
    linkedList.prepend(value);
    setValues(linkedList.getValues());
    setListLength(linkedList.length);
  };

  const removeHead = () => {
    linkedList.removeHead();
    setValues(linkedList.getValues());
    setListLength(linkedList.length);
  };
  const removeTail = () => {
    linkedList.removeTail();
    setValues(linkedList.getValues());
    setListLength(linkedList.length);
  };
  const removeNode = () => {
    linkedList.remove(index);
    setValues(linkedList.getValues());
    setListLength(linkedList.length);
  };

  useEffect(() => {
    controls.start({
      scale: 1,
      transition: {
        type: "spring",
        velocity: mapValueToSpringVelocity(listLength),
        stiffness: 500,
        damping: 50,
      },
    });
  }, [controls, listLength]);

  return (
    <div className="flex justify-center flex-col items-center h-screen gap-4 overflow-hidden">
      <motion.h1 animate={controls} className="text-2xl font-bold">
        {listLength}
      </motion.h1>
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
                exit={{
                  width: 0,
                  height: 0,
                  backgroundColor: "#EF3054",
                  transition: {
                    delay: 0,
                    duration: animationDuration.duration,
                  },
                }}
                transition={{
                  duration: animationDuration.duration,
                  delay: 0.5,
                }}
                className="w-16 h-16 rounded-full bg-gray-200 flex justify-center items-center"
              >
                {e.toString()}
              </motion.div>
              {index !== values.length - 1 && (
                <motion.svg
                  initial={{ width: 0 }}
                  animate={{ width: 50 }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                  transition={animationDuration}
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M15 8L19 12M19 12L15 16M19 12H5"
                    stroke="#0B0500"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
          <Button onClick={removeHead} variant={"destructive"}>
            Remove Head
          </Button>
          <Button onClick={removeTail} variant={"destructive"}>
            Remove Tail
          </Button>
        </div>
        <div className="flex gap-1">
          <Input
            placeholder="Removing index"
            type="number"
            value={index}
            onChange={(e) => setIndex(parseInt(e.target.value))}
          />
          <Button onClick={removeNode} variant={"destructive"}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkedListUI;
