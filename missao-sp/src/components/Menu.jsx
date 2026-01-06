import React from "react";

const Menu = ({ sections, activeSection, setActiveSection }) => {
  return (
    <nav className="menu">
      {sections.map((sec) => (
        <button
          key={sec.key}
          className={`menu-btn ${activeSection === sec.key ? "active" : ""}`}
          onClick={() => setActiveSection(sec.key)}
        >
          {sec.label}
        </button>
      ))}
    </nav>
  );
};

export default Menu;
