
import React, { useState } from 'react'
import { Link,Navigate, useNavigate } from 'react-router-dom'
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../utils/validation'
import {
  createUser,
  getUserByEmail
} from '../services/UserService'

function Register() {
  
  const navigate =useNavigate();
  

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState('')

  function validateForm() {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPass: validateConfirmPassword(password, confirmPass)
    }

    setErrors(newErrors)

    return !Object.values(newErrors).some(error => error !== '')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setApiError('')
    setSuccess('')

    if (!validateForm()) return

    try {
      const existingUser = await getUserByEmail(email)

      if (existingUser) {
        setApiError('Email already registered.')
        return
      }

      await createUser({ name, email, password,role:"user" })

      setName('')
      setEmail('')
      setPassword('')
      setConfirmPass('')
      setErrors({})
      setSuccess('Account created successfully!')
     navigate("/login")
    } catch (error) {
      setApiError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-end">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <h1 className="font-serif text-4xl text-gray-900">
            Create Account
          </h1>

          <p className="mt-3 mb-8 text-xs tracking-[0.3em] text-gray-500">
            JOIN OUR WORLD OF FRAGRANCE
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-black"
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setApiError('')
                }}
                className="w-full border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-black"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-black"
                minLength={8}
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                className="w-full border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-black"
                minLength={8}
                required
              />
              {errors.confirmPass && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPass}
                </p>
              )}
            </div>

            {apiError && (
              <p className="text-sm text-red-600">{apiError}</p>
            )}

            {success && (
              <p className="text-sm text-green-700">{success}</p>
            )}

            <button
              type="submit"
              className="w-full bg-neutral-900 px-4 py-4 text-white transition hover:bg-neutral-700"
            >
              Create Account →
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-black underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
