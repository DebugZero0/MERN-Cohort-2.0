import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button onClick={scrollToTop} style={styles.button} onTouchStart={scrollToTop}>
      <i className="ri-arrow-up-s-line"></i>
    </button>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "50%",
    border: "none",
    zIndex: 3,
    backgroundColor: "green",
    color: "#fff",
    fontSize: "24px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    touchAction: "manipulation", // 👈 important
    WebkitTapHighlightColor: "transparent",
  },
};

export default ScrollToTopButton;
