import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import Grid from '@material-ui/core/Grid';

const Nav = () => {
    const location = useLocation();

    return (
        <Grid container
            direction='row'
            alignContent='center'
            justifyContent='center'
            className='navStyle'
            style={{
                height: '80px',
                // marginBottom: '15px',
                padding: '0 15px'
            }}
        >
            <Box
                // display="flex"
                // alignContent="center"
                style={{
                    width: '100%',
                }}
            >
                <a
                    href='https://www.ello.com/'
                    target='_blank'
                >
                    <img
                        style={{
                            width: '60px',
                            marginTop: '-15px',
                        }}
                        src="/ello-logo.png" alt=""
                    />
                </a>
            </Box>
            {/* <Box
                display="flex"
                alignContent="center"
                justifyContent="flex-end"
                style={{
                    width: '70%',
                }}
            >
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    className={location.pathname === '/' ? 'navStyleItem active' : 'navStyleItem'}
                    style={{
                        marginRight: 10
                    }}
                >
                    Search Typing
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/searchBooksWithButton"
                    className={location.pathname === '/searchBooksWithButton' ? 'navStyleItem active' : 'navStyleItem'}
                >
                    Search Button
                </Button>
            </Box> */}
        </Grid>
    );
};

export default Nav;
