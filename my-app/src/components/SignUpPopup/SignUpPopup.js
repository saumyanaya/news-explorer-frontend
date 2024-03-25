import React from "react";
import Popup from "../Popup/Popup";
import useForm from "../UseForm/useForm.js";

function SignUpPopup(props) {
  const { handleSubmit, handleChange, handleInvalid, values, errors, isValid } =
    useForm({
      onSubmit: submit,
    });

  function submit(values) {
    const email = values.email;
    const password = values.password;
    const name = values.userName;
    props.onRegister({ email, password, name });
  }

  return (
    <Popup onClose={props.onClose} isOpen={props.isOpen}>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Sign up</h2>
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
          disabled={props.isDisabledInput}
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
          disabled={props.isDisabledInput}
        />
        <span className="form__input-error">{errors.password}</span>
        <label className="form__input-label" htmlFor="username">
          Username
        </label>
        <input
          name="userName"
          className="form__input"
          type="text"
          placeholder="Enter your username"
          required
          minLength="2"
          maxLength="30"
          value={values.userName ?? ""}
          onChange={handleChange}
          onInvalid={handleInvalid}
          disabled={props.isDisabledInput}
        />
        <span className="form__input-error">{errors.userName}</span>
        <div className="form__button-wrapper">
          <span className="form__server-message">{props.serverMessage}</span>
          <button
            className={`button ${
              isValid ? "button_type_primary" : "button_type_disabled"
            }`}
            type="submit"
            disabled={!isValid}
          >
            Sign up
          </button>
        </div>
      </form>
      <div className="form__wrapper">
        <p>or</p>
        <button
          className="button-link"
          type="button"
          onClick={props.onSignInClick}
        >
          Sign in
        </button>
      </div>
    </Popup>
  );
}

export default SignUpPopup;
