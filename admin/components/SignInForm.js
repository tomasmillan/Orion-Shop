import { signIn } from "next-auth/react";
import { useState } from "react";

export default function CredentialsLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);
  
    const handleSignIn = async (e) => {
      e.preventDefault();
  
      try {
        const result = await signIn("credentials", {
          email,
          password,
        });
  
        if (result.error) {
          setLoginError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        } else {
          // El inicio de sesión fue exitoso, puedes redirigir al usuario a la página deseada
          // Por ejemplo, podrías redirigirlo a la página de inicio o al panel de usuario.
          window.location.href = "/"; // Cambia la URL de destino según tus necesidades.
        }
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
      }
    };

  return (
    <div className="text-center flex flex-col">
      <h2 className="text-2xl font-semibold m-4">Login with Credentials</h2>
      <form
        onSubmit={handleSignIn}
        className="flex-auto flex-col text-center"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-black text-lg  mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-black text-lg  mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg  focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </form>
      {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
    </div>
  );
}
