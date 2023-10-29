import Head from 'next/head';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function HomePage() {

    const router = useRouter();
    const { username } = router.query;

    const [data, setData] = useState([]);
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

    const enterNewItem = async () => {
        try {
            const res = await axios.post('http://localhost:5000/enterItem', {
                item,
                amount,
                username,
            });

            console.log(res.data);
            if (res.status === 200) {
                console.log('Adding item');
                fetchData();
            } else {
                console.log('Error adding item');
            }
        } catch (error) {
            console.log(error);
        }
    }

    function fetchData() {
        fetch('http://localhost:5000/api/data')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Finanace Tracker</title>
            </Head>
            <main id='loggedIn' className='bg-white overflow-hidden'>
                <section className='min-h-screen flex justify-center items-center flex-col space-y-4' >
                    <div className=' flex justify-between w-[25%]'>
                        <TextField id="item" label="Item" variant="outlined" onChange={(e) => setItem(e.target.value)} />
                        <TextField id="amount" label="Amount" variant="outlined" onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className=''>
                        <Button onClick={enterNewItem}
                            style={{
                                borderRadius: 17,
                                padding: "10px 30px",
                                fontSize: "12px",
                                backgroundColor: "#F64C72",
                                color: "#FFF"
                            }}
                        >
                            Enter
                        </Button>
                    </div>
                    <div className=' w-[50%]'>
                        {data.data ? (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.data.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.item}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}