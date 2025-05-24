import { useRef, useState } from "react";


export default function Counter() {
  const [count, setCount] = useState(1);
  const ref = useRef(1);

  const incCount = () => setCount(count => count + 1);
  const incRef = () => ref.current++


  return (
    <div>
      <button onClick={incCount}>count: {count}</button>
      <hr />
      <button onClick={incRef}>ref: {ref.current}</button>
    </div>
  )
}