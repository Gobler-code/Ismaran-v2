export function SignInButton() {
  return (
    <a 
      href={`${import.meta.env.VITE_APP_URL}/signup`}
      className="fixed top-4 right-4 z-50 rounded-full px-5 py-2 text-sm btn-glow hover:translate-y-[-2px] transition"
    >
      Sign in
    </a>
  )
}