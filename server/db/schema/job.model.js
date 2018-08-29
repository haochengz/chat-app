
import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  publisher: {
    required: true,
    type: String
  },
  title: String,
  position: String,
  requirement: String,
  location: String,
  type: String,
  salary: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

jobSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.model('Job', jobSchema)
