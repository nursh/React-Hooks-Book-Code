import { useEffect, useState } from "react";
import './Greet.css';

export default function Greeting() {

  const greetings = ["Hello", "Ciao", "Hola", "こんにちは"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.title = greetings[index]
  })

  function updateGreeting() {
    setIndex(Math.floor(Math.random() * greetings.length));
  }

  return (
    <div style={{ marginTop: '30' }}>
      <button onClick={updateGreeting} className="button">Say Hi</button>
    </div>
  )
}