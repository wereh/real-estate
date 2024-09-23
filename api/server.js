import express from 'express';

const app = express();


//listen on http://localhost:5000

app.listen(3000, () => {
    console.log('Server started on port 3000')
});