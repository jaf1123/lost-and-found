import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";

function LoginPage() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    login(name.trim(), email.trim(), role);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-500 mb-1">Campus Lost & Found</h1>
          <p className="text-sm text-gray-400">Sign in to report or browse lost items</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <div className="flex gap-2">
              {[
                { id: "student", label: "Student" },
                { id: "staff", label: "Staff" },
                { id: "admin", label: "Admin" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    role === id
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Demo only — no real authentication
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
