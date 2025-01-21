import { motion } from "framer-motion";

interface SpinnerProps {
    size: "small" | "large";
}

const Spinner = ({ size }: SpinnerProps) => {
    const spinnerSize = size === "small" ? "h-6 w-6" : "h-20 w-20";
    const circleSize = size === "small" ? "stroke-[4]" : "stroke-[4]";

    return (
        <motion.div
            className={`flex justify-center items-center ${spinnerSize}`}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <svg
                className={`${spinnerSize} ${circleSize}`}
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-300"
                />
                <motion.circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    className="text-blue-600"
                    strokeLinecap="round"
                    strokeDasharray="80"
                    strokeDashoffset="60"
                    initial={{ strokeDashoffset: 80 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </svg>
        </motion.div>
    );
};

export default Spinner;
