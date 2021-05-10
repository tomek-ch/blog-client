const url = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://lit-chamber-89885.herokuapp.com';

export default url;