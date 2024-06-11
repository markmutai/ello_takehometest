import React, { useEffect, useRef, useState } from 'react';
import { useQuery, gql, ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { Button, TextField, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
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

const SearchBooksWithButton = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { loading, error, data } = useQuery(BOOKS_QUERY);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [openPopup, setOpenPopup] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [liveSearch, setLiveSearch] = useState(false);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const selectedBooksRef = useRef(null);
    const liveSearchRef = useRef(null);

    // check for any selected books on load
    useEffect(() => {
        const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks'));
        if (storedSelectedBooks) {
            setSelectedBooks(storedSelectedBooks);
        } else {
            setSelectedBooks([]);
        }
    }, []);

    //search for books by title or author in graphql
    useEffect(() => {
        if (data) {
            const results = data.books.filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBooks(results);
        }
    }, [searchTerm, data]);

    // add to selected books array and store in localstorage
    const addToSelectedBooks = (book) => {
        setSelectedBooks((prevSelectedBooks) => {
            const updatedSelectedBooks = [...prevSelectedBooks, book];
            localStorage.setItem('selectedBooks', JSON.stringify(updatedSelectedBooks));
            return updatedSelectedBooks;
        });
    };

    // remove from selected books array and remove from localstorage
    const removeFromSelectedBooks = (bookTitle) => {
        setSelectedBooks((prevSelectedBooks) => {
            const updatedSelectedBooks = prevSelectedBooks.filter((book) => book.title !== bookTitle);
            localStorage.setItem('selectedBooks', JSON.stringify(updatedSelectedBooks));
            return updatedSelectedBooks;
        });
    };

    // selected list popup function
    const togglePopup = () => {
        setOpenPopup((prevPopupState) => !prevPopupState);
    };


    // Scroll to selected list from view button inside book list
    const scrollToSelectedBooks = () => {
        if (selectedBooksRef.current) {
            setOpenPopup(false);
            const offset = -10; // Offset value
            const scrollToPosition = selectedBooksRef.current.offsetTop + offset;
            window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
        }
    };

    // close liveSearch with outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (liveSearchRef.current && !liveSearchRef.current.contains(event.target)) {
                setLiveSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // show results of search when button pressed
    const handleSearch = () => {
        setShowResults(true);
        setLiveSearch(false)
    };

    // show results of search when user presses enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            setLiveSearch(false)
        }
    };

    // show results from selected livesearch book
    const handleListItemClick = (book) => {
        setSearchTerm(book.title);
        handleSearch();
        setLiveSearch(false)
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
                        rel='noreferrer'
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
                                onClick={() => {
                                    setLiveSearch(true)
                                }}
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
                                className='fieldTxt'
                                style={{
                                    padding: '10px',
                                    width: 'calc(100% - 25px)',
                                    backgroundColor: 'hsla(0,50%,100%,0.9)',
                                    border: '2px solid hsla(180,50%,50%,0.9)',
                                    borderRadius: '40px',
                                }}
                            />
                            {searchTerm && filteredBooks.length > 0 && (
                                <div
                                    ref={liveSearchRef}
                                    className={`searchResultsWrapper ${liveSearch ? 'searchResultsOn' : 'searchResultsOff'}`}
                                >
                                    <div
                                        className='searchResults'
                                    >
                                        <List>
                                            {filteredBooks.map((book, index) => (
                                                <ListItem key={index} button onClick={() => handleListItemClick(book)}>
                                                    <ListItemText
                                                        className='searchResultsTxt'
                                                        primary={book.title} secondary={book.author} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </div>
                            )}
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
                            className={`selectedBooksWrapper ${openPopup ? 'selectedBooksPaddingOff' : 'selectedBooksPaddingOn'}`}
                        >
                            <Grid
                                container
                                justifyContent='center'
                                spacing={1}
                            >
                                {selectedBooks.map((book, index) => (
                                    <Grid item xs={12} sm={12} md={6} xl={6}>
                                        <div key={index}
                                            className={`selectedListWidth ${openPopup ? 'selectedClose' : 'selectedOpen'}`}>
                                            <div
                                                className='selectedBooksList'
                                            >
                                                <img
                                                    src={`${book.coverPhotoURL}`}
                                                    alt={book.title}
                                                    className='selectedImg'
                                                    style={{
                                                        border: '4px solid hsla(0,50%,100%,1)',
                                                        borderRadius: '5px',
                                                        boxShadow: '0 8px 12px hsla(0,50%,0%,0.1)',
                                                        margin: '0 auto'
                                                    }}
                                                />
                                                <div>
                                                    <h2 className='bookTitle'
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        {book.title}
                                                    </h2>
                                                    <p className='authorTxt'
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        {book.author}
                                                    </p>
                                                    <p className='readingLvlTxt'
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        Reading Level: <strong
                                                            style={{
                                                                fontWeight: 800
                                                            }}
                                                        >{book.readingLevel}</strong>
                                                    </p>
                                                </div>
                                            </div>

                                            {selectedBooks.find((selectedBook) => selectedBook.title === book.title) ? (
                                                <div
                                                    aria-label="Remove from list"
                                                    onClick={() => removeFromSelectedBooks(book.title)}
                                                    className='addRemoveBtn removeBtn'

                                                >
                                                    <p className='addRemoveTxt removeTxtSelected'
                                                        style={{
                                                            // marginTop: '20px',
                                                            borderTop: '2px solid hsla(0,100%,50%,0.5)'
                                                        }}
                                                    >
                                                        Remove from List
                                                    </p>
                                                </div>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                {showResults && !loading && !error && filteredBooks.length > 0 && (
                    <div>
                        <h3
                            className='searchListTitle'
                        >
                            Search Results
                        </h3>
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
                                                {selectedBooks.find((selectedBook) => selectedBook.title === book.title && selectedBook.author === book.author) ? (
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

export default SearchBooksWithButton;
