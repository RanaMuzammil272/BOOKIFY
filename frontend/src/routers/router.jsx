import {
    createBrowserRouter,
    RouterProvider,
    useParams,
  } from "react-router-dom";
import App from "../App"
import Home from "../pages/Homee/Home";
import SingleBook from "../AllBooks/SingleBook";
import ChatRoom from "../pages/Chat";
import About from "../components/About";
import AllBooks from "../AllBooks/allBooks";
import UploadBook from "../pages/UploadBook";
import UploadBlog from "../pages/UploadBlog";
import Login from "../pages/Loginform"
import AdminDashboard from "../pages/AdminDashboard"
import Payment from "../pages/Payment"
import BlogList from "../pages/BlogList";
import BlogPage from "../pages/BlogPage";
import DisplayPayments from "../pages/DisplayPayments";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      
      children: [
        {
            path: "/",
            element: <Home/>
        },
        
        {
          path: "/book/:id",
          element: <SingleBook/>,
          loader: ({ params }) => fetch(`http://localhost:5000/api/books/book/${params.id}`)
        },
        {
            path: "/chat",
            element: <ChatRoom/>,
        },
        {
          path: "/login",
          element: <Login/>,
      },
        {
            path: "/about",
            element: <About/>,
        },
        {
          path: "/payment",
          element: <Payment/>,
      },
        {
          path: "/allBooks",
          element: <AllBooks/>
        },
        {
          path: "/uploadBook",
          element: <UploadBook/>
        },
        {
          path: "/DisplayPayments",
          element: <DisplayPayments/>
        },
        {
          path: "/uploadBlog",
          element: <UploadBlog/>
        },
        {
          path: "/blog",
          element: <BlogList/>
        },
        {
          path: "/blog/:id",
          element: <BlogPage/>
        },
        {
          path: "/Dashboard",
          element: <AdminDashboard/>
        },

      ]
    }, 
  ]);

  export default router;