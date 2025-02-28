import PropTypes from 'prop-types';

const Mailto = ({ email, name, oldHandicap, newHandicap }) => {
  const handleClick = () => {
    const subject = "Änderung Ihrer Golfwerte und neues Handicap";
    const body = `Hallo ${name},\n\n` +
                 `Wir möchten Sie darüber informieren, dass sich Ihre eingetragenen Werte geändert haben. ` +
                 `Ihr neues Handicap beträgt nun ${newHandicap} (vorher: ${oldHandicap}).\n\n` +
                 `Mit freundlichen Grüßen,\nIhr Golfclub-Team`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <button onClick={handleClick}>
      Send Email
    </button>
  );
};
Mailto.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  oldHandicap: PropTypes.number.isRequired,
  newHandicap: PropTypes.number.isRequired,
};

export default Mailto;
