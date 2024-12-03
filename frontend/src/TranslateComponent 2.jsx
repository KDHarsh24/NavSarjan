import React, {useEffect, useRef} from "react";

const TranslateComponent = () => {
    const googleTranslateRef = useRef(null);
    useEffect(() => {
        let intervalid;
        const checkGoogleTranslate = () => {
            if (window.google && window.google.translate){
                clearInterval(intervalid);
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, includedLanguages : 'en,gu,hi' },
                    googleTranslateRef.current
                );
            }
        };
        intervalid = setInterval(checkGoogleTranslate, 100);
    }, []);
    return (
        <div>
            <div ref={googleTranslateRef}></div>
        </div>
    );
}

export default TranslateComponent