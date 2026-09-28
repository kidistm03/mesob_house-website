import { useState } from "react";
import { Link } from "react-router-dom";
import { signInSchema } from "../schemas/authSchemas.js";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});   // { phone?: string, password?: string }
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    // Validate with Zod
    const result = signInSchema.safeParse({ phone, password });

    if (!result.success) {
      // Turn Zod errors into a simple object: { fieldName: "message" }
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return; // stop — don't submit
    }

    // Validation passed
    setErrors({});
    setSubmitted(true);
  }

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium block mb-1">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0912345678"
          className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gold-light/50 rounded-lg px-3 py-2 outline-none focus:border-maroon"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button type="submit" className="w-full bg-maroon ...">
        Sign In
      </button>
    </form>
  );
}