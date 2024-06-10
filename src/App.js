import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/dist/css/style.min.css';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import SearchBooks from './searchBooks';
import SearchBooksWithButton from './searchBooksWithButton';
import { Box } from "@mui/material";
import Grid from '@material-ui/core/Grid';
import Nav from './nav';

const App = () => (
  <ApolloProvider client={client}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <BrowserRouter>
        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              zIndex: -10,
            }}
          >
            <Box className="videoFx" />
            <video
              autoPlay
              loop
              muted
              playsInline
              data-wf-ignore="true"
              data-object-fit="cover"
              style={{
                width: '100%'
              }}
              className="videoFx"
            >
              <source
                src="https://cdn.prod.website-files.com/652e0352ad50feae8734edac/65642b22aff76e6b4c8c094e_Hero_D_video_comp-transcode.mp4"
                type="video/mp4"
                data-wf-ignore="true"
              />
              <source
                src="https://cdn.prod.website-files.com/652e0352ad50feae8734edac/65642b22aff76e6b4c8c094e_Hero_D_video_comp-transcode.webm"
                type="video/webm"
                data-wf-ignore="true"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <Nav />
          <Routes>
            <Route exact path="/" element={<SearchBooks />} />
            <Route path="/searchBooksWithButton" element={<SearchBooksWithButton />} />
          </Routes>
        </div>
      </BrowserRouter>
      <footer
        className='footerTxt'
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
          className='footerCopyTxt'
          style={{
            borderTop: '1px solid hsla(0,0%,100%,0.15)',
            paddingTop: '30px',
            textAlign: 'center',
          }}
        >
          © 2023 Ello Technology, Inc. All Rights Reserved.
        </p>
      </footer>
    </div>
  </ApolloProvider>
);

export default App;
