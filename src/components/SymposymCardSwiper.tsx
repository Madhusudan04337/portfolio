import { useState } from "react";
import "./SymposymCardSwiper.css";

// Import images
import img1 from "../assets/symposyms/1.jpg";
import img2 from "../assets/symposyms/2.jpg";
import img3 from "../assets/symposyms/3.jpg";
import img4 from "../assets/symposyms/4.jpg";
import img5 from "../assets/symposyms/5.jpg";
import img6 from "../assets/symposyms/6.jpg";
import img7 from "../assets/symposyms/7.jpg";

export function SymposymCardSwiper({ standalone = true }: { standalone?: boolean }) {
  const images = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <div className={`collage-section ${standalone ? 'mt-32' : ''} w-full h-full`}>
        {standalone && (
            <div className="text-center mb-16">
                <h3 className="text-2xl md:text-4xl font-display font-bold text-zinc-900 mb-4">Symposium Victories</h3>
                <p className="text-zinc-500 font-mono text-sm">9 Symposiums • 12 Winnings</p>
            </div>
        )}

        <div className="collage-container w-full h-full">
            <div className="collage-bento-grid">
                {images.map((img, idx) => (
                    <div key={idx} className={`collage-bento-item item-${idx + 1}`}>
                        <div className="collage-bento-inner">
                            <img 
                                src={img} 
                                alt={`Symposium Victory ${idx + 1}`}
                                className="collage-bento-img" 
                            />
                            <div className="collage-bento-overlay">
                                <span className="collage-bento-label">Victory #{idx + 1}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
