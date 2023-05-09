import { ArrowLeft, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const ModalFM = ({ isOpen, setIsOpen, children }) => {
  const backgroundVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="modal"
          initial="closed"
          animate="open"
          exit="closed"
          variants={backgroundVariants}
          transition={{ duration: 0.3 }}
          className="bg-black/70 w-screen h-screen fixed top-0 right-0 z-50 flex justify-center items-center"
          onMouseDown={() => setIsOpen(false)}
        >
          <motion.div
            className=" z-50 shadow-blue-500/40 shadow-xl flex flex-col w-[90%] lg:w-[30%] h-min bg-slate-900 border-2 border-blue-500/50 mt-4  rounded-lg overflow-clip  px-2 py-4"
            initial={{ y: "100%" }}
            animate={{
              y: 0,
              transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
            }}
            exit={{
              y: "100%",
              transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 absolute top-8 right-9 "
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6 text-slate-200  " />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
