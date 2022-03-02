const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({

    name: { type: String,required:[true,"Enter Your name"], trim: true },
    
    description: { type: String,required:[true,"Enter Your description"] },

    price: { type: Number,
        maxlength: [8, 'Price cannot exceeds 8 character']
    },

    rating: {
        type: Number,
        default: 0
    },

    images: [
        {
            public_id: {
                type: String,

            },
            url: {
                type: String,

            }
        }
    ],

    category: {
        type: String,
        

    },

    Stock: {
        type: Number,
        maxlength: [4, 'Stock cannot excees 4 characters'],
        default: 1
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    reviews: [

        {
            name: {
                type: String,

            },
            rating: {
                type: Number,

            },
            commet: {
                type: String,

            }
        }


    ],
    user:{
     type:mongoose.Schema.ObjectId,
     ref:"User",
     required:true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema)