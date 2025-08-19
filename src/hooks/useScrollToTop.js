import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        // Scroll the window to the top.
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null;
}

export default ScrollToTop;