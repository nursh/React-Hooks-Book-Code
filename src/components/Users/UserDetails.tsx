import type { User } from "../../types";

type Props = {
  user: User | null;
};

export default function UserDetails({ user }: Props) {
  return (
    user ? (
      <div className="item user">
        <div className="item-header">
          <h2>{user.name}</h2>
        </div>
        <div className="item-details">
          <h3>{user.title}</h3>
          <p>{user.notes}</p>
        </div>
      </div>
    ) : null
  );
}
