import React from 'react';
import { useForm } from "react-hook-form";
import cn from 'classnames';

function LoginForm({ onLogin, formLoadingState }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange'});

  const onSubmit = data => {
    onLogin(data);
  };

  return (
    <form className='form' name='login-form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        type="text"
        {...register("user", { required: 'User name is required' })}
        className={cn('input', { "input_type_error":  errors.user })}
        placeholder="Enter your name"
        autoComplete="off"
      />
      {errors.user && <span className="input-error">{errors.user.message}</span>}

      <input
        type="text"
        {...register("room", { required: 'Room name is required' })}
        className={cn('input', { "input_type_error":  errors.room })}
        placeholder="Enter room name"
        autoComplete="off"
      />
      {errors.room && <span className="input-error">{errors.room.message}</span>}

      <button
        type="submit"
        className={cn('save-button', { "save-button_inactive": errors.user || errors.room })}
        disabled={errors.user || errors.room}
      >
        {formLoadingState ? 'Loading...' : 'Join'}
      </button>
    </form>
  );
}

export default LoginForm;
