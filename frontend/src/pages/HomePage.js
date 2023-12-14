import Head from 'next/head';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';


export default function HomePage() {

    const router = useRouter();
    const { username } = router.query;

    const [data, setData] = useState([]);
    const [total, setTotal] = useState([]);
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const enterNewItem = async () => {
        if (item != '' && amount != '') {
            try {
                const currentDate = new Date();
                const res = await axios.post('http://localhost:5000/enterItem', {
                    item,
                    amount,
                    username,
                    date: currentDate.toISOString(),
                });

                console.log(res.data);
                if (res.status === 200) {
                    console.log('Adding item');
                    fetchData();
                    fetchTotal();
                } else {
                    console.log('Error adding item');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please input an Item and its cost',
            })
        }
    }

    function fetchData() {
        const url = `http://localhost:5000/api/data?username=${username}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    function fetchTotal() {
        const url = `http://localhost:5000/api/total?username=${username}`
        fetch(url)
            .then((response) => response.json())
            .then((total) => {
                const totalRounded = Math.round(total['data'][0]['total'] * 100) / 100
                setTotal(totalRounded);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const handleDelete = (id) => {
        const url = 'http://localhost:5000/deleteEntry';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }), // Send the id in the request body
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Delete successful:', data);
                fetchData();
                fetchTotal();
            })
            .catch((error) => {
                console.error('Error deleting entry:', error);
            });
    };

    useEffect(() => {
        fetchData();
        fetchTotal();
    }, []);

    return (
        <>
            <Head>
                <title>Finanace Tracker</title>
            </Head>
            <main id='loggedIn' className='bg-blue overflow-hidden font-burtons'>
                <section className='min-h-screen flex justify-center items-center flex-col space-y-4' >
                    <div className=' text-3xl py-2'>
                        <h1>Welcome back {username}!</h1>
                    </div>
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
                    <div className='w-[50%] shadow-2xl bg-slate-400'>
                        {data.data ? (
                            <>
                                <TableContainer component={Paper}>
                                    <Table className='bg-slate-400'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Item</TableCell>
                                                <TableCell>Amount</TableCell>
                                                <TableCell>Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.item}</TableCell>
                                                    <TableCell>{row.amount}</TableCell>
                                                    <TableCell>
                                                        <IconButton className="delete-icon" onClick={() => handleDelete(row.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10]}
                                    component="div"
                                    count={data.data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </>
                        ) : (
                            <p></p>
                        )}
                    </div>
                    <div className=' text-lg'>
                        <p>Total: ${total}</p>
                    </div>
                </section>
            </main>
        </>
    )
}