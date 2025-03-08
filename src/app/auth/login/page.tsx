"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "", auth: "" });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);



  useEffect(() => {
    const activeUser = localStorage.getItem("active_user");

    if (activeUser) {
      const token = localStorage.getItem(`token_${activeUser}`);

      if (token) {
        try {
          const decodedToken: { exp: number } = jwtDecode(token);
          if (decodedToken.exp * 1000 < Date.now()) {
            // ✅ Expired token, clear session
            localStorage.removeItem(`token_${activeUser}`);
            localStorage.removeItem("active_user");
          } else {
            // ✅ If valid, redirect to dashboard
            router.push("/dashboard");
            return;
          }
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem(`token_${activeUser}`);
          localStorage.removeItem("active_user");
        }
      }
    }
    setIsCheckingAuth(false);
  }, [router]);

  if (isCheckingAuth) return <p>Checking authentication...</p>;

  // ✅ Real-time validation
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

    // Validate as user types
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setErrors((prev) => ({ ...prev, auth: "" }));
    setLoading(true);
    

    // ✅ Final validation check before sending request
    if (!form.username || !form.password) {
      setErrors({
        ...errors,
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

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors((prev) => ({ ...prev, auth: data.error || "Login failed." }));
      } else {
        // ✅ Store a separate session for each user
        localStorage.setItem(`token_${form.username}`, data.token);
        localStorage.setItem("active_user", form.username); // Track active user

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, auth: "An error occurred. Please try again." }));
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

        {/* Authentication Error */}
        {errors.auth && <p style={{ color: "red" }}>{errors.auth}</p>}

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
