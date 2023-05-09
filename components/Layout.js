import { motion } from "framer-motion";
import { HowToPlay } from "./HowToPlay";
import { GameHistory } from "./GameHistory";

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
          <GameHistory />
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

      <footer className="flex justify-center items-center h-min   p-2 gap-2 fixed bottom-0 w-full bg-black">
        <div className="flex">
          <span className="hidden md:block text-sm text-slate-300">
            Powered by:{" "}
          </span>
          <a
            className="m-0 p-0"
            href="https://www.themoviedb.org/
          "
          >
            <img
              className="w-[100px] m-0 p-0"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB"
            />
          </a>

          <div className="w-[30px]"></div>

          <span className="hidden md:block text-sm text-slate-300">
            Made with ❤️ by{" "}
            <a href="https://twitter.com/d_vatvani">@d_vatvani</a> and{" "}
            <a href="https://twitter.com/ricardcodes">@ricardcodes</a>
          </span>

          <span className="block md:hidden text-sm text-slate-300">
            By <a href="https://twitter.com/d_vatvani">@d_vatvani</a> and{" "}
            <a href="https://twitter.com/ricardcodes">@ricardcodes</a>
          </span>
        </div>
      </footer>
    </div>
  );
};
