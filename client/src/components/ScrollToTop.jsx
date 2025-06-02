import { mdiArrowUpBoldCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useState, useEffect } from "react";

const debounce = (fn, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function ScrollToTop() {
  const [show, setShow] = useState();

  useEffect(() => {
    const handleScroll = debounce(() => {
      setShow(window.scrollY > 125);
    }, 200);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex flex-row justify-center md:justify-end">
      <button
        className={`hover:drop-shadow-lg active:scale-110 md:size-10 lg:size-12 fixed flex items-center justify-center bottom-1 right-1 rounded-full bg-inevi_dark_purple hover:bg-inevi_dark_lavender transition-all size-8  cursor-pointer disabled:cursor-default ${
          show ? "opacity-65" : "opacity-0"
        }`}
        onClick={scrollToTop}
        disabled={!show}
      >
        <Icon
          path={mdiArrowUpBoldCircleOutline}
          className="text-inevi_white"
          size={2}
          title="Back to top"
        />
      </button>
    </section>
  );
}
