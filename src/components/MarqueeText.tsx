import { motion } from "framer-motion";

interface MarqueeTextProps {
  text: string;
  className?: string;
}

const MarqueeText = ({ text, className = "" }: MarqueeTextProps) => {
  const repeated = Array(6).fill(text).join(" — ");

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: [0, -50 * text.length] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-7xl md:text-9xl font-display italic text-stroke/30 select-none">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeText;
