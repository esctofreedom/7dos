import { motion } from "framer-motion";
import { HowToPlay } from "./HowToPlay";

export const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full flex flex-col flex-grow">
      <header className="w-full relative">
        <h1 className="hidden md:flex items-center justify-center my-4">
          7 Degrees of Separation
        </h1>

        <h1 className="flex md:hidden items-center justify-center my-4">
          7DOS
        </h1>

        <div className="absolute right-0 top-0  h-full flex gap-2 p-4 items-center">
          {" "}
          <HowToPlay />
          {/* <Dark /> */}
        </div>
      </header>

      <main
        className={`relative p-4    h-full flex flex-col flex-grow  
      } `}
      >
        <motion.div
          // key={router.route}
          className="flex-grow flex flex-col "
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: { y: 50, opacity: 0 },
            pageAnimate: {
              y: 0,
              opacity: 1,
              transition: { delay: 0, duration: 0.3 },
            },
          }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};
