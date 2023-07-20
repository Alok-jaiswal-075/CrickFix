import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
function Loading() {
  // List of quote objects
  const quoteList = [
    {
      quote: "People throw stones at you and you convert them into milestones",
      saidBy: "Sachin Tendulkar"
    },
    {
      quote: "You don't play for the crowd, You play for the country",
      saidBy: "M.S. Dhoni"
    },
    {
      quote: "First of all, convince yourself that you are the best because the rest of your life is going to go proving this to others",
      saidBy: "Wasim Akram"
    },
    {
      quote: "A wise man learns by the mistakes of others, A fool by own",
      saidBy: "Adam Gilchrist"
    },
    {
      quote: "If you want to do something, achieve something, you can’t be thinking all the time of what you don’t have",
      saidBy: "Kapil Dev"
    },
    {
      quote: "Nobody goes undefeated all the time. If you can pick up after a crushing defeat, and go on to win again, you are going to be a champion someday",
      saidBy: "Kumara Sangakkara"
    },
    {
      quote: "The bat is not a toy, it's a weapon",
      saidBy: "Virat Kohli"
    },
    {
      quote: "I am jealous of my parents. I will never have a kid as cool as theirs",
      saidBy: "Chris Gayle"
    },
    {
      quote: "I have failed more times than I have succeeded, but I never gave up, and will never give up, till my last breath, and that's what cricket has taught me",
      saidBy: "Yuvraj Singh"
    },
  ]
  // initialising quoteObj
  let quoteObj = quoteList[0]
  // FUnction that sets quoteObj to a random qoute object from quoteList
  const returnQuote = ()=>{
    let ind = Math.floor(Math.random() * quoteList.length)
    quoteObj = quoteList[ind]
  }
  // Calling the function to set quoteObj
  returnQuote()

  return (
    <div className='h-[100dvh] flex flex-col gap-2 items-center justify-center -z-1'>
        
      <div className='text-center w-[90%] sm:w-1/2 py-2'>
      <p className='text-xl text-col-text'>{quoteObj.quote}</p>
      <p className="text-lg text-col-text">- {quoteObj.saidBy}</p>
      </div>
        <SyncLoader color='#F95333' />
    </div>
  )
}

export default Loading