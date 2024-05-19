const express=require("express");
const Book=require("../models/Book")
const router =express.Router();
const multer=require("multer")
const Order =require('../models/Orders')
const Accounts=require('../models/Accounts')
router.route("/upload-book").post(async (req, res) => {
   try {
       const newBook = new Book(req.body);
       const savedBook = await newBook.save();
       res.send(savedBook);
   } catch (error) {
       res.status(500).send(error);
   }
});

router.route("/book/:id").patch(async (req, res) => {
   try {
       const id = req.params.id;
       const updateBookData = req.body;
       const updatedBook = await Book.findByIdAndUpdate(id, updateBookData, { new: true });
       if (!updatedBook) {
           return res.status(404).send("Book not found");
       }
       res.send(updatedBook);
   } catch (error) {
       res.status(500).send(error);
   }
});

router.route("/book/:id").delete(async (req, res) => {
   try {
       const id = req.params.id;
       
       // Find and delete the book document using Mongoose findByIdAndDelete method
       const deletedBook = await Book.findByIdAndDelete(id);
       
       // If the book doesn't exist, return a 404 response
       if (!deletedBook) {
           return res.status(404).send("Book not found");
       }
       
       // Send the deleted book as response
       res.send(deletedBook);
   } catch (error) {
       // Handle any errors that occur during deletion
       res.status(500).send(error);
   }
});


//Find By Category
router.route("/all-books").get(async (req, res) => {
   try {
       let query = {};
       if (req.query.category) {
           query = { category: req.query.category };
       }
       const books = await Book.find(query);
       res.send(books);
   } catch (error) {
       res.status(500).send(error);
   }
});


//to get single book data
router.route("/book/:id").get(async (req, res) => {
   try {
       const id = req.params.id;
      
       const book = await Book.findById(id);
       
       // If the book doesn't exist, return a 404 response
       if (!book) {
           return res.status(404).json({ error: "Book not found" });
       }
       
       // Send the found book as response
       res.json(book);
   } catch (error) {
       // Handle any errors that occur during retrieval
       res.status(500).send(error);
   }
});
router.route("/dash/orders").get(async(req,res)=>{

  try {
      
      const orders=await Order.find();
      res.status(202).json({data:orders})


  } catch (error) {
      res.status(500).send(error);
      
  }
})
.post(async(req,res)=>{

  try {
      const neworder=new Order(req.body)
      const savedorder=await neworder.save()
      res.status(202).json({data:savedorder})


  } catch (error) {
      res.send(error)
  }
})

router.route('/dash/paymentadd').post(async(req,res)=>{
  try {
      const num=req.body.Cardno
      const search=await Accounts.findOne({"Cardno":num})
      
      if(search){
          res.send("card already exists")
      }else{

          const newaccount=new Accounts(req.body)
          const saved=await newaccount.save()
          res.status(202).json({data:saved})
      }
      

  } catch (error) {
      res.send(error)
  }
})
/*const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './UploadedBooks'); 
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Keep the original filename
  }
});

const upload = multer({ storage: storage });


router.route('/upload').post(upload.single('file'), async (req, res) => {
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
});*/
  

module.exports=router;