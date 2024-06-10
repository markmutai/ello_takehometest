// import logo from './logo.svg';
import './App.css';
import './assets/dist/css/style.min.css';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import SearchBooks from './searchBooks';
import Grid from '@material-ui/core/Grid';

const App = () => (
    <ApolloProvider client={client}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <div
                style={{
                    flex: 1,
                }}
            >
                <SearchBooks />
            </div>
            <footer
                style={{
                    backgroundColor: '#2c3232',
                    padding: '20px 60px 15px',
                    color: '#fff',
                }}
            >
                <Grid container
                    direction='row'
                    justifyContent='start'
                    style={{
                        padding: '10px'
                    }}
                >
                    <Grid item>
                        <img
                            src="/assets/ello_footer-icon.svg" alt=""
                            style={{
                                width: '20px',
                                marginRight: '16px',
                                opacity: 0.75
                            }}
                        />

                    </Grid>
                    <Grid item>
                        Ello is a Public Benefit Corporation
                    </Grid>
                </Grid>
                <p
                    style={{
                        borderTop: '1px solid hsla(0,0%,100%,0.15)',
                        // marginTop: '30px',
                        paddingTop: '30px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}
                >
                    © 2023  Ello Technology, Inc. All Rights Reserved.
                </p>
            </footer>
        </div>
    </ApolloProvider>
);

export default App;
