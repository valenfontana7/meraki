import axios from 'axios';
import {GET_RATING} from './ratingconstants';


const getRating = rating => {
    return {
        type: GET_RATING,
        rating,
    };
};

const fetchRating = productId => dispatch =>
axios.get(`http://localhost:3001/products/${productId}/review`)
.then(res => res.data.reviews)
.then(reviews => {
    dispatch(getRating(reviews));
});

export {getRating, fetchRating}