"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ username: "", password: "", confirmPassword: "" });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Real-time Validation
  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "username") {
      if (value.length < 8) {
        error = "Username must be at least 8 characters long.";
      }
    }

    if (name === "password") {
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value)) {
        error = "Password must include uppercase, lowercase, and special character.";
      }
    }

    if (name === "confirmPassword") {
      if (value !== form.password) {
        error = "Passwords do not match.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // ✅ Validate the field in real-time
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);

    // ✅ Final validation check before sending request
    if (!form.username || !form.password || !form.confirmPassword) {
      setErrors({
        username: form.username ? "" : "Username is required.",
        password: form.password ? "" : "Password is required.",
        confirmPassword: form.confirmPassword ? "" : "Confirm Password is required.",
      });
      setLoading(false);
      return;
    }

    if (errors.username || errors.password || errors.confirmPassword) {
      setLoading(false);
      return; // Stop submission if errors exist
    }

    // ✅ API Request to Signup
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors((prev) => ({ ...prev, username: data.error || "Signup failed." }));
      } else {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, username: "An error occurred. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", margin: "0 auto" }}>
        {/* Username Field */}
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        {errors.username && <p style={{ color: "red", fontSize: "12px" }}>{errors.username}</p>}

        {/* Password Field */}
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>}

        {/* Confirm Password Field */}
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
        {errors.confirmPassword && <p style={{ color: "red", fontSize: "12px" }}>{errors.confirmPassword}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={loading} style={{ cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* Success Message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
