import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Input } from '../components/form-elements'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useAppContext } from '../context/state'
import { register } from '../data/auth'

export default function Register() {
  const {setToken} = useAppContext()

  const firstName = useRef('')
  const lastName = useRef('')
  const username = useRef('')
  const password = useRef('')
  const email = useRef('')  // Added email ref
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value  // Added email to the user object
    }

    try {
      const res = await register(user); // Await the register call

      if (res && res.token) {
        setToken(res.token)
        router.push('/')
      } else {
        console.error("Registration failed: No token received");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box" onSubmit={submit}>
          <h1 className="title">Welcome!</h1>
          <Input
            id="firstName"
            refEl={firstName}
            type="text"
            label="First Name"
          />
          <Input
            id="lastName"
            refEl={lastName}
            type="text"
            label="Last Name"
          />
          <Input
            id="email"  // Added email input field
            refEl={email}
            type="email"
            label="Email"
          />
          <Input
            id="username"
            refEl={username}
            type="text"
            label="Username"
          />
          <Input
            id="password"
            refEl={password}
            type="password"
            label="Password"
          />
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">Submit</button>
            </div>
            <div className="control">
              <Link href="/login">
                <button className="button is-link is-light" type="button">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}