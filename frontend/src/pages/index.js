"use client";

import Head from 'next/head';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { Circle } from 'react-shapes';

export default function Home() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const logIn = async () => {
    if (username != '' & password != '') {
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
          } else {
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please input values for all fields',
      })
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
      <main id='home' className='bg-blue overflow-hidden'>
        <section className='min-h-screen' >
          <h1 className=' lg:text-xl sm:text-md font-mono font-bold relative p-5'>
            <a href='https://mohammadm-portfolio.vercel.app/' target='_blank' rel='noopener noreferrer'>
              developedbyMoe
            </a>
          </h1>
          <div className=' flex justify-evenly text-center'>
            <div className=' flex justify-center flex-col'>
              <div className=' text-3xl py-2.5'>
                <h1>Welcome to finance tracker!</h1>
              </div>
              <div className=' py-2.5'>
                <p>Log in below or <a href="#" onClick={signUp} style={{ color: "#007bff" }}>click here</a> to create an account</p>
              </div>
              <div className=' py-2.5'>
                <TextField id="username" label="Username" variant="outlined" onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className=' py-2.5'>
                <TextField id="password" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className=' py-2.5'>
                <Button onClick={logIn}
                  style={{
                    borderRadius: 5,
                    padding: "10px 30px",
                    fontSize: "12px",
                    backgroundColor: "#F64C72",
                    color: "#FFF"
                  }}
                >
                  Log In
                </Button>
              </div>
            </div>
            <div className=' p-10'>
              <img src="/finance_image.png" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
