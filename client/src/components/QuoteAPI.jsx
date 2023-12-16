import React, { useState, useEffect } from 'react';

export const QuoteAPI = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const quoteData = await response.json();

        if (quoteData && quoteData.content) {
          setQuote({ content: quoteData.content, author: quoteData.author });
        } else {
          console.error('Invalid quote data');
        }
      } catch (error) {
        console.error('Error fetching quote:', error.message);
      }
    };

    fetchQuote();
  }, []); 

  return (
    <div>
      <div>
        <p>{quote.content}</p>
        <p>- {quote.author}</p>
      </div>
    </div>
  );
};