const { google } = require('googleapis')
const { OAuth2 } = google.auth
var dotenv = require('dotenv');
dotenv.config();

// Create new instance of oAuth and set Client ID & Client Secret
const oAuth2Client = new OAuth2(
    process.env.CLIENT_ID, process.env.CLIENT_SECRET
)

oAuth2Client.setCredentials({
    refresh_token:
        process.env.REFRESH_TOKEN
})

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const eventStartTime = new Date()

eventStartTime.setDate(eventStartTime.getDate() + 1);

const eventEndTime = new Date()

eventEndTime.setDate(eventEndTime.getDate() + 1);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// Dummy event for testing
const event = {
    summary: 'Meet with David',
    location: '295 California St, San Francisco, CA 941111',
    description: 'Meeting with David to talk about new client project',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/New_York'
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/New_York'
    },
    // Determines the color of the event on the Google Calendar
    colorId: 2
}

const event2 = {
    summary: 'Meet with Bob',
    location: '295 California St, San Francisco, CA 941111',
    description: 'Meeting with David to talk about new client project',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/New_York'
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/New_York'
    },
    // Determines the color of the event on the Google Calendar
    colorId: 2
}

/**
 * Checks to see if you are free or busy for a particular time slot, to avoid events that have the same time and date.
 * If you are free, then it will insert the event.
 *
 * Note:
 * - If you do not want to use the freebusy query, you can just use calendar.events.insert
 */
calendar.freebusy.query({
    resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
            timeZone: 'America/New_York',
        // Array of objects for all calendar ids for user. Check to see if someone is free or busy.
        items: [{id: 'primary'}]
    }
}, (err, res) => {
        if (err) return console.error('Free Busy Query Erro: ', err);

        const eventsArr = res.data.calendars.primary.busy

        if (eventsArr.length === 0)
            return calendar.events.insert(
                {calendarId: 'primary', resource: event},
                err => {
                    if (err) return console.error('Calendar Event Creation Error: ', err)
                    else
                    {
                        return console.log('Calendar Event Created.')
                    }
                })
        else
            return console.log(`Sorry I'm Busy`);
})

calendar.events.insert(
    {calendarId: 'primary', resource: event2},
    err => {
        if (err) return console.error('Calendar Event Creation Error: ', err)
        else
        {
            return console.log('Calendar Event Created.')
        }
})











