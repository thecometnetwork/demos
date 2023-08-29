"use client";
import * as React from "react";
import {useRef} from "react";
import {motion, useMotionValue, useTransform, AnimatePresence} from "framer-motion";

export default function CardWithButton() {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const xInput = [-50, 0, 50];
  const transform = useTransform(x, xInput, ["skewX(10deg)", "skewX(4deg)", "skewX(-10deg)"]);

  const [sent, setSent] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [notInterested, setNotInterested] = React.useState(false);

  const background = useTransform(x, xInput, ["#f5d6c6", "#e8e8e8", "#cfe8d5"]);

  return (
    <>
      <motion.div className="card draggable border">
        <div className="card header" />
        <div className="card image" />
        <div className="card content" />
        <div className="card content" />
        <div className="card content" />
        <div className="card content end" />
        <div className="card content icons">
          <div className="card content icons single" />
          <div className="card content icons single" />
          <div className="card content icons single" />
          <div className="card content icons single" />
        </div>
        <motion.div
          className="card swipe"
          ref={constraintsRef}
        >
          <motion.div
            className="card swipe action"
            drag="x"
            dragSnapToOrigin
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0.1}
            onDragEnd={() => {
              console.log(x.getPrevious());
              if (x.getPrevious() > 30) {
                setSaved(true);
                setSent(true);
                setTimeout(() => setSent(false), 2000);
              }
              if (x.getPrevious() < -30) {
                setNotInterested(true);
                setTimeout(() => setNotInterested(false), 2000);
              }
            }}
            style={{background, x}}
          >
            Swipe
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {sent && (
            <motion.div
              key="modal"
              initial={{opacity: 0, top: "10px"}}
              animate={{opacity: 1, top: "80px"}}
              exit={{opacity: 0, top: "90px"}}
              className="card saved-2"
            >
              👍 Liked
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {notInterested && (
            <motion.div
              key="modal"
              initial={{opacity: 0, top: "10px"}}
              animate={{opacity: 1, top: "80px"}}
              exit={{opacity: 0, top: "90px"}}
              className="card disliked"
            >
              👎 Disliked
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
