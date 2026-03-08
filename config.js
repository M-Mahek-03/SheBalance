// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:5001/api',
    BACKEND_URL: 'http://localhost:5001'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
