"use client";

import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";

// ── Skill types ────────────────────────────────────────────────────────────────
interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  badge: string;
  skills: string[];
}

const DEFAULT_SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'lang', title: 'Languages & Frameworks', icon: 'fa-code',
    color: 'from-blue-500 to-purple-500', bg: 'from-blue-50 to-purple-50',
    border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700',
    skills: ['JavaScript','TypeScript','React','Next.js','Node.js','Express','PHP','Laravel','Dart','Flutter'],
  },
  {
    id: 'mobile', title: 'Mobile Development', icon: 'fa-mobile-alt',
    color: 'from-green-500 to-teal-500', bg: 'from-green-50 to-teal-50',
    border: 'border-green-200', badge: 'bg-green-100 text-green-700',
    skills: ['Flutter','React Native','Expo','Dart','Android','iOS','Cross-platform','Mobile UI/UX'],
  },
  {
    id: 'db', title: 'Databases & DevOps', icon: 'fa-database',
    color: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50',
    border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700',
    skills: ['MongoDB','MySQL','PostgreSQL','SQLite','Git','GitHub','CI/CD','Vercel','Docker','REST API'],
  },
];

// ── Edit Skills Modal ──────────────────────────────────────────────────────────
const EditSkillsModal = ({
  categories,
  onSave,
  onCancel,
}: {
  categories: SkillCategory[];
  onSave: (cats: SkillCategory[]) => void;
  onCancel: () => void;
}) => {
  const [cats, setCats] = useState<SkillCategory[]>(categories.map(c => ({ ...c, skills: [...c.skills] })));
  const [newSkill, setNewSkill] = useState<Record<string, string>>({});
  const [newCatTitle, setNewCatTitle] = useState('');

  const updateCatTitle = (id: string, title: string) =>
    setCats(prev => prev.map(c => c.id === id ? { ...c, title } : c));

  const removeSkill = (catId: string, skill: string) =>
    setCats(prev => prev.map(c => c.id === catId ? { ...c, skills: c.skills.filter(s => s !== skill) } : c));

  const addSkill = (catId: string) => {
    const s = newSkill[catId]?.trim();
    if (!s) return;
    setCats(prev => prev.map(c => c.id === catId && !c.skills.includes(s) ? { ...c, skills: [...c.skills, s] } : c));
    setNewSkill(p => ({ ...p, [catId]: '' }));
  };

  const addCategory = () => {
    if (!newCatTitle.trim()) return;
    const id = Date.now().toString();
    setCats(prev => [...prev, {
      id, title: newCatTitle.trim(), icon: 'fa-star',
      color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50',
      border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700',
      skills: [],
    }]);
    setNewCatTitle('');
  };

  const removeCategory = (id: string) => setCats(prev => prev.filter(c => c.id !== id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-xl font-bold text-gray-800">📈 Manage Skills</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Categories */}
          {cats.map((cat) => (
            <div key={cat.id} className={`border ${cat.border} rounded-xl overflow-hidden`}>
              {/* Category header */}
              <div className={`bg-gradient-to-r ${cat.bg} px-4 py-3 flex items-center gap-3`}>
                <i className={`fas ${cat.icon} text-gray-600 w-4`}></i>
                <input
                  value={cat.title}
                  onChange={(e) => updateCatTitle(cat.id, e.target.value)}
                  className="flex-1 bg-transparent font-bold text-gray-800 text-sm focus:outline-none border-b border-transparent focus:border-gray-400"
                />
                <button
                  onClick={() => removeCategory(cat.id)}
                  className="text-red-400 hover:text-red-600 text-xs font-semibold transition-colors"
                >
                  Remove
                </button>
              </div>

              {/* Skills chips */}
              <div className="p-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${cat.badge} rounded-full text-sm font-medium border ${cat.border}`}
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(cat.id, skill)}
                        className="text-current opacity-50 hover:opacity-100 leading-none"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {/* Add skill */}
                <div className="flex gap-2">
                  <input
                    value={newSkill[cat.id] || ''}
                    onChange={(e) => setNewSkill(p => ({ ...p, [cat.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill(cat.id)}
                    placeholder="Add skill..."
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => addSkill(cat.id)}
                    className={`px-3 py-1.5 bg-gradient-to-r ${cat.color} text-white text-sm rounded-lg font-medium hover:shadow-md transition-all`}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add new category */}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <input
              value={newCatTitle}
              onChange={(e) => setNewCatTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
              placeholder="New category title..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg font-medium hover:shadow-md transition-all whitespace-nowrap"
            >
              + Category
            </button>
          </div>

          {/* Save / Cancel */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onSave(cats)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              💾 Save Skills
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// ── Social link type ───────────────────────────────────────────────────────────
interface SocialLinkItem {
  id: string;
  name: string;
  icon: string;   // Font Awesome class e.g. "fab fa-linkedin" or emoji
  url: string;
}

interface ProfileInfo {
  name: string;
  tagline: string;
  bio: string;
  bio2: string;
  email: string;
  phone: string;
  telegram: string;
  github: string;
  imageUrl: string;
  cvUrl: string;
  location: string;
  socialLinks: SocialLinkItem[];
}

const DEFAULT_PROFILE: ProfileInfo = {
  name: "Hailemariam Eyayu",
  tagline: "Full-Stack & Mobile Developer",
  bio: "With over 3 years of experience, I have developed a deep understanding of modern technologies including Flutter, Laravel, React, Node.js, and PHP. I am a strong advocate of clean code, user-centered design, and continuous learning.",
  bio2: "Recently, I developed Gitsawe - a comprehensive multi-platform Ethiopian Orthodox Church application featuring a full-stack web app (React, Node.js, MongoDB) and three mobile implementations (Expo, Flutter, React Native). The project showcases my expertise in building scalable, cross-platform solutions with modern CI/CD practices.",
  email: "hailemariameyayu2012@gmail.com",
  phone: "+251938169557",
  telegram: "https://t.me/HaileEden",
  github: "https://github.com/hailemariam-eyayu",
  imageUrl: "/images/HME.png",
  cvUrl: "https://www.canva.com/design/DAGs2oZ685w/K_xVgJR2cBqwF32pHDof0g/edit?utm_content=DAGs2oZ685w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  location: "Addis Ababa, Ethiopia",
  socialLinks: [
    { id: '1', name: 'GitHub',   icon: 'fab fa-github',   url: 'https://github.com/hailemariam-eyayu' },
    { id: '2', name: 'Telegram', icon: 'fab fa-telegram', url: 'https://t.me/HaileEden' },
    { id: '3', name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/hailemariam-eyayu' },
  ],
};

// ── Edit Profile Modal ─────────────────────────────────────────────────────────
const EditProfileModal = ({
  profile,
  onSave,
  onCancel,
}: {
  profile: ProfileInfo;
  onSave: (p: ProfileInfo) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState<ProfileInfo>({ ...profile, socialLinks: [...(profile.socialLinks || [])] });
  const [newLink, setNewLink] = useState({ name: '', icon: '', url: '' });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const addSocialLink = () => {
    if (!newLink.name.trim() || !newLink.url.trim()) return;
    setForm((p) => ({
      ...p,
      socialLinks: [...(p.socialLinks || []), { ...newLink, id: Date.now().toString() }],
    }));
    setNewLink({ name: '', icon: '', url: '' });
  };

  const removeSocialLink = (id: string) => {
    setForm((p) => ({ ...p, socialLinks: (p.socialLinks || []).filter((l) => l.id !== id) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const field = (
    label: string,
    key: keyof Omit<ProfileInfo, 'socialLinks'>,
    type: string = "text",
    rows?: number
  ) => {
    const val = form[key] as string;
    return (
      <div key={key}>
        <label className="block text-gray-700 font-semibold mb-1 text-sm">{label}</label>
        {rows ? (
          <textarea
            rows={rows}
            value={val}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          />
        ) : (
          <input
            type={type}
            value={val}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-xl font-bold text-gray-800">✏️ Edit Profile & Contact</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field("Full Name", "name")}
            {field("Tagline (subtitle under name)", "tagline")}
            {field("Email", "email", "email")}
            {field("Phone", "phone", "tel")}
            {field("Telegram URL", "telegram")}
            {field("GitHub URL", "github")}
            {field("CV URL", "cvUrl")}
            {field("Location", "location")}
          </div>
          {field("Bio (paragraph 1)", "bio", "text", 3)}
          {field("Bio (paragraph 2)", "bio2", "text", 3)}

          {/* Profile Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm">Profile Image</label>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src={form.imageUrl || "/images/HME.png"}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 flex-shrink-0"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/HME.png"; }}
              />
              <div className="flex-1 min-w-0">
                <label className="cursor-pointer inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — stored locally</p>
              </div>
            </div>
          </div>

          {/* Social Links Manager */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Social Links</label>
            <div className="space-y-2 mb-3">
              {(form.socialLinks || []).map((link) => (
                <div key={link.id} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <i className={`${link.icon} text-gray-500 w-4 text-center`}></i>
                  <span className="font-medium text-sm text-gray-700 w-20 flex-shrink-0">{link.name}</span>
                  <span className="flex-1 text-xs text-gray-500 truncate">{link.url}</span>
                  <button type="button" onClick={() => removeSocialLink(link.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-bold flex-shrink-0">✕</button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <input value={newLink.name} onChange={(e) => setNewLink((p) => ({ ...p, name: e.target.value }))}
                placeholder="Name" className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" />
              <input value={newLink.icon} onChange={(e) => setNewLink((p) => ({ ...p, icon: e.target.value }))}
                placeholder="Icon class / emoji" className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" />
              <input value={newLink.url} onChange={(e) => setNewLink((p) => ({ ...p, url: e.target.value }))}
                placeholder="https://..." className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" />
            </div>
            <p className="text-xs text-gray-400 mb-2">Icon: fab fa-linkedin · fab fa-github · fab fa-telegram · or emoji 🔗</p>
            <button type="button" onClick={addSocialLink}
              className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1.5 rounded-lg font-medium hover:shadow-md transition-all">
              + Add Link
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
            >
              💾 Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Header = ({ 
  toggleDarkMode, 
  isDarkMode, 
  fontSize, 
  changeFontSize, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  fontSize: string;
  changeFontSize: (size: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
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

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  liveUrl?: string;
  category: string;
  image?: string;
  technologies?: string[];
}

interface EditModalProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const EditProjectModal = ({ project, onSave, onCancel }: EditModalProps) => {
  const [editedProject, setEditedProject] = useState(project);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProject);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Project</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Project Title</label>
              <input
                type="text"
                required
                value={editedProject.title}
                onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                required
                value={editedProject.description}
                onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Project URL (GitHub)</label>
              <input
                type="url"
                required
                value={editedProject.url}
                onChange={(e) => setEditedProject({ ...editedProject, url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Live URL (Optional)</label>
              <input
                type="url"
                value={editedProject.liveUrl || ''}
                onChange={(e) => setEditedProject({ ...editedProject, liveUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                value={editedProject.category}
                onChange={(e) => setEditedProject({ ...editedProject, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="web">Web App</option>
                <option value="mobile">Mobile App</option>
                <option value="bot">Bot & API</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                value={editedProject.technologies?.join(', ') || ''}
                onChange={(e) => setEditedProject({ 
                  ...editedProject, 
                  technologies: e.target.value.split(',').map(t => t.trim()) 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PasswordModal = ({ onSuccess, onCancel, action = "edit" }: { 
  onSuccess: () => void; 
  onCancel: () => void; 
  action?: "edit" | "delete" | "add";
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get password from environment variable
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const getActionText = () => {
    switch (action) {
      case "delete":
        return "Delete Project";
      case "add":
        return "Add Project";
      case "edit":
      default:
        return "Edit Project";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Admin Authentication Required
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Enter admin password to {getActionText().toLowerCase()}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter admin password"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
            >
              Unlock
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Contact Form ───────────────────────────────────────────────────────────────
const ContactForm = () => {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errMsg, setErrMsg] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Failed to send');
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 text-sm transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-5 border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name</label>
          <input name="name" type="text" required value={form.name} onChange={handleChange}
            placeholder="Hailemariam Eyayu" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange}
            placeholder="you@example.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
        <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
          placeholder="Tell me about your project or idea..."
          className={`${inputClass} resize-none`} />
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <span className="text-xl">✅</span>
          <p className="text-green-700 text-sm font-medium">Message sent! I&apos;ll get back to you soon.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <span className="text-xl">❌</span>
          <p className="text-red-600 text-sm">{errMsg}</p>
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeletePasswordModal, setShowDeletePasswordModal] = useState(false);
  const [showAddPasswordModal, setShowAddPasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Gitsawe Web App",
      description: "Full-stack Ethiopian Orthodox Church platform with React, Node.js, Express, and MongoDB. Features news system, book library, calendar, and automatic Telegram bot broadcasts.",
      url: "https://github.com/hailemariam-eyayu/GitsaweTailwind",
      liveUrl: "https://gitsawe-tailwind-2019.vercel.app/",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Ethiopian Orthodox Telegram Bots",
      description: "Three automated Telegram bots for daily Ethiopian Orthodox readings (Gitsawe & Sinksar) with MongoDB integration, cron scheduling, and beautiful message formatting.",
      url: "https://github.com/hailemariam-eyayu/gitsawebot",
      liveUrl: "https://t.me/gitsawebot",
      category: "bot",
      technologies: ["Node.js", "MongoDB", "Telegram API", "Cron Jobs"],
    },
    {
      id: 3,
      title: "DMUDMS - Dormitory Management System (Next.js)",
      description: "Modern full-stack dormitory management system built with Next.js 15, TypeScript, and MongoDB. Features intelligent room assignment, gender-based block management, accessibility support, role-based dashboards, and comprehensive student/proctor management.",
      url: "https://github.com/hailemariam-eyayu/dmudms_next",
      liveUrl: "https://dmudms-next.vercel.app/",
      category: "web",
      technologies: ["Next.js", "TypeScript", "MongoDB", "NextAuth.js", "Tailwind CSS"],
    },
    {
      id: 4,
      title: "Dormitory Management System (Laravel)",
      description: "Comprehensive university dormitory management system with student registration, room allocation, payment tracking, and administrative dashboard.",
      url: "https://github.com/EdenMelkie/dmudms",
      category: "web",
      technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    },
    {
      id: 5,
      title: "CV Builder Application",
      description: "Professional resume builder with multiple templates, real-time preview, PDF export, and responsive design for creating stunning CVs.",
      url: "https://github.com/hailemariam-eyayu/cv-builder",
      liveUrl: "https://cv-builder-hailemariam.vercel.app/",
      category: "web",
      technologies: ["React", "TypeScript", "Tailwind CSS", "PDF.js"],
    },
    {
      id: 6,
      title: "Gitsawe Flutter App",
      description: "Native Flutter mobile app for Ethiopian Orthodox Church content with multi-platform support (Android, iOS, Web, Desktop) and offline capabilities.",
      url: "https://github.com/hailemariam-eyayu/gitsaweflutterapk",
      liveUrl: "https://github.com/hailemariam-eyayu/gitsaweflutterapk/releases",
      category: "mobile",
      technologies: ["Flutter", "Dart", "SQLite"],
    },
    {
      id: 7,
      title: "Gitsawe React Native App",
      description: "Bare React Native mobile app with full native control, TypeScript support, and Ethiopian Orthodox Church services integration.",
      url: "https://github.com/hailemariam-eyayu/GitsaweReactNative",
      category: "mobile",
      technologies: ["React Native", "TypeScript", "AsyncStorage"],
    },
    {
      id: 8,
      title: "Gitsawe Expo App",
      description: "Cross-platform React Native app with Expo featuring Bahire Hasab calculator, Mahlet prayer book, Bible reader, and Ethiopian calendar support.",
      url: "https://github.com/hailemariam-eyayu/gitsawe_expo_app",
      liveUrl: "https://expo.dev/@hailemariam-eyayu/gitsawe-expo-app",
      category: "mobile",
      technologies: ["React Native", "Expo", "TypeScript"],
    },
    {
      id: 9,
      title: "Personal Portfolio",
      description: "Modern responsive portfolio website built with Next.js showcasing my skills, projects, and professional experience with smooth animations.",
      url: "https://github.com/hailemariam-eyayu/portfolio",
      liveUrl: "https://hailemariam-eyayu.vercel.app/",
      category: "web",
      technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    },
    {
      id: 10,
      title: "🧪 TEST PROJECT - DELETE ME",
      description: "This is a test project created to demonstrate the password-protected delete functionality. You can safely delete this project to test the admin features.",
      url: "https://github.com/example/test-project",
      liveUrl: "https://test-project-demo.vercel.app/",
      category: "web",
      technologies: ["React", "JavaScript", "CSS"],
    },
  ]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    url: "",
    liveUrl: "",
    category: "web",
    technologies: "",
  });

  // ── Profile state ────────────────────────────────────────────────────────────
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(DEFAULT_PROFILE);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showProfilePasswordModal, setShowProfilePasswordModal] = useState(false);

  // ── Skills state ──────────────────────────────────────────────────────────────
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(DEFAULT_SKILL_CATEGORIES);
  const [showEditSkillsModal, setShowEditSkillsModal] = useState(false);
  const [pendingSkillsEdit, setPendingSkillsEdit] = useState(false);

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleEditProject = (project: Project) => {
    if (isAuthenticated) {
      setEditingProject(project);
      setShowEditModal(true);
    } else {
      setEditingProject(project);
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    setShowPasswordModal(false);
    if (editingProject) {
      setShowEditModal(true);
    }
  };

  const handleDeletePasswordSuccess = () => {
    setIsAuthenticated(true);
    setShowDeletePasswordModal(false);
    
    if (deletingProjectId !== null) {
      if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        const updatedProjects = projects.filter(p => p.id !== deletingProjectId);
        setProjects(updatedProjects);
        
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects));
        }
      }
      setDeletingProjectId(null);
    }
  };

  const handleAddProjectClick = () => {
    if (showAddProjectForm) {
      // If form is already open, just close it
      setShowAddProjectForm(false);
    } else if (isAuthenticated) {
      // If authenticated, show form directly
      setShowAddProjectForm(true);
    } else {
      // If not authenticated, show password modal
      setShowAddPasswordModal(true);
    }
  };

  const handleAddPasswordSuccess = () => {
    setIsAuthenticated(true);
    setShowAddPasswordModal(false);
    setShowAddProjectForm(true);
  };

  const handleSaveProject = (updatedProject: Project) => {
    const updatedProjects = projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    setShowEditModal(false);
    setEditingProject(null);
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects));
    }
  };

  const handleDeleteProject = (projectId: number) => {
    if (isAuthenticated) {
      // If already authenticated, show confirmation dialog
      if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        const updatedProjects = projects.filter(p => p.id !== projectId);
        setProjects(updatedProjects);
        
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects));
        }
      }
    } else {
      // If not authenticated, show password modal
      setDeletingProjectId(projectId);
      setShowDeletePasswordModal(true);
    }
  };

  const handleSaveProfile = (updated: ProfileInfo) => {
    setProfileInfo(updated);
    setShowEditProfileModal(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioProfile", JSON.stringify(updated));
    }
  };

  const handleSaveSkills = (updated: SkillCategory[]) => {
    setSkillCategories(updated);
    setShowEditSkillsModal(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioSkills", JSON.stringify(updated));
    }
  };

  const handleEditSkillsClick = () => {
    if (isAuthenticated) {
      setShowEditSkillsModal(true);
    } else {
      setPendingSkillsEdit(true);
      setShowProfilePasswordModal(true);
    }
  };

  const handleEditProfileClick = () => {
    if (isAuthenticated) {
      setShowEditProfileModal(true);
    } else {
      setShowProfilePasswordModal(true);
    }
  };

  const handleProfilePasswordSuccess = () => {
    setIsAuthenticated(true);
    setShowProfilePasswordModal(false);
    // open whichever admin action triggered the password
    if (pendingSkillsEdit) {
      setPendingSkillsEdit(false);
      setShowEditSkillsModal(true);
    } else {
      setShowEditProfileModal(true);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: projects.length + 1,
      title: newProject.title,
      description: newProject.description,
      url: newProject.url,
      liveUrl: newProject.liveUrl || undefined,
      category: newProject.category,
      technologies: newProject.technologies.split(",").map(t => t.trim()),
    };
    setProjects([...projects, project]);
    setNewProject({ title: "", description: "", url: "", liveUrl: "", category: "web", technologies: "" });
    setShowAddProjectForm(false);
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioProjects", JSON.stringify([...projects, project]));
    }
  };

  useEffect(() => {
    // Load projects from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolioProjects");
      if (saved) setProjects(JSON.parse(saved));
      // Load profile
      const savedProfile = localStorage.getItem("portfolioProfile");
      if (savedProfile) setProfileInfo(JSON.parse(savedProfile));
      // Load skills
      const savedSkills = localStorage.getItem("portfolioSkills");
      if (savedSkills) setSkillCategories(JSON.parse(savedSkills));
    }
  }, []);
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

      <main className="pt-20 min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 md:py-32">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  {/* Profile Image */}
                  <div className="relative" data-aos="fade-right">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    <img
                      src={profileInfo.imageUrl || "/images/HME.png"}
                      alt={profileInfo.name}
                      className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-8 border-white"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Hero Content */}
                  <div className="flex-1 text-center md:text-left" data-aos="fade-left">
                    <div className="inline-block mb-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Available for Opportunities
                      </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {profileInfo.name}
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">
                      {profileInfo.tagline}
                    </p>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                      Crafting exceptional digital experiences with modern technologies. 
                      Specialized in React, Node.js, Flutter, and React Native.
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <a
                        href="#portfolio"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        View My Work
                      </a>
                      <a
                        href="#contact"
                        className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold border-2 border-gray-300 hover:border-blue-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        Get In Touch
                      </a>
                    </div>
                    
                    {/* Social Links — from profileInfo.socialLinks */}
                    <div className="flex gap-4 mt-8 justify-center md:justify-start flex-wrap">
                      {(profileInfo.socialLinks || []).map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                          title={link.name}
                        >
                          <i className={`${link.icon} text-xl`} style={{ color: 'inherit' }}></i>
                        </a>
                      ))}
                      {profileInfo.email && (
                        <a
                          href={`mailto:${profileInfo.email}`}
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                          title="Email"
                        >
                          <i className="fas fa-envelope text-red-500 text-xl"></i>
                        </a>
                      )}
                      {profileInfo.phone && (
                        <a
                          href={`tel:${profileInfo.phone}`}
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                          title="Phone"
                        >
                          <i className="fas fa-phone text-green-500 text-xl"></i>
                        </a>
                      )}
                      {/* Edit Profile button */}
                      <button
                        onClick={handleEditProfileClick}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                        title="Edit Profile (Admin)"
                      >
                        <i className="fas fa-user-edit text-purple-500 text-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white shadow-sm" data-aos="fade-up">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      3+
                    </div>
                    <div className="text-gray-600 font-medium">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      15+
                    </div>
                    <div className="text-gray-600 font-medium">Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                      8+
                    </div>
                    <div className="text-gray-600 font-medium">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      4
                    </div>
                    <div className="text-gray-600 font-medium">Platforms</div>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto" data-aos="fade-up">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
                    <div className="relative z-10">
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {profileInfo.bio}
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {profileInfo.bio2}
                      </p>
                      
                      <div className="mt-8 flex flex-wrap gap-3">
                        {["Problem Solving", "Team Collaboration", "Agile Development", "Clean Code"].map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-full text-sm font-medium border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto" data-aos="fade-up">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      Skills &amp; <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
                    {/* Manage Skills button — always visible, password-protected */}
                    <button
                        onClick={handleEditSkillsClick}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <i className="fas fa-edit"></i>
                        Manage Skills
                      </button>
                  </div>

                  {/* Skill cards — driven by skillCategories state */}
                  {skillCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`bg-gradient-to-br ${cat.bg} rounded-2xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border ${cat.border}`}
                    >
                      <h4 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                        <span className={`w-9 h-9 bg-gradient-to-r ${cat.color} rounded-lg flex items-center justify-center`}>
                          <i className={`fas ${cat.icon} text-white text-sm`}></i>
                        </span>
                        {cat.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 ${cat.badge} rounded-full text-sm font-medium border ${cat.border} hover:shadow-md transition-shadow duration-200`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto" data-aos="fade-up">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Portfolio</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Explore my latest projects showcasing expertise in web development, mobile apps, and bot automation
                    </p>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex justify-center flex-wrap gap-3 mb-12">
                    {[
                      { label: "All Projects", value: "all", icon: "fa-th" },
                      { label: "Web Apps", value: "web", icon: "fa-globe" },
                      { label: "Mobile Apps", value: "mobile", icon: "fa-mobile-alt" },
                      { label: "Bots & APIs", value: "bot", icon: "fa-robot" },
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                          activeFilter === filter.value
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                            : "bg-white text-gray-700 hover:shadow-md hover:scale-105"
                        }`}
                      >
                        <i className={`fas ${filter.icon}`}></i>
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Add Project Button */}
                  <div className="flex justify-center mb-8">
                    <button
                      onClick={handleAddProjectClick}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                      <i className="fas fa-plus"></i>
                      {showAddProjectForm ? "Cancel" : "Add New Project"}
                    </button>
                  </div>

                  {/* Add Project Form */}
                  {showAddProjectForm && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-2xl mx-auto" data-aos="fade-down">
                      <h3 className="text-2xl font-bold mb-6 text-gray-800">Add New Project</h3>
                      <form onSubmit={handleAddProject} className="space-y-4">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Project Title</label>
                          <input
                            type="text"
                            required
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter project title"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Description</label>
                          <textarea
                            required
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder="Describe your project"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Project URL (GitHub)</label>
                          <input
                            type="url"
                            required
                            value={newProject.url}
                            onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Live URL (Optional)</label>
                          <input
                            type="url"
                            value={newProject.liveUrl}
                            onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://yourproject.vercel.app/"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Category</label>
                          <select
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="web">Web App</option>
                            <option value="mobile">Mobile App</option>
                            <option value="bot">Bot & API</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Technologies (comma-separated)</label>
                          <input
                            type="text"
                            value={newProject.technologies}
                            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
                        >
                          Add Project
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        data-aos="fade-up"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              project.category === "web"
                                ? "bg-blue-100 text-blue-600"
                                : project.category === "mobile"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-green-100 text-green-600"
                            }`}>
                              {project.category === "web" ? "Web App" : project.category === "mobile" ? "Mobile App" : "Bot & API"}
                            </span>
                            <div className="flex items-center gap-2">
                              <i className={`fas ${
                                project.category === "web" ? "fa-globe" : 
                                project.category === "mobile" ? "fa-mobile-alt" : "fa-robot"
                              } text-2xl text-gray-400`}></i>
                              <button
                                onClick={() => handleEditProject(project)}
                                className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                                title="Edit Project"
                              >
                                <i className="fas fa-edit text-lg"></i>
                              </button>
                              {isAuthenticated && (
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                                  title="Delete Project"
                                >
                                  <i className="fas fa-trash text-lg"></i>
                                </button>
                              )}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                          {project.technologies && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex gap-3">
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-gray-600 font-semibold hover:text-gray-800 hover:gap-3 transition-all duration-300 flex-1 justify-center py-2 border border-gray-300 rounded-lg hover:border-gray-400"
                            >
                              <i className="fab fa-github"></i>
                              View Code
                            </a>
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 hover:gap-3 transition-all duration-300 flex-1 justify-center py-2 rounded-lg"
                              >
                                <i className="fas fa-external-link-alt"></i>
                                View Live
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                      <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                      <p className="text-gray-500 text-lg">No projects found in this category</p>
                    </div>
                  )}
                </div>
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
                    href="https://www.canva.com/design/DAGs2oZ685w/K_xVgJR2cBqwF32pHDof0g/edit?utm_content=DAGs2oZ685w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View My CV (Canva)
                  </a>{" "}
                  – Detailed resume with professional experience and education.
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/hailemariam-eyayu/details/certifications/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    5 Million Coders Certificate
                  </a>{" "}
                  – Certification from the 5 Million Coders initiative.
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/hailemariam-eyayu/details/certifications/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    EthioCoders SSE Certificate
                  </a>{" "}
                  – Software Systems Engineering certification developed by MoE Ethiopian.
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/hailemariam-eyayu/details/certifications/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Understanding Phishing Certificate
                  </a>{" "}
                  – Security awareness certification by Enat Bank SC.
                </li>
              </ul>
            </section>

           <section id="contact" className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto" data-aos="fade-up">
                  <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600">Have a project in mind? I&apos;d love to hear from you.</p>
                  </div>

                  <ContactForm />
                </div>
              </div>
            </section>

            <footer className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-gray-100 py-6 mt-12">
              <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">
                  &copy; {new Date().getFullYear()} {profileInfo.name}. All rights reserved.
                </p>

                <div className="space-x-6 mt-4 md:mt-0 flex flex-wrap gap-y-2">
                  {(profileInfo.socialLinks || []).map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <i className={link.icon}></i>
                      <span>{link.name}</span>
                    </a>
                  ))}
                  {profileInfo.email && (
                    <a href={`mailto:${profileInfo.email}`}
                      className="hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2">
                      <i className="fas fa-envelope"></i>
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </div>
            </footer>
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

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          action="edit"
          onSuccess={handlePasswordSuccess}
          onCancel={() => {
            setShowPasswordModal(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* Delete Password Modal */}
      {showDeletePasswordModal && (
        <PasswordModal
          action="delete"
          onSuccess={handleDeletePasswordSuccess}
          onCancel={() => {
            setShowDeletePasswordModal(false);
            setDeletingProjectId(null);
          }}
        />
      )}

      {/* Add Password Modal */}
      {showAddPasswordModal && (
        <PasswordModal
          action="add"
          onSuccess={handleAddPasswordSuccess}
          onCancel={() => {
            setShowAddPasswordModal(false);
          }}
        />
      )}

      {/* Edit Project Modal */}
      {showEditModal && editingProject && (
        <EditProjectModal
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowEditModal(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditProfileModal
          profile={profileInfo}
          onSave={handleSaveProfile}
          onCancel={() => setShowEditProfileModal(false)}
        />
      )}

      {/* Profile Password Modal */}
      {showProfilePasswordModal && (
        <PasswordModal
          action="edit"
          onSuccess={handleProfilePasswordSuccess}
          onCancel={() => { setShowProfilePasswordModal(false); setPendingSkillsEdit(false); }}
        />
      )}

      {/* Edit Skills Modal */}
      {showEditSkillsModal && (
        <EditSkillsModal
          categories={skillCategories}
          onSave={handleSaveSkills}
          onCancel={() => setShowEditSkillsModal(false)}
        />
      )}
    </>
  );
}
