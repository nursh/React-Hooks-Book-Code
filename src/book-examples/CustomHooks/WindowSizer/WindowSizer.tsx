import useWindowSize from "./useWindowSize";

export default function WindowSizer() {

  const { height, width} = useWindowSize();
  return (
    <p>Width: {width}, Height: {height}</p>
  )
}