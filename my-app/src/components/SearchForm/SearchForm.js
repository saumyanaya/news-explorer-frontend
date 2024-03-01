import React from "react";
import "./SearchForm.css";
import useForm from "../UseForm/useForm.js";

function SearchForm(props) {
  const { handleSubmit, handleChange, handleInvalid, values, errors } = useForm(
    {
      onSubmit: submit,
    }
  );

  function submit(values) {
    props.onSearch(values.keyword);
  }
  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <h1 className="searchForm__title">What's going on in the world?</h1>
      <p className="searchForm__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <div className="searchForm__input-wrapper">
        <input
          className="searchForm__input"
          placeholder="Enter topic"
          onChange={handleChange}
          onInvalid={handleInvalid}
          value={values.keyword ?? ""}
          name="keyword"
          required
          disabled={props.isLoading}
        />
        <button
          type="submit"
          className="searchForm__button button button_type_primary"
        >
          Search
        </button>
      </div>
      <span className="searchForm__input-error">{errors.keyword}</span>
    </form>
  );
}

export default SearchForm;
