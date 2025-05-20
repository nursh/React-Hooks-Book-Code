import { useEffect, useState } from "react";

export default function SayHello() {

  const greetings = ["Hello", "Ciao", "Hola", "こんにちは"];
  const [index, setIndex] = useState(0);

  // This is run after every render, because there is not second argument to useEffect
  useEffect(() => {
    document.title = greetings[index]
  })

  function updateGreeting() {
    setIndex(Math.floor(Math.random() * greetings.length));
  }

  return (
    <button onClick={updateGreeting}>Say Hi</button>
  )
}