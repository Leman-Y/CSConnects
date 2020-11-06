// If you want to see the page then you need to create own route to display page

import React from 'react';
// Used as a wrapper for Google Calendar's Iframe
import Iframe from 'react-iframe'

function EventsTestPage() {
    return (
        <div>
            <p>EventsTestPage</p>
            <Iframe url="https://calendar.google.com/calendar/embed?src=csconnectsproject%40gmail.com&ctz=America%2FNew_York"
                    style={{border: 0}}
                    width="800"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
            />
        </div>
    );
}

export default EventsTestPage;
