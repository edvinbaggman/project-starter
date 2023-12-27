interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className='w-screen min-h-screen flex flex-col items-center justify-center'>
        {children}
      </div>
    </>
  );
};
export default Layout;
