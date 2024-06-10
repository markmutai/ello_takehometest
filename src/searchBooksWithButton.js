import React, { useEffect, useRef, useState } from 'react';
import { useQuery, gql, ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { Button, TextField, InputAdornment } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import { Box } from "@mui/material";
import { PiCaretDownDuotone } from "react-icons/pi";
import { RiSearch2Line } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const BOOKS_QUERY = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const SearchBooks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { loading, error, data } = useQuery(BOOKS_QUERY);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [openPopup, setOpenPopup] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const selectedBooksRef = useRef(null);

    useEffect(() => {
        const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks'));
        if (storedSelectedBooks) {
            setSelectedBooks(storedSelectedBooks);
        } else {
            setSelectedBooks([]);
        }
    }, []);

    const filteredBooks = data?.books?.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToSelectedBooks = (book) => {
        setSelectedBooks((prevSelectedBooks) => {
            const updatedSelectedBooks = [...prevSelectedBooks, book];
            localStorage.setItem('selectedBooks', JSON.stringify(updatedSelectedBooks));
            return updatedSelectedBooks;
        });
    };

    const removeFromSelectedBooks = (bookTitle) => {
        setSelectedBooks((prevSelectedBooks) => {
            const updatedSelectedBooks = prevSelectedBooks.filter((book) => book.title !== bookTitle);
            localStorage.setItem('selectedBooks', JSON.stringify(updatedSelectedBooks));
            return updatedSelectedBooks;
        });
    };

    const togglePopup = () => {
        setOpenPopup((prevPopupState) => !prevPopupState);
    };

    const scrollToSelectedBooks = () => {
        if (selectedBooksRef.current) {
            setOpenPopup(false);
            const offset = -10; // Offset value
            const scrollToPosition = selectedBooksRef.current.offsetTop + offset;
            window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
        }
    };

    const handleSearch = () => {
        setShowResults(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <ApolloProvider client={client}>
            <div>
                <Grid container
                    alignContent='center'
                    justifyContent='center'
                    direction='column'
                    spacing={21}
                    style={{
                        marginBottom: '30px',
                    }}
                >
                    <a
                        href='https://www.ello.com/'
                        target='_blank'
                        style={{
                            width: '120px',
                            height: 'auto',
                            margin: '10px auto 0',
                        }}
                    >
                        <img src="ello-logo.png" alt=""
                            style={{
                                width: '120px',
                                height: 'auto',
                            }}
                        />
                    </a>
                    <h1
                        className='appTitle'
                        style={{
                            margin: '0px auto 15px',
                        }}
                    >
                        Book Search
                    </h1>
                    <Grid container
                        spacing={2}
                        justifyContent='center'
                        className='searchContainer'
                    >
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                variant='standard'
                                placeholder="Search for book or author"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="end">
                                            <RiSearch2Line style={{
                                                position: 'absolute',
                                                right: 15,
                                                color: '#5ACCCC',
                                                fontSize: '24px'
                                            }} />
                                        </InputAdornment>
                                    ),
                                }}
                                style={{
                                    padding: '10px',
                                    width: 'calc(100% - 25px)',
                                    backgroundColor: 'hsla(0,50%,100%,0.9)',
                                    border: '2px solid hsla(180,50%,50%,0.9)',
                                    borderRadius: '40px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="standard"
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: '#5acccc',
                                    color: '#fff',
                                    borderRadius: '40px',
                                }}
                                onClick={handleSearch}
                                className='btnStyle'
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                    {loading &&
                        <p
                            className='loadingTxt'
                        >
                            Loading...
                        </p>}
                    {error &&
                        <p>
                            Error: {error.message}
                        </p>}
                    {showResults && searchTerm && !loading && !error && filteredBooks.length === 0 && (
                        <p
                            style={{
                                textAlign: 'center',
                                marginTop: '30px',
                                color: '#5ACCCC'
                            }}
                        >
                            No results found for <strong>"{searchTerm}"</strong>.
                        </p>
                    )}
                    <button
                        className='viewSelectedBtn'
                        onClick={() => {
                            togglePopup();
                        }}
                    >
                        View Selected Books
                        <div className='caretWrapper'>
                            <PiCaretDownDuotone className={`caretIcon ${openPopup ? 'caretClose' : 'caretOpen'}`} />
                        </div>
                    </button>
                    <div
                        ref={selectedBooksRef}
                    />
                    <Box
                        alignContent='center'
                        justifyContent='center'
                    >
                        <Grid item
                            justifyContent='center'
                            className='selectedBooksWrapper'
                        >
                            {selectedBooks.map((book, index) => (
                                <div key={index}
                                    className={`${openPopup ? 'selectedClose' : 'selectedOpen'}`}>
                                    <h2 className='bookTitle'>
                                        {book.title}
                                    </h2>
                                    <p className='authorTxt'>
                                        {book.author}
                                    </p>
                                    <p className='readingLvlTxt'>
                                        Reading Level: <strong
                                            style={{
                                                fontWeight: 800
                                            }}
                                        >{book.readingLevel}</strong>
                                    </p>
                                    {selectedBooks.find((selectedBook) => selectedBook.title === book.title) ? (
                                        <div
                                            aria-label="Remove from list"
                                            onClick={() => removeFromSelectedBooks(book.title)}
                                            className='addRemoveBtn removeBtn'

                                        >
                                            <p className='addRemoveTxt removeTxtSelected'
                                                style={{
                                                    marginTop: '20px',
                                                    borderTop: '2px solid hsla(0,100%,50%,0.25)'
                                                }}
                                            >
                                                Remove from List
                                            </p>
                                        </div>
                                    ) : (
                                        null
                                    )}
                                </div>

                            ))}
                        </Grid>
                    </Box>
                </Grid>
                {showResults && !loading && !error && filteredBooks.length > 0 && (
                    <div>
                        <Grid container
                            spacing={2}
                            justifyContent='center'
                            style={{
                                width: '100%',
                                padding: '10px 30px 40px',
                                margin: '0 auto',
                            }}
                        >
                            {filteredBooks.map((book, index) => (
                                <Grid item
                                    key={index}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    xl={2}
                                >
                                    <Box
                                        className='boxStyling'
                                        style={{
                                            padding: '20px 30px 15px',
                                            border: '2px solid hsla(0,50%,100%,0.6)',
                                            borderRadius: '8px',
                                            boxShadow: '8px 8px 12px hsla(0,0%,50%,0.1)'
                                        }}>
                                        <img
                                            src={`${book.coverPhotoURL}`}
                                            alt={book.title}
                                            style={{
                                                width: '100%',
                                                border: '4px solid hsla(0,50%,100%,1)',
                                                borderRadius: '5px',
                                                boxShadow: '0 8px 12px hsla(0,50%,0%,0.1)'
                                            }}
                                        />
                                        <div
                                            className='infoWrapper'
                                        >
                                            <h2 className='bookTitle'>
                                                {book.title}
                                            </h2>
                                            <p className='authorTxt'>
                                                {book.author}
                                            </p>
                                            <p className='readingLvlTxt'>
                                                Reading Level: <strong
                                                    style={{
                                                        fontWeight: 800
                                                    }}
                                                >{book.readingLevel}</strong>
                                            </p>
                                            <div className='addRemoveWrapper'>
                                                {selectedBooks.find((selectedBook) => selectedBook.title === book.title) ? (
                                                    <div className='removeBox'>
                                                        <Box
                                                            aria-label="Remove from list"
                                                            onClick={() => removeFromSelectedBooks(book.title)}
                                                            className='addRemoveBtn removeBtn'
                                                        >

                                                            <p className='addRemoveTxt'>
                                                                <AiOutlineMinus
                                                                    style={{
                                                                        margin: '0 10px 0 -10px'
                                                                    }}
                                                                />
                                                                Remove from List
                                                            </p>
                                                        </Box>
                                                    </div>
                                                ) : (
                                                    <div className='addBox'>
                                                        <Box
                                                            aria-label="Add to list"
                                                            onClick={() => addToSelectedBooks(book)}
                                                            className='addRemoveBtn addBtn'
                                                        >

                                                            <p className='addRemoveTxt'>
                                                                <AiOutlinePlus
                                                                    style={{
                                                                        margin: '0 10px 0 -10px'
                                                                    }}
                                                                />
                                                                Add to List
                                                            </p>
                                                        </Box>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                className='viewSelectBtnBox'
                                                onClick={scrollToSelectedBooks}
                                            >
                                                View Selected Books
                                            </button>
                                        </div>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}
            </div>
        </ApolloProvider >
    );
};

export default SearchBooks;
