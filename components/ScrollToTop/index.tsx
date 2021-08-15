import { Arrow_Up } from "../../assets/svg";
import Image from "next/image";
import { useEffect } from "react";

export const ScrollToTop = () => {
  function handleScroll() {
    const rootElement = document.documentElement;
    const button = document.querySelector("#scroll-to-top");
    if (rootElement.scrollTop > 150) {
      button?.classList.add("bottom-2");
      button?.classList.remove("-bottom-10");
    } else {
      button?.classList.add("-bottom-10");
      button?.classList.remove("bottom-2");
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <span
      id="scroll-to-top"
      className="transition-all fixed -bottom-10 right-2 w-10 h-10 bg-black rounded-full flex justify-center items-center cursor-pointer"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}>
      <Image src={Arrow_Up} alt="arrow up" height={30} width={30} />
    </span>
  );
};
