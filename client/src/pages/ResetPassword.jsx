import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lockIcon from '../assets/lockIcon.svg'
import emailIcon from '../assets/email.svg'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const { backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp',
        { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmited(true)
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password',
        { email, otp, newPassword })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>


      {!isEmailSent &&
        <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96  text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
          <p className='text-center mb-4 text-indigo-300'>Enter your registered email address</p>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700'>
            <img src={emailIcon} alt="" className='w-6 h-6' />
            <input type="email" placeholder='Email id'
              className='bg-transparent outline-none text-white'
              value={email} onChange={e => setEmail(e.target.value)} required
            />
          </div>

          <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer text-white rounded-full'>Submit</button>
        </form>
      }

      {/* OTP FORM */}
      {!isOtpSubmited && isEmailSent &&
        <form onSubmit={onSubmitOTP} className="bg-slate-900 p-6 rounded-lg shadow-lg w-full sm:w-96 text-sm max-w-md mx-auto">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
        <p className="text-center mb-4 text-indigo-300">Enter the 6-digit code sent to your email id.</p>
      
        <div className="flex gap-1 justify-between mb-8 flex-wrap" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              className="w-12 h-12 text-white text-center text-xl rounded-md bg-[#333A5C] mb-2 sm:mb-0"
              ref={(e) => (inputRefs.current[index] = e)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
      
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer text-white rounded-full">
          Submit
        </button>
      </form>
      
      }
      {/* new password form */}
      {isOtpSubmited && isEmailSent &&
        <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96  text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
          <p className='text-center mb-4 text-indigo-300'>Enter a new password below</p>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={lockIcon} alt="" className='w-6 h-6' />
            <input type="password" placeholder='Password'
              className='bg-transparent outline-none text-white'
              value={newPassword} onChange={e => setNewPassword(e.target.value)} required
            />
          </div>

          <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer text-white rounded-full'>Submit</button>
        </form>
      }
    </div>
  )
}

export default ResetPassword
