"use client";

import { useState } from "react";
import { Settings, Save, Check } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [promptUpdates, setPromptUpdates] = useState(true);
  const [courseReminders, setCourseReminders] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9ff] via-[#fbfcff] to-white pb-6 md:pb-16 selection:bg-violet-100">
      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-[#563bfa] text-[10px] sm:text-[11px] font-extrabold bg-[#f3efff] px-3.5 py-1.5 rounded-full mb-3 shadow-2xs border border-violet-100 uppercase tracking-wide">
            <Settings size={13} className="text-[#563bfa]" />
            <span>Preferences</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
            Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage your personal profile and learning preferences.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col gap-6">
          {/* Profile Section */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
              Profile Info
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Akash Kumar"
                  className="w-full min-h-11 px-3.5 py-2.5 rounded-xl border border-gray-200 text-base md:text-sm text-gray-900 outline-none focus:border-[#563bfa]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="akashkirar539@gmail.com"
                  className="w-full min-h-11 px-3.5 py-2.5 rounded-xl border border-gray-200 text-base md:text-sm text-gray-900 outline-none focus:border-[#563bfa]"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Notifications */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
              Notifications
            </h3>
            <div className="flex flex-col gap-3">
              <label className="flex min-h-11 items-center justify-between gap-4 cursor-pointer">
                <div>
                  <span className="text-sm font-bold text-gray-900 block">
                    Weekly AI Tool Digest
                  </span>
                  <span className="text-xs leading-relaxed text-gray-500">
                    Get summaries of newly released models and tools.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="size-5 shrink-0 accent-[#563bfa]"
                />
              </label>

              <label className="flex min-h-11 items-center justify-between gap-4 cursor-pointer">
                <div>
                  <span className="text-sm font-bold text-gray-900 block">
                    New Prompt Drop Alerts
                  </span>
                  <span className="text-xs leading-relaxed text-gray-500">
                    Be notified when trending prompt templates are added.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={promptUpdates}
                  onChange={(e) => setPromptUpdates(e.target.checked)}
                  className="size-5 shrink-0 accent-[#563bfa]"
                />
              </label>

              <label className="flex min-h-11 items-center justify-between gap-4 cursor-pointer">
                <div>
                  <span className="text-sm font-bold text-gray-900 block">
                    Learning Streak Reminders
                  </span>
                  <span className="text-xs leading-relaxed text-gray-500">
                    Daily nudges to keep your daily learning streak alive.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={courseReminders}
                  onChange={(e) => setCourseReminders(e.target.checked)}
                  className="size-5 shrink-0 accent-[#563bfa]"
                />
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full min-h-11 py-3 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {saved ? (
              <>
                <Check size={16} strokeWidth={2.5} />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
