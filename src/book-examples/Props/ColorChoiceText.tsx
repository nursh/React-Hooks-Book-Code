

export default function ColorChoiceText({ color }: { color: string }) {

  return (
    color ? (
      <p>The selected color is {color}</p>
    ) : (
      <p>No color has been selected.</p>
    )
  )
}