import { useRef } from "react";
import { scaleValue } from "../utils/scaleValue";
import { MovieCard } from "./MovieCard";

const maxAdditionalSize = 5;

export function MacDock({ movies }) {
  const dockRef = useRef(null);

  const handleAppHover = (ev) => {
    if (!dockRef.current) return;

    const mousePosition = ev.clientX;
    const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
    const iconWidth = ev.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    );

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    );

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    );
  };

  return (
    <div className="page">
      <nav ref={dockRef} className="dock">
        <ul>
          {movies?.map((movie) => (
            <li className="app" onMouseMove={handleAppHover}>
              <MovieCard key={movie.id} movie={movie} />
            </li>
          ))}
        </ul>
        {/* <ul>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.frontend.fyi" target="_blank">
              <img src="https://www.frontend.fyi/playground-assets/macos-dock/icons/arc.png" />
              <span className="tooltip">Arc Browser</span>
            </a>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.frontend.fyi" target="_blank">
              <img src="https://www.frontend.fyi/playground-assets/macos-dock/icons/1password.png" />
              <span className="tooltip">1Password</span>
            </a>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.frontend.fyi" target="_blank">
              <img src="https://www.frontend.fyi/playground-assets/macos-dock/icons/calendar.png" />
              <span className="tooltip">Calendar</span>
            </a>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.frontend.fyi" target="_blank">
              <img src="https://www.frontend.fyi/playground-assets/macos-dock/icons/email.png" />
              <span className="tooltip">Mail (who uses this app?!)</span>
            </a>
          </li>
        </ul> */}
      </nav>
    </div>
  );
}

export default MacDock;
