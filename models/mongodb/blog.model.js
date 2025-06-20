import { MongoClient, ObjectId } from 'mongodb'

const DEFAULT_CONFIG =
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8'

const uri = process.env.URI_MONGODB ?? DEFAULT_CONFIG
const client = new MongoClient(uri)

async function connect() {
  try {
    await client.connect()
    const database = client.db('blogs')
    return database.collection('blog')
  } catch (error) {
    console.error('Error connecting to the database')
    await client.close()
  }
}

export class BlogModel {
  static async getAll({ term }) {
    const db = await connect()
    if (term) {
      try {
        const result = await db
          .find({
            $or: [
              {
                title: {
                  $regex: term,
                  $options: 'i'
                }
              },
              {
                content: {
                  $regex: term,
                  $options: 'i'
                }
              },
              {
                category: {
                  $regex: term,
                  $options: 'i'
                }
              }
            ]
          })
          .toArray()
        return result
      } catch (error) {
        console.log('error filtering')
      }
    }
    try {
      const result = await db.find({}).toArray()
      return result
    } catch (error) {
      console.log('error getting all')
      return false
    }
  }

  static async getById({ id }) {
    const db = await connect()
    try {
      const oid = new ObjectId(id)
      const result = await db.findOne({ _id: oid })
      return result
    } catch (error) {
      console.log('error find one')
      return false
    }
  }

  static async create({ input }) {
    const db = await connect()
    const newPost = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    try {
      const { insertedId } = await db.insertOne(newPost)
      return insertedId
    } catch (error) {
      console.log('error on create')
      return false
    }
  }

  static async update({ id, input }) {
    const db = await connect()
    const updatedPost = {
      ...input,
      updatedAt: new Date()
    }
    try {
      const oid = new ObjectId(id)
      const result = await db.updateOne({ _id: oid }, { $set: updatedPost })
      return result.modifiedCount
    } catch (error) {
      console.log('id does not exist')
      return false
    }
  }

  static async delete({ id }) {
    const db = await connect()
    try {
      const oid = new ObjectId(id)
      const result = await db.deleteOne({ _id: oid })
      return result.deletedCount
    } catch (error) {
      console.log('error on delete')
      return false
    }
  }
}
