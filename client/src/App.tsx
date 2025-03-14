import { BrowserRouter, Routes, Route } from "react-router-dom";
import Themeprovider from "./theme";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/private/home";
import ProfilePage from "./pages/private/profile";
import PublicLayout from "./layouts/public-layout";
import PrivateLayout from "./layouts/private-layout";
import EventsPage from "./pages/private/admin/events";
import CreateEventPage from "./pages/private/admin/events/create";
import EditEventPage from "./pages/private/admin/events/edit";
import EventInfoPage from "./pages/private/event";
import UserBooking from "./pages/private/profile/bookings";
import AdminBookingsPage from "./pages/private/admin/bookings";
import UsersPage from "./pages/private/admin/users";
import AdminReports from "./pages/private/admin/reports";

function App() {
  return (
    <Themeprovider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/"
            element={
              <PrivateLayout>
                <HomePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <ProfilePage />
              </PrivateLayout>
            }
          />

            <Route
              path="/profile/bookings"
              element={
                <PrivateLayout>
                  <UserBooking />
                </PrivateLayout>
              }
            />
          

          <Route
            path="/event/:id"
            element={
              <PrivateLayout>
                <EventInfoPage />
              </PrivateLayout>
            }/>

          <Route 
            path="/admin/events"
            element={
              <PrivateLayout>
                <EventsPage />
              </PrivateLayout>
            }
          />

          <Route 
            path="/admin/events/create"
            element={
              <PrivateLayout>
                <CreateEventPage />
              </PrivateLayout>
            }
          />

          <Route 
            path="/admin/events/edit/:id"
            element={
              <PrivateLayout>
                <EditEventPage />
              </PrivateLayout>
            }
          />

          <Route 
            path="/admin/bookings"
            element={
              <PrivateLayout>
                <AdminBookingsPage />
              </PrivateLayout>
            }
          />
        <Route 
            path="/admin/users"
            element={
              <PrivateLayout>
                <UsersPage />
              </PrivateLayout>
            }
          />

          <Route 
            path="/admin/reports"
            element={
              <PrivateLayout>
                <AdminReports />
              </PrivateLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Themeprovider>
  );
}

export default App;
