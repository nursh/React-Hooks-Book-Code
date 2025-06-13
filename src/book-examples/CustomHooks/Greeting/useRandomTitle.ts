import { useEffect, useState } from "react";


const getRandomIndex = (length: number) => Math.floor(Math.random() * length);


export function useRandomTitle(titles: string[] = ['Hello']) {

  const [index, setIndex] = useState(() => getRandomIndex(titles.length));
  useDocumentTitle(titles[index]);

  return () => setIndex(getRandomIndex(titles.length));
}

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title])
}