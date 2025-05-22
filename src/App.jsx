import React, { useState, useEffect } from 'react';

import './App.css';

const QUOTE_API_URL = "https://dummyjson.com/quotes";

export default function App() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [fade, setFade] = useState(true);

    const fetchQuote = async () => {
        setFade(false); // start fade-out
        try {
            const response = await fetch("https://dummyjson.com/quotes");
            const data = await response.json();

            const quotesArray = data.quotes;
            const randomIndex = Math.floor(Math.random() * quotesArray.length);
            const randomQuote = quotesArray[randomIndex];

            setTimeout(() => {
                setQuote(randomQuote.quote);
                setAuthor(randomQuote.author);
                setFade(true); // fade-in
            }, 300);
        } catch (error) {
            setQuote("Oops! Could not fetch quote.");
            setAuthor("");
            setFade(true);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="container">
            <div className={`quote-box ${fade ? "fade-in" : "fade-out"}`}>
                <p className="quote">“{quote}”</p>
                <p className="author">— {author || "Unknown"}</p>
            </div>
            <button className="btn" onClick={fetchQuote}>
                New Quote
            </button>
        </div>
    );
}
