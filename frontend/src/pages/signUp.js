import Head from 'next/head';
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

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
            if (error['response']['status'] === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'User already exists',
                })
            }
        }
    }

    return (
        <>
            <Head>
                <title>Finanace Tracker</title>
            </Head>
            <main id='signUp' className=' bg-blue overflow-hidden font-burtons'>
                <h1 className=' lg:text-xl sm:text-md font-mono font-bold relative p-5'>
                    <a href='https://mohammadm-portfolio.vercel.app/' target='_blank' rel='noopener noreferrer'>
                        developedbyMoe
                    </a>
                </h1>
                <section className='min-h-screen'>
                    <div className=' flex justify-evenly text-center'>
                        <div className=' flex justify-center flex-col'>
                            <div className=' text-2xl py-2.5'>
                                <h1>Create your account by filling in the fields below!</h1>
                            </div>
                            <div className=' py-2.5'>
                                <TextField id="username" label="Username" variant="outlined" onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div className=' py-2.5'>
                                <TextField id="password" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className=' py-2.5'>
                                <Button onClick={signUp}
                                    style={{
                                        borderRadius: 5,
                                        padding: "10px 30px",
                                        fontSize: "12px",
                                        backgroundColor: "#F64C72",
                                        color: "#FFF"
                                    }}
                                >
                                    sign up
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
    )
}