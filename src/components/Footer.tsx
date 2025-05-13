import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

type PropsType = {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
};

export function Footer({ scrollRef, setOpenModal }: PropsType) {
  const scrollToNext = () => {
    scrollRef.current?.scrollBy({
      left: scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollToPrev = () => {
    scrollRef.current?.scrollBy({
      left: -scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <footer className="flex justify-around items-center min-w-screen h-20 bg-surface border-t-1 border-primary">
      <MdOutlineArrowBackIosNew
        onClick={scrollToPrev}
        className="size-10 cursor-pointer text-primary hover:text-secondary transition-all duration-300"
      />
      <FaPlus
        onClick={() => {
          setOpenModal("Add");
        }}
        className="size-10 cursor-pointer text-primary hover:text-secondary transition-all duration-300"
      />
      <MdOutlineArrowForwardIos
        onClick={scrollToNext}
        className="size-10 cursor-pointer text-primary hover:text-secondary transition-all duration-300"
      />
    </footer>
  );
}
