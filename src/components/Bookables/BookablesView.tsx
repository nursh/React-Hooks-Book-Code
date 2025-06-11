import { useState, useCallback } from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import { type Bookable } from "../../types";


export default function BookablesView() {
  const [bookable, setBookable] = useState<Bookable | null>(null);
  
  const updateBookable = useCallback((b: Bookable | null) => {
    if (b) {
      console.log(b.title);
      setBookable(b);
    }
  }, []);

  return (
    <>
      <BookablesList bookable={bookable} setBookable={updateBookable} />
      <BookableDetails bookable={bookable} />
    </>
  )
}