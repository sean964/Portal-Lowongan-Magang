import PageHaead from '../commons/pageHead';

const AuthLayout = ({ title, children }) => {
  return (
    <div>
      <PageHaead title={title} />
      <section>{children}</section>
    </div>
  );
};

export default AuthLayout;
