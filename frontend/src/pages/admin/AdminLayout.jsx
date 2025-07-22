import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-full md:w-64 p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "block font-semibold text-blue-400" : "block"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/appointments"
            className={({ isActive }) =>
              isActive ? "block font-semibold text-blue-400" : "block"
            }
          >
            Appointments
          </NavLink>
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) =>
              isActive ? "block font-semibold text-blue-400" : "block"
            }
          >
            Blogs
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
