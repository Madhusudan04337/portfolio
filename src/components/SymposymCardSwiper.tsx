import { useState } from "react";
import "./SymposymCardSwiper.css";
import { Heart, X } from "lucide-react";

// Import images
import img1 from "../assets/symposyms/1.jpg";
import img2 from "../assets/symposyms/2.jpg";
import img3 from "../assets/symposyms/3.jpg";
import img4 from "../assets/symposyms/4.jpg";
import img5 from "../assets/symposyms/5.jpg";
import img6 from "../assets/symposyms/6.jpg";
import img7 from "../assets/symposyms/7.jpg";

const GROUPS_COUNT = 7;

export function SymposymCardSwiper({ standalone = true }: { standalone?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [statuses, setStatuses] = useState<string[]>(["active", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"]);

  const handleLoveClick = () => {
    const nextIndex = (activeIndex + 1) % GROUPS_COUNT;
    
    const newStatuses = [...statuses];
    newStatuses[activeIndex] = "after";
    newStatuses[nextIndex] = "becoming-active-from-before";
    setStatuses(newStatuses);
    
    setTimeout(() => {
      const updatedStatuses = [...newStatuses];
      updatedStatuses[nextIndex] = "active";
      setStatuses(updatedStatuses);
      setActiveIndex(nextIndex);
    }, 50);
  };

  const handleHateClick = () => {
    const nextIndex = (activeIndex - 1 + GROUPS_COUNT) % GROUPS_COUNT;
    
    const newStatuses = [...statuses];
    newStatuses[activeIndex] = "before";
    newStatuses[nextIndex] = "becoming-active-from-after";
    setStatuses(newStatuses);
    
    setTimeout(() => {
      const updatedStatuses = [...newStatuses];
      updatedStatuses[nextIndex] = "active";
      setStatuses(updatedStatuses);
      setActiveIndex(nextIndex);
    }, 50);
  };

  const images = [img6, img7, img1, img2, img3, img4, img5]; // Start with 6 as requested

  return (
    <div className={`swiper-section ${standalone ? 'mt-32' : ''}`}>
        {standalone && (
            <div className="text-center mb-16">
                <h3 className="text-2xl md:text-4xl font-display font-bold text-zinc-900 mb-4">Symposium Victories</h3>
                <p className="text-zinc-500 font-mono text-sm">9 Symposiums • 12 Winnings</p>
            </div>
        )}

        <div className="card-swiper-container">
            <div className="card-swiper">
                <div className="card-groups">
                    {images.map((img, idx) => (
                        <div key={idx} className="card-group" data-index={idx} data-status={statuses[idx]}>
                            <div className="little-card card" style={{ backgroundImage: `url(${images[(idx + 1) % 7]})` }}></div>
                            <div className="big-card card" style={{ backgroundImage: `url(${img})` }}></div>
                            <div className="little-card card" style={{ backgroundImage: `url(${images[(idx + 2) % 7]})` }}></div>
                            <div className="big-card card" style={{ backgroundImage: `url(${images[(idx + 3) % 7]})` }}></div>
                            <div className="little-card card" style={{ backgroundImage: `url(${images[(idx + 4) % 7]})` }}></div>
                            <div className="big-card card" style={{ backgroundImage: `url(${images[(idx + 5) % 7]})` }}></div>
                            <div className="little-card card" style={{ backgroundImage: `url(${images[(idx + 6) % 7]})` }}></div>
                            <div className="big-card card" style={{ backgroundImage: `url(${images[(idx + 0) % 7]})` }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
