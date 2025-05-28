import { useMemo, useState } from "react";
import { getAnagrams, getDistinct } from "../../utils/anagrams";

export default function Anagram() {
  const [sourceText, setSourceText] = useState("ball");
  const [useDistinct, setUseDistinct] = useState(false);
  const [showAnagrams, setShowAnagrams] = useState(false);

  const anagrams = useMemo(() => getAnagrams(sourceText), [sourceText]);
  const distinct = useMemo(() => getDistinct(anagrams), [anagrams]);

  return (
    <div className="app">
      <h1>Anagrams</h1>
      <label htmlFor="txtPhrase">Enter some text...</label>
      <input
        type="text"
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value.slice(0, 10))}
      />

      <div className="count">
        {useDistinct ? (
          <p>There are {distinct.length} distinct anagrams.</p>
        ) : (
          <p>
            There are {anagrams.length} anagrams of "{sourceText}"
          </p>
        )}
      </div>

      <p>
        <label>
          <input
            type="checkbox"
            checked={useDistinct}
            onClick={() => setUseDistinct((s) => !s)}
          />
          Distinct
        </label>
      </p>
      <p>
        <label>
          <input
            type="checkbox"
            checked={showAnagrams}
            onChange={() => setShowAnagrams((s) => !s)}
          />
          Show
        </label>
      </p>

      {showAnagrams && <p className="anagrams">{distinct.map(a => <span key={a}>{a}{`  `}</span>)}</p>}
    </div>
  );
}
