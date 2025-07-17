export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const GET_LOGS = `${BASE_URL}/logs`;
export const GET_EVENT_COUNT = `${BASE_URL}/event-count`;
export const GET_EVENTS_BY_HOUR = `${BASE_URL}/events-by-hour`;
