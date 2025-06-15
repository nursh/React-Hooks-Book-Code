import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import { type Bookable } from "../../types";
import useFetch from "../../utils/useFetch";
import { Link, useParams } from "react-router";
import PageSpinner from "../UI/PageSpinner";
import { FaPlus } from "react-icons/fa";


export default function BookablesView() {
  
  const {
    data: bookables = [],
    status,
    error
  } = useFetch<Bookable[]>('http://localhost:3001/bookables');

  const { id } = useParams<string>();
  const bookable = id ? bookables.find(
    b => b.id === parseInt(id, 10)
  ) || bookables[0] : bookables[0];

  if (status === 'error') {
    return <p>{error?.message}</p>
  }

  if (status === 'loading') {
    return <PageSpinner />
  }

  return (
    <main className="bookables-page">
      <div>
        <BookablesList bookable={bookable} bookables={bookables} getUrl={(id: number) => `/bookables/${id}`} />
        <p className="controls">
          <Link to="/bookables/new" replace={true} className="btn">
            <FaPlus />
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable} />
    </main>
  )
}