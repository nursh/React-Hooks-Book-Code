type Props = {
  color: string;
  setColor: (color: string) => void;
  colors: Array<string>;
};

export default function ColorPicker({ color, colors = [], setColor }: Props) {
  return (
    <ul
      style={{ listStyle: "none", display: "flex", justifyContent: "center", alignItems: 'center', gap: 10 }}
    >
      {colors.map((clr) => (
        <li
          key={clr}
          onClick={() => setColor(clr)}
          style={{ background: clr, height: clr === color ? 150 : 100, width: clr === color ? 150 : 100 }}
        >
          {clr}
        </li>
      ))}
    </ul>
  );
}
