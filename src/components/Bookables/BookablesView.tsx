import { useState } from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import { type Bookable } from "../../types";


export default function BookablesView() {
  const [bookable, setBookable] = useState<Bookable>();

  return (
    <>
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </>
  )
}