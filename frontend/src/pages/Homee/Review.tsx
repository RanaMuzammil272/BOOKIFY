import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../components/InfiniteMovingCards"

const Review = () => {
    return (
      <>
        <div className="flex justify-center text-4xl font-extrabold	mb-0 mt-20">Testimonials</div>
        <div className="h-[25rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden text-black">
      <InfiniteMovingCards 
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
    </>
      );
}
 
const testimonials = [
    {
      quote:
      "Amazing selection and lightning-fast delivery! I ordered a boombox from this website and was blown away by the quality of the sound and how quickly it arrived. Definitely my go-to place for all things boom-related",
      name: "Mark Ping",
      title: "CEO, Netflix",
    },
    {
      quote:
        "Superb customer service! I had a few questions about which boombox would be best for my needs, and the staff at this website were incredibly helpful and knowledgeable. They guided me to the perfect product, and I couldn't be happier with my purchase!",
      name: "Rana Muzammil",
      title: "SCRUM MASTER, BOOKIFY",
    },
    {
      quote: "As someone deeply interested in understanding the history of slavery and the struggles of my ancestors, I was disappointed to find a lack of resources on this website pertaining to the topic. I was hoping to educate myself further by finding a book on slavery and the rights of slaves like me who endured it. It's disheartening to see such an important subject overlooked in the product selection. I hope the website considers diversifying their offerings to include literature that addresses these issues that my ancestors faced",
      name: "Ali Watta",
      title: "Student, FAST-NUCES",
    },
    {
      quote:
        "Great value for money! I was pleasantly surprised by the affordable prices on this website. I was able to find a high-quality boombox at a fraction of the cost compared to other retailers. Will definitely be recommending this site to my friends!",
      name: "Elon Musk",
      title: "Owner, Twitter",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Muhammad Taha",
      title: "Owner, Bookify",
    },
  ];

export default Review