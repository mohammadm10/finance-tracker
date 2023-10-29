"use client";

import Head from 'next/head';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const logIn = async () => {
    try{
      const res = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      
      console.log(res.data);
      if (res.status === 200) {
        console.log('Successful login');
        router.push({
          pathname: '/HomePage',
          query: { username: username },
        });
      } else {
        console.log('Error logging in');
      }
    } catch (error){
      console.log(error);
    }
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
            <TextField id="username" label="Username" variant="outlined" onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div>
            <TextField id="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
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
          </div>
        </section>
      </main>
    </>
  );
}
