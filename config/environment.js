const development = {
    name: "development",
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db:'codeial_development',

    google_client_ID: "865926133090-215hdn9b8i32du26cb7bs1cnmfvjakeq.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_call_back_URL: "http://localhost:3000/users/auth/google/callback",

    jwt_secret: 'codeial',
    
}

const production = {
    name: "production"
}

module.exports = development;