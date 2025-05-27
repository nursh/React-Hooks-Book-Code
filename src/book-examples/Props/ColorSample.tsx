

export default function ColorSample({ color = 'white' }: { color: string }) {

  return (
    color ? (
      <div style={{ background: color, height: 100, width: 100, borderRadius: '50%', marginInline: 'auto' }} />
    ) : null
  )
}