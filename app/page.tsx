"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import "aos/dist/aos.css";

const PortfolioCard = ({ title, description, url, category }) => (
  <div className={`portfolio-item`} data-category={category}>
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="bg-gray-100 px-6 py-4">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-center w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          View Project
        </a>
      </div>
    </div>
  </div>
);

const Header = ({ toggleSidebar, toggleDarkMode, isDarkMode, fontSize, changeFontSize }) => {
  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top shadow-sm z-50 ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-dark bg-primary"
      }`}
    >
      <div className="container-fluid">
        <button
          className="btn btn-primary d-lg-none me-2"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand fw-bold" href="#">
          Hailemariam Eyayu
        </a>
        <div className="collapse navbar-collapse" id="navbarTop">
          <ul className="navbar-nav ms-auto gap-2 align-items-center">
            {["about", "skills", "portfolio", "downloads", "contact"].map(
              (id) => (
                <li key={id} className="nav-item">
                  <a
                    className="nav-link px-3 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(`#${id}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              )
            )}
            
            {/* Font Size Control */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Font Size"
              >
                <i className="fas fa-text-height"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className={`dropdown-item ${fontSize === "small" ? "active" : ""}`}
                    onClick={() => changeFontSize("small")}
                  >
                    Small
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${fontSize === "medium" ? "active" : ""}`}
                    onClick={() => changeFontSize("medium")}
                  >
                    Medium
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${fontSize === "large" ? "active" : ""}`}
                    onClick={() => changeFontSize("large")}
                  >
                    Large
                  </button>
                </li>
              </ul>
            </li>

            {/* Dark Mode Toggle */}
            <li className="nav-item">
              <button
                onClick={toggleDarkMode}
                className={`rounded-circle p-2 border ${
                  isDarkMode ? "btn btn-outline-light" : "btn btn-outline-light"
                }`}
                style={{ width: "38px", height: "38px" }}
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                    <path
                      d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", (!isDarkMode).toString());
    }
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    if (typeof window !== "undefined") {
      localStorage.setItem("fontSize", size);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setMounted(true);
    // Import AOS dynamically only on client side
    import("aos").then((AOS) => {
      AOS.init({ once: true, duration: 800 });
    });

    // Load saved preferences
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      const savedFontSize = localStorage.getItem("fontSize") || "medium";
      setIsDarkMode(savedDarkMode);
      setFontSize(savedFontSize);
    }

    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.documentElement.style.fontSize =
        fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";
    }
  }, [isDarkMode, fontSize, mounted]);

  return (
    <>
      <Header
        toggleSidebar={toggleSidebar}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        fontSize={fontSize}
        changeFontSize={changeFontSize}
      />

      <div className="d-flex mt-5 pt-5">
        <Sidebar
          isOpen={sidebarOpen}
          onNavClick={(id) => {
            document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
            setSidebarOpen(false);
          }}
        />

        <main className="flex-grow-1 p-4">
          <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 font-sans">
            <header className="flex flex-col items-center mb-8 text-center">
              <img
                src="/images/HME.png"
                alt="Hailemariam Eyayu"
                className="w-36 h-36 rounded-full object-cover shadow-md mb-4"
                loading="lazy"
              />
              <h1 className="text-3xl font-bold">Hailemariam Eyayu</h1>
              <p className="text-lg text-gray-600 font-medium">
                Full-Stack & Mobile Developer
              </p>
            </header>

            <section
              id="about"
              className="bg-white p-6 rounded-lg shadow w-full max-w-3xl mb-10"
            >
              <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-1 mb-4">
                About Me
              </h3>
              <p className="mb-3">
                With over 3 years of experience, I have developed a deep
                understanding of modern technologies including Flutter, Laravel,
                React, Node.js, and PHP. I am a strong advocate of clean code,
                user-centered design, and continuous learning.
              </p>
              <p>
                Recently, I developed Gitsawe - a comprehensive multi-platform Ethiopian Orthodox Church application 
                featuring a full-stack web app (React, Node.js, MongoDB) and three mobile implementations 
                (Expo, Flutter, React Native). The project showcases my expertise in building scalable, 
                cross-platform solutions with modern CI/CD practices.
              </p>
            </section>

            <section
              id="skills"
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-10"
              data-aos="fade-up"
            >
              <h3 className="text-3xl font-bold text-blue-600 border-b-2 border-blue-500 pb-2 mb-6">
                Skills & Expertise
              </h3>
              
              {/* Languages & Frameworks */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-3">
                    Languages & Frameworks
                  </span>
                </h4>
                <div className="space-y-4">
                  {[
                    { name: "JavaScript / TypeScript", level: 90, color: "bg-yellow-500" },
                    { name: "React & Next.js", level: 85, color: "bg-blue-500" },
                    { name: "Node.js & Express", level: 80, color: "bg-green-500" },
                    { name: "PHP & Laravel", level: 75, color: "bg-purple-500" },
                    { name: "Dart & Flutter", level: 70, color: "bg-cyan-500" },
                  ].map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm font-semibold text-gray-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                          style={{ width: mounted ? `${skill.level}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Development */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm mr-3">
                    Mobile Development
                  </span>
                </h4>
                <div className="space-y-4">
                  {[
                    { name: "React Native & Expo", level: 85, color: "bg-blue-600" },
                    { name: "Flutter", level: 70, color: "bg-cyan-600" },
                    { name: "Cross-platform Development", level: 80, color: "bg-indigo-600" },
                    { name: "Mobile UI/UX Design", level: 75, color: "bg-pink-600" },
                  ].map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm font-semibold text-gray-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                          style={{ width: mounted ? `${skill.level}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Databases & Tools */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm mr-3">
                    Databases & DevOps
                  </span>
                </h4>
                <div className="space-y-4">
                  {[
                    { name: "MongoDB", level: 80, color: "bg-green-600" },
                    { name: "MySQL", level: 75, color: "bg-blue-700" },
                    { name: "Git & GitHub", level: 90, color: "bg-gray-700" },
                    { name: "CI/CD (GitHub Actions)", level: 75, color: "bg-purple-600" },
                    { name: "Vercel & Cloud Deployment", level: 80, color: "bg-black" },
                  ].map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm font-semibold text-gray-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                          style={{ width: mounted ? `${skill.level}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">3+</div>
                  <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-600 mt-1">Technologies</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">6+</div>
                  <div className="text-sm text-gray-600 mt-1">Projects</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">4</div>
                  <div className="text-sm text-gray-600 mt-1">Platforms</div>
                </div>
              </div>
            </section>

            <section id="portfolio" className="mb-16" data-aos="fade-up">
              <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
                My Portfolio
              </h2>
              <div className="flex justify-center flex-wrap gap-4 mb-8">
                {["All", "Web", "Mobile"].map((type) => (
                  <button
                    key={type}
                    className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 filter-btn"
                    data-filter={type.toLowerCase()}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                id="portfolio-items"
              >
                <PortfolioCard
                  title="Gitsawe Web App"
                  description="Full-stack Ethiopian Orthodox Church platform with React, Node.js, Express, and MongoDB. Features news system, book library, and calendar."
                  url="https://github.com/hailemariam-eyayu/GitsaweTailwind"
                  category="web"
                />
                <PortfolioCard
                  title="Gitsawe Expo App"
                  description="React Native mobile app with Expo featuring Bahire Hasab calculator, Mahlet prayer book, Bible reader, and Ethiopian calendar support."
                  url="https://github.com/hailemariam-eyayu/gitsawe_expo_app"
                  category="mobile"
                />
                <PortfolioCard
                  title="Gitsawe Flutter App"
                  description="Native Flutter mobile app for Ethiopian Orthodox Church content with multi-platform support (Android, iOS, Web, Desktop)."
                  url="https://github.com/hailemariam-eyayu/gitsaweflutterapk"
                  category="mobile"
                />
                <PortfolioCard
                  title="Gitsawe React Native App"
                  description="Bare React Native mobile app with full native control and TypeScript support for Ethiopian Orthodox Church services."
                  url="https://github.com/hailemariam-eyayu/GitsaweReactNative"
                  category="mobile"
                />
                <PortfolioCard
                  title="Dormitory Management System (DMU_DMS)"
                  description="A comprehensive Laravel + PHP system for managing university dormitories."
                  url="https://github.com/EdenMelkie/dmudms"
                  category="web"
                />
                <PortfolioCard
                  title="Personal Portfolio Website"
                  description="Responsive website built with Next.js showcasing my skills and projects."
                  url="https://github.com/hailemariam-eyayu/portfolio"
                  category="web"
                />
              </div>
            </section>

            <section
              id="downloads"
              className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-1 mb-4">
                CV & Certificates
              </h3>

              <p className="mb-4">
                You can download my professional CV and certificates to learn
                more about my skills, education, and accomplishments.
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a
                    href="/files/Hailemariam_Eyayu_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    download
                  >
                    Download CV (PDF)
                  </a>{" "}
                  – Detailed resume with professional experience and education.
                </li>

                <li>
                  <a
                    href="/files/Certificate_Laravel_2024.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    download
                  >
                    Laravel Certification (2024)
                  </a>{" "}
                  – Completion certificate for advanced Laravel development.
                </li>

                <li>
                  <a
                    href="/files/Certificate_Flutter_2023.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    download
                  >
                    Flutter Development Certificate (2023)
                  </a>{" "}
                  – Training and proficiency in Flutter & Dart.
                </li>

                <li>
                  <a
                    href="/files/Other_Certificates.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    download
                  >
                    Other Certificates (PDF)
                  </a>{" "}
                  – Various professional and technical certificates.
                </li>
              </ul>
            </section>

           <section className="w-[50%] mx-auto">

              <form
                action="https://formspree.io/f/xjkwqorb"
                method="POST"
                className="needs-validation"
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="form-control"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </section>

            <footer className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-gray-100 py-6 mt-12">
              <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">
                  &copy; {new Date().getFullYear()} Hailemariam Eyayu. All
                  rights reserved.
                </p>

                <div className="space-x-6 mt-4 md:mt-0 flex">
                  <a
                    href="mailto:hailemariameyayu2012@gmail.com"
                    className="hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2"
                    aria-label="Email"
                  >
                    <i className="fas fa-envelope"></i>
                    <span>Email</span>
                  </a>

                  <a
                    href="https://t.me/HaileEden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2"
                    aria-label="Telegram"
                  >
                    <i className="fab fa-telegram"></i>
                    <span>Telegram</span>
                  </a>

                  <a
                    href="https://github.com/EdenMelkie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2"
                    aria-label="GitHub"
                  >
                    <i className="fab fa-github"></i>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="tel:+251938169557"
                    className="hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2"
                    aria-label="Phone"
                  >
                    <i className="fas fa-phone"></i>
                    <span>Phone</span>
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )}
    </>
  );
}
