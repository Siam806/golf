const Mailto = (email, name, oldHandicap, newHandicap) => {
  const subject = "Änderung Ihrer Golfwerte und neues Handicap";
  const body = `Hallo ${name},\n\n` +
               `Wir möchten Sie darüber informieren, dass sich Ihre eingetragenen Werte geändert haben. ` +
               `Ihr neues Handicap beträgt nun ${newHandicap} (vorher: ${oldHandicap}).\n\n` +
               `Mit freundlichen Grüßen,\nIhr Golfclub-Team`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
export default Mailto;