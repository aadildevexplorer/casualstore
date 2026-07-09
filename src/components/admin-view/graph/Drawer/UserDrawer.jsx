import {
  X,
  User,
  Mail,
  Lock,
  Calendar,
  Clock,
  Fingerprint,
  Eye,
  EyeOff,
  Copy,
  Check,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

const UserDrawer = ({ user, onClose, onDelete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      setTimeout(() => setIsVisible(true), 20);
    }
  }, [user]);

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", esc);

    return () => window.removeEventListener("keydown", esc);
  }, []);

  const handleClose = () => {
    setIsVisible(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  const copyId = () => {
    navigator.clipboard.writeText(user?.id || "");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  if (!user) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative
    h-full
    w-[420px]
    max-w-full
    box-border
    overflow-y-auto
    overflow-x-hidden
    border-l border-cyan-500/20
    bg-gradient-to-b
    from-[#07111f]
    via-[#0B1220]
    to-[#050914]
    transition-all duration-300
    ${isVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Glow */}
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[120px]" />

        {/* Header */}

        <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0B1220]/70 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <h2 className="text-2xl font-bold text-white">User Details</h2>

              <p className="mt-1 text-xs tracking-widest uppercase text-cyan-400">
                Admin Panel
              </p>
            </div>

            <button
              onClick={handleClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white hover:text-black"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}

        <div className="space-y-4 p-6 min-w-0">
          {" "}
          {/* Name */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-cyan-400/40 transition">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <User size={20} />
              </div>

              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Name
                </p>

                <p className="mt-2 text-white text-[15px]">
                  {user?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-cyan-400/40 transition">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Mail size={20} />
              </div>

              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Email
                </p>
                <p className="mt-2 text-white break-words overflow-hidden">
                  {user?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* Password */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-cyan-400/40 transition">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Lock size={20} />
              </div>

              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Password
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-white break-all">
                    {showPassword
                      ? user?.password || "N/A"
                      : "••••••••••••••••"}
                  </p>

                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-cyan-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-cyan-400/40 transition">
              <Calendar className="mb-3 text-cyan-400" />

              <p className="text-xs uppercase tracking-widest text-gray-400">
                Date
              </p>

              <p className="mt-2 text-white">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN")
                  : "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-cyan-400/40 transition">
              <Clock className="mb-3 text-cyan-400" />

              <p className="text-xs uppercase tracking-widest text-gray-400">
                Time
              </p>

              <p className="mt-2 text-white">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
          {/* User ID */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-cyan-400/40 transition">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Fingerprint size={20} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    User ID
                  </p>

                  <button
                    onClick={copyId}
                    className="text-cyan-400 hover:text-white transition"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="mt-2 text-white break-words overflow-hidden">
                  {user?.id || "N/A"}
                </p>{" "}
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete(user.id)}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-white font-medium border transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
          >
            <Trash2 size={18} />
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDrawer;
