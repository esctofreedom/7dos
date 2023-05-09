import { Info } from "lucide-react";
import { useState } from "react";
import { ModalFM } from "./ui/ModalFM";

export const HowToPlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="flex gap-1 items-center
    "
    >
      <ModalFM isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="py-6 px-8">
          <h2 className="mb-3">🎬 How to Play</h2>

          <p>
            The goal of 7DOS is to connect 2 actors in the fewest number of
            steps as you can.
          </p>
          <ul>
            <li>
              <b>Step 1:</b> Select either actor and you will see all the movies
              they have appeared in.
            </li>
            <li>Step 2: Select a movie that the actor has appeared in</li>
            <li>
              Step 3: Share with your friends to see if they can challenge your
              movie knowledge!
            </li>
          </ul>

          <span className="text-sm italic pt-8">
            This little game was created by D. Mirpuri and R. Torres
          </span>
        </div>
      </ModalFM>
      {/* <span className="text-sm">How to Play</span> */}
      <Info
        className="h-7 w-7 text-slate-400  hover:scale-110 cursor-pointer hover:text-white transition ease-in-out "
        onClick={() => setIsOpen(true)}
      />
    </div>
  );
};
