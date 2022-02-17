import { FC } from "react"
import { ChevronUpIcon } from "@heroicons/react/outline"
import { motion, Variants } from "framer-motion"
import { useState } from "react"

const ArrowVariants: Variants = {
  active: {
    rotate: "0deg",
    transition: { duration: 0.25, type: "tween" },
  },
  hidden: {
    rotate: "-180deg",
    transition: { duration: 0.25, type: "tween" },
  },
}

const DivVariants: Variants = {
  active: {
    overflow: "auto",
    transition: { duration: 0.25, type: "tween" },
  },
  hidden: {
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: "hidden",
    transition: { duration: 0.25, type: "tween" },
  },
}

export const MyAccordion: FC<{ defaultExpanded?: boolean; header: string; id: string }> = ({
  defaultExpanded,
  children,
  header,
  id,
}) => {
  const [expanded, setExpand] = useState(defaultExpanded ?? false)

  return (
    <div className="mb-4 w-full rounded-lg bg-[#20212C]" id={id}>
      <button
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
        onClick={(e) => {
          e.preventDefault()
          setExpand((e) => !e)
        }}
        id={`${id}-header`}
        className="flex w-full items-center justify-between rounded-lg border-b border-[#272833] bg-[#272833] py-4 px-8"
      >
        <p id={id}>{header}</p>
        <motion.span animate={expanded ? "active" : "hidden"} variants={ArrowVariants}>
          <ChevronUpIcon className="h-5 w-5" />
        </motion.span>
      </button>
      <motion.div
        role="region"
        id={`${id}-panel`}
        aria-labelledby={`${id}-header`}
        animate={expanded ? "active" : "hidden"}
        variants={DivVariants}
        className="px-8 py-4"
      >
        {children}
      </motion.div>
    </div>
  )
}
