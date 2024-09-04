const mongoose = require('mongoose');
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        // required: true,
        trim: true,
    },
    last_name: {
        type: String,
        // required: true,
        trim: true,
    },
    phone: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    state: {
        type: String,
        lowercase: true,
    },
    '--v': {
        type: Number,
        select: false 
    },
    verified: {
        type: Boolean,
        default: false,
    }    
}, { timestamps: true});

// userSchema.pre('save', function (next) {
//     const now = moment(); 
//     const istNow = now.add(5, 'hours').add(30, 'minutes').toDate(); // Add 5 hours and 30 minutes
//     this.createdAt = istNow;
//     this.updatedAt = istNow;
    
//     next();
// });
module.exports = mongoose.model('User', userSchema);
