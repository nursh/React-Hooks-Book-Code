import './Greet.css';
import { useRandomTitle } from "./useRandomTitle";

const greetings = ["Hello", "Ciao", "Hola", "こんにちは", 'Ina kwana'];

export default function Greeting() {

  const nextTitle = useRandomTitle(greetings);

  return (
    <div style={{ marginTop: 30 }}>
      <button onClick={nextTitle} className="button">Say Hi</button>
    </div>
  )
}

