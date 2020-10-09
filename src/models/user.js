const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            default: 0,
            validate(value){
                if(value < 0){
                    throw Error('Age must be a positive number!')
                }
            }
        },
        email: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw Error('Not a valid Email!');
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(value){
                if(value.toLowerCase().includes('password')){
                    throw Error('Password cannot contain "password"!')
                }
            },
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    }
)



//Available on instances (called instance Methods)
userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismytoken')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
 }

//Static methods are available on Model (called Model methods)
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login!')
    }

    return user
}


//Hash the plain text before shaving
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
}) 

const User = mongoose.model('User', userSchema)

module.exports = User