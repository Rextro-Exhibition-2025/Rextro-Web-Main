// Global Application Constants

// The main event start date: ReXtro Silver Jubilee Opening Ceremony
// Date: December 13, 2025 at 9:00 AM
export const EVENT_START_DATE = '2025-12-13T09:00:00';

// Helper to check if event has started
export const isEventStarted = (): boolean => {
    return new Date() >= new Date(EVENT_START_DATE);
};

// The event end date
export const EVENT_END_DATE = '2025-12-15T23:00:00';

// Helper to check if event has ended
export const isEventEnded = (): boolean => {
    return new Date() >= new Date(EVENT_END_DATE);
};
