"use client";
import { Button } from "@/components/ui/button";
import { Queue } from "@/lib/algorithms/Queue";
import {
  AnimatePresence,
  motion,
  transform,
  useAnimation,
} from "framer-motion";
import { useEffect, useState } from "react";

const animationDuration = {
  duration: 0.8,
};
//TODO: add top indicator
const mapValueToSpringVelocity = transform([50, 0], [50, 50]);
const QueueUI = () => {
  const [queue] = useState(new Queue());
  const [values, setValues] = useState<Number[]>([]);
  const [listLength, setListLength] = useState(0);
  const controls = useAnimation();
  const push = (value: number) => {
    queue.enqueue(value);
    setValues(queue.getValues());
    setListLength(queue.length);
  };
  const pop = () => {
    queue.dequeue();
    setValues(queue.getValues());
    setListLength(queue.length);
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
      <motion.div className=" h-full overflow-auto  w-screen flex items-center justify-center">
        <motion.div className="flex justify-center items-center w-full  max-h-3/4">
          <AnimatePresence initial={false}>
            {values.map((e, index) => (
              <motion.div
                key={e.toString()}
                className="flex relative justify-center items-center"
              >
                <motion.div
                  animate={{
                    y: [-50, 0, 0],
                    x: [0, 20, 0],
                    transition: {
                      ease: "easeIn",
                      duration: 0.5,
                    },
                  }}
                  exit={{
                    x: [0, -20],
                    opacity: [100, 0],
                    backgroundColor: "#EF3054",
                    transition: {
                      duration: 0.5,
                    },
                  }}
                  className="w-8 h-8 text-sm bg-gray-200 flex justify-center items-center"
                >
                  {e.toString()}
                </motion.div>
                {index === 0 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 100,
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    className={
                      "absolute  items-center flex flex-col top-10 transition"
                    }
                  >
                    <span>{"⬆️"}</span>
                    <span>Head</span>
                  </motion.span>
                )}
                {index === values.length - 1 && (
                  <motion.span
                    transition={{
                      delay: 0.2,
                    }}
                    exit={{
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    layoutId="tail-queue"
                    className="absolute flex flex-col items-center -top-12 transition"
                  >
                    <span>{"⬇️"}</span>
                    <span>Tail</span>
                  </motion.span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div>
        <div className="flex gap-4 my-2">
          <Button onClick={() => push(Math.floor(Math.random() * 1000))}>
            Enqueue
          </Button>
          <Button onClick={() => pop()}>Dequeue</Button>
        </div>
      </div>
    </div>
  );
};

export default QueueUI;
