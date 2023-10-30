import Head from 'next/head';
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function signUp() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const signUp = async () => {
        try {
            const res = await axios.post('http://localhost:5000/createUser', {
                username,
                password,
            });

            console.log(res.data);
            if (res.status === 200) {
                console.log('Successful user creation');
                router.push({
                    pathname: '/HomePage',
                    query: { username: username },
                });
            } 
        } catch (error) {
            if(error['response']['status'] === 500){
                console.log('User already exists');
            }
        }
    }

    return (
        <>
            <Head>
                <title>Finanace Tracker</title>
            </Head>
            <main id='loggedIn' className='bg-white overflow-hidden'>
                <section className='min-h-screen flex justify-center items-center flex-col space-y-4' >
                    <p>create your account below</p>
                    <div className=''>
                        <TextField id="username" label="Username" variant="outlined" onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className=''>
                        <TextField id="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className=''>
                        <Button onClick={signUp}
                            style={{
                                borderRadius: 17,
                                padding: "10px 30px",
                                fontSize: "12px",
                                backgroundColor: "#F64C72",
                                color: "#FFF"
                            }}
                        >
                            sign up
                        </Button>
                    </div>
                </section>
            </main>
        </>
    )
}