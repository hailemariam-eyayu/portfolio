"use client";

import React, { useState, useEffect } from "react";
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

const Header = ({ toggleDarkMode, isDarkMode, fontSize, changeFontSize, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? "bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900" 
        : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
    } shadow-lg`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <a 
            href="#" 
            className="text-white font-bold text-2xl flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">HE</span>
            </div>
            <span className="hidden sm:inline">Hailemariam Eyayu</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {["about", "skills", "portfolio", "downloads", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-200 font-medium"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Font Size Control */}
            <div className="relative group hidden md:block">
              <button
                className="text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all"
                title="Font Size"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => changeFontSize("small")}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg ${
                    fontSize === "small" ? "bg-blue-50 dark:bg-blue-900 text-blue-600" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Small
                </button>
                <button
                  onClick={() => changeFontSize("medium")}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    fontSize === "medium" ? "bg-blue-50 dark:bg-blue-900 text-blue-600" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => changeFontSize("large")}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg ${
                    fontSize === "large" ? "bg-blue-50 dark:bg-blue-900 text-blue-600" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Large
                </button>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
            {["about", "skills", "portfolio", "downloads", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
                className="block text-white px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all font-medium"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            
            {/* Mobile Font Size */}
            <div className="md:hidden px-4 py-2">
              <p className="text-white text-sm mb-2">Font Size:</p>
              <div className="flex space-x-2">
                {["small", "medium", "large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => changeFontSize(size)}
                    className={`flex-1 px-3 py-2 rounded-lg transition-all ${
                      fontSize === size
                        ? "bg-white text-blue-600 font-semibold"
                        : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [showScrollTop, setShowScrollTop] = useState(false);
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
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        fontSize={fontSize}
        changeFontSize={changeFontSize}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="pt-20">
          <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 font-sans px-4">
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
