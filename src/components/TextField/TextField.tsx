/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  urlValidation?: boolean;
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  urlValidation,
  required = false,
  // eslint-disable-next-line prettier/prettier
  onChange = () => { },
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const isValidImgUrl =
    (name === 'imgUrl' || name === 'imdbUrl') &&
    touched &&
    !urlValidation &&
    !hasError;

  const isErrorMessage = hasError || isValidImgUrl;
  const urlErrorMessage = isValidImgUrl ? 'Incorrect Url' : '';
  const requiredErrorMessage = hasError ? `${label} is required` : '';

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
      </div>
      {isErrorMessage && (
        <p className="help is-danger">
          {`${urlErrorMessage} ${requiredErrorMessage}`}
        </p>
      )}
    </div>
  );
};
