import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ismaranLogo from '../assets/ismaran.png'

function Signup() {
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
  setError('Please fill in all fields')
  setLoading(false)
  return
}
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/signup', {
       method: 'POST',
       headers: {
           'Content-Type':'application/json'
       },
       body:  JSON.stringify({name,email,password})
       
      })
      const data = await response.json()
      console.log(data);

if (data.success) {
  localStorage.setItem('token', data.data.token)
  navigate('/dashboard')
} else {
  setError(data.error || 'Invalid credentials')
}


    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass p-8 rounded-2xl w-full max-w-md">
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <a href="http://localhost:8080/">
                   <img src={ismaranLogo} alt="Ismaran" style={{ height: '36px', width: '36px', objectFit: 'contain' }} />
                  </a>
                        </div>
        <h1 className="font-display text-3xl font-bold mb-6" style={{color: 'var(--neon)'}}>
          Welcome to Ismaran!
        </h1>
        
        {/* Show error if exists */}
        {error && <p style={{color: 'red'}}>{error}</p>}
        {/* name input*/}
        <input
           type = "text"
           value = {name}
           onChange={(e)=> setName(e.target.value)}
           placeholder='name'
            className="w-full p-3 rounded-xl mb-4 outline-none text-white"
            style={{background: 'var(--input)', border: '1px solid var(--border)'}}
           />
        
        {/* Email input */}
        <input
           type = "email"
           value = {email}
           onChange={(e)=> setEmail(e.target.value)}
           placeholder='Email'
           className="w-full p-3 rounded-xl mb-4 outline-none text-white"
            style={{background: 'var(--input)', border: '1px solid var(--border)'}}
            />
        
        {/* Password input */}
        <input
           type = "password"
           value = {password}
           onChange={(e)=>{ setPassword(e.target.value)}}
           placeholder='Password'
           className="w-full p-3 rounded-xl mb-4 outline-none text-white :"
           style={{background: 'var(--input)', border: '1px solid var(--border)'}}
        />
        
        {/* Submit button — show "Loading..." when loading */}
        <button onClick={handleSubmit} disabled={loading} className="w-full p-3 rounded-xl font-semibold mt-2 btn-glow hover:opacity-90 hover:-translate-y-0.5 transition-all">
            {loading ? 'Creating account...' :'Sign up'}
        </button>
        {/* Link to signup page */}
          <Link to="/login" className="block text-center mt-4" style={{color: 'var(--neon)'}}>
               Already have an account? Login
           </Link>
      </div>
    </div>
  )
}

export default Signup