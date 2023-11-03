"use client";

import Head from 'next/head';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function Home() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const logIn = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      if (res.status === 200) {
        if (res.data === 'Incorrect credentials') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Incorrect username or password',
          })
        }else{
          router.push({
            pathname: '/HomePage',
            query: { username: username },
          });
        }
      } else {
        console.log('Error logging in');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const signUp = async () => {
    router.push({
      pathname: '/signUp',
    })
  }

  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <main id='home' className='bg-white overflow-hidden'>
        <section className='min-h-screen flex justify-center items-center flex-col space-y-4' >
          <div>
            <h1>welcome to finance tracker!</h1>
          </div>
          <div>
            <TextField id="username" label="Username" variant="outlined" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <TextField id="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className=''>
            <Button onClick={logIn}
              style={{
                borderRadius: 17,
                padding: "10px 30px",
                fontSize: "12px",
                backgroundColor: "#F64C72",
                color: "#FFF"
              }}
            >
              Log In
            </Button>
            <Button onClick={signUp}
              style={{
                borderRadius: 17,
                padding: "10px 30px",
                fontSize: "12px",
                backgroundColor: "#F64C72",
                color: "#FFF"
              }}
            >
              Sign Up
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
