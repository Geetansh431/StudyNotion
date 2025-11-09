/**
 * Logger utility to control console output
 * Set ENABLE_LOGS to false to suppress all console.logs in development
 */

const ENABLE_LOGS = false; // Change to true to see logs

export const logger = {
  log: (...args) => {
    if (ENABLE_LOGS && process.env.NODE_ENV === 'development') {
      console.log(...args);
    }
  },
  
  error: (...args) => {
    // Always show errors
    console.error(...args);
  },
  
  warn: (...args) => {
    if (ENABLE_LOGS && process.env.NODE_ENV === 'development') {
      console.warn(...args);
    }
  },
  
  info: (...args) => {
    if (ENABLE_LOGS && process.env.NODE_ENV === 'development') {
      console.info(...args);
    }
  }
};

// Export as default for easier imports
export default logger;

