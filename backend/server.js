const express= require("express");
const userRoutes=require("./routes/userRoutes");
const bookRoutes=require("./routes/bookRoutes");
const blogRoutes=require("./routes/blogRoutes");
const connectDB = require("./congif/db");
const cors = require("cors");
const { createServer } = require('node:http');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const Message = require('./models/Message')
const User = require('./models/usermodel')
const Book = require('./models/Book')
const path = require('path');

const multer=require("multer")

const app = express();




connectDB();
app.use(
  cors({
    origin: 'http://localhost:5173', // Specify the allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization','X-Requested-With'],
    credentials:true, // Specify the allowed headers
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your React app's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const server = createServer(app);
const io = require('socket.io')(server,{
  cors:{
    origin:'http://localhost:5173',
    methods: ["GET","POST"] ,
    credentials:true,           
    
  },
})



app.use(express.urlencoded({extended: true}));

app.use(express.json());
server.listen(5000,console.log("server is on 5000"));


// Serve the PDF file

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './UploadedBooks'); 
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Keep the original filename
  }
});

const upload = multer({ storage: storage });


app.post('/api/books/upload',upload.single('file'), async (req, res) => {
  try {
    const newBook = new Book({
      bookTitle: req.body.bookTitle,
      authorName: req.body.authorName,
      imageURL: req.body.cover,
      category: req.body.category,
      bookDescription: req.body.description,
      bookPDF: req.file.filename 
    });

    // Save the book object to the database
    await newBook.save();
    console.log('Book saved successfully:', newBook);
    res.send('Book uploaded and saved successfully!');
  } catch (err) {
    console.error('Error saving book:', err);
    res.status(500).send('Error saving book to database');
  }
});
app.use('/api/user',userRoutes);
app.use('/api/books',bookRoutes);

app.use('/api/blogs',blogRoutes);
app.use(express.static('/UploadedBooks'));
// Add CORS middleware


// Serve the PDF file directly
const fs = require('fs');




app.get('/UploadedBooks/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'UploadedBooks', fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the file from the file system
    const file = fs.readFileSync(filePath);

    // Set the appropriate headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);

    // Send the file to the client
    res.send(file);
  } else {
    res.status(404).send('File not found');
  }
});



const rooms = ['General'];
app.get('/rooms', (req, res)=> {
  res.json(rooms)
})
async function getLastMessagesFromRoom(room){
    let roomMessages = await Message.aggregate([
      {$match: {to: room}},
      {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
    ])
    return roomMessages;
  }
  
  function sortRoomMessagesByDate(messages){
    return messages.sort(function(a, b){
      let date1 = a._id.split('/');
      let date2 = b._id.split('/');
  
      date1 = date1[2] + date1[0] + date1[1]
      date2 =  date2[2] + date2[0] + date2[1];
  
      return date1 < date2 ? -1 : 1
    })
  }
  
 
  
  io.on('connection', (socket)=> {
  
    socket.on('new-user', async ()=> {
      const members = await User.find();
      io.emit('new-user', members)
    })
  
    socket.on('join-room', async(newRoom, previousRoom)=> {
      socket.join(newRoom);
      socket.leave(previousRoom);
      let roomMessages = await getLastMessagesFromRoom(newRoom);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      socket.emit('room-messages', roomMessages)
    })
  
    socket.on('message-room', async(room, content, sender, time, date) => {
      const newMessage = await Message.create({content, from: sender, time, date, to: room});
      let roomMessages = await getLastMessagesFromRoom(room);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      // sending message to room
      io.to(room).emit('room-messages', roomMessages);
      socket.broadcast.emit('notifications', room)
    })
  
    
  
  })
  

app.use(notFound);
app.use(errorHandler);