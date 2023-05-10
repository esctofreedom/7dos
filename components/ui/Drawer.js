import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export const Drawer = ({ children, drawerOpen, setDrawerOpen }) => {
  //use framer motion
  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "100%" },
  };

  const backgroundVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      {drawerOpen && (
        <motion.div
          key="drawer"
          initial="closed"
          animate="open"
          exit="closed"
          variants={backgroundVariants}
          transition={{ duration: 0.3 }}
          className="bg-black/50 w-screen h-screen fixed top-0 right-0 z-50"
          // onClick={() => setDrawerOpen(false)}
          onMouseDown={() => setDrawerOpen(false)}
        >
          {/* Medium and Up */}
          <motion.div
            key="drawer-content"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="hidden md:block fixed left-0 right-0 bottom-0 z-40 p-4 overflow-y-auto  w-full h-[80%]  bg-slate-900 border-t-2 border-blue-500/50"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 absolute top-8 right-2.5 inline-flex items-center
               hover:bg-gray-600 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex  w-full h-full ">{children}</div>
          </motion.div>

          {/* Mobile */}
          <motion.div
            key="drawer-content-mobile"
            initial={{ y: "100%" }}
            animate={{
              y: 0,
              transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
            }}
            exit={{
              y: "100%",
              transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
            }}
            className="h-[95%] rounded-t-3xl block md:hidden fixed bottom-0 right-0  z-40 p-3 overflow-y-auto w-full bg-slate-800"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-400 bg-transparent   rounded-lg text-sm p-1.5 absolute top-8 right-2.5 inline-flex items-center hover:bg-gray-600 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex  w-full h-full ">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
