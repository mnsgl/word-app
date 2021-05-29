export default function useCheck(name, pass, mail = null) {
  let errs = {};
  if (!name) {
    errs.name = "Invalid username";
  } else if (name.length < 6 || name.length > 18) {
    errs.name = "Username length must be between 6 and 18";
  }
  if (mail !== null && !mail) {
    errs.mail = "Invalid mail";
  } else if (mail !== null && !/^[^\s@]+@[^\s@]+$/.test(mail)) {
    errs.mail = "Invalid mail";
  }
  if (!pass) {
    errs.pass = "Invalid password";
  } else if (pass.length < 6 || pass.length > 18) {
    errs.pass = "Password length must be between 6 and 18";
  }
  return errs;
}
