// "use client";

// import React, { useState, useEffect } from "react";
// import Header from "./components/Header";
// import Sidebar from "./components/sidebar";
// import AboutSection from "./components/AboutSection";
// import CertificatesSection from "./components/CertificatesSection";
// import ContactForm from "./components/ContactForm";
// import SkillsSection from "./components/SkillsSection";

// const Home = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.body.classList.add("dark");
//     } else {
//       document.body.classList.remove("dark");
//     }
//   }, [isDarkMode]);

//   const handleNavClick = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <Header
//         isDarkMode={isDarkMode}
//         toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
//         isMobileMenuOpen={isMobileMenuOpen}
//         toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         onNavClick={handleNavClick}
//       />
//       <Sidebar isOpen={isMobileMenuOpen} onNavClick={handleNavClick} />
//       <main className="pt-16">
//         <AboutSection />
//         <SkillsSection />
//         <CertificatesSection />
//         <ContactForm />
//       </main>
//     </>
//   );
// };

// export default Home;

"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "./components/sidebar";

const Header: React.FC<{
    toggleSidebar: () => void;
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}> = ({ toggleSidebar, toggleDarkMode, isDarkMode }) => {
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

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTop"
                    aria-controls="navbarTop"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarTop">
                    <ul className="navbar-nav ms-auto gap-2 align-items-center">
                        {[
                            { href: "#about", label: "About Me" },
                            { href: "#skills", label: "Skills" },
                            { href: "#portfolio", label: "Portfolio" },
                            { href: "#downloads", label: "CV & Certificates" },
                            { href: "#contact", label: "Contact" },
                        ].map(({ href, label }) => (
                            <li key={href} className="nav-item">
                                <a
                                    className="nav-link px-3 py-2 rounded text-white"
                                    href={href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector(href)
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                        <li className="nav-item">
                            <button
                                onClick={toggleDarkMode}
                                className="btn btn-outline-light rounded-circle p-2"
                                style={{ width: "38px", height: "38px" }}
                                aria-label={
                                    isDarkMode
                                        ? "Switch to light mode"
                                        : "Switch to dark mode"
                                }
                                title="Toggle Night Mode"
                            >
                                {isDarkMode ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
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
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
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

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", isDarkMode);
    }, [isDarkMode]);

    return (
        <>
            <Head>
                <title>Hailemariam Eyayu - Full-Stack & Mobile Developer</title>
                <meta
                    name="description"
                    content="Portfolio of Hailemariam Eyayu, experienced Full-Stack and Mobile Developer skilled in Flutter, Laravel, PHP, JavaScript, and more."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header
                toggleSidebar={toggleSidebar}
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
            />

            <div className="d-flex mt-5 pt-5">
            
                    <Sidebar
                        isOpen={sidebarOpen}
                        onNavClick={(id) => {
                            document
                                .querySelector(id)
                                ?.scrollIntoView({ behavior: "smooth" });
                            setSidebarOpen(false); // auto-close on nav click for mobile
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
                            <h1 className="text-3xl font-bold">
                                Hailemariam Eyayu
                            </h1>
                            <p className="text-lg text-gray-600 font-medium">
                                Full-Stack & Mobile Developer
                            </p>
                        </header>

                        <main className="w-full max-w-3xl flex flex-col gap-10">
                            <section className="bg-white p-6 rounded-lg shadow">
                                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                                    HME - Hailemariam Eyayu
                                </h1>
                                <h2 className="text-xl font-medium text-gray-600 mb-4">
                                    Full-Stack & Mobile Developer
                                </h2>
                                <p>
                                    Passionate and experienced software engineer
                                    skilled in mobile and web development. I
                                    enjoy turning ideas into real-world apps
                                    with modern design and clean architecture.
                                </p>
                            </section>

                            <section
                                id="collaborator"
                                className="bg-white p-6 rounded-lg shadow"
                            >
                                <>
                                    <h5 className="font-semibold text-lg">
                                        Education
                                    </h5>{" "}
                                    <hr className="my-4 border-gray-300" />
                                    <p className="mb-1">
                                        <strong>Degree:</strong> Bachelor of
                                        Science (BSc)
                                    </p>
                                    <p className="mb-1">
                                        <strong>Field:</strong> Software
                                        Engineering
                                    </p>
                                    <p>
                                        <strong>Institution:</strong> Debre
                                        Markos University
                                    </p>
                                </>

                                <h5 className="font-semibold text-lg">
                                    Collaborator
                                </h5>
                                <div className="flex items-center mt-2">
                                    <img
                                        src="/images/eden_melkamu.png"
                                        alt="Eden Melkamu"
                                        className="rounded-full shadow me-3"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            objectFit: "cover",
                                            border: "3px solid #198754",
                                            marginRight: "0.75rem", // Tailwind's 'me-3' is margin-end 3, approx 0.75rem
                                        }}
                                        loading="lazy"
                                    />
                                    <div>
                                        <h6 className="mb-0 text-base font-medium">
                                            Eden Melkamu
                                        </h6>
                                        <small className="text-gray-500">
                                            Project Collaborator
                                        </small>
                                    </div>
                                </div>
                            </section>
                            <section
                                id="about"
                                className="bg-white p-6 rounded-lg shadow"
                            >
                                <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-1 mb-4">
                                    About Me
                                </h3>
                                <p>
                                    With over 5 years of experience, I have
                                    developed a deep understanding of modern
                                    technologies including Flutter, Laravel,
                                    React, Node.js, and PHP. I am a strong
                                    advocate of clean code, user-centered
                                    design, and continuous learning.
                                </p>
                            </section>

                            <section
                                id="skills"
                                className="bg-white p-6 rounded-lg shadow"
                            >
                                <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-1 mb-4">
                                    Skills
                                </h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Flutter & Dart (Mobile & Web Apps)</li>
                                    <li>
                                        Laravel, PHP & MySQL (Backend & APIs)
                                    </li>
                                    <li>React & Next.js (Frontend Web Apps)</li>
                                    <li>JavaScript, TypeScript, Node.js</li>
                                    <li>
                                        UI/UX Design, Responsive & Accessible
                                        Design
                                    </li>
                                    <li>Git, CI/CD, Agile & Scrum</li>
                                </ul>
                            </section>

                            <section id="certificates" className="mb-10">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {/* DMU Students Union Certificate */}
                                    <div className="card h-full shadow-sm border border-gray-200 rounded-lg">
                                        <div className="card-body p-6 flex flex-col justify-between">
                                            <div>
                                                <h5 className="text-xl font-semibold mb-2">
                                                    DMU Students Union
                                                </h5>
                                                <p className="text-gray-500 mb-4">
                                                    Leadership certificate
                                                </p>
                                            </div>
                                            <a
                                                href="/downloads/dmu_union_cert.pdf"
                                                download
                                                className="btn btn-success bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-center block"
                                            >
                                                Download Certificate
                                            </a>
                                        </div>
                                    </div>

                                    {/* edX Certificate */}
                                    <div className="card h-full shadow-sm border border-gray-200 rounded-lg">
                                        <div className="card-body p-6 flex flex-col justify-between">
                                            <div>
                                                <h5 className="text-xl font-semibold mb-2">
                                                    edX Course
                                                </h5>
                                                <p className="text-gray-500 mb-4">
                                                    Completed online course
                                                </p>
                                            </div>
                                            <a
                                                href="/downloads/edx_course_cert.pdf"
                                                download
                                                className="btn btn-secondary bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-center block"
                                            >
                                                Download Certificate
                                            </a>
                                        </div>
                                    </div>

                                    {/* 5 Million Coders Certificate */}
                                    <div className="card h-full shadow-sm border border-gray-200 rounded-lg">
                                        <div className="card-body p-6 flex flex-col justify-between">
                                            <div>
                                                <h5 className="text-xl font-semibold mb-2">
                                                    5 Million Coders
                                                </h5>
                                                <p className="text-gray-500 mb-4">
                                                    Coding initiative
                                                    participation
                                                </p>
                                            </div>
                                            <a
                                                href="/downloads/five_million_coders_cert.pdf"
                                                download
                                                className="btn btn-warning bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-center block"
                                            >
                                                Download Certificate
                                            </a>
                                        </div>
                                    </div>

                                    {/* SSH Certificate */}
                                    <div className="bg-white shadow-md rounded-lg p-4">
                                        <h5 className="text-lg font-semibold mb-1">
                                            SSH Training
                                        </h5>
                                        <p className="text-gray-600 mb-3">
                                            Security & server hosting
                                        </p>
                                        <a
                                            href="/downloads/ssh_cert.pdf"
                                            download
                                            className="btn btn-dark"
                                        >
                                            Download Certificate
                                        </a>
                                    </div>

                                    {/* Hailemariam CV */}
                                    <div className="bg-white shadow-md rounded-lg p-4">
                                        <h5 className="text-lg font-semibold mb-1">
                                            My CV
                                        </h5>
                                        <p className="text-gray-600 mb-3">
                                            Curriculum Vitae (Resume)
                                        </p>
                                        <a
                                            href="https://www.canva.com/design/DAGs2oZ685w/K_xVgJR2cBqwF32pHDof0g/edit?utm_content=DAGs2oZ685w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                        >
                                            View My CV
                                        </a>
                                    </div>
                                </div>
                            </section>

                            <section
                                id="portfolio"
                                className="mb-10"
                                data-aos="fade-up"
                            >
                                <h2 className="text-3xl font-bold mb-6">
                                    Portfolio
                                </h2>
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <button
                                        className="btn btn-outline-primary me-2 filter-btn active px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                                        data-filter="all"
                                    >
                                        All
                                    </button>
                                    <button
                                        className="btn btn-outline-primary me-2 filter-btn px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                                        data-filter="web"
                                    >
                                        Web
                                    </button>
                                    <button
                                        className="btn btn-outline-primary me-2 filter-btn px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                                        data-filter="mobile"
                                    >
                                        Mobile
                                    </button>
                                </div>

                                <div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                    id="portfolio-items"
                                >
                                    <div
                                        className="portfolio-item"
                                        data-category="web"
                                    >
                                        <div className="card h-full shadow-sm rounded-lg border border-gray-200 flex flex-col">
                                            <div className="card-body p-6 flex-grow">
                                                <h5 className="card-title text-xl font-semibold mb-3">
                                                    Dormitory Management System
                                                    (DMU_DMS)
                                                </h5>
                                                <p className="card-text text-gray-700">
                                                    A comprehensive management
                                                    system for student housing
                                                    using Laravel and PHP.
                                                </p>
                                            </div>
                                            <div className="card-footer p-4 bg-gray-100 rounded-b-lg">
                                                <a
                                                    href="#"
                                                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded block text-center"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    View Project
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="portfolio-item"
                                        data-category="mobile"
                                    >
                                        <div className="card h-full shadow-sm rounded-lg border border-gray-200 flex flex-col">
                                            <div className="card-body p-6 flex-grow">
                                                <h5 className="card-title text-xl font-semibold mb-3">
                                                    Gitsawe APK
                                                </h5>
                                                <p className="card-text text-gray-700">
                                                    A mobile app developed with
                                                    Flutter and Dart, focusing
                                                    on religious content.
                                                </p>
                                            </div>
                                            <div className="card-footer p-4 bg-gray-100 rounded-b-lg">
                                                <a
                                                    href="#"
                                                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded block text-center"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    View Project
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="portfolio-item"
                                        data-category="web"
                                    >
                                        <div className="card h-full shadow-sm rounded-lg border border-gray-200 flex flex-col">
                                            <div className="card-body p-6 flex-grow">
                                                <h5 className="card-title text-xl font-semibold mb-3">
                                                    Personal Portfolio Website
                                                </h5>
                                                <p className="card-text text-gray-700">
                                                    My own portfolio website
                                                    built with Laravel,
                                                    showcasing my projects and
                                                    skills.
                                                </p>
                                            </div>
                                            <div className="card-footer p-4 bg-gray-100 rounded-b-lg">
                                                <a
                                                    href="#"
                                                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded block text-center"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    View Project
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section
                                id="downloads"
                                className="bg-white p-6 rounded-lg shadow"
                            >
                                <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-500 pb-1 mb-4">
                                    CV & Certificates
                                </h3>

                                <p className="mb-4">
                                    You can download my professional CV and
                                    certificates to learn more about my skills,
                                    education, and accomplishments.
                                </p>

                                <ul className="list-disc list-inside space-y-2">
                                    <li>
                                        <a
                                            href="https://www.canva.com/design/DAGs2oZ685w/K_xVgJR2cBqwF32pHDof0g/edit?utm_content=DAGs2oZ685w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View My CV (Canva)
                                        </a>{" "}
                                        – Detailed resume with professional
                                        experience and education.
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
                                        – Completion certificate for advanced
                                        Laravel development.
                                    </li>

                                    <li>
                                        <a
                                            href="/files/Certificate_Flutter_2023.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                            download
                                        >
                                            Flutter Development Certificate
                                            (2023)
                                        </a>{" "}
                                        – Training and proficiency in Flutter &
                                        Dart.
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
                                        – Various professional and technical
                                        certificates.
                                    </li>
                                </ul>
                            </section>
                            <section>
                                <form
                                    action="https://formspree.io/f/xjkwqorb"
                                    method="POST"
                                    className="needs-validation"
                                >
                                    <div className="mb-3">
                                        <label
                                            htmlFor="name"
                                            className="form-label fw-semibold"
                                        >
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
                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold"
                                        >
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
                                        <label
                                            htmlFor="message"
                                            className="form-label fw-semibold"
                                        >
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

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </section>
                        </main>
                    </div>
                    <div>
                        <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-gray-100 py-6 mt-12">
                            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                                <p className="text-sm">
                                    &copy; {new Date().getFullYear()}{" "}
                                    Hailemariam Eyayu. All rights reserved.
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
                                        href="https://github.com/hailemariam-eyayu"
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
        </>
    );
}

