"use client";
import { Button } from "@/components/ui/button";
import { Stack } from "@/lib/algorithms/Stack";
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
const StackUI = () => {
  const [stack_DS] = useState(new Stack());
  const [values, setValues] = useState<Number[]>([]);
  const [listLength, setListLength] = useState(0);
  const controls = useAnimation();
  const push = (value: number) => {
    stack_DS.push(value);
    setValues(stack_DS.getValues());
    setListLength(stack_DS.length);
  };
  const pop = () => {
    stack_DS.pop();
    setValues(stack_DS.getValues());
    setListLength(stack_DS.length);
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
      <motion.div className=" h-full overflow-auto w-screen">
        <motion.div className="flex justify-center flex-col items-center  w-ful  max-h-3/4">
          <AnimatePresence initial={false}>
            {values.map((e, index) => (
              <motion.div
                key={e.toString()}
                className="flex flex-col relative justify-center items-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 100, x: 0 }}
                  exit={{
                    backgroundColor: "#EF3054",
                    opacity: 0,
                    transition: {
                      duration: animationDuration.duration,
                      delay: 0.3,
                    },
                  }}
                  transition={{
                    duration: animationDuration.duration,
                    delay: 0.5,
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
                    className="absolute -right-10 top-1 transition"
                  >
                    {"<-Top"}
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
            Push
          </Button>
          <Button onClick={() => pop()}>Pop</Button>
        </div>
      </div>
    </div>
  );
};

export default StackUI;
