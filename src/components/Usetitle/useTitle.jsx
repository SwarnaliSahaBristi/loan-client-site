import React, { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(() => {
    document.title = `${title} | LoanLink`;
  }, [title]);
};

export default useTitle;