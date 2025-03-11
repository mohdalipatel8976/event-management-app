import PageTitle from "../../../components/page-title";
import { getDateTimeFormat } from "../../../helpers/date-time-formats";
import usersGlobalStore, { UsersStoreType } from "../../../store/users-store";

function ProfilePage() {
  const { currentUser }: UsersStoreType = usersGlobalStore() as UsersStoreType;
  
  const renderUserProperty = (label: any, value: any) => {
    return (
      <div className="flex flex-col mb-4">
        <span className="text-gray-500 text-sm">{label}</span>
        <span className="text-gray-800 font-semibold text-base">{value}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <PageTitle title="Profile" />
      
      <div className="mt-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 text-xl font-bold">
              {currentUser?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentUser?.name || "User Profile"}</h2>
              <p className="text-gray-500">{currentUser?.email || "No email available"}</p>
            </div>
            <div className="ml-auto">
              <span className={`px-3 py-1 rounded-full text-sm ${currentUser?.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {currentUser?.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderUserProperty("User ID", currentUser?._id)}
            {renderUserProperty("Full Name", currentUser?.name)}
            {renderUserProperty("Email Address", currentUser?.email)}
            {renderUserProperty("Account Created", getDateTimeFormat(currentUser?.createdAt!))}
            {renderUserProperty("Account Status", currentUser?.isActive ? "Active" : "Inactive")}
            {renderUserProperty("User Role", currentUser?.isAdmin ? "Administrator" : "Standard User")}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Activity</h3>
          <p className="text-gray-500 italic">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
