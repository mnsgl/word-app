export default function useCheck(name, pass) {
  let errs = {};
  if (!name) {
    errs.name = "Username is invalid";
  } else if (name.length < 6 || name.length > 18) {
    errs.name = "Username length must be between 6 and 18";
  }
  if (!pass) {
    errs.pass = "Password is invalid";
  } else if (pass.length < 6 || pass.length > 18) {
    errs.pass = "Password length must be between 6 and 18";
  }
  return errs;
}
