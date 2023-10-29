import Head from 'next/head';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

export default function HomePage() {

    const data = [
        { item: 'Item 1', amount: 100 },
        { item: 'Item 2', amount: 200 },
        { item: 'Item 3', amount: 150 },
    ];

    return (
        <>
            <Head>
                <title>Finanace Tracker</title>
            </Head>
            <main id='loggedIn' className='bg-white overflow-hidden'>
                <section className='min-h-screen flex justify-center items-center flex-col space-y-4' >
                    <div className=' flex justify-between w-[25%]'>
                        <TextField id="item" label="Item" variant="outlined" />
                        <TextField id="amount" label="Amount" variant="outlined" />
                    </div>
                    <div className=''>
                        <Button
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
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.item}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </section>
            </main>
        </>
    )
}