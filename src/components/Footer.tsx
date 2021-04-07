/**
 * Game App Footer component
 * @returns
 */
const Footer = () => {
  // Get current date - To be used in Footer
  const date = new Date();

  return (
    <div className="footer">
      <span>&copy; {date.getFullYear()}. Game Demo Inc</span>
    </div>
  );
};

export default Footer;
