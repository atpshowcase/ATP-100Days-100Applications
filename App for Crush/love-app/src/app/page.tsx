"use client";

import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

interface Message {
  text: string;
  gif: string;
  title: string;
}

const messages: Message[] = [
  {
    text: "Ada sesuatu yang mau aku omongin...",
    gif: "https://media.tenor.com/_1xqhO5RzVYAAAAi/i-miss-you-bear-milk-and-mocha.gif", // Shy
    title: "Hai Kamu! ❤️",
  },
  {
    text: "Makasih ya udah hadir di hidup aku.",
    gif: "https://media.tenor.com/ejMtbLv7H-gAAAAi/panda-bear-brown-bear.gif", // Hug
    title: "Jujur nih...",
  },
  {
    text: "Kamu tau gak? Senyum kamu itu favorit aku lho.",
    gif: "https://media.tenor.com/sOVYL1RsYyYAAAAi/munch-face.gif", // Cute/Cheeky
    title: "Satu Rahasia 🤫",
  },
  {
    text: "Setiap denger suara kamu, rasanya hati ini tenang banget.",
    gif: "https://media.tenor.com/63IENW605s0AAAAi/dudu-twisting-dance.gif", // Happy dance
    title: "Nyaman Banget ☁️",
  },
  {
    text: "Aku bersyukur banget Tuhan ketemuin aku sama kamu.",
    gif: "https://media.tenor.com/jkVthFR60pgAAAAj/feliz-cumplea%C3%B1os.gif", // Happy
    title: "Beruntung Banget 🍀",
  },
  {
    text: "Maaf ya kalau aku kadang nyebelin atau bawel...",
    gif: "https://media.tenor.com/G2KFS4A6F24AAAAi/bubu-dudu-sseeyall.gif", // Apologetic/Cute (New one, hopefully works, fallback provided in mind: generic bear)
    title: "Maafin Ya? 🥺",
  },
  {
    text: "Tapi aslinya, aku sayang banget banget sama kamu.",
    gif: "https://media1.tenor.com/m/9fscv__vkukAAAAC/dudu-bubu-dudu-bubu-love.gif", // Kiss (New)
    title: "Tulus Dari Hati ❤️",
  },
  {
    text: "Kamu itu rumah buat aku. Tempat aku pulang.",
    gif: "https://media1.tenor.com/m/6CJAmVndCDkAAAAC/milk-mocha.gif", // Hug (New)
    title: "Rumahku 🏠",
  },
  {
    text: "Tolong jangan bosen-bosen ya sama aku?",
    gif: "https://media1.tenor.com/m/G9owpGP34PIAAAAC/jumping-for-joy-jumping.gif", // Reuse Shy
    title: "Janji? 🤙",
  },
  {
    text: "Aku janji bakal selalu berusaha jadi alasan kamu bahagia.",
    gif: "https://media1.tenor.com/m/WeYA1NH23KMAAAAC/hugging-twitter.gif", // Reuse Happy
    title: "Janjiku 🤞",
  },
  {
    text: "Kita lewatin sisa hari-hari ke depan bareng-bareng ya?",
    gif: "https://media1.tenor.com/m/1Vp63dPlbZIAAAAC/cute-kiwi.gif", // Reuse Kiss
    title: "Selamanya? ✨",
  },
  {
    text: "I Love You More Than Words Can Say! ❤️🥰",
    gif: "https://media1.tenor.com/m/VRBH3ONlLT8AAAAC/twitter-ice-cream.gif", // Big Hug
    title: "Sayang Kamu ❤️",
  },
];

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [text]);

  return <p className="message">{displayedText}</p>;
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background hearts effect
  useEffect(() => {
    const container = document.getElementById("bg-hearts");
    if (!container) return;

    // Simple check to avoid duplicate hearts in strict mode
    if (container.childElementCount > 0) return;

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart-bg");
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 10 + 10 + "s";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      container.appendChild(heart);
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const nextMessage = () => {
    // First click: Play music if not playing
    if (currentIndex === -1 && audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(e => console.log("Audio auto-play failed:", e));
      setIsMusicPlaying(true);
    }

    if (currentIndex < messages.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Last message reached, show SweetAlert
      Swal.fire({
        title: 'Dikirim! ❤️',
        text: 'Pelukan hangat udah dikirim ke hati kamu!',
        icon: 'success',
        confirmButtonColor: '#ff6b81'
      });
    }
  };

  const currentContent = currentIndex === -1
    ? {
      title: "Hai Kamu! ❤️",
      text: "Ada pesan spesial nih buat kamu...",
      gif: "https://media.tenor.com/jkVthFR60pgAAAAj/feliz-cumplea%C3%B1os.gif"
    }
    : messages[currentIndex];

  const isLastMessage = currentIndex === messages.length - 1;

  return (
    <main className="relative w-full h-screen overflow-hidden flex justify-center items-center">
      {/* Background Animation */}
      <div className="bg-hearts" id="bg-hearts"></div>

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="https://feeldreams.github.io/punyasesuatu/karenabersamamu.mp3" type="audio/mp3" />
        Browser kamu tidak support audio.
      </audio>

      <div className="music-control" onClick={toggleMusic}>
        {isMusicPlaying ? "🔊" : "🎵"}
      </div>

      <div className="container fade-in">
        <div className="gif-container">
          <img
            src={currentContent.gif}
            alt="Cute Bear"
            className="fade-in"
            key={currentIndex} // Force re-render for animation
          />
        </div>

        <h1 className="fade-in" key={`title-${currentIndex}`}>{currentContent.title}</h1>

        <Typewriter
          key={`text-${currentIndex}`}
          text={currentContent.text}
        />

        <button className="btn" onClick={nextMessage}>
          {isLastMessage ? "Peluk Jauh! 🐻" : currentIndex === -1 ? "Buka Pesan 💌" : "Lanjut.. 👉"}
        </button>
      </div>
    </main>
  );
}
