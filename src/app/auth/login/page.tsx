"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Real-time validation for login inputs
  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "username" && value.length < 8) {
      error = "Username must be at least 8 characters long.";
    }

    if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // ✅ Validate field in real-time
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);

    // ✅ Final validation before sending request
    if (!form.username || !form.password) {
      setErrors({
        username: form.username ? "" : "Username is required.",
        password: form.password ? "" : "Password is required.",
      });
      setLoading(false);
      return;
    }

    if (errors.username || errors.password) {
      setLoading(false);
      return; // Stop submission if errors exist
    }

    // ✅ API Request to Login
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors((prev) => ({ ...prev, username: data.error || "Login failed." }));
      } else {
        setSuccess("Login successful! Redirecting to dashboard...");
        localStorage.setItem("token", data.token); // Store JWT token

        // Redirect to dashboard after 2 seconds
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, username: "An error occurred. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", margin: "0 auto" }}>
        {/* Username Field */}
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        {errors.username && <p style={{ color: "red", fontSize: "12px" }}>{errors.username}</p>}

        {/* Password Field */}
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={loading} style={{ cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {/* Success Message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
