import usersGlobalStore, { UsersStoreType } from "../../../store/users-store";


function HomePage() {

  const { currentUser } = usersGlobalStore() as UsersStoreType;
  
  return (
    <div className="p-5">
      <h1>Homepage</h1>
      <p>Welcome, {currentUser?.name}!</p>
    </div>
  );
}

export default HomePage