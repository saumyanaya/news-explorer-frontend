import React from "react";
import Popup from "../Popup/Popup";
import useForm from "../UseForm/useForm.js";

function SignInPopup({
  onClose,
  isOpen,
  serverMessage,
  onLogin,
  onSignUpClick,
  isDisabledInput,
}) {
  const { handleSubmit, handleChange, handleInvalid, values, errors, isValid } =
    useForm({
      onSubmit: submit,
    });

  function submit(values) {
    const email = values.email;
    const password = values.password;
    onLogin({ email, password });
  }

  return (
    <Popup onClose={onClose} isOpen={isOpen}>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Sign in</h2>
        <label className="form__input-label" htmlFor="email">
          Email
        </label>
        <input
          name="email"
          className="form__input"
          type="email"
          placeholder="Enter email"
          required
          value={values.email ?? ""}
          onChange={handleChange}
          onInvalid={handleInvalid}
          disabled={isDisabledInput}
        />
        <span className="form__input-error">{errors.email}</span>
        <label className="form__input-label" htmlFor="password">
          Password
        </label>
        <input
          name="password"
          className="form__input"
          type="password"
          placeholder="Enter password"
          required
          value={values.password ?? ""}
          onChange={handleChange}
          onInvalid={handleInvalid}
          disabled={isDisabledInput}
        />
        <span className="form__input-error">{errors.password}</span>
        <div className="form__button-wrapper">
          <span className="form__server-message">{serverMessage}</span>
          <button
            className={`button ${
              isValid ? "button_type_primary" : "button_type_disabled"
            }`}
            type="submit"
            disabled={!isValid}
          >
            Sign in
          </button>
        </div>
      </form>
      <div className="form__wrapper">
        <p>or</p>
        <button className="button-link" type="button" onClick={onSignUpClick}>
          Sign up
        </button>
      </div>
    </Popup>
  );
}

export default SignInPopup;
