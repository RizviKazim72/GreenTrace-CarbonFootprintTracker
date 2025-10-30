import Navbar from './Navbar';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
