import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';


function FontsLoader() {
    return (
        <GoogleFontLoader
            fonts={[
                {
                    font: 'Playfair Display',
                    weights: [400, 800],
                }
            ]}
        />

    );
}


export default React.memo(FontsLoader);
