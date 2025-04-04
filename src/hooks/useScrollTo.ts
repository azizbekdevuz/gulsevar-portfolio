const useScrollTo = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY; /* - 80 */ // Optional offset
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return scrollTo;
};

export { useScrollTo };
